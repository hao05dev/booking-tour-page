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
    showToast('Đã chuyển sang vai trò: Khách vãng lai (Guest)', 'info');
    renderRoleBasedNav();
    updateDemoRoleSwitcherUI();
    if (redirect) window.location.href = 'index.html';
    return;
  }

  // Find demo user for the specified role
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
  showToast(`Đã chuyển vai trò: ${roleDisplayNames[roleName]} (${targetUser.name})`, 'success');
  renderRoleBasedNav();
  updateDemoRoleSwitcherUI();

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
  showToast('Đã đăng xuất thành công. Hiện tại đang là Khách vãng lai.', 'info');
  renderRoleBasedNav();
  updateDemoRoleSwitcherUI();
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
        <button class="user-avatar-btn" id="userDropdownToggle" aria-expanded="false">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${user.name}" class="nav-user-avatar">
          <span class="nav-user-name">${user.name}</span>
          ${roleBadges[user.role] || ''}
          <i class="fa-solid fa-chevron-down user-dropdown-icon"></i>
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

    toursGrid.innerHTML = filtered.map(tour => `
      <article class="tour-card">
        <div class="tour-card-image-wrap">
          <img src="${tour.image}" alt="${tour.title}" class="tour-card-img" loading="lazy">
          <div class="tour-card-badges">
            ${tour.featured ? '<span class="badge badge-warning"><i class="fa-solid fa-fire"></i> Nổi bật</span>' : ''}
            <span class="badge badge-neutral"><i class="fa-solid fa-location-dot"></i> ${tour.location}</span>
          </div>
          <button class="tour-wishlist-btn" aria-label="Yêu thích" onclick="toggleWishlist(this, '${tour.id}')">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div class="tour-card-body">
          <div class="tour-meta">
            <span class="tour-duration"><i class="fa-regular fa-clock"></i> ${tour.duration}</span>
            <span class="tour-rating"><i class="fa-solid fa-star text-warning"></i> <strong>${tour.rating}</strong> (${tour.reviewsCount})</span>
          </div>
          <h3 class="tour-title">
            <a href="tour-detail.html?id=${tour.id}">${tour.title}</a>
          </h3>
          <p class="tour-description">${tour.description}</p>
          <div class="tour-card-footer">
            <div class="tour-price-box">
              <span class="tour-price-label">Giá từ</span>
              <span class="tour-price-val">${formatCurrency(tour.price)}</span>
            </div>
            <a href="tour-detail.html?id=${tour.id}" class="btn btn-outline btn-sm">Chi tiết <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </article>
    `).join('');
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
      if (email.includes('guide')) matchedUser = db.users.find(u => u.role === 'guide');
      else if (email.includes('manager') || email.includes('admin')) matchedUser = db.users.find(u => u.role === 'manager');
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
  const guideRosterTable = document.getElementById('guideRosterTable');
  const stepperContainer = document.getElementById('tourProgressStepper');
  if (!guideRosterTable && !stepperContainer) return;

  const db = getMockDatabase();
  const currentDeparture = db.departures[0];

  const stepKeys = ['upcoming', 'preparing', 'pickup', 'inprogress', 'completed'];
  const stepLabels = {
    upcoming: 'Sắp diễn ra',
    preparing: 'Chuẩn bị đoàn',
    pickup: 'Đang đón khách',
    inprogress: 'Đang diễn ra',
    completed: 'Hoàn thành tour'
  };

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

  window.updateTourProgress = (newStep) => {
    currentDeparture.progressStatus = newStep;
    saveMockDatabase(db);
    renderStepper(newStep);
    showToast(`Đã cập nhật tiến độ tour: ${stepLabels[newStep]}!`, 'success');
  };

  renderStepper(currentDeparture.progressStatus || 'preparing');
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

