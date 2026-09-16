/**
 * BOOKING TOUR - TOURS BROWSING, SEARCH & DETAIL LOGIC
 */

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

function initToursPage() {
  const toursGrid = document.getElementById('toursListContainer');
  if (!toursGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get('search') || '';

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
      if (keyword) {
        const matchTitle = tour.title.toLowerCase().includes(keyword);
        const matchLocation = tour.location.toLowerCase().includes(keyword);
        const matchDesc = tour.description.toLowerCase().includes(keyword);
        if (!matchTitle && !matchLocation && !matchDesc) return false;
      }

      if (currentRegion !== 'all' && tour.region !== currentRegion) return false;
      if (tour.price > maxPrice) return false;

      if (selectedDurations.length > 0) {
        const matchesDuration = selectedDurations.some(dur => {
          if (dur === '1' && tour.days === 1) return true;
          if (dur === '2-3' && (tour.days === 2 || tour.days === 3)) return true;
          if (dur === '4+' && tour.days >= 4) return true;
          return false;
        });
        if (!matchesDuration) return false;
      }

      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        if (tour.rating < minRating) return false;
      }

      return true;
    });

    if (sortVal === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

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

  if (inputSearch) inputSearch.addEventListener('input', () => filterAndRenderTours());
  if (priceSlider && priceValueDisplay) {
    priceSlider.addEventListener('input', () => {
      priceValueDisplay.textContent = formatCurrency(parseInt(priceSlider.value, 10));
      filterAndRenderTours();
    });
  }
  if (sortSelect) sortSelect.addEventListener('change', () => filterAndRenderTours());
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

  filterAndRenderTours();
}

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
      const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      if (!currentUser) {
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
