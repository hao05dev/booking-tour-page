/**
 * BOOKING TOUR - CHECKOUT, PAYMENT & PROFILE CONTROLLERS
 */

function initBookingPage() {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;

  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
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

      const user = (typeof getCurrentUser === 'function' ? getCurrentUser() : null) || { name: "Nguyễn Văn Hào", email: "customer@example.com", phone: "0912 345 678" };
      const newBookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

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

function initProfilePage() {
  const profileForm = document.getElementById('profileForm');
  if (!profileForm) return;

  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
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
    if (typeof renderRoleBasedNav === 'function') renderRoleBasedNav();
  });
}
