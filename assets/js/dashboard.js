// assets/js/dashboard.js
import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 1000, offset: 100 });
  }

  // Protect page - ensure user is authenticated
  await requireAuth();

  // Load dashboard data
  await loadDashboard();

  // Setup UI Functionalites
  setupLogout();
  setupMenuNavigation();
  setupMobileSidebar();
  setupQuickActions();

  // Setup Forms
  setupPaymentForm();
  setupTicketForm();
  setupAccountForm();

  // Fetch Data from Supabase
  fetchProjects();
  fetchWorkProgress(); // Added this
  fetchReports();
  fetchBillingHistory();
  fetchTickets(); // Added this
  populateInvoiceSelect();
});

/**
 * Setup logout button
 */
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await supabase.auth.signOut();
        window.location.replace("sign-in.html");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Error logging out. Please try again.");
      }
    });
  }
}

/**
 * Setup menu navigation system
 */
function setupMenuNavigation() {
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const sectionId = link.getAttribute('data-section');
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showSection(sectionId);
      closeMobileSidebar();
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.dashboard-section');
  sections.forEach(section => section.classList.add('d-none'));

  const targetSection = document.getElementById(`section-${sectionId}`);
  if (targetSection) {
    targetSection.classList.remove('d-none');
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
}

function setupMobileSidebar() {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-menu-toggle btn';
  toggleBtn.innerHTML = '<iconify-icon icon="solar:hamburger-menu-bold" class="text-dark fs-4"></iconify-icon>';
  document.body.appendChild(toggleBtn);

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const sidebar = document.querySelector('.sidebar');
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    const icon = toggleBtn.querySelector('iconify-icon');
    icon.setAttribute('icon', sidebar.classList.contains('show') ? 'solar:close-circle-bold' : 'solar:hamburger-menu-bold');
  });

  overlay.addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  if (sidebar) sidebar.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
  if (toggleBtn) toggleBtn.querySelector('iconify-icon').setAttribute('icon', 'solar:hamburger-menu-bold');
}

function setupQuickActions() {
  const quickActionBtns = document.querySelectorAll('[data-section-trigger]');
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-section-trigger');
      const menuLink = document.querySelector(`[data-section="${targetSection}"]`);
      if (menuLink) menuLink.click();
    });
  });
}

/**
 * Data Fetching Functions
 */
async function loadDashboard() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const nameEl = document.getElementById('user-name-display');
      if (nameEl) nameEl.innerText = user.user_metadata?.full_name || user.email.split('@')[0];
      await loadStats();
    }
  } catch (err) {
    console.error("Dashboard load error:", err);
  }
}

async function loadStats() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch real counts
    const { count: projectsCount } = await supabase.from('client_projects').select('*', { count: 'exact', head: true }).eq('user_email', user.email);
    const { count: ticketsCount } = await supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('user_email', user.email).eq('status', 'open');
    const { count: reportsCount } = await supabase.from('weekly_reports').select('*', { count: 'exact', head: true }).eq('user_email', user.email);
    const { data: invoices } = await supabase.from('invoices').select('amount').eq('user_email', user.email).neq('status', 'paid');

    const totalPending = invoices ? invoices.reduce((acc, inv) => acc + inv.amount, 0) : 0;

    // Update Project Stats (Main & Work Progress section)
    const proj1 = document.getElementById("stat-projects");
    const proj2 = document.getElementById("stat-projects-2");
    if (proj1) proj1.innerText = projectsCount || "0";
    if (proj2) proj2.innerText = projectsCount || "0";

    // Update Report Stats (Main & Reports section)
    const repo1 = document.getElementById("stat-reports");
    const repo2 = document.getElementById("stat-reports-2");
    if (repo1) repo1.innerText = reportsCount || "0";
    if (repo2) repo2.innerText = reportsCount || "0";

    // Update Billing Stats
    const invStat = document.getElementById("stat-invoices");
    if (invStat) invStat.innerText = "₹" + totalPending.toLocaleString();

    // Update Pending Amount in Invoices section
    const pendingText = document.getElementById("pending-amount");
    if (pendingText) pendingText.innerText = "₹" + totalPending.toLocaleString();

  } catch (err) { console.error("Stats load error:", err); }
}

