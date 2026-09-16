/**
 * BOOKING TOUR - MANAGER OPERATIONS CALENDAR
 * Month / Week / Day operations view built from db.departures.
 */

function initManagerCalendarPage() {
  const calendarRoot = document.getElementById('managerCalendarView');
  if (!calendarRoot) return;

  const db = getMockDatabase();
  const tours = Array.isArray(db.tours) ? db.tours : [];
  const departures = Array.isArray(db.departures) ? db.departures : [];
  const tourMap = new Map(tours.map(tour => [tour.id, tour]));

  const controls = {
    search: document.getElementById('calendarSearchInput'),
    tour: document.getElementById('calendarTourFilter'),
    guide: document.getElementById('calendarGuideFilter'),
    status: document.getElementById('calendarStatusFilter'),
    reset: document.getElementById('calendarResetFilters'),
    prev: document.getElementById('calendarPrevBtn'),
    next: document.getElementById('calendarNextBtn'),
    today: document.getElementById('calendarTodayBtn'),
    upcoming: document.getElementById('calendarUpcomingBtn'),
    periodTitle: document.getElementById('calendarPeriodTitle'),
    viewButtons: Array.from(document.querySelectorAll('[data-calendar-view]')),
    kpiDepartures: document.getElementById('calendarKpiDepartures'),
    kpiDeparturesSub: document.getElementById('calendarKpiDeparturesSub'),
    kpiTours: document.getElementById('calendarKpiTours'),
    kpiGuests: document.getElementById('calendarKpiGuests'),
    kpiCapacitySub: document.getElementById('calendarKpiCapacitySub'),
    kpiPeak: document.getElementById('calendarKpiPeak'),
    kpiPeakSub: document.getElementById('calendarKpiPeakSub'),
    navDepartureBadge: document.getElementById('calendarNavDepartureBadge'),
    navTourBadge: document.getElementById('calendarNavTourBadge')
  };

  const today = startOfDay(new Date());
  const nearest = getNearestUpcomingDepartureDate(departures, today) || today;
  const state = {
    view: 'month',
    focusDate: nearest,
    search: '',
    tourId: 'all',
    guideId: 'all',
    status: 'all'
  };

  populateFilters();
  bindEvents();
  updateSidebarBadges();
  render();

  function parseVnDate(value) {
    if (!value || typeof value !== 'string') return null;
    const [day, month, year] = value.split('/').map(Number);
    if (!day || !month || !year) return null;
    const parsed = new Date(year, month - 1, day);
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  }

  function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  function addDays(date, amount) {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return startOfDay(result);
  }

  function startOfWeek(date) {
    const result = startOfDay(date);
    const weekday = result.getDay();
    const mondayOffset = weekday === 0 ? -6 : 1 - weekday;
    return addDays(result, mondayOffset);
  }

  function endOfWeek(date) {
    return addDays(startOfWeek(date), 6);
  }

  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatVnDate(date) {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(date);
  }

  function formatWeekday(date, long = false) {
    return new Intl.DateTimeFormat('vi-VN', { weekday: long ? 'long' : 'short' }).format(date);
  }

  function titleCaseWeekday(date) {
    const text = formatWeekday(date, true);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function getNearestUpcomingDepartureDate(items, fromDate) {
    const candidates = items
      .map(dep => parseVnDate(dep.date))
      .filter(Boolean)
      .filter(date => date >= fromDate)
      .sort((a, b) => a - b);
    return candidates[0] || null;
  }

  function getDepartureRange(dep) {
    const start = parseVnDate(dep.date);
    const end = parseVnDate(dep.returnDate) || start;
    if (!start) return null;
    return { start, end: end < start ? start : end };
  }

  function departureOverlaps(dep, rangeStart, rangeEnd) {
    const range = getDepartureRange(dep);
    if (!range) return false;
    return range.start <= rangeEnd && range.end >= rangeStart;
  }

  function departureActiveOn(dep, date) {
    const range = getDepartureRange(dep);
    if (!range) return false;
    return range.start <= date && range.end >= date;
  }

  function getActivityType(dep, date) {
    const range = getDepartureRange(dep);
    if (!range) return 'running';
    if (sameDay(range.start, range.end) && sameDay(date, range.start)) return 'single';
    if (sameDay(date, range.start)) return 'start';
    if (sameDay(date, range.end)) return 'end';
    return 'running';
  }

  function getActivityLabel(type) {
    const labels = {
      start: 'Khởi hành',
      running: 'Đang tour',
      end: 'Kết thúc',
      single: 'Đi trong ngày'
    };
    return labels[type] || 'Đang tour';
  }

  function getStatusLabel(dep) {
    if (dep.statusText) return dep.statusText;
    if (Number(dep.slots) <= 0) return 'Hết chỗ';
    const ratio = Number(dep.maxSlots) > 0 ? Number(dep.slots) / Number(dep.maxSlots) : 1;
    if (ratio <= 0.2) return 'Sắp hết chỗ';
    return 'Còn chỗ';
  }

  function getStatusClass(dep) {
    if (dep.status === 'Sold Out' || Number(dep.slots) <= 0) return 'status-sold-out';
    if (dep.status === 'Almost Full') return 'status-almost-full';
    return 'status-available';
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function populateFilters() {
    if (controls.tour) {
      const current = controls.tour.value || 'all';
      controls.tour.innerHTML = '<option value="all">Tất cả tour</option>' + tours
        .filter(tour => tour.status !== 'inactive')
        .map(tour => `<option value="${escapeHtml(tour.id)}">${escapeHtml(tour.title)}</option>`)
        .join('');
      controls.tour.value = current;
    }

    if (controls.guide) {
      const guides = new Map();
      departures.forEach(dep => {
        if (dep.guideId && dep.guideName) guides.set(dep.guideId, dep.guideName);
      });
      controls.guide.innerHTML = '<option value="all">Tất cả HDV</option>' + Array.from(guides.entries())
        .sort((a, b) => a[1].localeCompare(b[1], 'vi'))
        .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
        .join('');
    }
  }

  function bindEvents() {
    controls.viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        state.view = button.dataset.calendarView;
        render();
      });
    });

    controls.prev?.addEventListener('click', () => navigate(-1));
    controls.next?.addEventListener('click', () => navigate(1));
    controls.today?.addEventListener('click', () => {
      state.focusDate = today;
      render();
    });
    controls.upcoming?.addEventListener('click', () => {
      const nextDate = getNearestUpcomingDepartureDate(getFilteredDepartures(false), today);
      if (nextDate) {
        state.focusDate = nextDate;
        render();
      } else {
        showToast('Không có lịch khởi hành sắp tới theo bộ lọc hiện tại.', 'info');
      }
    });

    controls.tour?.addEventListener('change', () => {
      state.tourId = controls.tour.value;
      render();
    });
    controls.guide?.addEventListener('change', () => {
      state.guideId = controls.guide.value;
      render();
    });
    controls.status?.addEventListener('change', () => {
      state.status = controls.status.value;
      render();
    });
    controls.search?.addEventListener('input', () => {
      state.search = controls.search.value.trim().toLowerCase();
      render();
    });
    controls.reset?.addEventListener('click', () => {
      state.search = '';
      state.tourId = 'all';
      state.guideId = 'all';
      state.status = 'all';
      if (controls.search) controls.search.value = '';
      if (controls.tour) controls.tour.value = 'all';
      if (controls.guide) controls.guide.value = 'all';
      if (controls.status) controls.status.value = 'all';
      render();
    });

    calendarRoot.addEventListener('click', event => {
      const dateTarget = event.target.closest('[data-calendar-date]');
      const openTourTarget = event.target.closest('[data-calendar-tour]');

      if (openTourTarget) {
        event.stopPropagation();
        window.location.href = 'manager-dashboard.html#sectionTours';
        return;
      }

      if (dateTarget) {
        const date = new Date(`${dateTarget.dataset.calendarDate}T00:00:00`);
        if (!Number.isNaN(date.getTime())) {
          state.focusDate = startOfDay(date);
          state.view = 'day';
          render();
        }
      }
    });

    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        controls.search?.focus();
      }
    });
  }

  function navigate(direction) {
    const next = new Date(state.focusDate);
    if (state.view === 'month') next.setMonth(next.getMonth() + direction, 1);
    if (state.view === 'week') next.setDate(next.getDate() + (7 * direction));
    if (state.view === 'day') next.setDate(next.getDate() + direction);
    state.focusDate = startOfDay(next);
    render();
  }

  function getFilteredDepartures(includeSearch = true) {
    return departures.filter(dep => {
      const tour = tourMap.get(dep.tourId);
      if (!tour) return false;
      if (state.tourId !== 'all' && dep.tourId !== state.tourId) return false;
      if (state.guideId !== 'all' && dep.guideId !== state.guideId) return false;
      if (state.status !== 'all' && dep.status !== state.status) return false;

      if (includeSearch && state.search) {
        const haystack = [tour.title, tour.location, dep.guideName, dep.date, dep.returnDate]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(state.search)) return false;
      }
      return true;
    });
  }

  function getVisibleRange() {
    if (state.view === 'week') {
      return { start: startOfWeek(state.focusDate), end: endOfWeek(state.focusDate) };
    }
    if (state.view === 'day') {
      return { start: startOfDay(state.focusDate), end: startOfDay(state.focusDate) };
    }
    return { start: startOfMonth(state.focusDate), end: endOfMonth(state.focusDate) };
  }

  function render() {
    controls.viewButtons.forEach(button => button.classList.toggle('active', button.dataset.calendarView === state.view));
    updatePeriodTitle();
    updateKpis();

    if (state.view === 'week') renderWeekView();
    else if (state.view === 'day') renderDayView();
    else renderMonthView();
  }

  function updatePeriodTitle() {
    if (!controls.periodTitle) return;
    if (state.view === 'month') {
      controls.periodTitle.textContent = `Tháng ${state.focusDate.getMonth() + 1}/${state.focusDate.getFullYear()}`;
      return;
    }
    if (state.view === 'week') {
      const start = startOfWeek(state.focusDate);
      const end = endOfWeek(state.focusDate);
      controls.periodTitle.textContent = `${formatShortDate(start)} – ${formatVnDate(end)}`;
      return;
    }
    controls.periodTitle.textContent = `${titleCaseWeekday(state.focusDate)}, ${formatVnDate(state.focusDate)}`;
  }

  function updateKpis() {
    const filtered = getFilteredDepartures();
    const visible = getVisibleRange();
    const inPeriod = filtered.filter(dep => departureOverlaps(dep, visible.start, visible.end));
    const uniqueTours = new Set(inPeriod.map(dep => dep.tourId));
    const guests = inPeriod.reduce((sum, dep) => sum + Math.max(0, Number(dep.maxSlots || 0) - Number(dep.slots || 0)), 0);
    const openSlots = inPeriod.reduce((sum, dep) => sum + Math.max(0, Number(dep.slots || 0)), 0);
    const peak = findPeakDay(inPeriod, visible.start, visible.end);

    if (controls.kpiDepartures) controls.kpiDepartures.textContent = inPeriod.length;
    if (controls.kpiDeparturesSub) controls.kpiDeparturesSub.textContent = inPeriod.length ? `${countStartingInPeriod(inPeriod, visible.start, visible.end)} chuyến khởi hành trong kỳ` : 'Không có đoàn trong kỳ';
    if (controls.kpiTours) controls.kpiTours.textContent = uniqueTours.size;
    if (controls.kpiGuests) controls.kpiGuests.textContent = guests.toLocaleString('vi-VN');
    if (controls.kpiCapacitySub) controls.kpiCapacitySub.textContent = `${openSlots.toLocaleString('vi-VN')} chỗ đang mở`;
    if (controls.kpiPeak) controls.kpiPeak.textContent = peak.count ? formatShortDate(peak.date) : '--/--';
    if (controls.kpiPeakSub) controls.kpiPeakSub.textContent = peak.count ? `${peak.count} đoàn hoạt động cùng ngày` : 'Chưa có lịch';
  }

  function countStartingInPeriod(items, start, end) {
    return items.filter(dep => {
      const range = getDepartureRange(dep);
      return range && range.start >= start && range.start <= end;
    }).length;
  }

  function findPeakDay(items, start, end) {
    let cursor = startOfDay(start);
    let peakDate = cursor;
    let peakCount = 0;
    while (cursor <= end) {
      const count = items.filter(dep => departureActiveOn(dep, cursor)).length;
      if (count > peakCount) {
        peakCount = count;
        peakDate = cursor;
      }
      cursor = addDays(cursor, 1);
    }
    return { date: peakDate, count: peakCount };
  }

  function updateSidebarBadges() {
    if (controls.navDepartureBadge) controls.navDepartureBadge.textContent = `${departures.length} Đoàn`;
    if (controls.navTourBadge) controls.navTourBadge.textContent = `${tours.filter(tour => tour.status !== 'inactive').length} Tour`;
  }

  function densityClass(count) {
    if (count >= 4) return 'density-high';
    if (count >= 2) return 'density-medium';
    if (count === 1) return 'density-low';
    return '';
  }

  function renderMonthView() {
    const filtered = getFilteredDepartures();
    const monthStart = startOfMonth(state.focusDate);
    const gridStart = startOfWeek(monthStart);
    const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    calendarRoot.innerHTML = `
      <div class="manager-month-calendar">
        <div class="manager-calendar-weekdays">
          ${weekdays.map(day => `<div>${day}</div>`).join('')}
        </div>
        <div class="manager-calendar-month-grid">
          ${days.map(date => renderMonthCell(date, filtered, state.focusDate.getMonth())).join('')}
        </div>
      </div>
    `;
  }

  function renderMonthCell(date, items, activeMonth) {
    const activeItems = items
      .filter(dep => departureActiveOn(dep, date))
      .sort((a, b) => {
        const aStart = getDepartureRange(a)?.start || date;
        const bStart = getDepartureRange(b)?.start || date;
        return aStart - bStart;
      });
    const outside = date.getMonth() !== activeMonth;
    const isToday = sameDay(date, today);
    const count = activeItems.length;
    const visibleItems = activeItems.slice(0, 3);

    return `
      <button type="button" class="manager-calendar-day-cell ${outside ? 'is-outside' : ''} ${isToday ? 'is-today' : ''} ${densityClass(count)}" data-calendar-date="${dateKey(date)}">
        <div class="manager-calendar-day-head">
          <span class="manager-calendar-day-number">${date.getDate()}</span>
          ${count ? `<span class="manager-calendar-day-count">${count} đoàn</span>` : ''}
        </div>
        <div class="manager-calendar-day-events">
          ${visibleItems.map(dep => renderCompactEvent(dep, date)).join('')}
          ${count > visibleItems.length ? `<span class="manager-calendar-more">+${count - visibleItems.length} đoàn khác</span>` : ''}
        </div>
      </button>
    `;
  }

  function renderCompactEvent(dep, date) {
    const tour = tourMap.get(dep.tourId);
    const type = getActivityType(dep, date);
    return `
      <span class="manager-calendar-event event-${type}" title="${escapeHtml(tour?.title || '')}">
        <i></i>
        <span class="manager-calendar-event-text">${escapeHtml(tour?.location || tour?.title || 'Tour')}</span>
      </span>
    `;
  }

  function renderWeekView() {
    const filtered = getFilteredDepartures();
    const weekStart = startOfWeek(state.focusDate);
    const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

    calendarRoot.innerHTML = `
      <div class="manager-week-board">
        ${days.map(date => {
          const activeItems = filtered.filter(dep => departureActiveOn(dep, date));
          return `
            <section class="manager-week-column ${sameDay(date, today) ? 'is-today' : ''}" data-calendar-date="${dateKey(date)}">
              <header class="manager-week-column-head">
                <span>${escapeHtml(formatWeekday(date))}</span>
                <strong>${date.getDate()}</strong>
                <small>${activeItems.length} đoàn</small>
              </header>
              <div class="manager-week-column-body">
                ${activeItems.length ? activeItems.map(dep => renderWeekEvent(dep, date)).join('') : '<div class="manager-calendar-empty-small">Không có đoàn</div>'}
              </div>
            </section>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderWeekEvent(dep, date) {
    const tour = tourMap.get(dep.tourId);
    const type = getActivityType(dep, date);
    const booked = Math.max(0, Number(dep.maxSlots || 0) - Number(dep.slots || 0));
    return `
      <article class="manager-week-event event-${type}" data-calendar-tour="${escapeHtml(dep.tourId)}">
        <div class="manager-week-event-state">${getActivityLabel(type)}</div>
        <strong>${escapeHtml(tour?.title || 'Tour')}</strong>
        <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(tour?.location || 'Chưa cập nhật')}</span>
        <span><i class="fa-solid fa-user-group"></i> ${booked}/${Number(dep.maxSlots || 0)} khách</span>
        <span><i class="fa-solid fa-user-tie"></i> ${escapeHtml(dep.guideName || 'Chưa phân công')}</span>
      </article>
    `;
  }

  function renderDayView() {
    const filtered = getFilteredDepartures();
    const activeItems = filtered.filter(dep => departureActiveOn(dep, state.focusDate));
    const starting = activeItems.filter(dep => {
      const range = getDepartureRange(dep);
      return range && sameDay(range.start, state.focusDate);
    }).length;
    const ending = activeItems.filter(dep => {
      const range = getDepartureRange(dep);
      return range && sameDay(range.end, state.focusDate) && !sameDay(range.start, range.end);
    }).length;
    const guests = activeItems.reduce((sum, dep) => sum + Math.max(0, Number(dep.maxSlots || 0) - Number(dep.slots || 0)), 0);

    calendarRoot.innerHTML = `
      <div class="manager-day-view">
        <div class="manager-day-summary">
          <div>
            <span class="manager-day-eyebrow">${escapeHtml(titleCaseWeekday(state.focusDate))}</span>
            <h2>${formatVnDate(state.focusDate)}</h2>
          </div>
          <div class="manager-day-summary-metrics">
            <span><strong>${activeItems.length}</strong> đoàn hoạt động</span>
            <span><strong>${starting}</strong> đoàn khởi hành</span>
            <span><strong>${ending}</strong> đoàn kết thúc</span>
            <span><strong>${guests}</strong> khách đã giữ chỗ</span>
          </div>
        </div>
        <div class="manager-day-list">
          ${activeItems.length ? activeItems.map(dep => renderDayCard(dep)).join('') : renderEmptyDay()}
        </div>
      </div>
    `;
  }

  function renderDayCard(dep) {
    const tour = tourMap.get(dep.tourId);
    const type = getActivityType(dep, state.focusDate);
    const maxSlots = Number(dep.maxSlots || 0);
    const openSlots = Math.max(0, Number(dep.slots || 0));
    const booked = Math.max(0, maxSlots - openSlots);
    const fill = maxSlots > 0 ? Math.min(100, Math.round((booked / maxSlots) * 100)) : 0;

    return `
      <article class="manager-day-tour-card">
        <div class="manager-day-tour-image">
          <img src="${escapeHtml(tour?.image || '')}" alt="${escapeHtml(tour?.title || 'Tour')}">
          <span class="manager-day-activity-badge event-${type}">${getActivityLabel(type)}</span>
        </div>
        <div class="manager-day-tour-main">
          <div class="manager-day-tour-heading">
            <div>
              <span class="manager-day-tour-location"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(tour?.location || 'Chưa cập nhật')}</span>
              <h3>${escapeHtml(tour?.title || 'Tour')}</h3>
            </div>
            <span class="manager-day-status ${getStatusClass(dep)}">${escapeHtml(getStatusLabel(dep))}</span>
          </div>
          <div class="manager-day-tour-meta">
            <span><i class="fa-regular fa-calendar"></i> ${escapeHtml(dep.date)} → ${escapeHtml(dep.returnDate || dep.date)}</span>
            <span><i class="fa-solid fa-user-tie"></i> ${escapeHtml(dep.guideName || 'Chưa phân công HDV')}</span>
            <span><i class="fa-solid fa-clock"></i> ${escapeHtml(tour?.duration || '')}</span>
          </div>
          <div class="manager-day-capacity">
            <div class="manager-day-capacity-text">
              <strong>${booked}/${maxSlots}</strong>
              <span>khách đã giữ chỗ · còn ${openSlots} chỗ</span>
            </div>
            <div class="manager-day-capacity-track"><span style="width:${fill}%"></span></div>
          </div>
        </div>
        <div class="manager-day-tour-side">
          <span>Giá / khách</span>
          <strong>${formatCurrency(Number(dep.price || tour?.price || 0))}</strong>
          <a href="manager-dashboard.html#sectionTours" class="btn btn-outline btn-sm" data-calendar-tour="${escapeHtml(dep.tourId)}">Quản lý <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>
    `;
  }

  function renderEmptyDay() {
    return `
      <div class="manager-calendar-empty-state">
        <div class="manager-calendar-empty-icon"><i class="fa-regular fa-calendar-check"></i></div>
        <h3>Không có đoàn hoạt động trong ngày này</h3>
        <p>Chọn ngày khác, thay đổi bộ lọc hoặc tạo thêm chuyến khởi hành từ trang quản lý tour.</p>
        <a href="manager-dashboard.html" class="btn btn-primary"><i class="fa-solid fa-calendar-plus"></i> Quản lý lịch khởi hành</a>
      </div>
    `;
  }
}

// Auto-run if loaded standalone
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initManagerCalendarPage === 'function') {
    initManagerCalendarPage();
  }
});

