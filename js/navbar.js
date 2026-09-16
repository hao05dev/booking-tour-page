/**
 * BOOKING TOUR - NAVBAR & NAVIGATION INTERACTIONS
 */

function renderRoleBasedNav() {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const navActions = document.querySelector('.nav-actions');
  const mobileNavLinks = document.querySelector('.mobile-nav-links');
  const mobileNavFooter = document.querySelector('#mobileNav div[style*="margin-top:auto"]');

  if (!navActions) return;

  const roleBadges = {
    customer: '<span class="badge badge-role-customer" style="font-size:0.7rem; padding:2px 8px; margin-left:6px;"><i class="fa-solid fa-user"></i> Khách hàng</span>',
    guide: '<span class="badge badge-role-guide" style="font-size:0.7rem; padding:2px 8px; margin-left:6px;"><i class="fa-solid fa-flag"></i> HDV</span>',
    manager: '<span class="badge badge-role-manager" style="font-size:0.7rem; padding:2px 8px; margin-left:6px;"><i class="fa-solid fa-clipboard-list"></i> Quản Lý</span>',
    admin: '<span class="badge badge-role-admin" style="font-size:0.7rem; padding:2px 8px; margin-left:6px;"><i class="fa-solid fa-shield-halved"></i> Admin</span>'
  };

  if (!user) {
    // GUEST VIEW
    navActions.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm btn-login-desktop" style="font-weight:600; padding:8px 16px;">Đăng nhập</a>
      <a href="register.html" class="btn btn-primary btn-sm btn-login-desktop" style="font-weight:600; padding:8px 16px;">Đăng ký</a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    `;

    if (mobileNavLinks) {
      mobileNavLinks.innerHTML = `
        <a href="index.html" class="nav-link"><i class="fa-solid fa-house" style="margin-right:8px;"></i> Trang chủ</a>
        <a href="tours.html" class="nav-link"><i class="fa-solid fa-map-location-dot" style="margin-right:8px;"></i> Tour du lịch</a>
        <a href="explore.html" class="nav-link"><i class="fa-solid fa-mountain-sun" style="margin-right:8px;"></i> Khám phá</a>
        <a href="about.html" class="nav-link"><i class="fa-solid fa-circle-info" style="margin-right:8px;"></i> Về chúng tôi</a>
      `;
    }
    if (mobileNavFooter) {
      mobileNavFooter.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-block">Đăng nhập / Đăng ký</a>
      `;
    }
  } else {
    // AUTHENTICATED USER VIEW
    let roleMenuItems = '';

    if (user.role === 'guide') {
      roleMenuItems = `
        <a href="guide-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-route text-primary"></i>
          <span>Bảng điều khiển HDV</span>
        </a>
      `;
    } else if (user.role === 'manager') {
      roleMenuItems = `
        <a href="manager-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-clipboard-check text-primary"></i>
          <span>Quản lý Tour & Lịch trình</span>
        </a>
      `;
    } else if (user.role === 'admin') {
      roleMenuItems = `
        <a href="admin-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-gauge-high text-primary"></i>
          <span>Bảng Quản Trị Hệ Thống</span>
        </a>
      `;
    } else {
      // Customer
      roleMenuItems = `
        <a href="booking-history.html" class="dropdown-item">
          <i class="fa-solid fa-ticket text-primary"></i>
          <span>Xem tour của tôi</span>
        </a>
      `;
    }

    navActions.innerHTML = `
      <div class="user-dropdown-wrapper">
        <button class="user-profile-btn" id="userDropdownToggle" type="button" aria-expanded="false">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${user.name}" class="user-avatar">
          <span class="user-name">${user.name}</span>
          ${roleBadges[user.role] || ''}
          <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
        </button>
        <div class="user-dropdown-menu" id="userDropdownMenu">
          <div class="dropdown-user-header">
            <strong>${user.name}</strong>
            <span class="text-muted" style="font-size:0.8rem;">${user.email}</span>
          </div>
          <div class="dropdown-divider"></div>
          ${roleMenuItems}
          <a href="profile.html" class="dropdown-item">
            <i class="fa-regular fa-user text-primary"></i>
            <span>Hồ sơ cá nhân</span>
          </a>
          <div class="dropdown-divider"></div>
          <button type="button" class="dropdown-item text-danger" onclick="logout()" style="width:100%; border:none; background:none; text-align:left; cursor:pointer;">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    `;

    if (mobileNavLinks) {
      mobileNavLinks.innerHTML = `
        <a href="index.html" class="nav-link"><i class="fa-solid fa-house" style="margin-right:8px;"></i> Trang chủ</a>
        <a href="tours.html" class="nav-link"><i class="fa-solid fa-map-location-dot" style="margin-right:8px;"></i> Tour du lịch</a>
        <a href="explore.html" class="nav-link"><i class="fa-solid fa-mountain-sun" style="margin-right:8px;"></i> Khám phá</a>
        <a href="about.html" class="nav-link"><i class="fa-solid fa-circle-info" style="margin-right:8px;"></i> Về chúng tôi</a>
        <a href="profile.html" class="nav-link"><i class="fa-solid fa-user" style="margin-right:8px;"></i> Hồ sơ cá nhân</a>
      `;
    }
    if (mobileNavFooter) {
      mobileNavFooter.innerHTML = `
        <button type="button" class="btn btn-outline btn-block text-danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất (${user.name})</button>
      `;
    }
  }

  attachNavInteractions();
  highlightActiveNavLink();
}

function attachNavInteractions() {
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (navToggle && mobileNav && mobileOverlay) {
    navToggle.onclick = (e) => {
      e.stopPropagation();
      mobileNav.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
  }

  const closeMobileNav = () => {
    if (mobileNav) mobileNav.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileNavClose) mobileNavClose.onclick = closeMobileNav;
  if (mobileOverlay) mobileOverlay.onclick = closeMobileNav;
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-links .nav-link, .admindek-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else if (href && href !== currentPath && !href.startsWith('#') && !href.startsWith('javascript')) {
      link.classList.remove('active');
    }
  });
}

window.toggleAdmindekSidebar = function() {
  const sidebar = document.getElementById('admindekSidebar');
  const overlay = document.getElementById('admindekOverlay');
  if (!sidebar) return;
  
  if (window.innerWidth <= 992) {
    sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  } else {
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    sidebar.style.width = isCollapsed ? '76px' : '270px';
    document.querySelectorAll('.admindek-brand-title, .admindek-brand-subtitle, .admindek-sidebar-user-info, .admindek-section-title, .admindek-nav-link span, .admindek-sidebar-footer').forEach(el => {
      el.style.display = isCollapsed ? 'none' : '';
    });
  }
};
