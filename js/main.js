/**
 * BOOKING TOUR - MASTER JAVASCRIPT
 * Full prototype logic: 5-Role Session Management, Dynamic Navbar,
 * Floating Role Switcher, URL Search Flow & Filter, Checkout Flow,
 * and Guide/Manager/Admin Dashboards.
 */

// ==========================================
// 1. HELPERS & UTILITIES
// ==========================================

function formatCurrency(amount) {
  if (isNaN(amount)) return '0đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let iconClass = 'fa-circle-check';
  if (type === 'danger' || type === 'error') iconClass = 'fa-circle-exclamation';
  if (type === 'info') iconClass = 'fa-circle-info';
  if (type === 'warning') iconClass = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================
// 2. SESSION & 5-ROLE AUTH MANAGEMENT
// ==========================================

/**
 * Roles: 'guest', 'customer', 'guide', 'manager', 'admin'
 * Default state is 'guest' (null session).
 */
function getCurrentUser() {
  const sessionRaw = localStorage.getItem('bookingtour_session');
  if (!sessionRaw) return null; // Guest
  try {
    return JSON.parse(sessionRaw);
  } catch (e) {
    console.error("Error parsing user session:", e);
    return null;
  }
}

function setCurrentUser(userObj) {
  if (!userObj) {
    localStorage.removeItem('bookingtour_session');
  } else {
    localStorage.setItem('bookingtour_session', JSON.stringify(userObj));
  }
}

function switchRole(roleName, redirect = false) {
  const db = getMockDatabase();
  let targetUser = null;

  if (roleName === 'guest') {
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản.', 'info');
    renderRoleBasedNav();
    if (redirect) window.location.href = 'index.html';
    return;
  }

  // Find user for the specified role
  targetUser = db.users.find(u => u.role === roleName && u.status === 'active');
  if (!targetUser) {
    if (roleName === 'customer') {
      targetUser = { id: 'usr-cust-1', name: 'Nguyễn Văn Hào', email: 'customer@example.com', role: 'customer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', phone: '0912 345 678' };
    } else if (roleName === 'guide') {
      targetUser = { id: 'usr-guide-1', name: 'Trần Quốc Hưng', email: 'guide@example.com', role: 'guide', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', phone: '0988 776 655' };
    } else if (roleName === 'manager') {
      targetUser = { id: 'usr-mgr-1', name: 'Nguyễn Thu Hà', email: 'manager@example.com', role: 'manager', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', phone: '0911 223 344' };
    } else if (roleName === 'admin') {
      targetUser = { id: 'usr-adm-1', name: 'Lê Hoàng Long', email: 'admin@example.com', role: 'admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', phone: '0903 888 999' };
    }
  }

  setCurrentUser(targetUser);
  const roleDisplayNames = {
    customer: 'Khách hàng',
    guide: 'Hướng dẫn viên',
    manager: 'Quản lý Tour',
    admin: 'Quản trị viên'
  };
  showToast(`Đăng nhập thành công: ${roleDisplayNames[roleName]} (${targetUser.name})`, 'success');
  renderRoleBasedNav();

  if (redirect) {
    if (roleName === 'guide') window.location.href = 'guide-dashboard.html';
    else if (roleName === 'manager') window.location.href = 'manager-dashboard.html';
    else if (roleName === 'admin') window.location.href = 'admin-dashboard.html';
    else if (roleName === 'customer') window.location.href = 'booking-history.html';
    else window.location.href = 'index.html';
  }
}

function logout() {
  setCurrentUser(null);
  showToast('Đã đăng xuất thành công.', 'info');
  renderRoleBasedNav();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

// ==========================================
// 3. DYNAMIC NAVBAR & DRAWER RENDERING
// ==========================================

function renderRoleBasedNav() {
  const user = getCurrentUser();
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
    let mobileRoleLinks = '';

    if (user.role === 'guide') {
      roleMenuItems = `
        <a href="guide-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-route text-primary"></i>
          <span>Bảng điều khiển HDV</span>
        </a>
      `;
      mobileRoleLinks = `
        <a href="guide-dashboard.html" class="nav-link"><i class="fa-solid fa-route" style="margin-right:8px;"></i> Bảng điều khiển HDV</a>
      `;
    } else if (user.role === 'manager') {
      roleMenuItems = `
        <a href="manager-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-clipboard-check text-primary"></i>
          <span>Quản lý Tour & Lịch trình</span>
        </a>
      `;
      mobileRoleLinks = `
        <a href="manager-dashboard.html" class="nav-link"><i class="fa-solid fa-clipboard-check" style="margin-right:8px;"></i> Quản lý Tour & Lịch</a>
      `;
    } else if (user.role === 'admin') {
      roleMenuItems = `
        <a href="admin-dashboard.html" class="dropdown-item">
          <i class="fa-solid fa-gauge-high text-primary"></i>
          <span>Bảng Quản Trị Hệ Thống</span>
        </a>
      `;
      mobileRoleLinks = `
        <a href="admin-dashboard.html" class="nav-link"><i class="fa-solid fa-gauge-high" style="margin-right:8px;"></i> Bảng Quản Trị Admin</a>
      `;
    } else {
      // Customer
      roleMenuItems = `
        <a href="booking-history.html" class="dropdown-item">
          <i class="fa-solid fa-ticket text-primary"></i>
          <span>Xem tour của tôi</span>
        </a>
      `;
      mobileRoleLinks = `
        <a href="booking-history.html" class="nav-link"><i class="fa-solid fa-ticket" style="margin-right:8px;"></i> Xem tour của tôi</a>
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
        ${mobileRoleLinks}
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

// ==========================================
// 4. NAVBAR INTERACTIONS & MOBILE DRAWER
// ==========================================

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
  document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-links .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else if (href && href !== currentPath) {
      link.classList.remove('active');
    }
  });
}

// ==========================================
// 6. HOME PAGE SEARCH INTERACTION
// ==========================================

function initHomePageSearch() {
  const searchForm = document.getElementById('homeSearchForm');
  const searchBtn = document.getElementById('btnHomeSearch');
  const keywordInput = document.getElementById('homeSearchKeyword');
  const dateInput = document.getElementById('homeSearchDate');
  const priceSelect = document.getElementById('homeSearchPrice');

  const executeSearch = (e) => {
    if (e) e.preventDefault();
    const keyword = keywordInput ? keywordInput.value.trim() : '';
    const date = dateInput ? dateInput.value : '';
    const price = priceSelect ? priceSelect.value : '';

    const params = new URLSearchParams();
    if (keyword) params.set('search', keyword);
    if (date) params.set('date', date);
    if (price) params.set('price', price);

    window.location.href = `tours.html?${params.toString()}`;
  };

  if (searchForm) searchForm.addEventListener('submit', executeSearch);
  if (searchBtn) searchBtn.addEventListener('click', executeSearch);
}

// ==========================================
// 7. TOURS LISTING & DYNAMIC FILTER FLOW
// ==========================================

function initToursPage() {
  const toursGrid = document.getElementById('toursListContainer');
  if (!toursGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get('search') || '';
  const searchDate = urlParams.get('date') || '';
  const searchRegion = urlParams.get('region') || 'all';

  // Elements
  const inputSearch = document.getElementById('tourSearchInput');
  const resultCountEl = document.getElementById('tourResultCount');
  const activeKeywordBadge = document.getElementById('activeSearchBadge');
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceValueDisplay = document.getElementById('priceRangeValue');
  const sortSelect = document.getElementById('tourSortSelect');
  const regionTabs = document.querySelectorAll('.tour-category-tab');

  if (inputSearch && searchKeyword) {
    inputSearch.value = searchKeyword;
  }

  const db = getMockDatabase();
  let allTours = [...db.tours];

  const regionLabels = {
    north: 'Miền Bắc',
    central: 'Miền Trung',
    south: 'Miền Nam'
  };

  const themeLabels = {
    sea: 'Biển đảo',
    nature: 'Thiên nhiên',
    culture: 'Văn hóa'
  };

  function parseVnDate(value) {
    if (!value) return Number.MAX_SAFE_INTEGER;
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  function getNextDeparture(tourId) {
    return db.departures
      .filter(dep => dep.tourId === tourId && dep.status !== 'Sold Out')
      .sort((a, b) => parseVnDate(a.date) - parseVnDate(b.date))[0] || null;
  }

  function getRatingLabel(rating) {
    if (rating >= 4.8) return 'Tuyệt vời';
    if (rating >= 4.6) return 'Xuất sắc';
    if (rating >= 4.4) return 'Rất tốt';
    return 'Tốt';
  }

  function getPromoLabel(tour) {
    if (tour.featured) return 'Giá ưu đãi';
    if (tour.popular) return 'Tour bán chạy';
    if (tour.topRated) return 'Được yêu thích';
    return '';
  }

  function filterAndRenderTours() {
    const keyword = inputSearch ? inputSearch.value.trim().toLowerCase() : searchKeyword.toLowerCase();
    const currentRegion = document.querySelector('.tour-category-tab.active')?.dataset.region || 'all';
    const maxPrice = priceSlider ? parseInt(priceSlider.value, 10) : 10000000;
    const selectedDurations = Array.from(document.querySelectorAll('input[name="duration"]:checked')).map(cb => cb.value);
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseFloat(cb.value));
    const sortVal = sortSelect ? sortSelect.value : 'popular';

    let filtered = allTours.filter(tour => {
      // Keyword match
      if (keyword) {
        const matchTitle = tour.title.toLowerCase().includes(keyword);
        const matchLocation = tour.location.toLowerCase().includes(keyword);
        const matchDesc = tour.description.toLowerCase().includes(keyword);
        if (!matchTitle && !matchLocation && !matchDesc) return false;
      }

      // Region match
      if (currentRegion !== 'all' && tour.region !== currentRegion) {
        return false;
      }

      // Price match
      if (tour.price > maxPrice) {
        return false;
      }

      // Duration match
      if (selectedDurations.length > 0) {
        const matchesDuration = selectedDurations.some(dur => {
          if (dur === '1' && tour.days === 1) return true;
          if (dur === '2-3' && (tour.days === 2 || tour.days === 3)) return true;
          if (dur === '4+' && tour.days >= 4) return true;
          return false;
        });
        if (!matchesDuration) return false;
      }

      // Rating match
      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        if (tour.rating < minRating) return false;
      }

      return true;
    });

    // Sorting
    if (sortVal === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity default
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    // Update result count & UI
    if (resultCountEl) {
      resultCountEl.textContent = `Tìm thấy ${filtered.length} tour phù hợp`;
    }
    if (activeKeywordBadge) {
      if (keyword) {
        activeKeywordBadge.style.display = 'inline-flex';
        activeKeywordBadge.innerHTML = `Từ khóa: "${keyword}" <i class="fa-solid fa-xmark" style="margin-left:6px; cursor:pointer;" onclick="clearSearchKeyword()"></i>`;
      } else {
        activeKeywordBadge.style.display = 'none';
      }
    }

    // Render cards
    if (filtered.length === 0) {
      toursGrid.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; background:var(--surface); border-radius:var(--radius-lg); border:1px dashed var(--border);">
          <i class="fa-solid fa-compass" style="font-size: 3rem; color: var(--text-light); margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Không tìm thấy tour phù hợp</h3>
          <p class="text-muted" style="max-width: 480px; margin: 0 auto 20px;">Rất tiếc, không có tour nào khớp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi từ khóa hoặc điều chỉnh bộ lọc.</p>
          <button class="btn btn-primary" onclick="resetAllFilters()"><i class="fa-solid fa-rotate-left"></i> Xóa tất cả bộ lọc</button>
        </div>
      `;
      return;
    }

    toursGrid.innerHTML = filtered.map(tour => {
      const nextDeparture = getNextDeparture(tour.id);
      const promoLabel = getPromoLabel(tour);
      const ratingScore = (tour.rating * 2).toFixed(1);
      const regionLabel = regionLabels[tour.region] || tour.location;
      const themeLabel = themeLabels[tour.theme] || 'Khám phá';

      return `
        <a class="tour-card tour-card-reference" href="tour-detail.html?id=${tour.id}" aria-label="Xem chi tiết ${tour.title}">
          <div class="tour-card-image-wrap">
            <img src="${tour.image}" alt="${tour.title}" class="tour-card-img" loading="lazy">
            ${promoLabel ? `<span class="tour-promo-badge">${promoLabel}</span>` : ''}
          </div>

          <div class="tour-card-body">
            <div class="tour-rating-row">
              <span class="tour-rating-score">${ratingScore}</span>
              <strong class="tour-rating-label">${getRatingLabel(tour.rating)}</strong>
              <span class="tour-rating-count">(${tour.reviewsCount})</span>
            </div>

            <h3 class="tour-title">${tour.title}</h3>

            <div class="tour-info-row">
              <span><i class="fa-regular fa-clock"></i> ${tour.days} ngày</span>
              <span><i class="fa-solid fa-location-dot"></i> Điểm đến ${tour.location}</span>
            </div>

            <div class="tour-tag-row">
              <span class="tour-tag">${themeLabel}</span>
              <span class="tour-tag">${regionLabel}</span>
            </div>

            <div class="tour-card-footer-reference">
              <div class="tour-price-reference">
                <div class="tour-price-line">
                  <span>Giá chỉ</span>
                  <strong>${formatCurrency(tour.price)}</strong>
                </div>
                <div class="tour-departure-date">
                  ${nextDeparture ? `Khởi hành ngày ${nextDeparture.date.slice(0, 5)}` : 'Liên hệ lịch khởi hành'}
                </div>
              </div>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  window.clearSearchKeyword = () => {
    if (inputSearch) inputSearch.value = '';
    filterAndRenderTours();
  };

  window.resetAllFilters = () => {
    if (inputSearch) inputSearch.value = '';
    if (priceSlider) {
      priceSlider.value = 10000000;
      if (priceValueDisplay) priceValueDisplay.textContent = formatCurrency(10000000);
    }
    document.querySelectorAll('input[name="duration"], input[name="rating"]').forEach(cb => cb.checked = false);
    regionTabs.forEach(t => t.classList.remove('active'));
    if (regionTabs[0]) regionTabs[0].classList.add('active');
    if (sortSelect) sortSelect.value = 'popular';
    filterAndRenderTours();
  };

  window.toggleWishlist = (btn, tourId) => {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
      icon.className = 'fa-solid fa-heart text-danger';
      showToast('Đã thêm tour vào danh sách yêu thích!');
    } else {
      icon.className = 'fa-regular fa-heart';
      showToast('Đã xóa tour khỏi danh sách yêu thích.', 'info');
    }
  };

  // Event Listeners for Filters
  if (inputSearch) {
    inputSearch.addEventListener('input', () => filterAndRenderTours());
  }

  if (priceSlider && priceValueDisplay) {
    priceSlider.addEventListener('input', () => {
      priceValueDisplay.textContent = formatCurrency(parseInt(priceSlider.value, 10));
      filterAndRenderTours();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => filterAndRenderTours());
  }

  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterAndRenderTours();
    });
  });

  document.querySelectorAll('input[name="duration"], input[name="rating"]').forEach(cb => {
    cb.addEventListener('change', () => filterAndRenderTours());
  });

  // Initial Filter & Render
  filterAndRenderTours();
}

// ==========================================
// 8. TOUR DETAIL PAGE LOGIC
// ==========================================

function initTourDetailPage() {
  const departureCards = document.querySelectorAll('.departure-card:not(.sold-out)');
  const adultCountEl = document.getElementById('adultCount');
  const childCountEl = document.getElementById('childCount');
  const totalAmountEl = document.getElementById('totalAmount');
  const summaryDepartureEl = document.getElementById('summaryDeparture');
  const summaryGuestsEl = document.getElementById('summaryGuests');
  const btnBookTour = document.getElementById('btnBookTour');

  if (!btnBookTour && !totalAmountEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('id') || 'tour-1';
  const db = getMockDatabase();
  const currentTour = db.tours.find(t => t.id === tourId) || db.tours[0];

  let currentPrice = currentTour ? currentTour.price : 3490000;
  let selectedDate = "25/10/2026";
  let adults = 1;
  let children = 0;

  function updateTotals() {
    const childPrice = currentPrice * 0.7;
    const total = (adults * currentPrice) + (children * childPrice);
    
    if (totalAmountEl) totalAmountEl.textContent = formatCurrency(total);
    if (summaryDepartureEl) summaryDepartureEl.textContent = selectedDate;
    if (summaryGuestsEl) {
      let guestText = `${adults} Người lớn`;
      if (children > 0) guestText += `, ${children} Trẻ em`;
      summaryGuestsEl.textContent = guestText;
    }

    const tourData = {
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      date: selectedDate,
      adults: adults,
      children: children,
      pricePerAdult: currentPrice,
      totalAmount: total
    };
    localStorage.setItem('booking_draft', JSON.stringify(tourData));
  }

  departureCards.forEach(card => {
    card.addEventListener('click', () => {
      departureCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedDate = card.dataset.date || "25/10/2026";
      currentPrice = parseInt(card.dataset.price, 10) || (currentTour ? currentTour.price : 3490000);
      updateTotals();
    });
  });

  const btnMinusAdult = document.getElementById('btnMinusAdult');
  const btnPlusAdult = document.getElementById('btnPlusAdult');
  if (btnMinusAdult && btnPlusAdult && adultCountEl) {
    btnMinusAdult.onclick = () => {
      if (adults > 1) {
        adults--;
        adultCountEl.textContent = adults;
        btnMinusAdult.disabled = adults <= 1;
        updateTotals();
      }
    };
    btnPlusAdult.onclick = () => {
      if (adults < 10) {
        adults++;
        adultCountEl.textContent = adults;
        btnMinusAdult.disabled = false;
        updateTotals();
      }
    };
  }

  const btnMinusChild = document.getElementById('btnMinusChild');
  const btnPlusChild = document.getElementById('btnPlusChild');
  if (btnMinusChild && btnPlusChild && childCountEl) {
    btnMinusChild.onclick = () => {
      if (children > 0) {
        children--;
        childCountEl.textContent = children;
        btnMinusChild.disabled = children <= 0;
        updateTotals();
      }
    };
    btnPlusChild.onclick = () => {
      if (children < 5) {
        children++;
        childCountEl.textContent = children;
        btnMinusChild.disabled = false;
        updateTotals();
      }
    };
  }

  if (btnBookTour) {
    btnBookTour.onclick = (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      if (!currentUser) {
        // Guest user prompt
        showToast('Vui lòng đăng nhập tài khoản Khách hàng để tiến hành đặt tour!', 'warning');
        setTimeout(() => {
          window.location.href = 'login.html?redirect=booking.html';
        }, 1200);
        return;
      }
      updateTotals();
      window.location.href = 'booking.html';
    };
  }

  updateTotals();
}

// ==========================================
// 9. BOOKING CHECKOUT PAGE
// ==========================================

function initBookingPage() {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;

  const user = getCurrentUser();
  if (user) {
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    if (nameInput && !nameInput.value) nameInput.value = user.name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '0912 345 678';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
  }

  const rawData = localStorage.getItem('booking_draft');
  if (rawData) {
    try {
      const data = JSON.parse(rawData);
      if (document.getElementById('checkoutTourName')) document.getElementById('checkoutTourName').textContent = data.tourTitle;
      if (document.getElementById('checkoutDate')) document.getElementById('checkoutDate').textContent = data.date;
      if (document.getElementById('checkoutGuests')) document.getElementById('checkoutGuests').textContent = `${data.adults} Người lớn${data.children > 0 ? ', ' + data.children + ' Trẻ em' : ''}`;
      if (document.getElementById('checkoutTotal')) document.getElementById('checkoutTotal').textContent = formatCurrency(data.totalAmount);
    } catch (e) {
      console.error(e);
    }
  }

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    let isValid = true;
    if (fullName && !fullName.value.trim()) {
      fullName.classList.add('is-invalid');
      isValid = false;
    } else if (fullName) fullName.classList.remove('is-invalid');

    if (phone && !phone.value.trim()) {
      phone.classList.add('is-invalid');
      isValid = false;
    } else if (phone) phone.classList.remove('is-invalid');

    if (email && !email.value.trim()) {
      email.classList.add('is-invalid');
      isValid = false;
    } else if (email) email.classList.remove('is-invalid');

    if (isValid) {
      showToast('Đang tạo đơn đặt tour và chuyển tới cổng thanh toán...', 'success');
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 500);
    }
  });
}

// ==========================================
// 10. PAYMENT PAGE (10-minute timer & Complete)
// ==========================================

function initPaymentPage() {
  const timerDisplay = document.getElementById('paymentTimer');
  const btnConfirmPayment = document.getElementById('btnConfirmPayment');
  if (!timerDisplay && !btnConfirmPayment) return;

  let timeLeft = 10 * 60;

  if (timerDisplay) {
    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        showToast('Phiên thanh toán đã hết hạn!', 'danger');
        setTimeout(() => {
          window.location.href = 'payment-result.html?status=expired';
        }, 1000);
      }
      timeLeft--;
    }, 1000);
  }

  if (btnConfirmPayment) {
    btnConfirmPayment.onclick = () => {
      const rawDraft = localStorage.getItem('booking_draft');
      const draft = rawDraft ? JSON.parse(rawDraft) : {
        tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
        date: "25/10/2026",
        adults: 2,
        children: 1,
        totalAmount: 9423000
      };

      const user = getCurrentUser() || { name: "Nguyễn Văn Hào", email: "customer@example.com", phone: "0912 345 678" };
      const newBookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

      // Save to mock DB
      const db = getMockDatabase();
      const newBooking = {
        id: newBookingId,
        tourId: draft.tourId || "tour-1",
        tourTitle: draft.tourTitle,
        tourImage: draft.tourImage || "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
        departureDate: draft.date,
        returnDate: "28/10/2026",
        bookingDate: "16/09/2026",
        guests: { adults: draft.adults || 2, children: draft.children || 0 },
        totalPrice: draft.totalAmount || 9423000,
        status: "confirmed",
        paymentStatus: "paid",
        paymentMethod: "VietQR",
        customerName: user.name,
        customerPhone: user.phone,
        customerEmail: user.email,
        assignedGuideId: "usr-guide-1",
        assignedGuideName: "Trần Quốc Hưng"
      };

      db.bookings.unshift(newBooking);
      saveMockDatabase(db);
      localStorage.setItem('latest_booking_id', newBookingId);

      showToast('Xác nhận thanh toán thành công!', 'success');
      setTimeout(() => {
        window.location.href = `payment-result.html?status=success&bookingId=${newBookingId}`;
      }, 600);
    };
  }
}

// ==========================================
// 11. PAYMENT RESULT PAGE
// ==========================================

function initPaymentResultPage() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status') || 'success';
  const bookingId = params.get('bookingId') || localStorage.getItem('latest_booking_id') || 'BK-893421';

  const stateSuccess = document.getElementById('stateSuccess');
  const stateFailed = document.getElementById('stateFailed');
  const stateExpired = document.getElementById('stateExpired');
  const resultBookingCode = document.getElementById('resultBookingCode');

  if (resultBookingCode) resultBookingCode.textContent = bookingId;

  if (stateSuccess && stateFailed && stateExpired) {
    stateSuccess.style.display = 'none';
    stateFailed.style.display = 'none';
    stateExpired.style.display = 'none';

    if (status === 'failed') stateFailed.style.display = 'block';
    else if (status === 'expired') stateExpired.style.display = 'block';
    else stateSuccess.style.display = 'block';
  }
}

// ==========================================
// 12. BOOKING HISTORY (Customer View)
// ==========================================

function initBookingHistoryPage() {
  const historyTabs = document.querySelectorAll('.history-tab');
  const historyPanels = document.querySelectorAll('.history-panel');
  if (!historyTabs.length) return;

  historyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      historyTabs.forEach(t => t.classList.remove('active'));
      historyPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.dataset.target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

// ==========================================
// 13. PROFILE PAGE
// ==========================================

function initProfilePage() {
  const profileForm = document.getElementById('profileForm');
  if (!profileForm) return;

  const user = getCurrentUser();
  if (user) {
    if (document.getElementById('profileFullName')) document.getElementById('profileFullName').value = user.name || '';
    if (document.getElementById('profileEmail')) document.getElementById('profileEmail').value = user.email || '';
    if (document.getElementById('profilePhone')) document.getElementById('profilePhone').value = user.phone || '0912 345 678';
    if (document.getElementById('profileAddress')) document.getElementById('profileAddress').value = user.address || 'Quận 1, TP. Hồ Chí Minh';
    if (document.getElementById('profileDisplayName')) document.getElementById('profileDisplayName').textContent = user.name;
    if (document.getElementById('profileDisplayEmail')) document.getElementById('profileDisplayEmail').textContent = user.email;
  }

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('profileFullName').value.trim();
    const newPhone = document.getElementById('profilePhone').value.trim();
    const newAddress = document.getElementById('profileAddress').value.trim();

    if (user) {
      user.name = newName || user.name;
      user.phone = newPhone || user.phone;
      user.address = newAddress || user.address;
      setCurrentUser(user);

      // Also update in db
      const db = getMockDatabase();
      const dbUser = db.users.find(u => u.id === user.id);
      if (dbUser) {
        dbUser.name = user.name;
        dbUser.phone = user.phone;
        dbUser.address = user.address;
        saveMockDatabase(db);
      }
    }
    showToast('Cập nhật thông tin hồ sơ thành công!', 'success');
    renderRoleBasedNav();
  });
}

// ==========================================
// 14. LOGIN PAGE LOGIC
// ==========================================

function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';

    const db = getMockDatabase();
    let matchedUser = db.users.find(u => u.email.toLowerCase() === email && u.status === 'active');

    if (!matchedUser) {
      if (email.includes('admin')) matchedUser = db.users.find(u => u.role === 'admin');
      else if (email.includes('guide')) matchedUser = db.users.find(u => u.role === 'guide');
      else if (email.includes('manager')) matchedUser = db.users.find(u => u.role === 'manager');
      else matchedUser = db.users.find(u => u.role === 'customer');
    }

    setCurrentUser(matchedUser);
    showToast(`Đăng nhập thành công! Chào mừng ${matchedUser.name}`, 'success');

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      if (redirect) {
        window.location.href = redirect;
      } else {
        if (matchedUser.role === 'guide') window.location.href = 'guide-dashboard.html';
        else if (matchedUser.role === 'manager') window.location.href = 'manager-dashboard.html';
        else if (matchedUser.role === 'admin') window.location.href = 'admin-dashboard.html';
        else window.location.href = 'booking-history.html';
      }
    }, 500);
  });
}

// ==========================================
// 15. GUIDE DASHBOARD LOGIC
// ==========================================

function initGuideDashboard() {
  const stepperContainer = document.getElementById('tourProgressStepper');
  const tableBody = document.getElementById('assignedDeparturesTableBody');
  if (!stepperContainer && !tableBody) return;

  const assignedTours = [
    {
      id: "dep-hl-1",
      tourId: "tour-1",
      title: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      code: "DEP-HL-2510",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      duration: "3N2Đ",
      daysCount: 3,
      dateRange: "25/10/2026 - 28/10/2026",
      departureTime: "07:30 25/10/2026",
      guestsCount: 18,
      maxGuests: 20,
      groupsCount: 6,
      pickupLocation: "Nhà Hát Lớn Hà Nội (Số 1 Tràng Tiền)",
      progressStatus: "preparing",
      busInfo: "29B - 889.99 (Universe 29 chỗ VIP)",
      driverInfo: "Bác Thành - 0983 222 333",
      hotelInfo: "Du thuyền Paradise Elegance 5 Sao (Tuần Châu)",
      operatorInfo: "0911 223 344 (Ms. Thu Hà)",
      specialNotes: "2 khách ăn chay trường (chị Mai), 1 bé 4 tuổi cần ghế riêng, 1 khách quốc tịch Mỹ (David Miller - HDV hỗ trợ tiếng Anh).",
      schedule: {
        1: [
          { time: "07:30", title: "Tập trung & Đón khách tại điểm hẹn", desc: "Điểm đón: Nhà Hát Lớn Hà Nội. Điểm danh kiểm tra hành lý, phát nón & nước suối.", status: "completed" },
          { time: "08:00", title: "Khởi hành đi Tuần Châu / Hạ Long", desc: "Di chuyển theo cao tốc Hà Nội - Hải Phòng. Thuyết minh tuyến điểm văn hóa & hoạt náo trên xe.", status: "active" },
          { time: "11:30", title: "Check-in Du thuyền 5 sao & Dùng bữa trưa", desc: "Thưởng thức Welcome drink, làm thủ tục nhận phòng và dùng bữa trưa buffet hải sản tươi sống.", status: "upcoming" },
          { time: "14:30", title: "Tham quan Hang Sửng Sốt & Chèo Kayak", desc: "Khám phá vẻ đẹp thạch nhũ kỳ vĩ của hang Sửng Sốt, chèo thuyền kayak ngắm làn nước xanh ngọc bích.", status: "upcoming" },
          { time: "18:30", title: "Sunset Party & Tiệc tối Gala Dinner", desc: "Ngắm hoàng hôn trên Sundeck, thưởng thức tiệc nướng BBQ thượng hạng cùng âm nhạc Acoustic.", status: "upcoming" },
          { time: "20:30", title: "Câu mực đêm & Thư giãn tự do", desc: "Trải nghiệm câu mực đêm cùng thủy thủ đoàn hoặc tự do thư giãn ngắm vịnh về đêm.", status: "upcoming" }
        ],
        2: [
          { time: "06:30", title: "Lớp học Thái Cực Quyền (Taichi) đón bình minh", desc: "Tập dưỡng sinh trên boong tàu ngắm ánh bình minh rạng rỡ trên vịnh di sản.", status: "upcoming" },
          { time: "07:30", title: "Bữa sáng nhẹ tại nhà hàng du thuyền", desc: "Phục vụ bánh ngọt, trà, cafe cao cấp và điểm tâm trước khi di chuyển đi đảo.", status: "upcoming" },
          { time: "09:00", title: "Khám phá Đảo Ti Tốp & Tắm biển", desc: "Leo 400 bậc đá lên đỉnh núi ngắm toàn cảnh 360 độ Vịnh Hạ Long, tự do tắm biển bãi cát trắng mịn.", status: "upcoming" },
          { time: "12:00", title: "Bữa trưa đặc sản vùng biển", desc: "Thưởng thức ẩm thực truyền thống Quảng Ninh chế biến tinh tế.", status: "upcoming" },
          { time: "15:00", title: "Thăm Làng Chài Ngọc Trai", desc: "Tìm hiểu quy trình nuôi cấy ngọc trai tự nhiên và nghệ thuật chạm khắc thủ công mỹ nghệ.", status: "upcoming" },
          { time: "19:00", title: "Bữa tối ấm cúng & Đêm giao lưu", desc: "Thực đơn món Âu - Á kết hợp và chương trình minigame gắn kết các thành viên trong đoàn.", status: "upcoming" }
        ],
        3: [
          { time: "07:00", title: "Bữa sáng Buffet & Ngắm cảnh Vịnh", desc: "Tận hưởng không khí trong lành buổi sớm mai giữa hàng nghìn hòn đảo đá vôi kỳ thú.", status: "upcoming" },
          { time: "09:30", title: "Thủ tục Check-out & Cập bến Tuần Châu", desc: "Thanh toán chi phí phát sinh cá nhân, chào tạm biệt thủy thủ đoàn và lên xe về lại Hà Nội.", status: "upcoming" },
          { time: "12:30", title: "Dừng chân nghỉ ngơi & Mua đặc sản Hải Dương", desc: "Nghỉ giải lao, mua sắm bánh đậu xanh, bánh gai Hải Dương làm quà cho người thân.", status: "upcoming" },
          { time: "15:30", title: "Về đến điểm đón ban đầu tại Hà Nội", desc: "Trả khách an toàn tại Nhà Hát Lớn, hỗ trợ nhận hành lý và chào tạm biệt đoàn khách.", status: "upcoming" }
        ]
      },
      guests: [
        { name: "Nguyễn Văn Hào", phone: "0912 345 678", count: "2 Lớn, 1 Trẻ", pickup: "Nhà Hát Lớn HN (Ăn chay 1 người)", checked: true },
        { name: "Trần Thị Mai", phone: "0988 123 456", count: "2 Lớn", pickup: "Khách sạn Daewoo Ba Đình", checked: true },
        { name: "Lê Hoàng Nam", phone: "0905 678 901", count: "4 Lớn, 1 Trẻ", pickup: "Cột 9 Sân Bay Nội Bài", checked: false },
        { name: "Phạm Quỳnh Trang", phone: "0934 567 890", count: "3 Lớn", pickup: "Bến xe Mỹ Đình", checked: false },
        { name: "Vũ Minh Đức", phone: "0918 777 888", count: "2 Lớn", pickup: "Số 10 Tràng Thi, Hoàn Kiếm", checked: true },
        { name: "David Miller", phone: "0903 111 222", count: "2 Lớn", pickup: "Khách sạn Hilton Opera (Hỗ trợ tiếng Anh)", checked: false }
      ]
    },
    {
      id: "dep-sp-2",
      tourId: "tour-2",
      title: "Chinh Phục Fansipan & Săn Mây Sa Pa 2N1Đ",
      code: "DEP-SP-0211",
      image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
      duration: "2N1Đ",
      daysCount: 2,
      dateRange: "02/11/2026 - 04/11/2026",
      departureTime: "06:30 02/11/2026",
      guestsCount: 14,
      maxGuests: 15,
      groupsCount: 4,
      pickupLocation: "Phố Cổ Hà Nội (Đón tận nơi các khách sạn)",
      progressStatus: "upcoming",
      busInfo: "29B - 668.88 (Limousine 16 chỗ cao cấp)",
      driverInfo: "Bác Dũng - 0915 889 900",
      hotelInfo: "Khách sạn DeLaCouPole 5 Sao Sa Pa",
      operatorInfo: "0911 223 344 (Ms. Thu Hà)",
      specialNotes: "Khách yêu cầu lẩu cá hồi Tây Bắc bữa tối ngày 1. 2 khách có tiền sử huyết áp khi lên đỉnh Fansipan.",
      schedule: {
        1: [
          { time: "06:30", title: "Đón khách tại khu vực Phố Cổ Hà Nội", desc: "Xe đón khách tại các khách sạn, khởi hành đi Sa Pa theo cao tốc Nội Bài - Lào Cai.", status: "upcoming" },
          { time: "12:30", title: "Đến Sa Pa & Dùng bữa trưa đặc sản", desc: "Check-in khách sạn, thưởng thức thắng cố và lợn bản nướng thơm ngon.", status: "upcoming" },
          { time: "14:30", title: "Tham quan Bản Cát Cát mộng mơ", desc: "Khám phá bản làng người H'Mông, xem biểu diễn múa khèn truyền thống.", status: "upcoming" },
          { time: "18:30", title: "Bữa tối Lẩu Cá Hồi & Dạo chợ đêm", desc: "Thưởng thức lẩu cá hồi tươi ngon, dạo phố ngắm Nhà thờ Đá lung linh.", status: "upcoming" }
        ],
        2: [
          { time: "07:00", title: "Ăn sáng Buffet & Chinh phục đỉnh Fansipan", desc: "Đi cáp treo 3 dây vượt thung lũng Mường Hoa chạm đỉnh Nóc nhà Đông Dương 3.143m.", status: "upcoming" },
          { time: "12:00", title: "Check-out khách sạn & Dùng bữa trưa", desc: "Nghỉ ngơi, mua sắm đặc sản măng khô, nấm hương Tây Bắc.", status: "upcoming" },
          { time: "14:00", title: "Lên xe khởi hành về lại Hà Nội", desc: "Về đến Hà Nội khoảng 19:30, trả khách tại các điểm đón ban đầu.", status: "upcoming" }
        ]
      },
      guests: [
        { name: "Hoàng Văn Tuấn", phone: "0977 123 789", count: "4 Lớn", pickup: "Khách sạn Apricot Hoàn Kiếm", checked: false },
        { name: "Đỗ Bích Phương", phone: "0932 456 123", count: "2 Lớn", pickup: "36 Hàng Bông, Hoàn Kiếm", checked: false },
        { name: "Ngô Thế Vinh", phone: "0904 888 999", count: "5 Lớn", pickup: "Số 2 Hàng Tre, Hà Nội", checked: false },
        { name: "Nguyễn Hương Giang", phone: "0919 654 321", count: "3 Lớn", pickup: "Khách sạn Sofitel Metropole", checked: false }
      ]
    },
    {
      id: "dep-dn-3",
      tourId: "tour-3",
      title: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      code: "DEP-DN-1011",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      duration: "4N3Đ",
      daysCount: 4,
      dateRange: "10/11/2026 - 14/11/2026",
      departureTime: "08:00 10/11/2026",
      guestsCount: 22,
      maxGuests: 25,
      groupsCount: 7,
      pickupLocation: "Cột 05 - Ga Đến Quốc Nội Sân Bay Đà Nẵng",
      progressStatus: "upcoming",
      busInfo: "43B - 029.35 (Thaco Universe 35 chỗ)",
      driverInfo: "Bác Quang - 0905 112 233",
      hotelInfo: "Khách sạn Mường Thanh Luxury Biển Mỹ Khê 4 Sao",
      operatorInfo: "0944 556 677 (Mr. Minh Trí)",
      specialNotes: "Có 3 khách người lớn tuổi cần phòng gần thang máy. 1 gia đình có sinh nhật vào tối ngày 11/11.",
      schedule: {
        1: [
          { time: "08:00", title: "Đón đoàn tại Sân Bay Đà Nẵng", desc: "Tập trung đón các chuyến bay từ Hà Nội & TP.HCM, đưa về khách sạn nhận phòng.", status: "upcoming" },
          { time: "14:30", title: "Bán đảo Sơn Trà & Viếng Chùa Linh Ứng", desc: "Chiêm bái tượng Phật Bà Quán Thế Âm cao 67m ngắm toàn cảnh vịnh Đà Nẵng.", status: "upcoming" },
          { time: "18:00", title: "Khám phá Phố cổ Hội An về đêm", desc: "Thả hoa đăng trên sông Hoài, thưởng thức cao lầu, mì Quảng nức tiếng.", status: "upcoming" }
        ],
        2: [
          { time: "08:00", title: "Thiên đường vui chơi Sun World Bà Nà Hills", desc: "Trải nghiệm cáp treo đạt 4 kỷ lục thế giới, check-in Cầu Vàng bàn tay khổng lồ.", status: "upcoming" },
          { time: "12:00", title: "Bữa trưa Buffet thượng hạng tại Làng Pháp", desc: "Thưởng thức hơn 100 món ăn phong phú đa quốc gia.", status: "upcoming" },
          { time: "18:30", title: "Bữa tối hải sản biển Mỹ Khê & Xem Cầu Rồng phun lửa", desc: "Tiệc hải sản và ngắm Cầu Rồng biểu diễn phun lửa, phun nước vào tối cuối tuần.", status: "upcoming" }
        ],
        3: [
          { time: "08:30", title: "Danh thắng Ngũ Hành Sơn & Làng đá Non Nước", desc: "Khám phá động Huyền Không, Vọng Giang Đài và nghệ thuật điêu khắc đá tinh xảo.", status: "upcoming" },
          { time: "15:00", title: "Tự do tắm biển Mỹ Khê hoặc trải nghiệm lặn biển", desc: "Thư giãn tại bãi biển được tạp chí Forbes vinh danh đẹp hàng đầu hành tinh.", status: "upcoming" }
        ],
        4: [
          { time: "08:00", title: "Chợ Hàn mua sắm đặc sản & Tiễn sân bay", desc: "Mua sắm chả bò Đà Nẵng, hải sản khô làm quà và xe đưa đoàn ra sân bay Đà Nẵng.", status: "upcoming" }
        ]
      },
      guests: [
        { name: "Trịnh Gia Huy", phone: "0912 999 111", count: "4 Lớn", pickup: "Chuyến bay VN123 đến lúc 08:15", checked: false },
        { name: "Lê Thị Mai Khanh", phone: "0983 456 789", count: "3 Lớn, 1 Trẻ", pickup: "Chuyến bay VJ628 đến lúc 08:30", checked: false },
        { name: "Phạm Quốc Tuấn", phone: "0908 777 666", count: "2 Lớn", pickup: "Đón tại khách sạn Novotel Đà Nẵng", checked: false }
      ]
    },
    {
      id: "dep-pq-4",
      tourId: "tour-4",
      title: "Thiên Đường Biển Đảo Phú Quốc - Sunset Town 3N2Đ",
      code: "DEP-PQ-1811",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      duration: "3N2Đ",
      daysCount: 3,
      dateRange: "18/11/2026 - 21/11/2026",
      departureTime: "09:00 18/11/2026",
      guestsCount: 20,
      maxGuests: 30,
      groupsCount: 5,
      pickupLocation: "Sân Bay Quốc Tế Phú Quốc",
      progressStatus: "upcoming",
      busInfo: "68B - 018.89 (Universe 35 chỗ sang trọng)",
      driverInfo: "Bác Lâm - 0939 445 566",
      hotelInfo: "Resort Sunset Beach & Spa 4 Sao Trần Hưng Đạo",
      operatorInfo: "0944 556 677 (Mr. Minh Trí)",
      specialNotes: "Có 2 khách dị ứng tôm cua biển, đã báo trước nhà hàng chuẩn bị set thịt bò & gà.",
      schedule: {
        1: [
          { time: "09:00", title: "Đón khách tại Sân Bay Phú Quốc", desc: "Xe đưa đoàn về Resort nhận phòng, nghỉ ngơi sau chuyến bay.", status: "upcoming" },
          { time: "14:30", title: "Thị trấn Hoàng Hôn Sunset Town & Cầu Hôn", desc: "Chiêm ngưỡng kiến trúc Địa Trung Hải rực rỡ và check-in Cầu Hôn Kiss Bridge.", status: "upcoming" },
          { time: "18:30", title: "Bữa tối hải sản Hàm Ninh & Chợ đêm Phú Quốc", desc: "Thưởng thức ghẹ Hàm Ninh chắc thịt và dạo chơi chợ đêm sôi động.", status: "upcoming" }
        ],
        2: [
          { time: "08:00", title: "Cano khám phá 4 đảo & Lặn ngắm san hô", desc: "Tham quan Hòn Móng Tay, Hòn Gầm Ghì, Hòn Mây Rút và chụp ảnh SUP flycam.", status: "upcoming" },
          { time: "14:00", title: "Cáp treo vượt biển Hòn Thơm & Công viên nước", desc: "Trải nghiệm cáp treo vượt biển 7.899m ngắm toàn cảnh Nam đảo ngọc tuyệt mỹ.", status: "upcoming" }
        ],
        3: [
          { time: "08:00", title: "Vườn tiêu Suối Đá & Nhà thùng nước mắm truyền thống", desc: "Khám phá nghề làm nước mắm trứ danh Phú Quốc và mua quà lưu niệm.", status: "upcoming" },
          { time: "11:30", title: "Check-out & Xe tiễn đoàn ra sân bay Phú Quốc", desc: "Chào tạm biệt đảo ngọc, kết thúc kỳ nghỉ dưỡng tuyệt vời.", status: "upcoming" }
        ]
      },
      guests: [
        { name: "Võ Hoàng Yến", phone: "0917 888 222", count: "4 Lớn", pickup: "Sân bay Phú Quốc 09:15", checked: false },
        { name: "Đặng Tiến Dũng", phone: "0909 333 444", count: "2 Lớn, 2 Trẻ", pickup: "Sân bay Phú Quốc 09:30", checked: false }
      ]
    },
    {
      id: "dep-nb-5",
      tourId: "tour-5",
      title: "Ninh Bình Tràng An - Bái Đính - Hang Múa 1 Ngày",
      code: "DEP-NB-2511",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      duration: "1 Ngày",
      daysCount: 1,
      dateRange: "25/11/2026 - 25/11/2026",
      departureTime: "07:30 25/11/2026",
      guestsCount: 16,
      maxGuests: 20,
      groupsCount: 4,
      pickupLocation: "Nhà Hát Lớn & Phố Cổ Hà Nội",
      progressStatus: "upcoming",
      busInfo: "29B - 555.22 (Samco 29 chỗ)",
      driverInfo: "Bác Tuấn - 0912 888 444",
      hotelInfo: "Không lưu trú (Tour trong ngày)",
      operatorInfo: "0911 223 344 (Ms. Thu Hà)",
      specialNotes: "Khách đi Hang Múa cần giày thể thao thoải mái. Đã bao gồm vé thuyền Tràng An & xe điện Bái Đính.",
      schedule: {
        1: [
          { time: "07:30", title: "Đón khách tại Hà Nội khởi hành đi Ninh Bình", desc: "Xe đón khách tại điểm hẹn trung tâm và phố cổ Hà Nội, khởi hành theo cao tốc Pháp Vân.", status: "upcoming" },
          { time: "10:00", title: "Chiêm bái Quần thể Chùa Bái Đính", desc: "Viếng ngôi chùa nắm giữ nhiều kỷ lục nhất Đông Nam Á bằng xe điện hiện đại.", status: "upcoming" },
          { time: "12:30", title: "Bữa trưa Buffet Dê núi & Cơm cháy Ninh Bình", desc: "Thưởng thức ẩm thực dê núi đặc sản nức tiếng cố đô.", status: "upcoming" },
          { time: "14:00", title: "Du ngoạn Di sản Thế giới Tràng An bằng thuyền nan", desc: "Thuyền chèo đưa khách luồn qua các hang động kỳ thú: Hang Sáng, Hang Tối, Hang Nấu Rượu.", status: "upcoming" },
          { time: "16:00", title: "Chinh phục đỉnh Ngọa Long Núi Múa", desc: "Leo 500 bậc thang ngắm trọn vẹn thung lũng Tam Cốc từ trên cao.", status: "upcoming" },
          { time: "17:30", title: "Lên xe khởi hành về lại Hà Nội", desc: "Về đến Hà Nội lúc 19:30, trả khách tại điểm hẹn ban đầu.", status: "upcoming" }
        ]
      },
      guests: [
        { name: "Trần Anh Quân", phone: "0982 111 555", count: "4 Lớn", pickup: "Số 1 Tràng Tiền, Hoàn Kiếm", checked: false },
        { name: "Nguyễn Thảo Ly", phone: "0945 666 777", count: "2 Lớn", pickup: "Khách sạn Pan Pacific Ba Đình", checked: false }
      ]
    }
  ];

  let currentTour = assignedTours[0];
  let currentSelectedDay = 1;

  const stepKeys = ['upcoming', 'preparing', 'pickup', 'inprogress', 'completed'];
  const stepLabels = {
    upcoming: 'Sắp diễn ra',
    preparing: 'Chuẩn bị đoàn',
    pickup: 'Đang đón khách',
    inprogress: 'Đang diễn ra',
    completed: 'Hoàn thành tour'
  };

  // Render Stepper for Active Tour
  function renderStepper(currentStep) {
    if (!stepperContainer) return;
    const currentIndex = stepKeys.indexOf(currentStep);
    const progressPercent = (currentIndex / (stepKeys.length - 1)) * 100;

    stepperContainer.innerHTML = `
      <div class="progress-line-fill" style="width: ${progressPercent}%;"></div>
      ${stepKeys.map((step, idx) => {
        let stateClass = '';
        if (idx < currentIndex) stateClass = 'completed';
        else if (idx === currentIndex) stateClass = 'active';

        return `
          <div class="step-item ${stateClass}" onclick="updateTourProgress('${step}')">
            <div class="step-circle">
              ${idx < currentIndex ? '<i class="fa-solid fa-check"></i>' : (idx + 1)}
            </div>
            <span class="step-title">${stepLabels[step]}</span>
          </div>
        `;
      }).join('')}
    `;

    const statusBadge = document.getElementById('currentTourStatusBadge');
    if (statusBadge) {
      statusBadge.textContent = stepLabels[currentStep];
      if (currentStep === 'inprogress') {
        statusBadge.className = 'badge badge-warning';
      } else if (currentStep === 'completed') {
        statusBadge.className = 'badge badge-success';
      } else {
        statusBadge.className = 'badge badge-info';
      }
    }
  }

  // Update UI Elements with Active Tour Data
  function updateActiveTourUI() {
    // Header & KPIs
    const headerTitle = document.getElementById('activeTourHeaderTitle');
    const depTime = document.getElementById('activeTourDepartureTime');
    const kpiDur = document.getElementById('kpiDuration');
    const kpiTitle = document.getElementById('kpiTourTitle');
    const kpiGuests = document.getElementById('kpiGuests');
    const kpiGroups = document.getElementById('kpiGroups');

    if (headerTitle) headerTitle.textContent = `${currentTour.title} (${currentTour.dateRange.split(' - ')[0]})`;
    if (depTime) depTime.innerHTML = `<i class="fa-solid fa-clock"></i> Khởi hành: ${currentTour.departureTime}`;
    if (kpiDur) kpiDur.textContent = currentTour.duration;
    if (kpiTitle) kpiTitle.textContent = currentTour.title.split(' - ')[0];
    if (kpiGuests) kpiGuests.textContent = `${currentTour.guestsCount} Khách`;
    if (kpiGroups) kpiGroups.textContent = `${currentTour.groupsCount} Nhóm Đặt Tour`;

    // Logistics Row
    const busEl = document.getElementById('scheduleBusInfo');
    const driverEl = document.getElementById('scheduleDriverInfo');
    const hotelEl = document.getElementById('scheduleHotelInfo');
    if (busEl) busEl.textContent = currentTour.busInfo;
    if (driverEl) driverEl.textContent = currentTour.driverInfo;
    if (hotelEl) hotelEl.textContent = currentTour.hotelInfo;

    // Stepper
    renderStepper(currentTour.progressStatus || 'preparing');

    // Day Tabs & Timeline
    renderScheduleDayTabs();
    renderTimelineSchedule(currentSelectedDay);

    // Table rows highlight
    renderAssignedToursTable();
  }

  // Render Day Tabs for Schedule
  function renderScheduleDayTabs() {
    const tabsContainer = document.getElementById('scheduleDayTabsContainer');
    if (!tabsContainer) return;

    let tabsHtml = '';
    for (let day = 1; day <= currentTour.daysCount; day++) {
      tabsHtml += `
        <button type="button" class="tour-day-tab ${day === currentSelectedDay ? 'active' : ''}" onclick="selectScheduleDay(${day})">
          Ngày ${day}
        </button>
      `;
    }
    tabsContainer.innerHTML = tabsHtml;
  }

  // Render Schedule Timeline for Selected Day
  function renderTimelineSchedule(dayNum) {
    const timelineContainer = document.getElementById('timelineScheduleContainer');
    if (!timelineContainer) return;

    const items = currentTour.schedule[dayNum] || currentTour.schedule[1] || [];
    if (!items.length) {
      timelineContainer.innerHTML = '<p class="text-muted" style="padding:20px 0;">Chưa có lịch trình chi tiết cho ngày này.</p>';
      return;
    }

    timelineContainer.innerHTML = items.map((item, idx) => `
      <div class="timeline-item ${item.status || ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div style="flex:1;">
            <div class="timeline-time"><i class="fa-regular fa-clock"></i> ${item.time}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-desc">${item.desc}</div>
          </div>
          <div>
            ${item.status === 'completed' 
              ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Đã hoàn thành</span>' 
              : item.status === 'active'
                ? '<span class="badge badge-warning"><i class="fa-solid fa-spinner fa-spin"></i> Đang diễn ra</span>'
                : '<span class="badge badge-secondary">Sắp tới</span>'}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Assigned Tours Table Body
  function renderAssignedToursTable() {
    if (!tableBody) return;

    tableBody.innerHTML = assignedTours.map(t => {
      const isActive = t.id === currentTour.id;
      return `
        <tr style="${isActive ? 'background-color: var(--primary-50);' : ''}">
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${t.image}" alt="${t.title}" style="width:55px; height:42px; border-radius:var(--radius-sm); object-fit:cover;">
              <div>
                <strong style="display:block; font-size:0.92rem; color:${isActive ? 'var(--primary)' : 'var(--text-main)'};">
                  ${t.title} ${isActive ? '<span class="badge badge-primary" style="font-size:0.68rem; margin-left:6px;"><i class="fa-solid fa-circle-check"></i> Đang chọn</span>' : ''}
                </strong>
                <span class="text-muted" style="font-size:0.75rem;"><i class="fa-solid fa-barcode"></i> Mã: ${t.code} • Điểm đón: ${t.pickupLocation.split('(')[0]}</span>
              </div>
            </div>
          </td>
          <td>
            <strong class="text-primary">${t.dateRange}</strong>
            <span class="text-muted" style="display:block; font-size:0.75rem;"><i class="fa-regular fa-clock"></i> ${t.departureTime.split(' ')[0]}</span>
          </td>
          <td>
            <span class="badge ${t.guestsCount >= t.maxGuests ? 'badge-warning' : 'badge-info'}">
              <i class="fa-solid fa-users"></i> ${t.guestsCount} / ${t.maxGuests} Khách
            </span>
          </td>
          <td>
            <span class="badge ${t.progressStatus === 'inprogress' ? 'badge-warning' : t.progressStatus === 'completed' ? 'badge-success' : 'badge-neutral'}">
              ${stepLabels[t.progressStatus] || 'Sắp diễn ra'}
            </span>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
              ${!isActive ? `
                <button class="btn btn-primary btn-sm" onclick="setActiveTourById('${t.id}')">
                  <i class="fa-solid fa-bullseye"></i> Chọn Điều Hành
                </button>
              ` : `
                <button class="btn btn-success btn-sm" disabled style="opacity:1;">
                  <i class="fa-solid fa-check"></i> Đang Chọn
                </button>
              `}
              <button class="btn btn-outline btn-sm" onclick="openTourDetailModal('${t.id}')" title="Xem Chi Tiết">
                <i class="fa-regular fa-eye"></i> Chi Tiết
              </button>
              <button class="btn btn-outline btn-sm text-primary" onclick="openGuestRosterModal('${t.id}')" title="Danh Sách Đoàn">
                <i class="fa-solid fa-clipboard-user"></i> Đoàn Khách
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Global Function Exposing
  window.setActiveTourById = (tourId) => {
    const found = assignedTours.find(t => t.id === tourId);
    if (found) {
      currentTour = found;
      currentSelectedDay = 1;
      updateActiveTourUI();
      showToast(`Đã chuyển sang quản lý tour: ${currentTour.title}!`, 'info');
    }
  };

  window.selectScheduleDay = (dayNum) => {
    currentSelectedDay = dayNum;
    renderScheduleDayTabs();
    renderTimelineSchedule(dayNum);
  };

  window.updateTourProgress = (newStep) => {
    currentTour.progressStatus = newStep;
    renderStepper(newStep);
    renderAssignedToursTable();
    showToast(`Đã cập nhật tiến độ tour: ${stepLabels[newStep]}!`, 'success');
  };

  window.openTourDetailModal = (tourId) => {
    const targetTour = tourId ? assignedTours.find(t => t.id === tourId) || currentTour : currentTour;
    const bodyEl = document.getElementById('modalTourDetailBody');
    if (!bodyEl) return;

    bodyEl.innerHTML = `
      <div style="display:flex; gap:16px; margin-bottom:20px; align-items:flex-start; flex-wrap:wrap;">
        <img src="${targetTour.image}" alt="${targetTour.title}" style="width:140px; height:95px; border-radius:var(--radius-md); object-fit:cover;">
        <div style="flex:1; min-width:260px;">
          <span class="badge badge-primary" style="margin-bottom:6px;">Mã đoàn: ${targetTour.code}</span>
          <h4 style="font-size:1.15rem; margin:0 0 6px;">${targetTour.title}</h4>
          <p class="text-muted" style="font-size:0.85rem; margin:0;"><i class="fa-regular fa-calendar-check text-primary"></i> ${targetTour.dateRange} • ${targetTour.duration}</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:20px; background:var(--surface-alt); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border);">
        <div style="font-size:0.85rem;">
          <span class="text-muted" style="display:block; font-size:0.75rem;"><i class="fa-solid fa-bus text-primary"></i> Xe & Biển số:</span>
          <strong>${targetTour.busInfo}</strong>
        </div>
        <div style="font-size:0.85rem;">
          <span class="text-muted" style="display:block; font-size:0.75rem;"><i class="fa-solid fa-id-badge text-primary"></i> Lái xe phụ trách:</span>
          <strong>${targetTour.driverInfo}</strong>
        </div>
        <div style="font-size:0.85rem;">
          <span class="text-muted" style="display:block; font-size:0.75rem;"><i class="fa-solid fa-hotel text-primary"></i> Khách sạn / Du thuyền:</span>
          <strong>${targetTour.hotelInfo}</strong>
        </div>
        <div style="font-size:0.85rem;">
          <span class="text-muted" style="display:block; font-size:0.75rem;"><i class="fa-solid fa-headset text-success"></i> Điều hành quản lý:</span>
          <strong>${targetTour.operatorInfo}</strong>
        </div>
      </div>

      <div style="margin-bottom:18px;">
        <h5 style="font-size:0.95rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-triangle-exclamation text-warning"></i> Lưu Ý & Yêu Cầu Đặc Biệt Của Khách Hàng:
        </h5>
        <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:var(--radius-md); padding:12px 16px; font-size:0.88rem; color:#92400E; line-height:1.5;">
          ${targetTour.specialNotes}
        </div>
      </div>

      <div>
        <h5 style="font-size:0.95rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-map-location-dot text-primary"></i> Điểm Tập Trung & Đón Khách:
        </h5>
        <p style="font-size:0.88rem; color:var(--text-main); margin:0; background:var(--surface-alt); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border);">
          <strong>${targetTour.pickupLocation}</strong> (HDV có mặt trước 30 phút để chuẩn bị biển đón và kiểm tra danh sách).
        </p>
      </div>
    `;

    openModal('modalTourDetailGuide');
  };

  window.openGuestRosterModal = (tourId) => {
    const targetTour = tourId ? assignedTours.find(t => t.id === tourId) || currentTour : currentTour;
    const titleEl = document.getElementById('modalRosterTitle');
    const summaryEl = document.getElementById('modalRosterSummary');
    const tbodyEl = document.getElementById('modalRosterTableBody');

    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-users-viewfinder text-primary"></i> Danh Sách Hành Khách: ${targetTour.title} (${targetTour.dateRange.split(' - ')[0]})`;
    if (summaryEl) summaryEl.innerHTML = `<strong>Tổng số khách: ${targetTour.guestsCount} khách</strong> (${targetTour.groupsCount} nhóm đặt tour)`;

    if (tbodyEl) {
      tbodyEl.innerHTML = targetTour.guests.map((g, idx) => `
        <tr>
          <td><strong>${g.name}</strong></td>
          <td><a href="tel:${g.phone.replace(/\\s/g, '')}" class="text-primary font-bold"><i class="fa-solid fa-phone"></i> ${g.phone}</a></td>
          <td><span class="badge badge-neutral">${g.count}</span></td>
          <td style="font-size:0.85rem;">${g.pickup}</td>
          <td style="text-align:center;">
            <button class="btn btn-sm ${g.checked ? 'btn-success' : 'btn-outline'}" onclick="toggleGuestCheckin(this, ${idx})">
              <i class="fa-solid ${g.checked ? 'fa-check' : 'fa-circle-check'}"></i> ${g.checked ? 'Đã Lên Xe' : 'Điểm danh'}
            </button>
          </td>
        </tr>
      `).join('');
    }

    openModal('modalGuestRoster');
  };

  window.toggleGuestCheckin = (btn, idx) => {
    if (btn.classList.contains('btn-success')) {
      btn.className = 'btn btn-sm btn-outline';
      btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Điểm danh';
      showToast('Đã hủy điểm danh hành khách.', 'info');
    } else {
      btn.className = 'btn btn-sm btn-success';
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã Lên Xe';
      showToast('Đã điểm danh hành khách lên xe thành công!', 'success');
    }
  };

  // Initial Boot
  updateActiveTourUI();
}

// ==========================================
// 16. MANAGER DASHBOARD LOGIC
// ==========================================

function initManagerDashboard() {
  const managerTourTable = document.getElementById('managerTourTable');
  const formAddTour = document.getElementById('formAddTour');
  const formAddDeparture = document.getElementById('formAddDeparture');
  if (!managerTourTable && !formAddTour && !formAddDeparture) return;

  const db = getMockDatabase();

  function renderManagerTours() {
    if (!managerTourTable) return;
    managerTourTable.innerHTML = db.tours.map(t => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${t.image}" style="width:50px; height:40px; object-fit:cover; border-radius:var(--radius-sm);" alt="${t.title}">
            <div>
              <strong style="display:block; font-size:0.9rem;">${t.title}</strong>
              <span class="text-muted" style="font-size:0.75rem;"><i class="fa-solid fa-location-dot"></i> ${t.location} • ${t.duration}</span>
            </div>
          </div>
        </td>
        <td><strong class="text-primary">${formatCurrency(t.price)}</strong></td>
        <td><span class="badge ${t.featured ? 'badge-warning' : 'badge-neutral'}">${t.featured ? 'Nổi bật' : 'Tiêu chuẩn'}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <a href="tour-detail.html?id=${t.id}" class="btn btn-outline btn-sm" title="Xem"><i class="fa-regular fa-eye"></i></a>
            <button class="btn btn-outline btn-sm text-danger" onclick="deleteTour('${t.id}')" title="Xóa"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.deleteTour = (tourId) => {
    if (confirm('Bạn có chắc chắn muốn xóa tour này khỏi hệ thống?')) {
      db.tours = db.tours.filter(t => t.id !== tourId);
      saveMockDatabase(db);
      renderManagerTours();
      showToast('Đã xóa tour thành công!', 'info');
    }
  };

  if (formAddTour) {
    formAddTour.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('newTourTitle').value.trim();
      const location = document.getElementById('newTourLocation').value.trim();
      const region = document.getElementById('newTourRegion').value;
      const duration = document.getElementById('newTourDuration').value.trim();
      const price = parseInt(document.getElementById('newTourPrice').value, 10);
      const desc = document.getElementById('newTourDesc').value.trim();
      const img = document.getElementById('newTourImage').value.trim() || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';

      const newTour = {
        id: `tour-${Date.now()}`,
        title,
        location,
        region,
        theme: 'nature',
        duration,
        days: parseInt(duration) || 3,
        rating: 5.0,
        reviewsCount: 0,
        price,
        image: img,
        featured: false,
        popular: true,
        topRated: false,
        maxGuests: 20,
        description: desc
      };

      db.tours.unshift(newTour);
      saveMockDatabase(db);
      renderManagerTours();
      closeModal('modalAddTour');
      formAddTour.reset();
      showToast('Đã thêm tour mới thành công!', 'success');
    });
  }

  if (formAddDeparture) {
    formAddDeparture.addEventListener('submit', (e) => {
      e.preventDefault();
      const tourId = document.getElementById('depTourSelect').value;
      const depDate = document.getElementById('depStartDate').value;
      const guideId = document.getElementById('depGuideSelect').value;
      const slots = parseInt(document.getElementById('depSlots').value, 10);
      const price = parseInt(document.getElementById('depPrice').value, 10);

      const matchedTour = db.tours.find(t => t.id === tourId);
      const matchedGuide = db.users.find(u => u.id === guideId);

      const newDep = {
        id: `dep-${Date.now()}`,
        tourId,
        tourTitle: matchedTour ? matchedTour.title : 'Tour Mới',
        date: depDate,
        returnDate: 'Theo lịch trình',
        slots: slots,
        maxSlots: slots,
        status: 'Available',
        statusText: 'Còn chỗ',
        badgeClass: 'badge-available',
        price: price,
        guideId: guideId,
        guideName: matchedGuide ? matchedGuide.name : 'Chưa phân công',
        progressStatus: 'upcoming'
      };

      db.departures.unshift(newDep);
      saveMockDatabase(db);
      closeModal('modalAddDeparture');
      formAddDeparture.reset();
      showToast('Đã tạo lịch khởi hành & phân công HDV thành công!', 'success');
    });
  }

  renderManagerTours();
}

// ==========================================
// 17. ADMIN DASHBOARD LOGIC
// ==========================================

function initAdminDashboard() {
  const adminUsersTable = document.getElementById('adminUsersTable');
  const adminReviewsTable = document.getElementById('adminReviewsTable');
  if (!adminUsersTable && !adminReviewsTable) return;

  const db = getMockDatabase();

  function renderAdminUsers() {
    if (!adminUsersTable) return;
    adminUsersTable.innerHTML = db.users.map(u => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;" alt="${u.name}">
            <div>
              <strong>${u.name}</strong>
              <span class="text-muted" style="display:block; font-size:0.75rem;">${u.email}</span>
            </div>
          </div>
        </td>
        <td>
          <select class="form-control form-control-sm" style="font-size:0.8rem; padding:4px 8px;" onchange="changeUserRole('${u.id}', this.value)">
            <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Khách Hàng</option>
            <option value="guide" ${u.role === 'guide' ? 'selected' : ''}>Hướng Dẫn Viên</option>
            <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Quản Lý Tour</option>
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Quản Trị Viên</option>
          </select>
        </td>
        <td>
          <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">
            ${u.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
          </span>
        </td>
        <td>
          <button class="btn btn-outline btn-sm ${u.status === 'active' ? 'text-danger' : 'text-success'}" onclick="toggleUserStatus('${u.id}')">
            ${u.status === 'active' ? '<i class="fa-solid fa-lock"></i> Khóa' : '<i class="fa-solid fa-lock-open"></i> Mở khóa'}
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderAdminReviews() {
    if (!adminReviewsTable) return;
    adminReviewsTable.innerHTML = db.reviews.map(r => `
      <tr>
        <td>
          <strong>${r.userName}</strong>
          <span class="text-muted" style="display:block; font-size:0.75rem;">${r.tourTitle}</span>
        </td>
        <td>
          <div class="text-warning" style="font-size:0.8rem;">
            ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          </div>
        </td>
        <td style="max-width:300px; font-size:0.85rem;">"${r.comment}"</td>
        <td>
          <span class="badge ${r.status === 'approved' ? 'badge-success' : 'badge-warning'}">
            ${r.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
          </span>
        </td>
        <td>
          ${r.status === 'approved' 
            ? `<button class="btn btn-outline btn-sm text-danger" onclick="toggleReviewStatus('${r.id}', 'pending')"><i class="fa-regular fa-eye-slash"></i> Ẩn</button>` 
            : `<button class="btn btn-outline btn-sm text-success" onclick="toggleReviewStatus('${r.id}', 'approved')"><i class="fa-solid fa-check"></i> Duyệt</button>`}
        </td>
      </tr>
    `).join('');
  }

  window.changeUserRole = (userId, newRole) => {
    const user = db.users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      saveMockDatabase(db);
      showToast(`Đã thay đổi vai trò của ${user.name} thành "${newRole}"!`, 'success');
      renderRoleBasedNav();
    }
  };

  window.toggleUserStatus = (userId) => {
    const user = db.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'active' ? 'inactive' : 'active';
      saveMockDatabase(db);
      renderAdminUsers();
      showToast(`Đã ${user.status === 'active' ? 'kích hoạt lại' : 'tạm khóa'} tài khoản ${user.name}!`, 'info');
    }
  };

  window.toggleReviewStatus = (reviewId, newStatus) => {
    const rev = db.reviews.find(r => r.id === reviewId);
    if (rev) {
      rev.status = newStatus;
      saveMockDatabase(db);
      renderAdminReviews();
      showToast(`Đã cập nhật trạng thái đánh giá thành "${newStatus === 'approved' ? 'Đã duyệt' : 'Đã ẩn'}"!`, 'success');
    }
  };

  renderAdminUsers();
  renderAdminReviews();
}

// ==========================================
// 18. GLOBAL DROPDOWN & PAGE INITIALIZATION
// ==========================================

// Global dropdown click & outside click handler
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('#userDropdownToggle, .user-profile-btn, .user-avatar-btn');
  const wrapper = e.target.closest('.user-dropdown-wrapper');
  
  if (toggleBtn) {
    e.preventDefault();
    e.stopPropagation();
    const currentWrapper = toggleBtn.closest('.user-dropdown-wrapper');
    if (currentWrapper) {
      const isCurrentlyActive = currentWrapper.classList.contains('active');
      document.querySelectorAll('.user-dropdown-wrapper.active').forEach(w => w.classList.remove('active'));
      if (!isCurrentlyActive) {
        currentWrapper.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
    return;
  }

  // If clicked inside dropdown menu on a link or button, close dropdown
  if (e.target.closest('.dropdown-item')) {
    document.querySelectorAll('.user-dropdown-wrapper.active').forEach(w => {
      w.classList.remove('active');
      const btn = w.querySelector('#userDropdownToggle, .user-profile-btn, .user-avatar-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    return;
  }

  // If clicked outside any dropdown wrapper, close all dropdowns
  if (!wrapper) {
    document.querySelectorAll('.user-dropdown-wrapper.active').forEach(w => {
      w.classList.remove('active');
      const btn = w.querySelector('#userDropdownToggle, .user-profile-btn, .user-avatar-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});

// Modal close button delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]')) {
    const modal = e.target.closest('.modal-backdrop');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Auto-run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderRoleBasedNav();
  initHomePageSearch();
  initToursPage();
  initTourDetailPage();
  initBookingPage();
  initPaymentPage();
  initPaymentResultPage();
  initBookingHistoryPage();
  initProfilePage();
  initLoginPage();
  initGuideDashboard();
  initManagerDashboard();
  initAdminDashboard();
});


