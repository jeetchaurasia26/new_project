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
  fetchReports();
  fetchBillingHistory();
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

    // Fetch real counts
    const { count: ticketsCount } = await supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('client_id', user.id).eq('status', 'open');
    const { count: reportsCount } = await supabase.from('weekly_reports').select('*', { count: 'exact', head: true }).eq('client_id', user.id);
    const { data: invoices } = await supabase.from('invoices').select('amount').eq('client_id', user.id).neq('status', 'paid');

    const totalPending = invoices ? invoices.reduce((acc, inv) => acc + inv.amount, 0) : 0;

    if (document.getElementById("stat-projects")) document.getElementById("stat-projects").innerText = "1"; // Managed
    if (document.getElementById("stat-reports")) document.getElementById("stat-reports").innerText = reportsCount || "0";
    if (document.getElementById("stat-invoices")) document.getElementById("stat-invoices").innerText = "₹" + totalPending.toLocaleString();

  } catch (err) { console.error("Stats load error:", err); }
}

async function fetchProjects() {
  // Project logic (stat cards handle this currently)
}

async function fetchReports() {
  const reportsList = document.getElementById('reports-list');
  if (!reportsList) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('weekly_reports').select('*').eq('client_id', user.id).order('week_start', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      reportsList.innerHTML = '<div class="text-center py-4 text-muted small">No reports uploaded yet.</div>';
      return;
    }

    reportsList.innerHTML = data.map(report => `
      <div class="report-item p-3 border rounded mb-3 bg-white shadow-sm d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-1 fw-bold">Weekly Report - ${new Date(report.week_start).toLocaleDateString()}</h6>
          <p class="mb-0 text-muted small">${report.report || 'Project update available'}</p>
        </div>
        <button class="btn btn-sm btn-dark px-3">View Report</button>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

async function fetchBillingHistory() {
  const billingList = document.getElementById('invoicesList');
  if (!billingList) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('invoices').select('*').eq('client_id', user.id).order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      billingList.innerHTML = '<div class="text-center py-5 text-muted small">No previous invoices found.</div>';
      return;
    }

    billingList.innerHTML = `
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light"><tr><th>Date</th><th>Amount</th><th>Status</th><th class="text-end">Action</th></tr></thead>
        <tbody>
          ${data.map(inv => `
            <tr>
              <td>${new Date(inv.created_at).toLocaleDateString()}</td>
              <td class="fw-bold">${inv.currency || '₹'}${inv.amount.toLocaleString()}</td>
              <td><span class="badge ${inv.status === 'paid' ? 'bg-success' : 'bg-warning'} text-white">${inv.status?.toUpperCase() || 'PENDING'}</span></td>
              <td class="text-end"><button class="btn btn-sm btn-outline-dark"><iconify-icon icon="solar:download-bold"></iconify-icon></button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
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
      alert('Ticket submitted successfully!');
      form.reset();
      loadStats();
    } catch (err) { alert(err.message); }
    finally { submitBtn.disabled = false; submitBtn.innerHTML = 'Submit Ticket'; }
  });
}

function setupPaymentForm() {
  const btn = document.getElementById('submit-payment');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const invoiceId = document.getElementById('payment-invoice-select').value;
    if (!invoiceId) return alert('Select an invoice');

    btn.disabled = true;
    btn.innerText = 'Processing...';

    try {
      const { error } = await supabase.from('invoices').update({ status: 'review' }).eq('id', invoiceId);
      if (error) throw error;
      alert('Payment confirmation sent for verification.');
      fetchBillingHistory();
    } catch (err) { alert(err.message); }
    finally { btn.disabled = false; btn.innerText = 'Submit Payment Confirmation'; }
  });
}

async function populateInvoiceSelect() {
  const select = document.getElementById('payment-invoice-select');
  if (!select) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('invoices').select('id, amount, created_at').eq('client_id', user.id).neq('status', 'paid');

    if (data) {
      data.forEach(inv => {
        const opt = document.createElement('option');
        opt.value = inv.id;
        opt.text = `Invoice #${inv.id.slice(0, 6)} - ₹${inv.amount}`;
        select.appendChild(opt);
      });
    }
  } catch (err) { console.error(err); }
}

function setupAccountForm() {
  // Already populated by loadAccountData in original logic
}
