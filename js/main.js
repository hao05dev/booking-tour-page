/**
 * BOOKING TOUR - MASTER JAVASCRIPT
 * Handles mock database, UI interactions, modals, countdowns, and prototype state flows.
 */

// ==========================================
// 1. MOCK DATA STORE
// ==========================================
const MOCK_DATA = {
  currentUser: {
    name: "Nguyễn Văn Hào",
    email: "hao.nguyen@example.com",
    phone: "0912 345 678",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    address: "Quận 1, TP. Hồ Chí Minh"
  },
  tours: [
    {
      id: "tour-1",
      title: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      location: "Quảng Ninh",
      region: "north",
      theme: "sea",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      rating: 4.9,
      reviewsCount: 128,
      price: 3490000,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: true,
      maxGuests: 20,
      description: "Trải nghiệm kỳ nghỉ dưỡng đẳng cấp thượng lưu trên du thuyền vịnh Hạ Long. Thưởng ngoạn hang Sửng Sốt, chèo kayak đảo Ti Tốp và thưởng thức tiệc hải sản tươi ngon."
    },
    {
      id: "tour-2",
      title: "Chinh Phục Fansipan & Săn Mây Sa Pa 2N1Đ",
      location: "Lào Cai",
      region: "north",
      theme: "nature",
      duration: "2 Ngày 1 Đêm",
      days: 2,
      rating: 4.8,
      reviewsCount: 95,
      price: 2190000,
      image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: false,
      maxGuests: 15,
      description: "Hành trình chạm đỉnh Nóc nhà Đông Dương, check-in bản Cát Cát thơ mộng, thưởng thức đặc sản lẩu cá hồi và văn hóa Tây Bắc độc đáo."
    },
    {
      id: "tour-3",
      title: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      location: "Đà Nẵng",
      region: "central",
      theme: "culture",
      duration: "4 Ngày 3 Đêm",
      days: 4,
      rating: 4.9,
      reviewsCount: 240,
      price: 4590000,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: true,
      maxGuests: 25,
      description: "Khám phá con đường di sản miền Trung: Phố cổ Hội An lung linh đèn lồng, check-in Cầu Vàng Bà Nà Hills và biển Mỹ Khê tuyệt đẹp."
    },
    {
      id: "tour-4",
      title: "Thiên Đường Biển Đảo Phú Quốc - Cáp Treo Hòn Thơm 3N2Đ",
      location: "Kiên Giang",
      region: "south",
      theme: "sea",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      rating: 4.7,
      reviewsCount: 160,
      price: 3990000,
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: false,
      maxGuests: 30,
      description: "Lặn ngắm san hô 4 đảo, trải nghiệm cáp treo vượt biển dài nhất thế giới Hòn Thơm, ngắm hoàng hôn Sunset Sanato lãng mạn."
    },
    {
      id: "tour-5",
      title: "Ninh Bình Tràng An - Bái Đính - Hang Múa 1 Ngày",
      location: "Ninh Bình",
      region: "north",
      theme: "nature",
      duration: "1 Ngày",
      days: 1,
      rating: 4.8,
      reviewsCount: 88,
      price: 950000,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: true,
      topRated: false,
      maxGuests: 20,
      description: "Du ngoạn di sản thiên nhiên thế giới Tràng An bằng thuyền nan, viếng chùa Bái Đính nguy nga và ngắm toàn cảnh Tam Cốc từ đỉnh Hang Múa."
    },
    {
      id: "tour-6",
      title: "Đà Lạt Xứ Sở Ngàn Hoa - Check-in Cổng Trời 3N2Đ",
      location: "Lâm Đồng",
      region: "central",
      theme: "nature",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      rating: 4.85,
      reviewsCount: 175,
      price: 2890000,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: false,
      topRated: true,
      maxGuests: 20,
      description: "Khám phá thành phố mộng mơ với các đồi chè Cầu Đất bát ngát, săn mây đồi Robin, thác Datanla và tận hưởng không khí se lạnh trong lành."
    }
  ],
  departures: [
    {
      id: "dep-1",
      date: "25/10/2026",
      returnDate: "28/10/2026",
      slots: 6,
      status: "Available",
      statusText: "Còn chỗ",
      badgeClass: "badge-available",
      price: 3490000
    },
    {
      id: "dep-2",
      date: "02/11/2026",
      returnDate: "05/11/2026",
      slots: 2,
      status: "Almost Full",
      statusText: "Sắp hết chỗ",
      badgeClass: "badge-almost-full",
      price: 3590000
    },
    {
      id: "dep-3",
      date: "15/11/2026",
      returnDate: "18/11/2026",
      slots: 0,
      status: "Sold Out",
      statusText: "Hết chỗ",
      badgeClass: "badge-sold-out",
      price: 3490000
    },
    {
      id: "dep-4",
      date: "28/11/2026",
      returnDate: "01/12/2026",
      slots: 12,
      status: "Available",
      statusText: "Còn chỗ",
      badgeClass: "badge-available",
      price: 3390000
    }
  ]
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

function formatCurrency(amount) {
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
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
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
// 3. INITIALIZATION & GLOBAL HANDLERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav drawer toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (navToggle && mobileNav && mobileOverlay) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.add('active');
      mobileOverlay.classList.add('active');
    });

    const closeNav = () => {
      mobileNav.classList.remove('active');
      mobileOverlay.classList.remove('active');
    };

    if (mobileNavClose) mobileNavClose.addEventListener('click', closeNav);
    mobileOverlay.addEventListener('click', closeNav);
  }

  // User Dropdown Toggle
  const userDropdownToggle = document.getElementById('userDropdownToggle');
  const userDropdownWrapper = document.querySelector('.user-dropdown-wrapper');
  if (userDropdownToggle && userDropdownWrapper) {
    userDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdownWrapper.contains(e.target)) {
        userDropdownWrapper.classList.remove('active');
      }
    });
  }

  // Modal Backdrop Click to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Modal Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal.id);
    });
  });

  // Star Rating Interaction
  initStarRating();

  // Highlight Current Navigation Link
  highlightActiveNavLink();

  // Initialize Page Specific Scripts
  initTourDetailPage();
  initBookingPage();
  initPaymentPage();
  initPaymentResultPage();
  initBookingHistoryPage();
});

