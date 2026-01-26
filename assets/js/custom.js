$(function () {

    // Header Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    });


    // Featured Owl Carousel
    $('.featured-projects-slider .owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })


    // Count
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    // ScrollToTop
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", scrollToTop);

        window.addEventListener('scroll', function () {
            if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
                scrollBtn.style.display = "flex";
            } else {
                scrollBtn.style.display = "none";
            }
        });
    }


    // Aos
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
        });
    }

    // --- Lead Conversion Popup Logic (Improved) ---
    (function () {
        const leadPopup = $('#leadPopup');
        const closeBtn = $('#closePopup');
        const leadForm = $('#leadForm');
        const permanentSuppressionKey = 'onelayer_lead_popup_submitted';
        const sessionSuppressionKey = 'onelayer_lead_popup_session_closed';

        function checkDismissed() {
            try {
                // 1. Permanent dismissal (Form Submission)
                if (localStorage.getItem(permanentSuppressionKey) === 'true') {
                    return true;
                }

                // 2. Refresh detection: If it's a reload, always show (ignore session close)
                const navEntries = performance.getEntriesByType("navigation");
                if (navEntries.length > 0 && navEntries[0].type === 'reload') {
                    // It's a refresh! Clear session closure so it appears
                    sessionStorage.removeItem(sessionSuppressionKey);
                    return false;
                }

                // 3. Navigation dismissal (Closed in this session)
                if (sessionStorage.getItem(sessionSuppressionKey) === 'true') {
                    return true;
                }
            } catch (e) {
                console.warn("Storage access failed", e);
            }
            return false;
        }

        function setSessionClosed() {
            try {
                sessionStorage.setItem(sessionSuppressionKey, 'true');
            } catch (e) { }
        }

        function setPermanentlyDismissed() {
            try {
                localStorage.setItem(permanentSuppressionKey, 'true');
            } catch (e) { }
        }

        function showPopup() {
            if (checkDismissed()) return;
            if (leadPopup.length && !leadPopup.hasClass('active')) {
                leadPopup.addClass('active');
            }
        }

        function closePopup() {
            if (leadPopup.length) {
                leadPopup.removeClass('active');
                setSessionClosed(); // Close for current navigation session
            }
        }

        // 1. Timed Trigger (3 Seconds)
        setTimeout(showPopup, 3000);

        // 2. Scroll Trigger
        $(window).on('scroll.leadPopup', function () {
            if (!isDismissed() && window.scrollY > 400) {
                showPopup();
                $(window).off('scroll.leadPopup');
            }
        });

        // 3. Event Listeners
        if (closeBtn.length) {
            closeBtn.on('click', closePopup);
        }

        leadPopup.on('click', function (e) {
            if ($(e.target).is('#leadPopup')) {
                closePopup();
            }
        });

        // 4. Form Submission
        if (leadForm.length && (window.supabase || window.supabaseJs)) {
            const sb = window.supabase || window.supabaseJs;
            const SUPABASE_URL = "https://hydtchbejefpsrcbcvta.supabase.co";
            const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZHRjaGJlamVmcHNyY2JjdnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjExNjAsImV4cCI6MjA4MzM5NzE2MH0.-02P-evbPRxhOyeRzJNU_QX5XkOOU91ofbM9U3GaK90";
            const client = sb.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const successMsg = $('#popupSuccessMessage');

            leadForm.on('submit', async function (e) {
                e.preventDefault();
                const submitBtn = leadForm.find('.btn-submit');
                const originalHtml = submitBtn.html();

                const formData = {
                    full_name: $('#fullNamePopup').val().trim(),
                    phone_number: $('#countryCodePopup').val() + ' ' + $('#phoneNumberPopup').val().trim(),
                    email: $('#emailPopup').val().trim(),
                    business_stage: $('#businessStagePopup').val()
                };

                submitBtn.prop('disabled', true).html('<iconify-icon icon="line-md:loading-twotone-loop"></iconify-icon> Submitting...').css('opacity', '0.7');

                try {
                    const { error } = await client.from('popup_leads').insert([formData]);
                    if (error) throw error;

                    leadPopup.removeClass('active');
                    leadForm.addClass('d-none');
                    successMsg.removeClass('d-none');
                    setPermanentlyDismissed();

                    setTimeout(() => {
                        closePopup();
                        setTimeout(() => {
                            leadForm.removeClass('d-none');
                            successMsg.addClass('d-none');
                        }, 500);
                    }, 4000);
                } catch (err) {
                    console.error("Submission failed:", err);
                    submitBtn.prop('disabled', false).html(originalHtml).css('opacity', '1');
                    alert("Submission failed. Please try again.");
                }
            });
        }
    })();


    // --- Bouncing Logo (Ping Pong) Logic ---
    const logo = document.getElementById('bouncingLogo');
    const bounceContainer = document.querySelector('.stats-facts');

    if (logo && bounceContainer) {
        let x = 0;
        let y = 0;
        let vx = 1.5;
        let vy = 1.5;

        function animate() {
            const containerRect = bounceContainer.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();

            const maxX = containerRect.width - logoRect.width;
            const maxY = containerRect.height - logoRect.height;

            x += vx;
            y += vy;

            // Bounce off edges
            if (x >= maxX || x <= 0) {
                vx *= -1;
                x = Math.max(0, Math.min(x, maxX));
            }
            if (y >= maxY || y <= 0) {
                vy *= -1;
                y = Math.max(0, Math.min(y, maxY));
            }

            logo.style.left = x + 'px';
            logo.style.top = y + 'px';

            requestAnimationFrame(animate);
        }

        // Initialize position after window load
        window.addEventListener('load', () => {
            x = Math.random() * (bounceContainer.offsetWidth - 100);
            y = Math.random() * (bounceContainer.offsetHeight - 100);
            animate();
        });

        // Handle Resize
        window.addEventListener('resize', () => {
            const containerRect = bounceContainer.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();
            x = Math.min(x, containerRect.width - logoRect.width);
            y = Math.min(y, containerRect.height - logoRect.height);
        });
    }

});