async function fetchProjects() {
  const container = document.getElementById('projectsList');
  if (!container) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('client_projects').select('*').eq('user_email', user.email).order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      container.innerHTML = '<div class="text-center py-4 text-muted small">No active projects yet.</div>';
      return;
    }

    container.innerHTML = data.map(p => `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1 fw-bold">${p.project_name || p.layer_name}</h6>
              <span class="badge bg-primary-subtle text-primary border me-2">${p.layer_name}</span>
              <span class="badge bg-success-subtle text-success border">${p.status}</span>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Started</small>
              <span class="fw-semibold">${p.start_date ? new Date(p.start_date).toLocaleDateString() : 'Pending'}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

async function fetchWorkProgress() {
  const container = document.getElementById('progressTimeline'); // We might need to ensure this ID exists or use a generic one
  if (!container) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('work_progress').select('*').eq('user_email', user.email).order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      container.innerHTML = '<div class="text-center py-4 text-muted small">No work progress updates yet.</div>';
      return;
    }

    // Display the latest progress percentage somewhere?
    // Let's create a timeline view
    container.innerHTML = data.map(item => `
      <div class="milestone-item mb-4 ps-4 border-start border-2 border-primary position-relative">
        <div class="position-absolute start-0 translate-middle-x bg-primary rounded-circle" style="width:12px; height:12px; margin-left:-1px; top:5px;"></div>
        <div class="d-flex justify-content-between mb-1">
          <h6 class="fw-bold mb-0">${item.title}</h6>
          <span class="badge bg-dark">${item.progress_percentage}%</span>
        </div>
        <p class="mb-1 text-muted small">${item.description || ''}</p>
        <small class="text-primary fw-semibold">${new Date(item.created_at).toLocaleDateString()}</small>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

async function fetchReports() {
  const reportsList = document.getElementById('reportsList'); // Corrected ID from reports-list
  if (!reportsList) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('weekly_reports').select('*').eq('user_email', user.email).order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      reportsList.innerHTML = '<div class="text-center py-4 text-muted small">No reports available yet.</div>';
      return;
    }

    reportsList.innerHTML = data.map(report => `
      <div class="report-item p-3 border rounded mb-3 bg-white shadow-sm d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-1 fw-bold">Week ${report.week_number}: ${report.title}</h6>
          <p class="mb-0 text-muted small">${report.summary || 'Project update available'}</p>
        </div>
        <button class="btn btn-sm btn-dark px-3">View Report</button>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

async function fetchTickets() {
  const container = document.getElementById('ticketsList');
  if (!container) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('support_tickets').select('*').eq('user_email', user.email).order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      container.innerHTML = '<div class="text-center py-4 text-muted small">No support tickets submitted yet.</div>';
      return;
    }

    container.innerHTML = data.map(t => `
      <div class="card mb-3 border shadow-sm">
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="badge ${t.priority === 'urgent' ? 'bg-danger' : 'bg-warning'} text-white text-uppercase" style="font-size: 0.65rem;">${t.priority || 'NORMAL'}</span>
                <h6 class="mb-0 fw-bold">${t.subject}</h6>
              </div>
              <p class="mb-2 text-muted small">${t.message}</p>
              ${t.admin_response ? `
                <div class="bg-light p-2 rounded border-start border-4 border-primary mt-2">
                  <small class="fw-bold d-block mb-1">Response from One Layer:</small>
                  <p class="mb-0 small">${t.admin_response}</p>
                </div>
              ` : ''}
            </div>
            <div class="text-end">
              <span class="badge bg-light text-dark border mb-1">${t.status ? t.status.toUpperCase() : 'OPEN'}</span>
              <small class="text-muted d-block" style="font-size: 0.7rem;">${new Date(t.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

async function fetchBillingHistory() {
  const billingList = document.getElementById('current-invoices-body'); // Targeting the table body
  if (!billingList) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('invoices').select('*').eq('user_email', user.email).order('created_at', { ascending: false });

    if (error) throw error;

    // Check for history container as well
    const historyList = document.getElementById('payment-history-list');

    if (!data || data.length === 0) {
      billingList.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No current invoices found.</td></tr>';
      return;
    }

    // Separate paid and unpaid
    const activeInvoices = data.filter(i => i.status !== 'paid');
    const paidInvoices = data.filter(i => i.status === 'paid');

    if (activeInvoices.length === 0) {
      billingList.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No pending invoices.</td></tr>';
    } else {
      billingList.innerHTML = activeInvoices.map(inv => `
        <tr>
          <td>${inv.invoice_number || 'INV-' + inv.id.slice(0, 6)}</td>
          <td>${new Date(inv.created_at).toLocaleDateString()}</td>
          <td class="fw-bold">₹${inv.amount.toLocaleString()}</td>
          <td><span class="badge bg-warning text-dark border">${inv.status?.toUpperCase() || 'PENDING'}</span></td>
          <td><button class="btn btn-sm btn-outline-dark px-3">Pay Now</button></td>
        </tr>
      `).join('');
    }

    // Update history
    if (historyList && paidInvoices.length > 0) {
      historyList.classList.remove('d-none');
      document.getElementById('payment-history-container').querySelector('.alert').classList.add('d-none');
      historyList.innerHTML = paidInvoices.map(inv => `
        <div class="card mb-3 border">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-md-2">
                <small class="text-muted d-block">Invoice #</small>
                <strong>${inv.invoice_number || 'INV-' + inv.id.slice(0, 6)}</strong>
              </div>
              <div class="col-md-2">
                <small class="text-muted d-block">Paid Date</small>
                <strong>${inv.paid_at ? new Date(inv.paid_at).toLocaleDateString() : new Date(inv.created_at).toLocaleDateString()}</strong>
              </div>
              <div class="col-md-2">
                <small class="text-muted d-block">Amount</small>
                <strong class="text-success">₹${inv.amount.toLocaleString()}</strong>
              </div>
              <div class="col-md-3">
                <small class="text-muted d-block">Status</small>
                <span class="badge bg-success">Paid & Verified</span>
              </div>
              <div class="col-md-3 text-end">
                <button class="btn btn-outline-primary btn-sm">
                  <iconify-icon icon="solar:download-bold" class="me-1"></iconify-icon>
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) { console.error(err); }
}

/**
 * Form Handling
 */
function setupTicketForm() {
  const form = document.getElementById('ticket-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-ticket');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting...';

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('support_tickets').insert([{
        client_id: user.id,
        user_email: user.email,
        subject: document.getElementById('ticket-subject').value,
        message: document.getElementById('ticket-description').value,
        priority: document.getElementById('ticket-priority').value,
        status: 'open'
      }]);

      if (error) throw error;
      alert('✅ Support ticket submitted successfully!');
      form.reset();
      loadStats();
      fetchTickets(); // Refresh list immediately
    } catch (err) { alert('❌ Error: ' + err.message); }
    finally { submitBtn.disabled = false; submitBtn.innerHTML = 'Submit Ticket'; }
  });
}

function setupPaymentForm() {
  const btn = document.getElementById('submit-payment');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const invoiceId = document.getElementById('payment-invoice-select').value;
    const paymentDate = document.getElementById('payment-date').value;
    const transactionRef = document.getElementById('payment-reference').value;

    if (!invoiceId) return alert('Please select an invoice.');
    if (!paymentDate) return alert('Please select the payment date.');
    if (!transactionRef) return alert('Please enter the transaction reference (UTR/ID).');

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

    try {
      const { error } = await supabase.from('invoices').update({
        status: 'review',
        payment_date: paymentDate,
        transaction_ref: transactionRef
      }).eq('id', invoiceId);

      if (error) throw error;
      alert('✅ Payment confirmation sent! Our team will verify it shortly.');

      // Reset fields
      document.getElementById('payment-date').value = '';
      document.getElementById('payment-reference').value = '';
      document.getElementById('payment-invoice-select').value = '';

      fetchBillingHistory();
      populateInvoiceSelect();
    } catch (err) { alert('❌ Error: ' + err.message); }
    finally { btn.disabled = false; btn.innerText = 'Submit Payment Confirmation'; }
  });
}

async function populateInvoiceSelect() {
  const select = document.getElementById('payment-invoice-select');
  if (!select) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('invoices').select('id, amount, created_at, invoice_number').eq('user_email', user.email).neq('status', 'paid');

    if (data) {
      select.innerHTML = '<option value="">-- Select Invoice --</option>'; // Reset
      data.forEach(inv => {
        const opt = document.createElement('option');
        opt.value = inv.id;
        opt.text = `${inv.invoice_number || 'INV-' + inv.id.slice(0, 6)} - ₹${inv.amount.toLocaleString()}`;
        select.appendChild(opt);
      });
    }
  } catch (err) { console.error(err); }
}

function setupAccountForm() {
  // Already populated by loadAccountData in original logic
}