// Highlight active navbar link
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Star Rating helper
function initStarRating() {
  document.querySelectorAll('.star-rating-group').forEach(group => {
    const stars = group.querySelectorAll('i');
    let selectedRating = group.dataset.rating || 5;

    function renderStars(rating) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.className = 'fa-solid fa-star active';
        } else {
          star.className = 'fa-regular fa-star';
        }
      });
    }

    renderStars(selectedRating);

    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.className = 'fa-solid fa-star hovered';
          } else {
            s.className = 'fa-regular fa-star';
          }
        });
      });

      star.addEventListener('mouseleave', () => {
        renderStars(selectedRating);
      });

      star.addEventListener('click', () => {
        selectedRating = index + 1;
        group.dataset.rating = selectedRating;
        renderStars(selectedRating);
      });
    });
  });
}

// ==========================================
// 4. TOUR DETAIL PAGE LOGIC
// ==========================================
function initTourDetailPage() {
  const departureCards = document.querySelectorAll('.departure-card:not(.sold-out)');
  const adultCountEl = document.getElementById('adultCount');
  const childCountEl = document.getElementById('childCount');
  const totalAmountEl = document.getElementById('totalAmount');
  const summaryDepartureEl = document.getElementById('summaryDeparture');
  const summaryGuestsEl = document.getElementById('summaryGuests');
  const btnBookTour = document.getElementById('btnBookTour');

  if (!departureCards.length || !totalAmountEl) return;

  let currentPrice = 3490000;
  let selectedDate = "25/10/2026";
  let adults = 1;
  let children = 0;

  function updateTotals() {
    // Child price is 70% of adult price
    const childPrice = currentPrice * 0.7;
    const total = (adults * currentPrice) + (children * childPrice);
    
    if (totalAmountEl) totalAmountEl.textContent = formatCurrency(total);
    if (summaryDepartureEl) summaryDepartureEl.textContent = selectedDate;
    if (summaryGuestsEl) {
      let guestText = `${adults} Người lớn`;
      if (children > 0) guestText += `, ${children} Trẻ em`;
      summaryGuestsEl.textContent = guestText;
    }

    // Update session storage for checkout
    const tourData = {
      tourId: "tour-1",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      tourImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
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
      currentPrice = parseInt(card.dataset.price, 10) || 3490000;
      updateTotals();
    });
  });

  // Adult Counter
  const btnMinusAdult = document.getElementById('btnMinusAdult');
  const btnPlusAdult = document.getElementById('btnPlusAdult');

  if (btnMinusAdult && btnPlusAdult && adultCountEl) {
    btnMinusAdult.addEventListener('click', () => {
      if (adults > 1) {
        adults--;
        adultCountEl.textContent = adults;
        btnMinusAdult.disabled = adults <= 1;
        updateTotals();
      }
    });

    btnPlusAdult.addEventListener('click', () => {
      if (adults < 10) {
        adults++;
        adultCountEl.textContent = adults;
        btnMinusAdult.disabled = false;
        updateTotals();
      }
    });
  }

  // Child Counter
  const btnMinusChild = document.getElementById('btnMinusChild');
  const btnPlusChild = document.getElementById('btnPlusChild');

  if (btnMinusChild && btnPlusChild && childCountEl) {
    btnMinusChild.addEventListener('click', () => {
      if (children > 0) {
        children--;
        childCountEl.textContent = children;
        btnMinusChild.disabled = children <= 0;
        updateTotals();
      }
    });

    btnPlusChild.addEventListener('click', () => {
      if (children < 5) {
        children++;
        childCountEl.textContent = children;
        btnMinusChild.disabled = false;
        updateTotals();
      }
    });
  }

  // Initialize once
  updateTotals();
}

