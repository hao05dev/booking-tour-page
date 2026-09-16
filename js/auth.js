/**
 * BOOKING TOUR - AUTHENTICATION & SESSION MANAGEMENT
 * Supports 5 roles: 'guest', 'customer', 'guide', 'manager', 'admin'
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
    if (typeof renderRoleBasedNav === 'function') renderRoleBasedNav();
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
  if (typeof renderRoleBasedNav === 'function') renderRoleBasedNav();

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
  if (typeof renderRoleBasedNav === 'function') renderRoleBasedNav();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

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
