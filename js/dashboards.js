/* ==========================================================================
   BOOKING TOUR - DASHBOARDS MODULE
   Guide, Tour Manager & Admin Dashboard Interactive Management
   ========================================================================== */

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
// 16. MANAGER DASHBOARD LOGIC (OPTIMIZED V2)
// ==========================================

function initManagerDashboard() {
  const managerTourTable = document.getElementById('managerTourTable');
  const formAddTour = document.getElementById('formAddTour');
  const formAddDeparture = document.getElementById('formAddDeparture');
  const depTourSelect = document.getElementById('depTourSelect');
  const managerSearchInput = document.getElementById('managerSearchInput');

  if (!managerTourTable && !formAddTour && !formAddDeparture) return;

  const db = getMockDatabase();
  const expandedTourIds = new Set();
  let tourSearchKeyword = '';

  // Expand the first tour by default for immediate clear view
  if (db.tours.length > 0) {
    expandedTourIds.add(db.tours[0].id);
  }

  function parseVnDate(value) {
    if (!value || value === 'Theo lịch trình') return Number.MAX_SAFE_INTEGER;
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  function toInputDate(value) {
    if (!value || value === 'Theo lịch trình') return '';
    const [day, month, year] = value.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  function fromInputDate(value) {
    if (!value) return 'Theo lịch trình';
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }

  function formatDateIso(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getNextSaturday(offsetWeeks = 0) {
    const now = new Date();
    const day = now.getDay();
    let daysUntilSat = (6 - day + 7) % 7;
    if (daysUntilSat === 0 && offsetWeeks === 0) daysUntilSat = 7;
    daysUntilSat += offsetWeeks * 7;
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSat);
    return formatDateIso(target);
  }

  function addDaysIso(isoStr, days) {
    if (!isoStr) return '';
    const [y, m, d] = isoStr.split('-').map(Number);
    const date = new Date(y, m - 1, d + days);
    return formatDateIso(date);
  }

  function getDepartureStatus(slots, maxSlots) {
    if (slots <= 0) {
      return { status: 'Sold Out', statusText: 'Hết chỗ', badgeClass: 'badge-sold-out' };
    }
    if (slots <= Math.max(3, Math.ceil(maxSlots * 0.2))) {
      return { status: 'Almost Full', statusText: 'Sắp hết chỗ', badgeClass: 'badge-almost-full' };
    }
    return { status: 'Available', statusText: 'Còn chỗ', badgeClass: 'badge-available' };
  }

  function getTourDepartures(tourId) {
    return db.departures
      .filter(dep => dep.tourId === tourId)
      .sort((a, b) => parseVnDate(a.date) - parseVnDate(b.date));
  }

  function getNextDeparture(tourId) {
    return getTourDepartures(tourId).find(dep => dep.status !== 'Sold Out' && dep.slots > 0) || null;
  }

  function populateDepartureTourSelect(selectedTourId = null) {
    if (!depTourSelect) return;
    depTourSelect.innerHTML = db.tours.map(tour => `
      <option value="${tour.id}">${tour.title}</option>
    `).join('');
    if (selectedTourId && db.tours.some(tour => tour.id === selectedTourId)) {
      depTourSelect.value = selectedTourId;
    }
  }

  function renderDeparturesHtml(tour) {
    const departures = getTourDepartures(tour.id);
    if (!departures.length) {
      return `
        <div class="manager-departure-empty">
          <i class="fa-regular fa-calendar-plus"></i>
          <strong>Chưa có chuyến khởi hành nào cho tour này</strong>
          <span>Sử dụng thanh "Thêm Nhanh Chuyến Khởi Hành" ở trên để tạo chuyến nhanh 1 chạm.</span>
        </div>
      `;
    }

    return departures.map(dep => {
      const booked = Math.max(0, (dep.maxSlots || 0) - (dep.slots || 0));
      const fillPercent = dep.maxSlots ? Math.min(100, Math.round((booked / dep.maxSlots) * 100)) : 0;
      const status = getDepartureStatus(dep.slots, dep.maxSlots || dep.slots || 1);

      return `
        <article class="manager-departure-card" id="dep-card-${dep.id}">
          <div class="manager-departure-date">
            <span>Ngày khởi hành</span>
            <strong>${dep.date}</strong>
            <small>Đến ${dep.returnDate || 'Theo lịch trình'}</small>
          </div>

          <div class="manager-departure-details">
            <div class="manager-departure-topline">
              <span class="badge ${status.badgeClass}">${status.statusText}</span>
              <span><i class="fa-solid fa-user-tie" style="color:#0f766e;"></i> <strong>${dep.guideName || 'Chưa gán HDV'}</strong></span>
            </div>
            <div class="manager-capacity-line">
              <div>
                <strong>${dep.slots}/${dep.maxSlots}</strong>
                <span>chỗ còn nhận</span>
              </div>
              <div class="manager-capacity-progress"><span style="width:${fillPercent}%"></span></div>
              <small><strong>${booked}</strong> khách đã giữ chỗ (${fillPercent}%)</small>
            </div>
          </div>

          <div class="manager-departure-price">
            <span>Giá vé / khách</span>
            <strong>${formatCurrency(dep.price)}</strong>
          </div>

          <div class="manager-departure-actions">
            <button type="button" class="btn btn-outline btn-sm" onclick="openManagerDepartureModal('${tour.id}', '${dep.id}')" title="Chỉnh sửa chuyến">
              <i class="fa-solid fa-pen"></i> Sửa
            </button>
            <button type="button" class="btn btn-outline btn-sm text-danger" onclick="deleteManagerDeparture('${dep.id}', '${tour.id}')" title="Xóa chuyến">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderManagerTours() {
    if (!managerTourTable) return;

    const normalizedKeyword = tourSearchKeyword.trim().toLowerCase();
    const tours = db.tours.filter(tour => {
      if (!normalizedKeyword) return true;
      return tour.title.toLowerCase().includes(normalizedKeyword)
        || tour.location.toLowerCase().includes(normalizedKeyword);
    });

    if (!tours.length) {
      managerTourTable.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:36px;">
            <span class="text-muted">Không tìm thấy tour phù hợp với từ khóa "${tourSearchKeyword}".</span>
          </td>
        </tr>
      `;
      return;
    }

    const defaultStartDate = getNextSaturday(1);
    const guideOptionsHtml = db.users
      .filter(u => u.role === 'guide')
      .map(g => `<option value="${g.id}">${g.name} (${g.roleLabel || 'HDV'})</option>`)
      .join('');

    managerTourTable.innerHTML = tours.map(tour => {
      const tourDepartures = getTourDepartures(tour.id);
      const nextDeparture = getNextDeparture(tour.id);
      const isExpanded = expandedTourIds.has(tour.id);
      const tourDays = tour.days || (parseInt(tour.duration, 10) || 3);
      const defaultReturnDate = addDaysIso(defaultStartDate, Math.max(1, tourDays - 1));

      return `
        <tr class="manager-tour-row ${isExpanded ? 'is-expanded' : ''}" id="tour-row-${tour.id}">
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${tour.image}" style="width:58px; height:44px; object-fit:cover; border-radius:var(--radius-sm);" alt="${tour.title}">
              <div>
                <strong style="display:block; font-size:0.9rem;">${tour.title}</strong>
                <span class="text-muted" style="font-size:0.75rem;"><i class="fa-solid fa-location-dot"></i> ${tour.location} • ${tour.duration}</span>
              </div>
            </div>
          </td>
          <td><strong class="text-primary">${formatCurrency(tour.price)}</strong></td>
          <td>
            <!-- Prominent Ergonomic Toggle Button -->
            <button type="button" 
                    class="manager-schedule-toggle-btn ${isExpanded ? 'is-active' : ''}" 
                    id="btn-toggle-${tour.id}" 
                    onclick="toggleManagerTourDrawer('${tour.id}')" 
                    title="Bấm để xem và quản lý chuyến khởi hành" 
                    aria-expanded="${isExpanded}">
              <div class="toggle-icon-wrap">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="toggle-text">
                <strong>${tourDepartures.length} Chuyến Đi</strong>
                <span>${nextDeparture ? `Gần nhất ${nextDeparture.date}` : 'Chưa có lịch'}</span>
              </div>
              <i class="fa-solid fa-chevron-down toggle-chevron"></i>
            </button>
          </td>
          <td><span class="badge ${tour.featured ? 'badge-warning' : 'badge-neutral'}">${tour.featured ? 'Nổi bật' : 'Tiêu chuẩn'}</span></td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button class="btn ${isExpanded ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="toggleManagerTourDrawer('${tour.id}')" title="${isExpanded ? 'Thu gọn lịch' : 'Quản lý lịch'}">
                <i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-calendar-days'}"></i> ${isExpanded ? 'Đóng' : 'Lịch'}
              </button>
              <a href="tour-detail.html?id=${tour.id}" target="_blank" class="btn btn-outline btn-sm" title="Xem trang khách hàng"><i class="fa-regular fa-eye"></i></a>
              <button class="btn btn-outline btn-sm text-danger" onclick="deleteTour('${tour.id}')" title="Xóa tour"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </td>
        </tr>

        <!-- IN-PLACE EXPANDABLE DRAWER ROW -->
        <tr class="manager-drawer-row ${isExpanded ? 'is-open' : ''}" id="drawer-${tour.id}">
          <td colspan="5" class="manager-drawer-cell">
            <div class="manager-drawer-content">
              
              <!-- Tour Summary Banner -->
              <div class="manager-drawer-tour-banner">
                <div class="manager-drawer-tour-info">
                  <img src="${tour.image}" alt="${tour.title}">
                  <div>
                    <span class="badge badge-primary" style="font-size:0.7rem; padding:3px 8px; margin-bottom:4px; display:inline-block;">QUẢN LÝ LỊCH KHỞI HÀNH</span>
                    <h3>${tour.title}</h3>
                    <p><i class="fa-solid fa-location-dot"></i> ${tour.location} • ${tour.duration} • Giá chuẩn: ${formatCurrency(tour.price)}</p>
                  </div>
                </div>
                <div class="manager-drawer-stats">
                  <div class="manager-stat-pill">
                    <strong id="stat-total-${tour.id}">${tourDepartures.length}</strong>
                    <span>Tổng Chuyến</span>
                  </div>
                  <div class="manager-stat-pill">
                    <strong id="stat-active-${tour.id}">${tourDepartures.filter(d => d.slots > 0).length}</strong>
                    <span>Đang Mở Bán</span>
                  </div>
                </div>
              </div>

              <!-- SIÊU TIỆN LỢI: Quick Add Inline Form (1 Chạm) -->
              <div class="manager-quick-add-box">
                <div class="manager-quick-add-header">
                  <div class="manager-quick-add-title">
                    <i class="fa-solid fa-bolt text-warning"></i>
                    <span>Thêm Nhanh Chuyến Khởi Hành (Không cần mở modal)</span>
                  </div>
                  <div class="manager-quick-add-presets">
                    <span>Gợi ý ngày:</span>
                    <button type="button" class="manager-preset-chip" onclick="applyQuickPreset('${tour.id}', 1, ${tourDays})">T7 Tuần Này</button>
                    <button type="button" class="manager-preset-chip" onclick="applyQuickPreset('${tour.id}', 2, ${tourDays})">T7 Tuần Sau</button>
                    <button type="button" class="manager-preset-chip" onclick="applyQuickPreset('${tour.id}', 3, ${tourDays})">+3 Tuần</button>
                  </div>
                </div>

                <form class="manager-quick-add-form" id="quick-form-${tour.id}" onsubmit="handleQuickAddDeparture(event, '${tour.id}', ${tourDays})">
                  <div class="form-group">
                    <label class="form-label required">Ngày Khởi Hành</label>
                    <input type="date" class="form-control" id="quick-start-${tour.id}" value="${defaultStartDate}" onchange="autoComputeReturnDate('${tour.id}', ${tourDays})" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Ngày Về (Tự tính)</label>
                    <input type="date" class="form-control" id="quick-return-${tour.id}" value="${defaultReturnDate}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Giá Vé (VND)</label>
                    <input type="number" class="form-control" id="quick-price-${tour.id}" value="${tour.price}" step="50000" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Số Chỗ</label>
                    <input type="number" class="form-control" id="quick-slots-${tour.id}" value="20" min="1" max="100" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Phân Công HDV</label>
                    <select class="form-control" id="quick-guide-${tour.id}" required>
                      ${guideOptionsHtml}
                    </select>
                  </div>
                  <button type="submit" class="manager-btn-add-quick">
                    <i class="fa-solid fa-plus"></i> + Thêm Chuyến
                  </button>
                </form>
              </div>

              <!-- Danh Sách Chuyến Khởi Hành Của Tour -->
              <div class="manager-departure-list-title">
                <span><i class="fa-solid fa-list-check text-primary"></i> Các Chuyến Khởi Hành Hiện Có (<span id="count-title-${tour.id}">${tourDepartures.length}</span>)</span>
                <button type="button" class="btn btn-outline btn-sm" onclick="openManagerDepartureModal('${tour.id}')">
                  <i class="fa-solid fa-sliders"></i> Mở Form Nâng Cao
                </button>
              </div>

              <div class="manager-departure-list" id="departure-list-${tour.id}">
                ${renderDeparturesHtml(tour)}
              </div>

            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Smooth In-Place Toggle Drawer (NO full table re-render, NO scroll jumps!)
  window.toggleManagerTourDrawer = (tourId) => {
    const drawerRow = document.getElementById(`drawer-${tourId}`);
    const tourRow = document.getElementById(`tour-row-${tourId}`);
    const toggleBtn = document.getElementById(`btn-toggle-${tourId}`);

    if (!drawerRow || !tourRow) return;

    if (expandedTourIds.has(tourId)) {
      expandedTourIds.delete(tourId);
      drawerRow.classList.remove('is-open');
      tourRow.classList.remove('is-expanded');
      if (toggleBtn) {
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    } else {
      expandedTourIds.add(tourId);
      drawerRow.classList.add('is-open');
      tourRow.classList.add('is-expanded');
      if (toggleBtn) {
        toggleBtn.classList.add('is-active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    }
  };

  // Auto Compute Return Date when Start Date changes
  window.autoComputeReturnDate = (tourId, tourDays) => {
    const startInput = document.getElementById(`quick-start-${tourId}`);
    const returnInput = document.getElementById(`quick-return-${tourId}`);
    if (startInput && returnInput && startInput.value) {
      const daysToAdd = Math.max(1, (tourDays || 3) - 1);
      returnInput.value = addDaysIso(startInput.value, daysToAdd);
    }
  };

  // Quick Preset Date Helpers
  window.applyQuickPreset = (tourId, offsetWeeks, tourDays) => {
    const startInput = document.getElementById(`quick-start-${tourId}`);
    const returnInput = document.getElementById(`quick-return-${tourId}`);
    if (startInput && returnInput) {
      const targetStart = getNextSaturday(offsetWeeks - 1);
      startInput.value = targetStart;
      const daysToAdd = Math.max(1, (tourDays || 3) - 1);
      returnInput.value = addDaysIso(targetStart, daysToAdd);
    }
  };

  // Handle Quick Add Departure Form Submission
  window.handleQuickAddDeparture = (event, tourId, tourDays) => {
    if (event) event.preventDefault();

    const startInput = document.getElementById(`quick-start-${tourId}`);
    const returnInput = document.getElementById(`quick-return-${tourId}`);
    const priceInput = document.getElementById(`quick-price-${tourId}`);
    const slotsInput = document.getElementById(`quick-slots-${tourId}`);
    const guideSelect = document.getElementById(`quick-guide-${tourId}`);

    if (!startInput || !returnInput) return;

    const startDate = startInput.value;
    const returnDate = returnInput.value;
    const price = parseInt(priceInput.value, 10) || 3000000;
    const slots = parseInt(slotsInput.value, 10) || 20;
    const guideId = guideSelect.value;
    const guideUser = db.users.find(u => u.id === guideId);
    const tour = db.tours.find(t => t.id === tourId);

    const status = getDepartureStatus(slots, slots);

    const newDep = {
      id: `dep-${Date.now()}`,
      tourId: tourId,
      tourTitle: tour ? tour.title : 'Tour',
      date: fromInputDate(startDate),
      returnDate: fromInputDate(returnDate),
      slots: slots,
      maxSlots: slots,
      price: price,
      guideId: guideId,
      guideName: guideUser ? guideUser.name : 'Chưa phân công',
      progressStatus: 'upcoming',
      ...status
    };

    db.departures.unshift(newDep);
    saveMockDatabase(db);

    // Update only the departure container & stats for this tour smoothly without full reload!
    updateTourDepartureView(tourId);

    // Prepare next suggestion date (+7 days)
    startInput.value = addDaysIso(startDate, 7);
    returnInput.value = addDaysIso(startInput.value, Math.max(1, (tourDays || 3) - 1));

    showToast(`Đã thêm chuyến đi ngày ${newDep.date} thành công!`, 'success');
  };

  // Update only the specific tour's departure list and stat badges
  function updateTourDepartureView(tourId) {
    const tour = db.tours.find(t => t.id === tourId);
    if (!tour) return;

    const listContainer = document.getElementById(`departure-list-${tourId}`);
    if (listContainer) {
      listContainer.innerHTML = renderDeparturesHtml(tour);
    }

    const departures = getTourDepartures(tourId);
    const nextDeparture = getNextDeparture(tourId);

    // Update banner stats
    const totalEl = document.getElementById(`stat-total-${tourId}`);
    const activeEl = document.getElementById(`stat-active-${tourId}`);
    const countTitleEl = document.getElementById(`count-title-${tourId}`);
    if (totalEl) totalEl.textContent = departures.length;
    if (activeEl) activeEl.textContent = departures.filter(d => d.slots > 0).length;
    if (countTitleEl) countTitleEl.textContent = departures.length;

    // Update the toggle button in the table row
    const toggleBtn = document.getElementById(`btn-toggle-${tourId}`);
    if (toggleBtn) {
      const toggleText = toggleBtn.querySelector('.toggle-text');
      if (toggleText) {
        toggleText.innerHTML = `
          <strong>${departures.length} Chuyến Đi</strong>
          <span>${nextDeparture ? `Gần nhất ${nextDeparture.date}` : 'Chưa có lịch'}</span>
        `;
      }
    }
  }

  // Delete departure
  window.deleteManagerDeparture = (departureId, tourId) => {
    const dep = db.departures.find(item => item.id === departureId);
    if (!dep) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa chuyến khởi hành ngày ${dep.date}?`)) return;

    db.departures = db.departures.filter(item => item.id !== departureId);
    saveMockDatabase(db);
    updateTourDepartureView(tourId || dep.tourId);
    showToast('Đã xóa chuyến khởi hành thành công.', 'info');
  };

  // Delete tour
  window.deleteTour = (tourId) => {
    const tour = db.tours.find(item => item.id === tourId);
    if (!tour) return;
    if (!confirm(`Xóa tour "${tour.title}" và toàn bộ lịch khởi hành của tour này?`)) return;

    db.tours = db.tours.filter(item => item.id !== tourId);
    db.departures = db.departures.filter(dep => dep.tourId !== tourId);
    expandedTourIds.delete(tourId);
    saveMockDatabase(db);
    renderManagerTours();
    showToast('Đã xóa tour và các chuyến khởi hành liên quan.', 'info');
  };

  // Open modal for advanced edit
  window.openManagerDepartureModal = (tourId = null, departureId = null) => {
    const editIdEl = document.getElementById('depEditId');
    const titleEl = document.getElementById('departureModalTitle');
    const submitButton = document.getElementById('departureSubmitButton');
    const startDateEl = document.getElementById('depStartDate');
    const returnDateEl = document.getElementById('depReturnDate');
    const slotsEl = document.getElementById('depSlots');
    const maxSlotsEl = document.getElementById('depMaxSlots');
    const priceEl = document.getElementById('depPrice');
    const guideEl = document.getElementById('depGuideSelect');

    populateDepartureTourSelect(tourId);

    const dep = departureId ? db.departures.find(item => item.id === departureId) : null;
    if (editIdEl) editIdEl.value = dep?.id || '';

    if (dep) {
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square text-warning"></i> Chỉnh Sửa Chuyến Khởi Hành';
      if (submitButton) submitButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Thay Đổi';
      if (depTourSelect) depTourSelect.value = dep.tourId;
      if (startDateEl) startDateEl.value = toInputDate(dep.date);
      if (returnDateEl) returnDateEl.value = toInputDate(dep.returnDate);
      if (slotsEl) slotsEl.value = dep.slots;
      if (maxSlotsEl) maxSlotsEl.value = dep.maxSlots;
      if (priceEl) priceEl.value = dep.price;
      if (guideEl) guideEl.value = dep.guideId || '';
    } else {
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-calendar-plus text-warning"></i> Thêm Lịch Khởi Hành & Gán HDV';
      if (submitButton) submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Xác Nhận Tạo Lịch';
      formAddDeparture?.reset();
      populateDepartureTourSelect(tourId);
      if (tourId && depTourSelect) depTourSelect.value = tourId;
      if (editIdEl) editIdEl.value = '';
    }

    openModal('modalAddDeparture');
  };

  // Modal Departure Form Handler
  if (formAddDeparture) {
    formAddDeparture.addEventListener('submit', (event) => {
      event.preventDefault();

      const editId = document.getElementById('depEditId')?.value || '';
      const tourId = depTourSelect?.value;
      const startDate = document.getElementById('depStartDate').value;
      const returnDate = document.getElementById('depReturnDate').value;
      const guideId = document.getElementById('depGuideSelect').value;
      const slots = Math.max(0, parseInt(document.getElementById('depSlots').value, 10) || 0);
      const maxSlots = Math.max(1, parseInt(document.getElementById('depMaxSlots').value, 10) || 1);
      const price = Math.max(0, parseInt(document.getElementById('depPrice').value, 10) || 0);

      if (slots > maxSlots) {
        showToast('Số chỗ còn mở không thể lớn hơn sức chứa tối đa.', 'warning');
        return;
      }

      const matchedTour = db.tours.find(tour => tour.id === tourId);
      const matchedGuide = db.users.find(user => user.id === guideId);
      const status = getDepartureStatus(slots, maxSlots);

      if (editId) {
        const dep = db.departures.find(item => item.id === editId);
        if (!dep) return;

        Object.assign(dep, {
          tourId,
          tourTitle: matchedTour ? matchedTour.title : dep.tourTitle,
          date: fromInputDate(startDate),
          returnDate: fromInputDate(returnDate),
          slots,
          maxSlots,
          price,
          guideId,
          guideName: matchedGuide ? matchedGuide.name : 'Chưa phân công',
          ...status
        });
        showToast('Đã cập nhật chuyến khởi hành.', 'success');
      } else {
        db.departures.unshift({
          id: `dep-${Date.now()}`,
          tourId,
          tourTitle: matchedTour ? matchedTour.title : 'Tour Mới',
          date: fromInputDate(startDate),
          returnDate: fromInputDate(returnDate),
          slots,
          maxSlots,
          price,
          guideId,
          guideName: matchedGuide ? matchedGuide.name : 'Chưa phân công',
          progressStatus: 'upcoming',
          ...status
        });
        showToast('Đã tạo chuyến khởi hành mới cho tour.', 'success');
      }

      saveMockDatabase(db);
      closeModal('modalAddDeparture');
      formAddDeparture.reset();
      updateTourDepartureView(tourId);
    });
  }

  // Create New Tour Form
  if (formAddTour) {
    formAddTour.addEventListener('submit', (event) => {
      event.preventDefault();
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
        days: parseInt(duration, 10) || 3,
        rating: 5.0,
        reviewsCount: 0,
        price,
        image: img,
        featured: false,
        popular: true,
        topRated: false,
        maxGuests: 20,
        status: 'active',
        description: desc
      };

      db.tours.unshift(newTour);
      expandedTourIds.add(newTour.id);
      saveMockDatabase(db);
      renderManagerTours();
      closeModal('modalAddTour');
      formAddTour.reset();
      showToast('Đã thêm tour mới thành công! Lịch khởi hành đã mở sẵn để bạn tạo chuyến.', 'success');
    });
  }

  // Search filter
  if (managerSearchInput) {
    managerSearchInput.addEventListener('input', () => {
      tourSearchKeyword = managerSearchInput.value;
      renderManagerTours();
    });
  }

  renderManagerTours();
}


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