// ==========================================
// 5. BOOKING CHECKOUT PAGE LOGIC
// ==========================================
function initBookingPage() {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;

  // Load draft data if exists
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
    
    // Simple prototype validation
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    let isValid = true;
    if (fullName && !fullName.value.trim()) {
      fullName.classList.add('is-invalid');
      isValid = false;
    } else if (fullName) {
      fullName.classList.remove('is-invalid');
    }

    if (phone && !phone.value.trim()) {
      phone.classList.add('is-invalid');
      isValid = false;
    } else if (phone) {
      phone.classList.remove('is-invalid');
    }

    if (email && !email.value.trim()) {
      email.classList.add('is-invalid');
      isValid = false;
    } else if (email) {
      email.classList.remove('is-invalid');
    }

    if (isValid) {
      showToast('Đang tạo đơn đặt tour...', 'success');
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 600);
    }
  });
}

// ==========================================
// 6. PAYMENT PAGE LOGIC (10:00 Countdown)
// ==========================================
function initPaymentPage() {
  const timerDisplay = document.getElementById('paymentTimer');
  if (!timerDisplay) return;

  let timeLeft = 10 * 60; // 10 minutes in seconds

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

// ==========================================
// 7. PAYMENT RESULT LOGIC
// ==========================================
function initPaymentResultPage() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status') || 'success';

  const stateSuccess = document.getElementById('stateSuccess');
  const stateFailed = document.getElementById('stateFailed');
  const stateExpired = document.getElementById('stateExpired');

  if (!stateSuccess || !stateFailed || !stateExpired) return;

  stateSuccess.style.display = 'none';
  stateFailed.style.display = 'none';
  stateExpired.style.display = 'none';

  if (status === 'failed') {
    stateFailed.style.display = 'block';
  } else if (status === 'expired') {
    stateExpired.style.display = 'block';
  } else {
    stateSuccess.style.display = 'block';
  }
}

// ==========================================
// 8. BOOKING HISTORY & DASHBOARD
// ==========================================
function initBookingHistoryPage() {
  const tabs = document.querySelectorAll('.history-tab');
  const panels = document.querySelectorAll('.history-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.dataset.target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}
