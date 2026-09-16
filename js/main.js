/* ==========================================================================
   BOOKING TOUR - APPLICATION MAIN ENTRY POINT & COORDINATOR
   Initializes page components, role-based navigation, global delegates
   ========================================================================== */

// Global click delegation for dropdowns, modals, and hotkeys
document.addEventListener('click', (e) => {
  // Close user dropdown if clicking outside
  if (!e.target.closest('#userDropdownMenu') && !e.target.closest('#userAvatarBtn') && !e.target.closest('#userMenuBtn')) {
    const dropdowns = document.querySelectorAll('#userDropdownMenu, .user-dropdown-menu');
    dropdowns.forEach(dd => {
      dd.classList.remove('show');
      dd.style.display = 'none';
      const btn = dd.previousElementSibling;
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Modal close button delegation
  if (e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]')) {
    const modal = e.target.closest('.modal-backdrop');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Modal backdrop click to close
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Global ESC key listener to close active modals & dropdowns
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close modals
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close dropdowns
    const activeDropdowns = document.querySelectorAll('.user-dropdown-menu.show, #userDropdownMenu.show');
    activeDropdowns.forEach(dd => {
      dd.classList.remove('show');
      dd.style.display = 'none';
    });
  }
});

// Master Application Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Navigation Bar based on current logged in user & role
  if (typeof renderRoleBasedNav === 'function') {
    renderRoleBasedNav();
  }

  // 2. Initialize Page-Specific Interactive Components
  if (typeof initHomePageSearch === 'function') initHomePageSearch();
  if (typeof initToursPage === 'function') initToursPage();
  if (typeof initTourDetailPage === 'function') initTourDetailPage();
  if (typeof initBookingPage === 'function') initBookingPage();
  if (typeof initPaymentPage === 'function') initPaymentPage();
  if (typeof initPaymentResultPage === 'function') initPaymentResultPage();
  if (typeof initBookingHistoryPage === 'function') initBookingHistoryPage();
  if (typeof initProfilePage === 'function') initProfilePage();
  if (typeof initLoginPage === 'function') initLoginPage();

  // 3. Initialize Dashboards (Guide, Manager, Admin)
  if (typeof initGuideDashboard === 'function') initGuideDashboard();
  if (typeof initManagerDashboard === 'function') initManagerDashboard();
  if (typeof initAdminDashboard === 'function') initAdminDashboard();
});
