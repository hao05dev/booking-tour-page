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
  const scheduleListEl = document.getElementById('departureScheduleList');
  const monthTabsEl = document.getElementById('departureMonthTabs');
  const totalAmountEl = document.getElementById('totalAmount');
  const summaryDepartureRangeEl = document.getElementById('summaryDepartureRange');
  const summaryGuestsEl = document.getElementById('summaryGuests');
  const btnBookTour = document.getElementById('btnBookTour');

  if (!scheduleListEl || !btnBookTour) return;

  const db = getMockDatabase();
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTourId = urlParams.get('id') || 'tour-1';
  const currentTour = db.tours.find(t => t.id === requestedTourId) || db.tours[0];
  if (!currentTour) return;

  const departures = db.departures
    .filter(dep => dep.tourId === currentTour.id)
    .sort((a, b) => parseVnDate(a.date) - parseVnDate(b.date));

  let selectedDeparture = departures.find(dep => dep.status !== 'Sold Out' && dep.slots > 0) || departures[0] || null;
  let currentMonthFilter = 'all';
  let adults = 1;
  let children = 0;
  let infants = 0;

  function parseVnDate(value) {
    if (!value || value === 'Theo lịch trình') return Number.MAX_SAFE_INTEGER;
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  function getDateParts(value) {
    if (!value || value === 'Theo lịch trình') return { day: '--', month: '--', weekday: '' };
    const [day, month, year] = value.split('/').map(Number);
    const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(year, month - 1, day);
    return {
      day: String(day).padStart(2, '0'),
      month: String(month).padStart(2, '0'),
      year,
      weekday: weekdayLabels[date.getDay()]
    };
  }

  function getMonthKey(value) {
    const parts = getDateParts(value);
    return parts.year ? `${parts.year}-${parts.month}` : 'other';
  }

  function getMonthLabel(value) {
    const parts = getDateParts(value);
    return parts.year ? `Tháng ${Number(parts.month)} ${parts.year}` : 'Khác';
  }

  function getDepartureStatus(dep) {
    if (dep.status === 'Sold Out' || dep.slots <= 0) {
      return { text: 'Hết chỗ', className: 'sold-out' };
    }
    if (dep.status === 'Almost Full' || dep.slots <= 3) {
      return { text: `Chỉ còn ${dep.slots} chỗ`, className: 'almost-full' };
    }
    return { text: `Còn ${dep.slots} chỗ`, className: 'available' };
  }

  function updateTourHeader() {
    document.title = `${currentTour.title} - BookingTour`;

    const titleEl = document.getElementById('tourDetailTitle');
    const breadcrumbEl = document.getElementById('tourBreadcrumbCurrent');
    const codeEl = document.getElementById('tourCodeLabel');
    const ratingEl = document.getElementById('tourDetailRating');
    const reviewCountEl = document.getElementById('tourDetailReviewCount');
    const locationEl = document.getElementById('tourDetailLocation');
    const durationEl = document.getElementById('tourDetailDuration');
    const maxGuestsEl = document.getElementById('tourDetailMaxGuests');
    const mainImageEl = document.getElementById('tourMainImage');

    if (titleEl) titleEl.textContent = currentTour.title;
    if (breadcrumbEl) breadcrumbEl.textContent = currentTour.title;
    if (codeEl) codeEl.textContent = currentTour.id.toUpperCase();
    if (ratingEl) ratingEl.textContent = currentTour.rating || '5.0';
    if (reviewCountEl) reviewCountEl.textContent = `(${currentTour.reviewsCount || 0} đánh giá)`;
    if (locationEl) locationEl.textContent = currentTour.location;
    if (durationEl) durationEl.textContent = currentTour.duration;
    if (maxGuestsEl) maxGuestsEl.textContent = currentTour.maxGuests || 20;
    if (mainImageEl) {
      mainImageEl.src = currentTour.image;
      mainImageEl.alt = currentTour.title;
    }
  }

  function renderMonthTabs() {
    if (!monthTabsEl) return;
    const uniqueMonths = [];
    departures.forEach(dep => {
      const key = getMonthKey(dep.date);
      if (!uniqueMonths.some(item => item.key === key)) {
        uniqueMonths.push({ key, label: getMonthLabel(dep.date) });
      }
    });

    monthTabsEl.innerHTML = [
      `<button type="button" class="departure-month-tab ${currentMonthFilter === 'all' ? 'active' : ''}" data-month="all">Tất cả</button>`,
      ...uniqueMonths.map(month => `
        <button type="button" class="departure-month-tab ${currentMonthFilter === month.key ? 'active' : ''}" data-month="${month.key}">
          ${month.label}
        </button>
      `)
    ].join('');

    monthTabsEl.querySelectorAll('.departure-month-tab').forEach(button => {
      button.addEventListener('click', () => {
        currentMonthFilter = button.dataset.month || 'all';
        renderMonthTabs();
        renderDepartureRows();
      });
    });
  }

  function renderDepartureRows() {
    const visibleDepartures = departures.filter(dep => currentMonthFilter === 'all' || getMonthKey(dep.date) === currentMonthFilter);

    if (!visibleDepartures.length) {
      scheduleListEl.innerHTML = `
        <div class="departure-empty-state">
          <i class="fa-regular fa-calendar-xmark"></i>
          <strong>Chưa có lịch khởi hành trong khoảng này</strong>
          <span>Vui lòng chọn tháng khác hoặc liên hệ tư vấn.</span>
        </div>
      `;
      return;
    }

    scheduleListEl.innerHTML = visibleDepartures.map(dep => {
      const dateParts = getDateParts(dep.date);
      const status = getDepartureStatus(dep);
      const isSoldOut = status.className === 'sold-out';
      const isSelected = selectedDeparture && dep.id === selectedDeparture.id;

      return `
        <article class="departure-schedule-row ${isSelected ? 'selected' : ''} ${isSoldOut ? 'disabled' : ''}" data-departure-id="${dep.id}">
          <div class="departure-date-tile">
            <span>${dateParts.weekday}</span>
            <strong>${dateParts.day}/${dateParts.month}</strong>
          </div>

          <div class="departure-trip-info">
            <strong>${dep.date}${dep.returnDate && dep.returnDate !== 'Theo lịch trình' ? ` - ${dep.returnDate}` : ''}</strong>
            <span class="departure-confirmation ${status.className}">
              <i class="fa-solid fa-circle"></i> ${status.text}
            </span>
          </div>

          <div class="departure-row-price">
            <strong>${formatCurrency(dep.price)}</strong>
            <span>/ khách</span>
          </div>

          <button type="button"
                  class="departure-request-btn ${isSelected ? 'selected' : ''}"
                  data-select-departure="${dep.id}"
                  ${isSoldOut ? 'disabled' : ''}>
            ${isSoldOut
              ? 'Hết chỗ'
              : isSelected
                ? '<i class="fa-solid fa-check"></i> Đã chọn'
                : 'Yêu cầu'}
          </button>
        </article>
      `;
    }).join('');

    scheduleListEl.querySelectorAll('[data-select-departure]').forEach(button => {
      button.addEventListener('click', () => {
        const dep = departures.find(item => item.id === button.dataset.selectDeparture);
        if (!dep || dep.status === 'Sold Out' || dep.slots <= 0) return;
        selectedDeparture = dep;
        if ((adults + children + infants) > dep.slots) {
          adults = Math.min(adults, Math.max(1, dep.slots));
          children = 0;
          infants = 0;
        }
        renderDepartureRows();
        updateBookingPanel();
      });
    });
  }

  function updateBookingPanel() {
    const currentPrice = selectedDeparture ? selectedDeparture.price : currentTour.price;
    const childPrice = Math.round(currentPrice * 0.7);
    const total = (adults * currentPrice) + (children * childPrice);

    const adultCountEl = document.getElementById('adultCount');
    const childCountEl = document.getElementById('childCount');
    const infantCountEl = document.getElementById('infantCount');
    const adultUnitPriceEl = document.getElementById('adultUnitPrice');
    const childUnitPriceEl = document.getElementById('childUnitPrice');

    if (adultCountEl) adultCountEl.textContent = adults;
    if (childCountEl) childCountEl.textContent = children;
    if (infantCountEl) infantCountEl.textContent = infants;
    if (adultUnitPriceEl) adultUnitPriceEl.textContent = formatCurrency(currentPrice);
    if (childUnitPriceEl) childUnitPriceEl.textContent = formatCurrency(childPrice);
    if (totalAmountEl) totalAmountEl.textContent = formatCurrency(total);

    if (summaryDepartureRangeEl) {
      if (selectedDeparture) {
        summaryDepartureRangeEl.textContent = `${selectedDeparture.date}${selectedDeparture.returnDate && selectedDeparture.returnDate !== 'Theo lịch trình' ? ` - ${selectedDeparture.returnDate}` : ''} · ${currentTour.duration}`;
      } else {
        summaryDepartureRangeEl.textContent = 'Chưa có lịch khởi hành';
      }
    }

    if (summaryGuestsEl) {
      const guestParts = [`${adults} người lớn`];
      if (children) guestParts.push(`${children} trẻ em`);
      if (infants) guestParts.push(`${infants} em bé`);
      summaryGuestsEl.textContent = guestParts.join(' · ');
    }

    const minusAdult = document.getElementById('btnMinusAdult');
    const minusChild = document.getElementById('btnMinusChild');
    const minusInfant = document.getElementById('btnMinusInfant');
    if (minusAdult) minusAdult.disabled = adults <= 1;
    if (minusChild) minusChild.disabled = children <= 0;
    if (minusInfant) minusInfant.disabled = infants <= 0;

    const totalGuests = adults + children + infants;
    const maxGuests = Math.min(
      currentTour.maxGuests || 20,
      selectedDeparture && selectedDeparture.slots > 0 ? selectedDeparture.slots : currentTour.maxGuests || 20
    );

    const plusButtons = [
      document.getElementById('btnPlusAdult'),
      document.getElementById('btnPlusChild'),
      document.getElementById('btnPlusInfant')
    ];
    plusButtons.forEach(button => {
      if (button) button.disabled = totalGuests >= maxGuests;
    });

    btnBookTour.classList.toggle('disabled', !selectedDeparture || selectedDeparture.status === 'Sold Out');
    btnBookTour.setAttribute('aria-disabled', (!selectedDeparture || selectedDeparture.status === 'Sold Out') ? 'true' : 'false');

    const tourData = {
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      departureId: selectedDeparture ? selectedDeparture.id : null,
      date: selectedDeparture ? selectedDeparture.date : '',
      returnDate: selectedDeparture ? selectedDeparture.returnDate : '',
      adults,
      children,
      infants,
      pricePerAdult: currentPrice,
      pricePerChild: childPrice,
      totalAmount: total
    };
    localStorage.setItem('booking_draft', JSON.stringify(tourData));
  }

  function renderRelatedTours() {
    const container = document.getElementById('relatedToursContainer');
    if (!container) return;

    const related = db.tours
      .filter(tour => tour.id !== currentTour.id)
      .sort((a, b) => {
        const aSameRegion = a.region === currentTour.region ? 1 : 0;
        const bSameRegion = b.region === currentTour.region ? 1 : 0;
        if (aSameRegion !== bSameRegion) return bSameRegion - aSameRegion;
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 3);

    container.innerHTML = related.map(tour => {
      const ratingScore = ((tour.rating || 0) * 2).toFixed(1);
      return `
        <a class="related-tour-card" href="tour-detail.html?id=${tour.id}">
          <div class="related-tour-image">
            <img src="${tour.image}" alt="${tour.title}" loading="lazy">
            ${tour.featured ? '<span>Tour nổi bật</span>' : tour.popular ? '<span>Được yêu thích</span>' : ''}
          </div>
          <div class="related-tour-body">
            <div class="related-tour-rating">
              ${tour.reviewsCount
                ? `<strong>${ratingScore}</strong><span>Tuyệt vời</span><small>(${tour.reviewsCount})</small>`
                : '<span class="text-muted">Chưa có đánh giá</span>'}
            </div>
            <h3>${tour.title}</h3>
            <div class="related-tour-meta">
              <span><i class="fa-regular fa-clock"></i> ${tour.duration}</span>
              <span><i class="fa-solid fa-location-dot"></i> ${tour.location}</span>
            </div>
            <div class="related-tour-price">
              <span>Giá từ</span>
              <strong>${formatCurrency(tour.price)}</strong>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  function getDetailContent() {
    if (currentTour.id === 'tour-1') {
      return {
        highlights: [
          'Du thuyền 5 sao đẳng cấp với phòng hướng vịnh',
          'Khám phá Hang Sửng Sốt và chèo kayak Hang Luồn',
          'Sunset Party trên Sundeck và trải nghiệm câu mực đêm',
          'Trọn gói các bữa ăn chất lượng cao trong hành trình',
          'Bảo hiểm du lịch và hướng dẫn viên đồng hành'
        ],
        itinerary: [
          {
            day: 1,
            title: 'Hà Nội - Vịnh Hạ Long - Hang Sửng Sốt',
            meal: 'Trưa · Tối',
            image: currentTour.image,
            content: 'Xe đón khách tại trung tâm Hà Nội. Đến cảng Tuần Châu, làm thủ tục lên du thuyền, dùng buffet trưa và tham quan Hang Sửng Sốt. Buổi tối dùng Gala Dinner và trải nghiệm câu mực đêm.'
          },
          {
            day: 2,
            title: 'Đảo Ti Tốp - Hang Luồn - Sunset Party',
            meal: 'Sáng · Trưa · Tối',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
            content: 'Tập Thái Cực Quyền ngắm bình minh, tham quan đảo Ti Tốp, chèo kayak tại Hang Luồn và thưởng thức Sunset Party trên boong tàu.'
          },
          {
            day: 3,
            title: 'Làng Chài - Tuần Châu - Trở Về Hà Nội',
            meal: 'Sáng · Trưa',
            image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=500&q=80',
            content: 'Tham quan khu nuôi cấy ngọc trai, trả phòng, tham gia lớp nấu ăn và dùng bữa trưa sớm trước khi tàu cập bến Tuần Châu. Xe đưa đoàn trở lại Hà Nội.'
          }
        ]
      };
    }

    const itinerary = Array.from({ length: Math.max(1, currentTour.days || 1) }, (_, index) => ({
      day: index + 1,
      title: index === 0
        ? `Khởi hành - Khám phá ${currentTour.location}`
        : index === (currentTour.days || 1) - 1
          ? `${currentTour.location} - Kết thúc hành trình`
          : `Trải nghiệm nổi bật tại ${currentTour.location}`,
      meal: index === 0 ? 'Trưa · Tối' : 'Sáng · Trưa · Tối',
      image: currentTour.image,
      content: `${currentTour.description} Lịch trình chi tiết có thể được điều chỉnh theo điều kiện thực tế của từng chuyến khởi hành.`
    }));

    return {
      highlights: [
        currentTour.description,
        `Hành trình ${currentTour.duration} tại ${currentTour.location}`,
        'Lịch khởi hành linh hoạt với nhiều lựa chọn',
        'Hướng dẫn viên đồng hành theo từng chuyến'
      ],
      itinerary
    };
  }

  function renderTourInformation() {
    const detail = getDetailContent();
    const overviewEl = document.getElementById('tourOverviewContent');
    const itineraryEl = document.getElementById('tourItineraryContainer');
    const includesEl = document.getElementById('tourIncludesContent');
    const policyEl = document.getElementById('tourPolicyContent');

    if (overviewEl) {
      overviewEl.innerHTML = `
        <p class="tour-long-description">${currentTour.description}</p>
        <div class="tour-highlight-grid">
          ${detail.highlights.map(item => `<div><i class="fa-solid fa-check"></i><span>${item}</span></div>`).join('')}
        </div>
      `;
    }

    if (itineraryEl) {
      itineraryEl.innerHTML = detail.itinerary.map((item, index) => `
        <details class="itinerary-day-accordion" ${index === 0 ? 'open' : ''}>
          <summary>
            <img src="${item.image}" alt="Ngày ${item.day}">
            <div>
              <span>Ngày ${item.day}</span>
              <strong>${item.title}</strong>
              <small>${item.meal}</small>
            </div>
            <i class="fa-solid fa-chevron-down"></i>
          </summary>
          <div class="itinerary-day-content">${item.content}</div>
        </details>
      `).join('');
    }

    if (includesEl) {
      includesEl.innerHTML = `
        <div class="tour-inclusion-grid">
          <div>
            <h4><i class="fa-solid fa-circle-check text-success"></i> Giá tour bao gồm</h4>
            <ul>
              <li>Phương tiện di chuyển theo chương trình.</li>
              <li>Vé tham quan các điểm có trong lịch trình.</li>
              <li>Hướng dẫn viên theo đoàn và bảo hiểm du lịch.</li>
              <li>Các bữa ăn được nêu trong chương trình.</li>
            </ul>
          </div>
          <div>
            <h4><i class="fa-solid fa-circle-xmark text-danger"></i> Không bao gồm</h4>
            <ul>
              <li>Chi phí cá nhân và dịch vụ ngoài chương trình.</li>
              <li>Đồ uống, phụ thu phòng riêng nếu có.</li>
              <li>Chi phí phát sinh do thay đổi ngoài kế hoạch.</li>
            </ul>
          </div>
        </div>
      `;
    }

    if (policyEl) {
      policyEl.innerHTML = `
        <div class="tour-policy-note">
          <p><strong>Đổi / hủy:</strong> Điều kiện áp dụng phụ thuộc thời điểm xác nhận và chuyến khởi hành đã chọn.</p>
          <p><strong>Trẻ em:</strong> Giá trẻ em đang được tính ở mức 70% giá người lớn trong bản mô phỏng.</p>
          <p><strong>Lưu ý:</strong> Thứ tự điểm tham quan có thể thay đổi do thời tiết hoặc điều kiện vận hành nhưng vẫn đảm bảo các nội dung chính của tour.</p>
        </div>
      `;
    }

    const toggleAllButton = document.getElementById('btnToggleAllTourInfo');
    if (toggleAllButton) {
      toggleAllButton.addEventListener('click', () => {
        const accordions = Array.from(document.querySelectorAll('.tour-information-section > .tour-accordion-stack > .tour-accordion'));
        const shouldOpen = accordions.some(item => !item.open);
        accordions.forEach(item => { item.open = shouldOpen; });
        toggleAllButton.textContent = shouldOpen ? 'Thu gọn tất cả' : 'Mở tất cả';
      });
    }
  }

  function bindPassengerControls() {
    const actions = {
      btnMinusAdult: () => { if (adults > 1) adults -= 1; },
      btnPlusAdult: () => { adults += 1; },
      btnMinusChild: () => { if (children > 0) children -= 1; },
      btnPlusChild: () => { children += 1; },
      btnMinusInfant: () => { if (infants > 0) infants -= 1; },
      btnPlusInfant: () => { infants += 1; }
    };

    Object.entries(actions).forEach(([id, action]) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.addEventListener('click', () => {
        if (button.disabled) return;
        action();
        updateBookingPanel();
      });
    });

    const changeDateButton = document.getElementById('btnChangeDeparture');
    if (changeDateButton) {
      changeDateButton.addEventListener('click', () => {
        scheduleListEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  btnBookTour.addEventListener('click', (event) => {
    event.preventDefault();

    if (!selectedDeparture || selectedDeparture.status === 'Sold Out' || selectedDeparture.slots <= 0) {
      showToast('Vui lòng chọn một lịch khởi hành còn chỗ.', 'warning');
      return;
    }

    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!currentUser) {
      showToast('Vui lòng đăng nhập tài khoản Khách hàng để gửi yêu cầu đặt tour!', 'warning');
      setTimeout(() => {
        window.location.href = `login.html?redirect=${encodeURIComponent(`tour-detail.html?id=${currentTour.id}`)}`;
      }, 1000);
      return;
    }

    updateBookingPanel();
    window.location.href = 'booking.html';
  });

  updateTourHeader();
  renderMonthTabs();
  renderDepartureRows();
  renderRelatedTours();
  renderTourInformation();
  bindPassengerControls();
  updateBookingPanel();
}
