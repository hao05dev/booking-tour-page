/**
 * BOOKING TOUR - COMPREHENSIVE MOCK DATABASE
 * Contains rich datasets for Tours, Departures, Users (5 Roles), Bookings, and Reviews.
 * Auto-initializes and syncs with localStorage.
 */

const DEFAULT_MOCK_DATA = {
  users: [
    {
      id: "usr-guest",
      name: "Khách Vãng Lai",
      email: "guest@example.com",
      role: "guest",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      status: "active"
    },
    {
      id: "usr-cust-1",
      name: "Nguyễn Văn Hào",
      email: "customer@example.com",
      role: "customer",
      phone: "0912 345 678",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      address: "Số 123 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      status: "active",
      joinedDate: "15/01/2026"
    },
    {
      id: "usr-cust-2",
      name: "Trần Thị Mai",
      email: "mai.tran@example.com",
      role: "customer",
      phone: "0988 123 456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      address: "Hai Bà Trưng, Hà Nội",
      status: "active",
      joinedDate: "20/02/2026"
    },
    {
      id: "usr-cust-3",
      name: "Lê Hoàng Nam",
      email: "nam.le@example.com",
      role: "customer",
      phone: "0905 678 901",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      address: "Hải Châu, Đà Nẵng",
      status: "active",
      joinedDate: "05/03/2026"
    },
    {
      id: "usr-guide-1",
      name: "Trần Quốc Hưng",
      email: "guide@example.com",
      role: "guide",
      phone: "0988 776 655",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      languages: "Tiếng Việt, Tiếng Anh",
      experience: "8 năm kinh nghiệm",
      rating: 4.95,
      status: "active"
    },
    {
      id: "usr-guide-2",
      name: "Phạm Minh Tuấn",
      email: "tuan.guide@example.com",
      role: "guide",
      phone: "0977 443 322",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      languages: "Tiếng Việt, Tiếng Pháp",
      experience: "5 năm kinh nghiệm",
      rating: 4.88,
      status: "active"
    },
    {
      id: "usr-guide-3",
      name: "Hoàng Lan Anh",
      email: "lananh.guide@example.com",
      role: "guide",
      phone: "0933 221 100",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      languages: "Tiếng Việt, Tiếng Hàn",
      experience: "6 năm kinh nghiệm",
      rating: 4.92,
      status: "active"
    },
    {
      id: "usr-mgr-1",
      name: "Nguyễn Thu Hà",
      email: "manager@example.com",
      role: "manager",
      phone: "0911 223 344",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      department: "Quản Lý Vận Hành Tour Miền Bắc & Miền Trung",
      status: "active"
    },
    {
      id: "usr-mgr-2",
      name: "Đặng Minh Trí",
      email: "tri.manager@example.com",
      role: "manager",
      phone: "0944 556 677",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      department: "Quản Lý Vận Hành Tour Miền Nam & Biển Đảo",
      status: "active"
    },
    {
      id: "usr-adm-1",
      name: "Admin Quản Trị Viên",
      email: "admin@example.com",
      role: "admin",
      phone: "1900 6868",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      status: "active"
    }
  ],

  tours: [
    {
      id: "tour-1",
      title: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      location: "Quảng Ninh",
      region: "north",
      theme: "sea",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      season: "autumn",
      seasonLabel: "Mùa Thu (T9 - T11)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-09-01",
      seasonEnd: "2026-11-30",
      rating: 4.9,
      reviewsCount: 128,
      price: 3490000,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: true,
      maxGuests: 20,
      status: "active",
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
      season: "autumn",
      seasonLabel: "Mùa Thu - Săn Mây (T9 - T12)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-09-01",
      seasonEnd: "2026-12-31",
      rating: 4.8,
      reviewsCount: 95,
      price: 2190000,
      image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: false,
      maxGuests: 15,
      status: "active",
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
      season: "all_year",
      seasonLabel: "Quanh Năm (4 Mùa)",
      stage: "regular",
      stageLabel: "Đang Mở Bán",
      seasonStart: "2026-01-01",
      seasonEnd: "2026-12-31",
      rating: 4.9,
      reviewsCount: 240,
      price: 4590000,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: true,
      maxGuests: 25,
      status: "active",
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
      season: "winter",
      seasonLabel: "Mùa Khô Đẹp Nhất (T10 - T4)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-10-01",
      seasonEnd: "2027-04-30",
      rating: 4.7,
      reviewsCount: 160,
      price: 3990000,
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: false,
      maxGuests: 30,
      status: "active",
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
      season: "spring",
      seasonLabel: "Mùa Lễ Hội Xuân (T1 - T4)",
      stage: "regular",
      stageLabel: "Đang Mở Bán",
      seasonStart: "2026-01-15",
      seasonEnd: "2026-04-30",
      rating: 4.8,
      reviewsCount: 88,
      price: 950000,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: true,
      topRated: false,
      maxGuests: 20,
      status: "active",
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
      season: "autumn",
      seasonLabel: "Mùa Thu Dã Quỳ (T10 - T12)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-10-01",
      seasonEnd: "2026-12-31",
      rating: 4.85,
      reviewsCount: 175,
      price: 2890000,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: false,
      topRated: true,
      maxGuests: 20,
      status: "active",
      description: "Khám phá thành phố mộng mơ với các đồi chè Cầu Đất bát ngát, săn mây đồi Robin, thác Datanla và tận hưởng không khí se lạnh trong lành."
    },
    {
      id: "tour-7",
      title: "Hà Giang - Mã Pí Lèng - Đồng Văn Mùa Hoa Tam Giác Mạch 3N2Đ",
      location: "Hà Giang",
      region: "north",
      theme: "nature",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      season: "summer",
      seasonLabel: "Mùa Hè Biển Đảo (T4 - T9)",
      stage: "regular",
      stageLabel: "Đang Mở Bán",
      seasonStart: "2026-04-01",
      seasonEnd: "2026-09-30",
      rating: 4.92,
      reviewsCount: 110,
      price: 3200000,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: true,
      topRated: true,
      maxGuests: 16,
      status: "active",
      description: "Chinh phục Tứ đại đỉnh đèo Mã Pí Lèng, chèo kayak hẻm Tu Sản dòng sông Nho Quế xanh ngọc bích và ngắm hoa tam giác mạch rực rỡ."
    },
    {
      id: "tour-8",
      title: "Khám Phá Sông Nước Miền Tây - Chợ Nổi Cái Răng Cần Thơ 2N1Đ",
      location: "Cần Thơ",
      region: "south",
      theme: "culture",
      duration: "2 Ngày 1 Đêm",
      days: 2,
      season: "autumn",
      seasonLabel: "Mùa Nước Nổi (T9 - T11)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-09-01",
      seasonEnd: "2026-11-30",
      rating: 4.65,
      reviewsCount: 74,
      price: 1850000,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: true,
      topRated: false,
      maxGuests: 25,
      status: "active",
      description: "Trải nghiệm văn hóa chợ nổi Cái Răng tấp nập buổi sớm mai, thưởng thức trái cây miệt vườn Phong Điền và đờn ca tài tử Nam Bộ."
    },
    {
      id: "tour-9",
      title: "Nha Trang Biển Xanh - Lặn Ngắm San Hô Hòn Mun 3N2Đ",
      location: "Khánh Hòa",
      region: "central",
      theme: "sea",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      season: "all_year",
      seasonLabel: "Quanh Năm (4 Mùa)",
      stage: "regular",
      stageLabel: "Đang Mở Bán",
      seasonStart: "2026-01-01",
      seasonEnd: "2026-12-31",
      rating: 4.8,
      reviewsCount: 142,
      price: 3650000,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: true,
      topRated: false,
      maxGuests: 20,
      status: "active",
      description: "Tắm biển vịnh Nha Trang xinh đẹp, lặn ống thở ngắm rạn san hô nguyên sinh Hòn Mun và thư giãn tại suối khoáng nóng Tháp Bà."
    },
    {
      id: "tour-10",
      title: "Cố Đô Huế - Đại Nội & Lăng Tẩm Triều Nguyễn 1 Ngày",
      location: "Thừa Thiên Huế",
      region: "central",
      theme: "culture",
      duration: "1 Ngày",
      days: 1,
      season: "summer",
      seasonLabel: "Mùa Khô Khám Phá (T3 - T8)",
      stage: "early_bird",
      stageLabel: "Mở Bán Sớm",
      seasonStart: "2026-03-01",
      seasonEnd: "2026-08-31",
      rating: 4.75,
      reviewsCount: 65,
      price: 890000,
      image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: false,
      topRated: false,
      maxGuests: 25,
      status: "active",
      description: "Thăm Hoàng thành Huế trầm mặc, lăng Khải Định tinh xảo, chùa Thiên Mụ linh thiêng và nghe ca Huế trên dòng sông Hương thơ mộng."
    },
    {
      id: "tour-11",
      title: "Huyền Bí Côn Đảo - Vườn Quốc Gia & Nghĩa Trang Hàng Dương 3N2Đ",
      location: "Bà Rịa - Vũng Tàu",
      region: "south",
      theme: "culture",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      season: "autumn",
      seasonLabel: "Mùa Hoa Tam Giác Mạch (T10 - T12)",
      stage: "peak",
      stageLabel: "Mùa Cao Điểm",
      seasonStart: "2026-10-01",
      seasonEnd: "2026-12-31",
      rating: 4.95,
      reviewsCount: 180,
      price: 5890000,
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      featured: true,
      popular: false,
      topRated: true,
      maxGuests: 18,
      status: "active",
      description: "Hành trình tâm linh và biển đảo nguyên sơ: Viếng mộ cô Sáu Hàng Dương, khám phá bãi Đầm Trầu hoang sơ và ngắm rùa biển đẻ trứng."
    },
    {
      id: "tour-12",
      title: "Kỳ Co - Eo Gió - Quy Nhơn Thiên Đường Biển Nắng 3N2Đ",
      location: "Bình Định",
      region: "central",
      theme: "sea",
      duration: "3 Ngày 2 Đêm",
      days: 3,
      season: "summer",
      seasonLabel: "Mùa Hè Biển Lặn (T4 - T9)",
      stage: "regular",
      stageLabel: "Đang Mở Bán",
      seasonStart: "2026-04-01",
      seasonEnd: "2026-09-30",
      rating: 4.82,
      reviewsCount: 98,
      price: 3350000,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      featured: false,
      popular: true,
      topRated: false,
      maxGuests: 20,
      status: "active",
      description: "Check-in Eo Gió ngắm hoàng hôn ngoạn mục, cano cao tốc ra bãi Kỳ Co nước xanh trong vắt như Maldives Việt Nam."
    }
  ],

  departures: [
    { id: "dep-1", tourId: "tour-1", date: "25/10/2026", returnDate: "28/10/2026", slots: 6, maxSlots: 20, price: 3490000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-1", guideName: "Trần Quốc Hưng" },
    { id: "dep-2", tourId: "tour-1", date: "02/11/2026", returnDate: "05/11/2026", slots: 2, maxSlots: 20, price: 3590000, status: "Almost Full", statusText: "Sắp hết chỗ", badgeClass: "badge-almost-full", guideId: "usr-guide-1", guideName: "Trần Quốc Hưng" },
    { id: "dep-3", tourId: "tour-1", date: "15/11/2026", returnDate: "18/11/2026", slots: 0, maxSlots: 20, price: 3490000, status: "Sold Out", statusText: "Hết chỗ", badgeClass: "badge-sold-out", guideId: "usr-guide-2", guideName: "Phạm Minh Tuấn" },
    { id: "dep-4", tourId: "tour-1", date: "28/11/2026", returnDate: "01/12/2026", slots: 12, maxSlots: 20, price: 3390000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-3", guideName: "Hoàng Lan Anh" },
    
    { id: "dep-5", tourId: "tour-2", date: "22/10/2026", returnDate: "24/10/2026", slots: 4, maxSlots: 15, price: 2190000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-2", guideName: "Phạm Minh Tuấn" },
    { id: "dep-6", tourId: "tour-2", date: "05/11/2026", returnDate: "07/11/2026", slots: 8, maxSlots: 15, price: 2190000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-2", guideName: "Phạm Minh Tuấn" },
    
    { id: "dep-7", tourId: "tour-3", date: "20/10/2026", returnDate: "24/10/2026", slots: 5, maxSlots: 25, price: 4590000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-1", guideName: "Trần Quốc Hưng" },
    { id: "dep-8", tourId: "tour-3", date: "10/11/2026", returnDate: "14/11/2026", slots: 14, maxSlots: 25, price: 4590000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-3", guideName: "Hoàng Lan Anh" },
    
    { id: "dep-9", tourId: "tour-4", date: "24/10/2026", returnDate: "27/10/2026", slots: 3, maxSlots: 30, price: 3990000, status: "Almost Full", statusText: "Sắp hết chỗ", badgeClass: "badge-almost-full", guideId: "usr-guide-3", guideName: "Hoàng Lan Anh" },
    { id: "dep-10", tourId: "tour-4", date: "12/11/2026", returnDate: "15/11/2026", slots: 18, maxSlots: 30, price: 3990000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-1", guideName: "Trần Quốc Hưng" },

    { id: "dep-11", tourId: "tour-5", date: "21/10/2026", returnDate: "21/10/2026", slots: 8, maxSlots: 20, price: 950000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-2", guideName: "Phạm Minh Tuấn" },
    { id: "dep-12", tourId: "tour-6", date: "26/10/2026", returnDate: "29/10/2026", slots: 6, maxSlots: 20, price: 2890000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-3", guideName: "Hoàng Lan Anh" },
    { id: "dep-13", tourId: "tour-7", date: "30/10/2026", returnDate: "02/11/2026", slots: 4, maxSlots: 16, price: 3200000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-2", guideName: "Phạm Minh Tuấn" },
    { id: "dep-14", tourId: "tour-8", date: "28/10/2026", returnDate: "30/10/2026", slots: 10, maxSlots: 25, price: 1850000, status: "Available", statusText: "Còn chỗ", badgeClass: "badge-available", guideId: "usr-guide-1", guideName: "Trần Quốc Hưng" }
  ],

  bookings: [
    {
      id: "BK-892347",
      tourId: "tour-1",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      tourImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-1",
      departureDate: "25/10/2026",
      returnDate: "28/10/2026",
      customerId: "usr-cust-1",
      customerName: "Nguyễn Văn Hào",
      customerEmail: "customer@example.com",
      customerPhone: "0912 345 678",
      passengersCount: 1,
      adults: 1,
      children: 0,
      totalPrice: 3490000,
      bookingStatus: "CONFIRMED", // CONFIRMED, PENDING_PAYMENT, COMPLETED, CANCELLED
      paymentStatus: "PAID",
      paymentMethod: "VietQR Online",
      bookingDate: "15/10/2026 14:32",
      guideId: "usr-guide-1",
      guideName: "Trần Quốc Hưng",
      tourProgress: "Preparing", // Upcoming -> Preparing -> Picking Up Guests -> In Progress -> Completed
      notes: "Yêu cầu phòng ngủ tầng 2, không gian yên tĩnh.",
      passengers: [
        { name: "Nguyễn Văn Hào", type: "Người lớn", gender: "Nam", dob: "15/08/1995" }
      ]
    },
    {
      id: "BK-712849",
      tourId: "tour-3",
      tourTitle: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      tourImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-7",
      departureDate: "10/08/2026",
      returnDate: "14/08/2026",
      customerId: "usr-cust-1",
      customerName: "Nguyễn Văn Hào",
      customerEmail: "customer@example.com",
      customerPhone: "0912 345 678",
      passengersCount: 2,
      adults: 2,
      children: 0,
      totalPrice: 9180000,
      bookingStatus: "COMPLETED",
      paymentStatus: "PAID",
      paymentMethod: "VietQR Online",
      bookingDate: "01/08/2026 09:15",
      guideId: "usr-guide-1",
      guideName: "Trần Quốc Hưng",
      tourProgress: "Completed",
      notes: "Ăn kiêng hải sản có vỏ",
      passengers: [
        { name: "Nguyễn Văn Hào", type: "Người lớn", gender: "Nam", dob: "15/08/1995" },
        { name: "Lê Thị Hồng", type: "Người lớn", gender: "Nữ", dob: "22/11/1997" }
      ]
    },
    {
      id: "BK-655210",
      tourId: "tour-2",
      tourTitle: "Chinh Phục Fansipan & Săn Mây Sa Pa 2N1Đ",
      tourImage: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-5",
      departureDate: "20/06/2026",
      returnDate: "22/06/2026",
      customerId: "usr-cust-1",
      customerName: "Nguyễn Văn Hào",
      customerEmail: "customer@example.com",
      customerPhone: "0912 345 678",
      passengersCount: 1,
      adults: 1,
      children: 0,
      totalPrice: 2190000,
      bookingStatus: "COMPLETED",
      paymentStatus: "PAID",
      paymentMethod: "VietQR Online",
      bookingDate: "12/06/2026 18:20",
      guideId: "usr-guide-2",
      guideName: "Phạm Minh Tuấn",
      tourProgress: "Completed",
      notes: "",
      passengers: [
        { name: "Nguyễn Văn Hào", type: "Người lớn", gender: "Nam", dob: "15/08/1995" }
      ]
    },
    {
      id: "BK-501923",
      tourId: "tour-4",
      tourTitle: "Thiên Đường Biển Đảo Phú Quốc - Cáp Treo 3N2Đ",
      tourImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-9",
      departureDate: "05/05/2026",
      returnDate: "08/05/2026",
      customerId: "usr-cust-1",
      customerName: "Nguyễn Văn Hào",
      customerEmail: "customer@example.com",
      customerPhone: "0912 345 678",
      passengersCount: 1,
      adults: 1,
      children: 0,
      totalPrice: 3990000,
      bookingStatus: "CANCELLED",
      paymentStatus: "REFUNDED",
      paymentMethod: "VietQR Online",
      bookingDate: "10/04/2026 11:00",
      guideId: "usr-guide-3",
      guideName: "Hoàng Lan Anh",
      tourProgress: "Cancelled",
      notes: "Khách bận việc gia đình đột xuất",
      passengers: [
        { name: "Nguyễn Văn Hào", type: "Người lớn", gender: "Nam", dob: "15/08/1995" }
      ]
    },
    {
      id: "BK-442190",
      tourId: "tour-1",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      tourImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-1",
      departureDate: "25/10/2026",
      returnDate: "28/10/2026",
      customerId: "usr-cust-2",
      customerName: "Trần Thị Mai",
      customerEmail: "mai.tran@example.com",
      customerPhone: "0988 123 456",
      passengersCount: 2,
      adults: 2,
      children: 0,
      totalPrice: 6980000,
      bookingStatus: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod: "VietQR Online",
      bookingDate: "14/10/2026 10:20",
      guideId: "usr-guide-1",
      guideName: "Trần Quốc Hưng",
      tourProgress: "Preparing",
      notes: "Gia đình đi nghỉ kỷ niệm ngày cưới",
      passengers: [
        { name: "Trần Thị Mai", type: "Người lớn", gender: "Nữ", dob: "10/05/1992" },
        { name: "Vũ Đình Quân", type: "Người lớn", gender: "Nam", dob: "03/09/1990" }
      ]
    },
    {
      id: "BK-391820",
      tourId: "tour-3",
      tourTitle: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      tourImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      departureId: "dep-7",
      departureDate: "20/10/2026",
      returnDate: "24/10/2026",
      customerId: "usr-cust-3",
      customerName: "Lê Hoàng Nam",
      customerEmail: "nam.le@example.com",
      customerPhone: "0905 678 901",
      passengersCount: 3,
      adults: 2,
      children: 1,
      totalPrice: 12393000,
      bookingStatus: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod: "VietQR Online",
      bookingDate: "12/10/2026 15:45",
      guideId: "usr-guide-1",
      guideName: "Trần Quốc Hưng",
      tourProgress: "Picking Up Guests",
      notes: "Có em bé 6 tuổi, cần ghế ngồi phía trước xe",
      passengers: [
        { name: "Lê Hoàng Nam", type: "Người lớn", gender: "Nam", dob: "18/02/1988" },
        { name: "Nguyễn Bích Thảo", type: "Người lớn", gender: "Nữ", dob: "25/07/1990" },
        { name: "Lê Minh Khôi", type: "Trẻ em", gender: "Nam", dob: "14/09/2020" }
      ]
    }
  ],

  reviews: [
    {
      id: "rev-1",
      tourId: "tour-1",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      userName: "Trần Thị Mai",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      rating: 5,
      date: "12/09/2026",
      comment: "Du thuyền rất đẹp và sạch sẽ, đồ ăn hải sản tươi ngon đầy đặn. Hướng dẫn viên vui tính và nhiệt tình chăm sóc cả đoàn. Rất đáng tiền!",
      status: "approved"
    },
    {
      id: "rev-2",
      tourId: "tour-1",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      userName: "Lê Hoàng Nam",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      rating: 5,
      date: "01/10/2026",
      comment: "Gia đình mình có bé nhỏ đi cùng được các bạn nhân viên hỗ trợ rất chu đáo. View phòng ngủ nhìn thẳng ra vịnh cực kỳ chill. Sẽ ủng hộ tiếp!",
      status: "approved"
    },
    {
      id: "rev-3",
      tourId: "tour-3",
      tourTitle: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      userName: "Nguyễn Văn Hào",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
      rating: 5,
      date: "15/08/2026",
      comment: "Cầu Vàng Bà Nà Hills tuyệt đẹp, Hội An về đêm lung linh đèn lồng. Khách sạn 4 sao gần biển Mỹ Khê đi lại rất thuận tiện.",
      status: "approved"
    },
    {
      id: "rev-4",
      tourId: "tour-2",
      tourTitle: "Chinh Phục Fansipan & Săn Mây Sa Pa 2N1Đ",
      userName: "Đỗ Mạnh Cường",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
      rating: 4,
      date: "25/06/2026",
      comment: "Thời tiết se lạnh săn được biển mây Fansipan tuyệt vời. Đồ ăn đặc sản Tây Bắc rất hợp khẩu vị.",
      status: "approved"
    }
  ],

  roles: [
    { id: "role-admin", code: "admin", name: "Quản Trị Viên (Admin)", badgeClass: "badge-danger", description: "Toàn quyền quản trị hệ thống, tài khoản, phân quyền và danh mục." },
    { id: "role-manager", code: "manager", name: "Quản Lý Tour (Manager)", badgeClass: "badge-primary", description: "Quản lý kho tour, tạo lịch khởi hành, phân công HDV và kiểm tra đơn đặt." },
    { id: "role-guide", code: "guide", name: "Hướng Dẫn Viên (Guide)", badgeClass: "badge-success", description: "Dẫn đoàn, xem danh sách khách, điểm danh và cập nhật trạng thái tour." },
    { id: "role-customer", code: "customer", name: "Khách Hàng (Customer)", badgeClass: "badge-info", description: "Tìm kiếm, đặt tour, thanh toán và gửi đánh giá nhận xét sau chuyến đi." },
    { id: "role-guest", code: "guest", name: "Khách Vãng Lai (Guest)", badgeClass: "badge-neutral", description: "Người dùng chưa đăng nhập, xem danh mục và thông tin tour công khai." }
  ],

  modules: [
    { code: "users", name: "Quản Lý Người Dùng", icon: "fa-users-gear", desc: "Tạo, sửa, khóa, xóa tài khoản" },
    { code: "roles_permissions", name: "Phân Quyền & Vai Trò", icon: "fa-shield-halved", desc: "Ma trận CRUD và gán quyền hạn" },
    { code: "tour_categories", name: "Danh Mục Tour", icon: "fa-tags", desc: "Phân loại nhóm tour du lịch" },
    { code: "tours", name: "Kho Sản Phẩm Tour", icon: "fa-compass", desc: "Quản lý thông tin tour, giá, mùa vụ" },
    { code: "departures", name: "Lịch Khởi Hành & HDV", icon: "fa-calendar-days", desc: "Tạo chuyến, phân công HDV, sức chứa" },
    { code: "bookings", name: "Đơn Đặt Chỗ & Thanh Toán", icon: "fa-receipt", desc: "Quản lý vé, khách hàng, doanh thu" },
    { code: "reviews", name: "Đánh Giá & Nhận Xét", icon: "fa-star-half-stroke", desc: "Kiểm duyệt nhận xét công khai" },
    { code: "reports", name: "Báo Cáo & Thống Kê", icon: "fa-chart-pie", desc: "Biểu đồ tài chính và hiệu suất vận hành" }
  ],

  role_permissions: [
    // Admin: Full CRUD on all modules
    { roleCode: "admin", moduleCode: "users", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "roles_permissions", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "tour_categories", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "tours", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "departures", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "bookings", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "reviews", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "admin", moduleCode: "reports", canCreate: true, canRead: true, canUpdate: true, canDelete: true },

    // Manager
    { roleCode: "manager", moduleCode: "users", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "manager", moduleCode: "roles_permissions", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "manager", moduleCode: "tour_categories", canCreate: true, canRead: true, canUpdate: true, canDelete: false },
    { roleCode: "manager", moduleCode: "tours", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "manager", moduleCode: "departures", canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { roleCode: "manager", moduleCode: "bookings", canCreate: false, canRead: true, canUpdate: true, canDelete: false },
    { roleCode: "manager", moduleCode: "reviews", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "manager", moduleCode: "reports", canCreate: false, canRead: true, canUpdate: false, canDelete: false },

    // Guide
    { roleCode: "guide", moduleCode: "users", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "roles_permissions", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "tour_categories", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "tours", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "departures", canCreate: false, canRead: true, canUpdate: true, canDelete: false },
    { roleCode: "guide", moduleCode: "bookings", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "reviews", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guide", moduleCode: "reports", canCreate: false, canRead: false, canUpdate: false, canDelete: false },

    // Customer
    { roleCode: "customer", moduleCode: "users", canCreate: false, canRead: true, canUpdate: true, canDelete: false },
    { roleCode: "customer", moduleCode: "roles_permissions", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "customer", moduleCode: "tour_categories", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "customer", moduleCode: "tours", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "customer", moduleCode: "departures", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "customer", moduleCode: "bookings", canCreate: true, canRead: true, canUpdate: true, canDelete: false },
    { roleCode: "customer", moduleCode: "reviews", canCreate: true, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "customer", moduleCode: "reports", canCreate: false, canRead: false, canUpdate: false, canDelete: false },

    // Guest
    { roleCode: "guest", moduleCode: "users", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "roles_permissions", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "tour_categories", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "tours", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "departures", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "bookings", canCreate: false, canRead: false, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "reviews", canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { roleCode: "guest", moduleCode: "reports", canCreate: false, canRead: false, canUpdate: false, canDelete: false }
  ],

  categories: [
    {
      id: "cat-1",
      name: "Tour Biển Đảo & Vịnh Biển",
      code: "sea",
      icon: "fa-umbrella-beach",
      color: "#0284c7",
      description: "Khám phá các vùng vịnh, bãi biển và đảo ngọc hàng đầu Việt Nam như Hạ Long, Phú Quốc, Kỳ Co.",
      tourCount: 4,
      featured: true,
      status: "active"
    },
    {
      id: "cat-2",
      name: "Khám Phá Thiên Nhiên & Núi Rừng",
      code: "nature",
      icon: "fa-mountain-sun",
      color: "#16a34a",
      description: "Hành trình săn mây, trekking và hòa mình vào thiên nhiên Sa Pa, Fansipan, Tây Bắc.",
      tourCount: 3,
      featured: true,
      status: "active"
    },
    {
      id: "cat-3",
      name: "Văn Hóa, Di Sản & Cố Đô",
      code: "culture",
      icon: "fa-landmark-dome",
      color: "#d97706",
      description: "Tìm hiểu di tích lịch sử, cố đô, phố cổ Hội An, Tràng An và các lễ hội truyền thống.",
      tourCount: 3,
      featured: true,
      status: "active"
    },
    {
      id: "cat-4",
      name: "Nghỉ Dưỡng Thượng Lưu (Luxury)",
      code: "luxury",
      icon: "fa-gem",
      color: "#9333ea",
      description: "Trải nghiệm du thuyền 5 sao, resort biệt lập đẳng cấp và tiện ích cao cấp dành cho gia đình.",
      tourCount: 2,
      featured: false,
      status: "active"
    },
    {
      id: "cat-5",
      name: "Trekking, Thám Hiểm & Thể Thao",
      code: "adventure",
      icon: "fa-person-hiking",
      color: "#ea580c",
      description: "Chinh phục các cung đường thử thách mạo hiểm, vượt thác và khám phá hang động kỳ vĩ.",
      tourCount: 2,
      featured: false,
      status: "active"
    },
    {
      id: "cat-6",
      name: "Ẩm Thực Vùng Miền & Chợ Đêm",
      code: "culinary",
      icon: "fa-utensils",
      color: "#e11d48",
      description: "Thưởng thức tinh hoa ẩm thực ba miền, hải sản đặc sản và các khu chợ đêm sầm uất.",
      tourCount: 1,
      featured: false,
      status: "active"
    }
  ],

  promotions: [
    {
      id: "promo-1",
      code: "SUMMER2026",
      title: "Ưu Đãi Hè Rực Rỡ 2026",
      discountType: "percent",
      discountValue: 15,
      maxDiscount: 1000000,
      minOrderValue: 3000000,
      startDate: "2026-05-01",
      endDate: "2026-08-31",
      usageLimit: 200,
      usedCount: 78,
      status: "active",
      applicableTours: "all",
      description: "Giảm 15% tối đa 1.000.000đ cho tất cả các tour biển đảo và nghỉ dưỡng mùa hè."
    },
    {
      id: "promo-2",
      code: "EARLYBIRD500",
      title: "Mở Bán Sớm Mùa Thu - Giảm 500K",
      discountType: "fixed",
      discountValue: 500000,
      maxDiscount: 500000,
      minOrderValue: 4000000,
      startDate: "2026-08-01",
      endDate: "2026-10-31",
      usageLimit: 100,
      usedCount: 42,
      status: "active",
      applicableTours: "all",
      description: "Tặng ngay 500.000đ cho khách hàng đặt tour sớm trước 30 ngày khởi hành."
    },
    {
      id: "promo-3",
      code: "FAMILYVIP",
      title: "Gói Nghỉ Dưỡng Gia Đình VIP",
      discountType: "percent",
      discountValue: 10,
      maxDiscount: 2000000,
      minOrderValue: 8000000,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      usageLimit: 50,
      usedCount: 19,
      status: "active",
      applicableTours: "all",
      description: "Ưu đãi 10% tối đa 2 triệu cho nhóm gia đình từ 4 khách đặt phòng/resort cao cấp."
    },
    {
      id: "promo-4",
      code: "TREKSA10",
      title: "Chinh Phục Tây Bắc & Sapa",
      discountType: "percent",
      discountValue: 12,
      maxDiscount: 600000,
      minOrderValue: 2500000,
      startDate: "2026-09-01",
      endDate: "2026-11-30",
      usageLimit: 80,
      usedCount: 80,
      status: "expired",
      applicableTours: "all",
      description: "Giảm 12% cho các tour leo núi, săn mây mùa lúa chín."
    },
    {
      id: "promo-5",
      code: "FLASHDEAL20",
      title: "Flash Sale Cuối Tuần Chớp Nhoáng",
      discountType: "percent",
      discountValue: 20,
      maxDiscount: 800000,
      minOrderValue: 2000000,
      startDate: "2026-09-15",
      endDate: "2026-09-22",
      usageLimit: 30,
      usedCount: 12,
      status: "active",
      applicableTours: "all",
      description: "Mã flash sale đặc biệt cho các tour khởi hành cuối tuần."
    }
  ],
  destinations: [
    {
      id: "dest-1",
      name: "Vịnh Hạ Long & Đảo Cát Bà",
      province: "Quảng Ninh",
      region: "north",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
      description: "Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ và du thuyền 5 sao sang trọng.",
      highlights: "Hang Sửng Sốt, Đảo Ti Tốp, Vịnh Lan Hạ, Chèo kayak",
      status: "active",
      toursCount: 4
    },
    {
      id: "dest-2",
      name: "Đỉnh Fansipan & Thị Trấn Sa Pa",
      province: "Lào Cai",
      region: "north",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
      description: "Nóc nhà Đông Dương hùng vĩ, thung lũng Mường Hoa và bản làng mây mờ tuyết trắng.",
      highlights: "Cáp treo Fansipan, Đèo Ô Quy Hồ, Bản Cát Cát, Cổng Trời",
      status: "active",
      toursCount: 3
    },
    {
      id: "dest-3",
      name: "Quần Thể Danh Thắng Tràng An - Bái Đính",
      province: "Ninh Bình",
      region: "north",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
      description: "Di sản thế giới kép của UNESCO với hệ thống hang động non nước hữu tình và chùa Bái Đính nguy nga.",
      highlights: "Hang Sáng Hang Tối, Chùa Bái Đính, Hang Múa, Cố đô Hoa Lư",
      status: "active",
      toursCount: 2
    },
    {
      id: "dest-4",
      name: "Phố Cổ Hội An & Cù Lao Chàm",
      province: "Quảng Nam",
      region: "central",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80",
      description: "Đô thị cổ nghìn năm rực rỡ đèn lồng bên dòng sông Hoài thơ mộng và khu dự trữ sinh quyển Cù Lao Chàm.",
      highlights: "Chùa Cầu, Lặn ngắm san hô Cù Lao Chàm, Thuyền hoa đăng sông Hoài",
      status: "active",
      toursCount: 5
    },
    {
      id: "dest-5",
      name: "Bà Nà Hills & Cầu Vàng",
      province: "Đà Nẵng",
      region: "central",
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80",
      description: "Đường lên tiên cảnh với kiến trúc Làng Pháp cổ kính và Cầu Vàng lừng danh thế giới.",
      highlights: "Cầu Vàng Đôi Bàn Tay, Làng Pháp, Fantasy Park, Hầm rượu Debay",
      status: "active",
      toursCount: 6
    },
    {
      id: "dest-6",
      name: "Eo Gió & Bãi Biển Kỳ Co",
      province: "Bình Định",
      region: "central",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      description: "Nơi ngắm hoàng hôn đẹp nhất Việt Nam với bãi biển xanh ngọc bích và đồi cát Phương Mai.",
      highlights: "Con đường ven biển Eo Gió, Bãi lặn san hô Kỳ Co, Tịnh Xá Ngọc Hòa",
      status: "active",
      toursCount: 3
    },
    {
      id: "dest-7",
      name: "Đảo Ngọc Phú Quốc & Grand World",
      province: "Kiên Giang",
      region: "south",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      description: "Thiên đường nghỉ dưỡng biển đảo nhiệt đới với VinWonders, Safari và hoàng hôn Bãi Dài.",
      highlights: "Cáp treo Hòn Thơm, Safari Phú Quốc, Grand World Thành phố không ngủ",
      status: "active",
      toursCount: 4
    },
    {
      id: "dest-8",
      name: "Chợ Nổi Cái Răng & Vườn Trái Cây Miệt Vườn",
      province: "Cần Thơ",
      region: "south",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80",
      description: "Văn hóa sông nước miền Tây đặc trưng với ghe thuyền tấp nập và đờn ca tài tử Nam Bộ.",
      highlights: "Chợ nổi Cái Răng, Vườn cacao Mười Cương, Nhà cổ Bình Thủy",
      status: "active",
      toursCount: 2
    }
  ],
  tourUpdates: [
    {
      id: "upd-1",
      departureId: "dep-1",
      guideId: "usr-guide-1",
      guideName: "Trần Quốc Hưng",
      tourTitle: "Khám Phá Di Sản Miền Trung: Đà Nẵng - Hội An - Huế 4N3Đ",
      currentCheckpoint: "check-3",
      checkpointName: "Đoàn đang tham quan Cầu Vàng - Bà Nà Hills",
      checkpointStatus: "in_progress",
      headcountChecked: 18,
      totalGuests: 18,
      weather: "Nắng nhẹ 27°C, rất thuận lợi tham quan",
      vehicleStatus: "Xe 29 chỗ Universe số 43B-029.88 vận hành an toàn",
      fieldNotes: "Đoàn tập trung đúng giờ tại sảnh khách sạn lúc 07:30. Khách tham quan Cầu Vàng hào hứng chụp ảnh. Ăn trưa buffet tại nhà hàng Club lúc 12:00.",
      emergencyAlert: null,
      updatedAt: "17/09/2026 10:45"
    }
  ],
  media: [
    { id: "med-1", title: "Du Thuyền Hạ Long 5 Sao", url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80", category: "Tour", tourId: "tour-1", date: "15/09/2026", size: "1.4 MB" },
    { id: "med-2", title: "Đỉnh Fansipan Sa Pa Mùa Lúa", url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80", category: "Tour", tourId: "tour-2", date: "12/09/2026", size: "1.8 MB" },
    { id: "med-3", title: "Cầu Vàng Bà Nà Hills Đà Nẵng", url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80", category: "Tour", tourId: "tour-3", date: "10/09/2026", size: "2.1 MB" },
    { id: "med-4", title: "Đảo Ngọc Phú Quốc Biển Xanh", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", category: "Tour", tourId: "tour-4", date: "08/09/2026", size: "1.6 MB" },
    { id: "med-5", title: "Eo Gió & Biển Kỳ Co Quy Nhơn", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", category: "Tour", tourId: "tour-12", date: "05/09/2026", size: "1.5 MB" },
    { id: "med-6", title: "Quần Thể Danh Thắng Tràng An", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80", category: "Địa điểm", tourId: "tour-6", date: "02/09/2026", size: "1.9 MB" },
    { id: "med-7", title: "Phố Cổ Hội An Lung Linh Đèn Lồng", url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80", category: "Địa điểm", tourId: "tour-3", date: "28/08/2026", size: "2.3 MB" },
    { id: "med-8", title: "Chợ Nổi Cái Răng Cần Thơ", url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80", category: "Địa điểm", tourId: "tour-8", date: "25/08/2026", size: "1.7 MB" }
  ],
  payments: [
    {
      id: "pay-1",
      transactionId: "TXN-20260917-8891",
      bookingId: "BK-892347",
      customerName: "Nguyễn Văn Hào",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao 3N2Đ",
      amount: 6980000,
      method: "vnpay",
      methodLabel: "VNPay QR",
      date: "17/09/2026 09:30",
      status: "paid",
      statusLabel: "Đã thanh toán"
    },
    {
      id: "pay-2",
      transactionId: "TXN-20260916-7712",
      bookingId: "BK-892348",
      customerName: "Trần Thị Mai",
      tourTitle: "Đà Nẵng - Hội An - Bà Nà Hills Cầu Vàng 4N3Đ",
      amount: 9180000,
      method: "bank_transfer",
      methodLabel: "Chuyển khoản VCB QR",
      date: "16/09/2026 14:15",
      status: "paid",
      statusLabel: "Đã thanh toán"
    },
    {
      id: "pay-3",
      transactionId: "TXN-20260916-6540",
      bookingId: "BK-892349",
      customerName: "Lê Hoàng Nam",
      tourTitle: "Chinh Phục Fansipan & Săn Mây Sa Pa 2N1Đ",
      amount: 4380000,
      method: "momo",
      methodLabel: "Ví MoMo",
      date: "16/09/2026 11:20",
      status: "pending",
      statusLabel: "Chờ xác nhận"
    },
    {
      id: "pay-4",
      transactionId: "TXN-20260915-5432",
      bookingId: "BK-892350",
      customerName: "Phạm Thu Trang",
      tourTitle: "Quy Nhơn - Kỳ Co - Eo Gió 3N2Đ",
      amount: 6700000,
      method: "credit_card",
      methodLabel: "Thẻ Quốc Tế Visa/Master",
      date: "15/09/2026 16:40",
      status: "paid",
      statusLabel: "Đã thanh toán"
    },
    {
      id: "pay-5",
      transactionId: "TXN-20260914-4321",
      bookingId: "BK-892351",
      customerName: "Đỗ Mạnh Cường",
      tourTitle: "Thiên Đường Biển Đảo Phú Quốc 3N2Đ",
      amount: 7980000,
      method: "cash",
      methodLabel: "Tiền mặt tại quầy",
      date: "14/09/2026 10:05",
      status: "refunded",
      statusLabel: "Đã hoàn tiền"
    }
  ]
};

// Auto-initialize Mock Database in LocalStorage
function getMockDatabase() {
  const localDb = localStorage.getItem('bookingtour_db');
  if (localDb) {
    try {
      const parsed = JSON.parse(localDb);
      // Auto-migrate missing tables if needed
      let changed = false;
      if (!parsed.roles) { parsed.roles = DEFAULT_MOCK_DATA.roles; changed = true; }
      if (!parsed.modules) { parsed.modules = DEFAULT_MOCK_DATA.modules; changed = true; }
      if (!parsed.role_permissions) { parsed.role_permissions = DEFAULT_MOCK_DATA.role_permissions; changed = true; }
      if (!parsed.categories) { parsed.categories = DEFAULT_MOCK_DATA.categories; changed = true; }
      if (!parsed.promotions) { parsed.promotions = DEFAULT_MOCK_DATA.promotions; changed = true; }
      if (!parsed.destinations) { parsed.destinations = DEFAULT_MOCK_DATA.destinations; changed = true; }
      if (!parsed.tourUpdates) { parsed.tourUpdates = DEFAULT_MOCK_DATA.tourUpdates; changed = true; }
      if (!parsed.media) { parsed.media = DEFAULT_MOCK_DATA.media; changed = true; }
      if (!parsed.payments) { parsed.payments = DEFAULT_MOCK_DATA.payments; changed = true; }
      if (changed) {
        saveMockDatabase(parsed);
      }
      return parsed;
    } catch (e) {
      console.error("Error parsing local database, resetting to default:", e);
    }
  }
  localStorage.setItem('bookingtour_db', JSON.stringify(DEFAULT_MOCK_DATA));
  return DEFAULT_MOCK_DATA;
}

function saveMockDatabase(data) {
  localStorage.setItem('bookingtour_db', JSON.stringify(data));
}

function resetMockDatabase() {
  localStorage.setItem('bookingtour_db', JSON.stringify(DEFAULT_MOCK_DATA));
  console.log("Mock Database reset to defaults.");
}

