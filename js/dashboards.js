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

  // Global helpers for Tour Creation Form: Day of Week, Date Range & Duration Bidirectional Calculation
  window.getDayOfWeekInfo = function(dateStr) {
    if (!dateStr) return { dayName: '', fullText: '', shortCode: '' };
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return { dayName: '', fullText: '', shortCode: '' };
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const shortCodes = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayIndex = date.getDay();
    const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    return {
      dayName: days[dayIndex],
      fullText: `${days[dayIndex]}, ${formatted}`,
      shortCode: shortCodes[dayIndex]
    };
  };

  window.addDaysToDateStr = function(dateStr, daysToAdd) {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    d.setDate(d.getDate() + daysToAdd);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  window.autoFillSeasonDates = function(seasonVal) {
    const startEl = document.getElementById('newTourStartDate');
    const endEl = document.getElementById('newTourEndDate');
    const map = {
      autumn: { start: '2026-09-18', end: '2026-09-20' },
      summer: { start: '2026-06-12', end: '2026-06-14' },
      spring: { start: '2026-02-20', end: '2026-02-22' },
      winter: { start: '2026-12-18', end: '2026-12-20' },
      festival: { start: '2026-12-31', end: '2027-01-02' },
      all_year: { start: '2026-09-18', end: '2026-09-20' }
    };
    if (map[seasonVal]) {
      if (startEl) startEl.value = map[seasonVal].start;
      if (endEl) endEl.value = map[seasonVal].end;
      window.handleTourStartDateChange();
    }
  };

  window.handleTourStartDateChange = function() {
    const startEl = document.getElementById('newTourStartDate');
    const endEl = document.getElementById('newTourEndDate');
    const presetEl = document.getElementById('newTourPresetDuration');
    const startDayOfWeekEl = document.getElementById('newTourStartDayOfWeek');
    const endDayOfWeekEl = document.getElementById('newTourEndDayOfWeek');
    const daysEl = document.getElementById('newTourDays');
    const durationEl = document.getElementById('newTourDuration');
    const badgeEl = document.getElementById('tourDurationBadge');

    if (!startEl || !startEl.value) return;

    const startInfo = window.getDayOfWeekInfo(startEl.value);
    if (startDayOfWeekEl) {
      startDayOfWeekEl.innerHTML = `<i class="fa-solid fa-calendar-day"></i> ${startInfo.dayName}`;
    }

    // Auto highlight start day in weekly pills if not checked
    const matchingPill = document.querySelector(`input[name="tourDaysOfWeek"][value="${startInfo.shortCode}"]`);
    if (matchingPill && !matchingPill.checked) {
      matchingPill.checked = true;
      window.updateDaysOfWeekSummary();
    }

    // If preset is selected (e.g. 1, 2, 3, 4, 5, 6, 7), calculate end date automatically
    if (presetEl && presetEl.value !== 'custom') {
      const days = parseInt(presetEl.value, 10) || 1;
      const computedEnd = window.addDaysToDateStr(startEl.value, days - 1);
      if (endEl) endEl.value = computedEnd;
      if (endDayOfWeekEl) {
        const endInfo = window.getDayOfWeekInfo(computedEnd);
        endDayOfWeekEl.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${endInfo.dayName}`;
      }
      const durText = days === 1 ? '1 Ngày' : `${days} Ngày ${days - 1} Đêm`;
      if (daysEl) daysEl.value = days;
      if (durationEl) durationEl.value = durText;
      if (badgeEl) badgeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${durText} (${days} ngày)`;
    } else if (endEl && endEl.value) {
      window.handleTourEndDateChange();
    }
  };

  window.handlePresetDurationChange = function(presetVal) {
    const startEl = document.getElementById('newTourStartDate');
    const endEl = document.getElementById('newTourEndDate');
    const daysEl = document.getElementById('newTourDays');
    const durationEl = document.getElementById('newTourDuration');
    const badgeEl = document.getElementById('tourDurationBadge');
    const endDayOfWeekEl = document.getElementById('newTourEndDayOfWeek');

    if (presetVal === 'custom') return;

    const days = parseInt(presetVal, 10) || 1;
    const startDate = (startEl && startEl.value) ? startEl.value : '2026-09-18';
    if (startEl && !startEl.value) startEl.value = startDate;

    const computedEnd = window.addDaysToDateStr(startDate, days - 1);
    if (endEl) endEl.value = computedEnd;

    const durText = days === 1 ? '1 Ngày' : `${days} Ngày ${days - 1} Đêm`;
    if (daysEl) daysEl.value = days;
    if (durationEl) durationEl.value = durText;
    if (badgeEl) badgeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${durText} (${days} ngày)`;

    if (endDayOfWeekEl) {
      const endInfo = window.getDayOfWeekInfo(computedEnd);
      endDayOfWeekEl.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${endInfo.dayName}`;
    }
  };

  window.handleTourEndDateChange = function() {
    const startEl = document.getElementById('newTourStartDate');
    const endEl = document.getElementById('newTourEndDate');
    const presetEl = document.getElementById('newTourPresetDuration');
    const endDayOfWeekEl = document.getElementById('newTourEndDayOfWeek');
    const daysEl = document.getElementById('newTourDays');
    const durationEl = document.getElementById('newTourDuration');
    const badgeEl = document.getElementById('tourDurationBadge');

    if (!startEl || !endEl || !startEl.value || !endEl.value) return;

    const dStart = new Date(startEl.value + 'T00:00:00');
    let dEnd = new Date(endEl.value + 'T00:00:00');

    if (dEnd < dStart) {
      if (typeof showToast === 'function') {
        showToast('Ngày kết thúc không thể trước ngày bắt đầu!', 'warning');
      }
      endEl.value = startEl.value;
      dEnd = dStart;
    }

    const diffTime = Math.abs(dEnd - dStart);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive count

    const durText = diffDays === 1 ? '1 Ngày' : `${diffDays} Ngày ${diffDays - 1} Đêm`;
    if (daysEl) daysEl.value = diffDays;
    if (durationEl) durationEl.value = durText;
    if (badgeEl) badgeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${durText} (${diffDays} ngày)`;

    const endInfo = window.getDayOfWeekInfo(endEl.value);
    if (endDayOfWeekEl) {
      endDayOfWeekEl.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${endInfo.dayName}`;
    }

    if (presetEl) {
      if (['1', '2', '3', '4', '5', '6', '7'].includes(String(diffDays))) {
        presetEl.value = String(diffDays);
      } else {
        presetEl.value = 'custom';
      }
    }
  };

  window.updateDaysOfWeekSummary = function() {
    const checkboxes = document.querySelectorAll('input[name="tourDaysOfWeek"]');
    const summaryEl = document.getElementById('tourDayOfWeekSummary');
    const checkedVals = [];

    checkboxes.forEach(cb => {
      const parentLabel = cb.closest('.day-pill');
      if (cb.checked) {
        checkedVals.push(cb.value);
        if (parentLabel) parentLabel.classList.add('is-active');
      } else {
        if (parentLabel) parentLabel.classList.remove('is-active');
      }
    });

    if (summaryEl) {
      if (checkedVals.length === 7) {
        summaryEl.innerText = 'Khởi hành: Hàng ngày (T2 - CN)';
      } else if (checkedVals.length === 0) {
        summaryEl.innerText = 'Chưa chọn ngày khởi hành cố định';
      } else {
        const map = { T2: 'Thứ 2', T3: 'Thứ 3', T4: 'Thứ 4', T5: 'Thứ 5', T6: 'Thứ 6', T7: 'Thứ 7', CN: 'Chủ Nhật' };
        const labelList = checkedVals.map(v => map[v] || v).join(', ');
        summaryEl.innerText = `Hàng tuần: ${labelList}`;
      }
    }
  };

  window.setQuickDaysOfWeek = function(mode) {
    const checkboxes = document.querySelectorAll('input[name="tourDaysOfWeek"]');
    checkboxes.forEach(cb => {
      if (mode === 'all') {
        cb.checked = true;
      } else if (mode === 'weekend') {
        cb.checked = ['T6', 'T7', 'CN'].includes(cb.value);
      }
    });
    window.updateDaysOfWeekSummary();
  };

  // Image Preview and Sample Helpers
  window.handleTourImagePreview = function(url) {
    const imgEl = document.getElementById('tourImgPreview');
    const placeholderEl = document.getElementById('tourImgPlaceholder');
    if (!imgEl || !placeholderEl) return;

    if (url && url.trim()) {
      imgEl.style.display = 'block';
      placeholderEl.style.display = 'none';
      imgEl.src = url.trim();
    } else {
      imgEl.style.display = 'none';
      placeholderEl.style.display = 'block';
    }
  };

  window.handleTourImageError = function(imgEl) {
    if (imgEl) imgEl.style.display = 'none';
    const placeholderEl = document.getElementById('tourImgPlaceholder');
    if (placeholderEl) placeholderEl.style.display = 'block';
  };

  window.setTourSampleImage = function(type) {
    const imgInput = document.getElementById('newTourImage');
    const samples = {
      beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      culture: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
      city: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'
    };
    if (imgInput && samples[type]) {
      imgInput.value = samples[type];
      window.handleTourImagePreview(samples[type]);
    }
  };

  function getSeasonBadge(season, seasonLabel) {
    const map = {
      spring: { icon: 'fa-seedling', class: 'badge-success', text: seasonLabel || 'Mùa Xuân' },
      summer: { icon: 'fa-sun', class: 'badge-danger', text: seasonLabel || 'Mùa Hè' },
      autumn: { icon: 'fa-leaf', class: 'badge-warning', text: seasonLabel || 'Mùa Thu' },
      winter: { icon: 'fa-snowflake', class: 'badge-info', text: seasonLabel || 'Mùa Đông' },
      festival: { icon: 'fa-gift', class: 'badge-primary', text: seasonLabel || 'Mùa Lễ Hội / Tết' },
      all_year: { icon: 'fa-globe', class: 'badge-neutral', text: seasonLabel || 'Quanh Năm' }
    };
    const conf = map[season] || map.all_year;
    return `<span class="badge ${conf.class}" style="font-size:0.75rem; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid ${conf.icon}"></i> ${conf.text}</span>`;
  }

  function getStageBadge(stage, stageLabel) {
    const map = {
      peak: { icon: 'fa-bolt', style: 'background:#fef2f2; color:#b91c1c; border:1px solid #fecaca;', text: stageLabel || 'Mùa Cao Điểm' },
      regular: { icon: 'fa-circle-check', style: 'background:#ecfdf5; color:#047857; border:1px solid #a7f3d0;', text: stageLabel || 'Đang Mở Bán' },
      early_bird: { icon: 'fa-gift', style: 'background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe;', text: stageLabel || 'Mở Bán Sớm' },
      low_season: { icon: 'fa-tag', style: 'background:#f8fafc; color:#475569; border:1px solid #cbd5e1;', text: stageLabel || 'Mùa Thấp Điểm' },
      closing: { icon: 'fa-hourglass-half', style: 'background:#fffbeb; color:#b45309; border:1px solid #fde68a;', text: stageLabel || 'Sắp Đóng Mùa' }
    };
    const conf = map[stage] || map.regular;
    return `<span class="badge" style="${conf.style} font-size:0.75rem; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid ${conf.icon}"></i> ${conf.text}</span>`;
  }

  function formatSeasonDates(startDate, endDate) {
    if (!startDate || !endDate) return 'Quanh năm';
    const formatIsoToVn = (iso) => {
      if (!iso) return '';
      const parts = iso.split('-');
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
      return iso;
    };
    return `${formatIsoToVn(startDate)} → ${formatIsoToVn(endDate)}`;
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
        || tour.location.toLowerCase().includes(normalizedKeyword)
        || (tour.seasonLabel && tour.seasonLabel.toLowerCase().includes(normalizedKeyword))
        || (tour.stageLabel && tour.stageLabel.toLowerCase().includes(normalizedKeyword));
    });

    if (!tours.length) {
      managerTourTable.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:36px;">
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
          <!-- Cột 1: Thông Tin Tour -->
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${tour.image}" style="width:58px; height:44px; object-fit:cover; border-radius:var(--radius-sm); box-shadow:0 2px 6px rgba(0,0,0,0.08);" alt="${tour.title}">
              <div>
                <strong style="display:block; font-size:0.9rem; color:#0f172a;">${tour.title}</strong>
                <span class="text-muted" style="font-size:0.75rem;"><i class="fa-solid fa-location-dot text-danger"></i> ${tour.location} • <i class="fa-regular fa-clock text-primary"></i> ${tour.duration}</span>
              </div>
            </div>
          </td>

          <!-- Cột 2: Mùa Vụ & Giai Đoạn -->
          <td>
            <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                ${getSeasonBadge(tour.season, tour.seasonLabel)}
                ${getStageBadge(tour.stage, tour.stageLabel)}
              </div>
              <div style="font-size:0.72rem; color:#64748b; font-weight:500; display:flex; align-items:center; gap:4px;">
                <i class="fa-regular fa-calendar-range" style="color:#0f766e;"></i> ${formatSeasonDates(tour.seasonStart, tour.seasonEnd)}
              </div>
            </div>
          </td>

          <!-- Cột 3: Giá Tiêu Chuẩn -->
          <td><strong class="text-primary" style="font-size:0.92rem;">${formatCurrency(tour.price)}</strong></td>

          <!-- Cột 4: Lịch Khởi Hành -->
          <td>
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

          <!-- Cột 5: Phân Loại -->
          <td><span class="badge ${tour.featured ? 'badge-warning' : 'badge-neutral'}">${tour.featured ? 'Nổi bật' : 'Tiêu chuẩn'}</span></td>

          <!-- Cột 6: Thao Tác -->
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
          <td colspan="6" class="manager-drawer-cell">
            <div class="manager-drawer-content">
              
              <!-- Tour Summary Banner with Season & Stage Meta -->
              <div class="manager-drawer-tour-banner">
                <div class="manager-drawer-tour-info">
                  <img src="${tour.image}" alt="${tour.title}">
                  <div>
                    <div style="display:flex; gap:6px; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
                      <span class="badge badge-primary" style="font-size:0.7rem; padding:3px 8px;">QUẢN LÝ LỊCH KHỞI HÀNH</span>
                      ${getSeasonBadge(tour.season, tour.seasonLabel)}
                      ${getStageBadge(tour.stage, tour.stageLabel)}
                    </div>
                    <h3>${tour.title}</h3>
                    <p>
                      <i class="fa-solid fa-location-dot text-danger"></i> ${tour.location} • 
                      <i class="fa-regular fa-clock text-primary"></i> ${tour.duration} • 
                      <i class="fa-regular fa-calendar-check text-success"></i> Khung vận hành: <strong>${formatSeasonDates(tour.seasonStart, tour.seasonEnd)}</strong> • 
                      Giá chuẩn: <strong class="text-primary">${formatCurrency(tour.price)}</strong>
                    </p>
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

  // Create New Tour Form (Enhanced with Seasonality, Stage, Start/End Dates & Day-of-Week)
  if (formAddTour) {
    formAddTour.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('newTourTitle').value.trim();
      const location = document.getElementById('newTourLocation').value.trim();
      const region = document.getElementById('newTourRegion').value;
      const seasonSelect = document.getElementById('newTourSeason');
      const season = seasonSelect ? seasonSelect.value : 'all_year';
      const seasonLabel = seasonSelect ? seasonSelect.options[seasonSelect.selectedIndex].text.split('(')[0].trim() : 'Quanh Năm';
      const stageSelect = document.getElementById('newTourStage');
      const stage = stageSelect ? stageSelect.value : 'regular';
      const stageLabel = stageSelect ? stageSelect.options[stageSelect.selectedIndex].text.replace(/^[^\w\s\u00C0-\u1EF9]+/g, '').trim() : 'Đang Mở Bán';
      
      const startDate = document.getElementById('newTourStartDate')?.value || '2026-09-18';
      const endDate = document.getElementById('newTourEndDate')?.value || '2026-09-20';
      const startInfo = window.getDayOfWeekInfo(startDate);
      const endInfo = window.getDayOfWeekInfo(endDate);
      const days = parseInt(document.getElementById('newTourDays')?.value, 10) || 3;
      const duration = document.getElementById('newTourDuration')?.value.trim() || `${days} Ngày ${days > 1 ? (days - 1) + ' Đêm' : ''}`;
      const checkedDaysOfWeek = Array.from(document.querySelectorAll('input[name="tourDaysOfWeek"]:checked')).map(cb => cb.value);

      const price = parseInt(document.getElementById('newTourPrice').value, 10) || 3200000;
      const desc = document.getElementById('newTourDesc').value.trim();
      const img = document.getElementById('newTourImage').value.trim() || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

      const newTour = {
        id: `tour-${Date.now()}`,
        title,
        location,
        region,
        theme: 'nature',
        duration,
        days,
        startDate,
        endDate,
        startDayOfWeek: startInfo.dayName,
        endDayOfWeek: endInfo.dayName,
        daysOfWeek: checkedDaysOfWeek,
        season,
        seasonLabel,
        stage,
        stageLabel,
        seasonStart: startDate,
        seasonEnd: endDate,
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
      // Reset image preview
      window.handleTourImagePreview('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
      showToast('Đã tạo tour mới thành công với lịch trình và thứ trong tuần!', 'success');
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


// 17. ADMIN DASHBOARD LOGIC (USERS CRUD, ROLE-PERMISSION MATRIX, CATEGORIES CRUD)
// ==========================================

function initAdminDashboard() {
  const adminUsersTable = document.getElementById('adminUsersTable');
  const adminMatrixTableBody = document.getElementById('adminMatrixTableBody');
  const adminCategoriesTable = document.getElementById('adminCategoriesTable');
  const adminReviewsTable = document.getElementById('adminReviewsTable');
  const formAdminUser = document.getElementById('formAdminUser');
  const formAdminCategory = document.getElementById('formAdminCategory');

  if (!adminUsersTable && !adminMatrixTableBody && !adminCategoriesTable) return;

  const db = getMockDatabase();
  let activeRoleCode = 'admin';
  let userKeyword = '';
  let userRoleFilter = 'all';
  let userStatusFilter = 'all';

  // --- 1. UPDATE KPIS ---
  function updateAdminKPIs() {
    const kpiTotalUsers = document.getElementById('kpiTotalUsers');
    const kpiRolesCount = document.getElementById('kpiRolesCount');
    const kpiCategoriesCount = document.getElementById('kpiCategoriesCount');
    const kpiReviewsCount = document.getElementById('kpiReviewsCount');
    const sidebarUsersCountBadge = document.getElementById('sidebarUsersCountBadge');
    const sidebarCategoriesCountBadge = document.getElementById('sidebarCategoriesCountBadge');

    if (kpiTotalUsers) kpiTotalUsers.textContent = `${db.users.length} Tài Khoản`;
    if (kpiRolesCount) kpiRolesCount.textContent = `${db.roles ? db.roles.length : 5} Vai Trò`;
    if (kpiCategoriesCount) kpiCategoriesCount.textContent = `${db.categories ? db.categories.length : 6} Danh Mục`;
    if (kpiReviewsCount) kpiReviewsCount.textContent = `${db.reviews.length} Đánh Giá`;
    if (sidebarUsersCountBadge) sidebarUsersCountBadge.textContent = `${db.users.length} Users`;
    if (sidebarCategoriesCountBadge) sidebarCategoriesCountBadge.textContent = `${db.categories ? db.categories.length : 6} Nhóm`;
  }

  // --- 2. USER MANAGEMENT CRUD ---
  function renderAdminUsers() {
    if (!adminUsersTable) return;

    const kw = userKeyword.trim().toLowerCase();
    const filteredUsers = db.users.filter(u => {
      const matchKw = !kw || (u.name && u.name.toLowerCase().includes(kw))
        || (u.email && u.email.toLowerCase().includes(kw))
        || (u.phone && u.phone.includes(kw));
      const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
      return matchKw && matchRole && matchStatus;
    });

    const countDisplay = document.getElementById('adminUsersCountDisplay');
    if (countDisplay) countDisplay.textContent = filteredUsers.length;

    if (!filteredUsers.length) {
      adminUsersTable.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:32px;">
            <span class="text-muted">Không tìm thấy tài khoản người dùng phù hợp với bộ lọc.</span>
          </td>
        </tr>
      `;
      return;
    }

    adminUsersTable.innerHTML = filteredUsers.map(u => {
      const roleMap = {
        admin: { label: 'Quản Trị Viên', class: 'badge-danger', icon: 'fa-shield-halved' },
        manager: { label: 'Quản Lý Tour', class: 'badge-primary', icon: 'fa-user-tie' },
        guide: { label: 'Hướng Dẫn Viên', class: 'badge-success', icon: 'fa-id-badge' },
        customer: { label: 'Khách Hàng', class: 'badge-info', icon: 'fa-user' },
        guest: { label: 'Khách Vãng Lai', class: 'badge-neutral', icon: 'fa-globe' }
      };
      const roleConf = roleMap[u.role] || roleMap.customer;

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; box-shadow:0 2px 6px rgba(0,0,0,0.1);" alt="${u.name}">
              <div>
                <strong style="display:block; font-size:0.9rem; color:#0f172a;">${u.name}</strong>
                <span class="text-muted" style="font-size:0.75rem;"><i class="fa-regular fa-envelope"></i> ${u.email}</span>
              </div>
            </div>
          </td>
          <td>
            <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
              <span class="badge ${roleConf.class}" style="font-size:0.75rem; display:inline-flex; align-items:center; gap:4px;">
                <i class="fa-solid ${roleConf.icon}"></i> ${roleConf.label}
              </span>
              <select class="form-control form-control-sm" style="font-size:0.75rem; padding:2px 6px; width:130px; margin-top:2px;" onchange="changeUserRole('${u.id}', this.value)">
                <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Khách Hàng</option>
                <option value="guide" ${u.role === 'guide' ? 'selected' : ''}>Hướng Dẫn Viên</option>
                <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Quản Lý Tour</option>
                <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Quản Trị Viên</option>
              </select>
            </div>
          </td>
          <td>
            <div style="font-size:0.82rem;">
              <div><i class="fa-solid fa-phone text-muted" style="font-size:0.75rem;"></i> <strong>${u.phone || 'Chưa cập nhật'}</strong></div>
              <small class="text-muted">${u.department || u.address || (u.experience ? `${u.experience}` : 'Tham gia: ' + (u.joinedDate || '2026'))}</small>
            </div>
          </td>
          <td>
            <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">
              ${u.status === 'active' ? '<i class="fa-solid fa-circle-check"></i> Hoạt động' : '<i class="fa-solid fa-lock"></i> Tạm khóa'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="openAdminUserModal('${u.id}')" title="Chỉnh sửa thông tin">
                <i class="fa-solid fa-pen"></i> Sửa
              </button>
              <button type="button" class="btn btn-outline btn-sm ${u.status === 'active' ? 'text-warning' : 'text-success'}" onclick="toggleUserStatus('${u.id}')" title="${u.status === 'active' ? 'Tạm khóa tài khoản' : 'Kích hoạt lại'}">
                ${u.status === 'active' ? '<i class="fa-solid fa-lock"></i> Khóa' : '<i class="fa-solid fa-lock-open"></i> Mở'}
              </button>
              <button type="button" class="btn btn-outline btn-sm text-danger" onclick="deleteAdminUser('${u.id}')" title="Xóa vĩnh viễn tài khoản">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.filterAdminUsers = () => {
    const kwInput = document.getElementById('adminUserFilterKeyword');
    const roleSelect = document.getElementById('adminUserFilterRole');
    const statusSelect = document.getElementById('adminUserFilterStatus');
    if (kwInput) userKeyword = kwInput.value;
    if (roleSelect) userRoleFilter = roleSelect.value;
    if (statusSelect) userStatusFilter = statusSelect.value;
    renderAdminUsers();
  };

  window.openAdminUserModal = (userId = null) => {
    const idEl = document.getElementById('adminUserId');
    const nameEl = document.getElementById('adminUserName');
    const emailEl = document.getElementById('adminUserEmail');
    const phoneEl = document.getElementById('adminUserPhone');
    const roleEl = document.getElementById('adminUserRole');
    const statusEl = document.getElementById('adminUserStatus');
    const deptEl = document.getElementById('adminUserDepartment');
    const avatarEl = document.getElementById('adminUserAvatar');
    const addressEl = document.getElementById('adminUserAddress');
    const titleEl = document.getElementById('userModalTitle');
    const submitBtn = document.getElementById('btnSubmitUser');

    if (userId) {
      const u = db.users.find(item => item.id === userId);
      if (!u) return;
      if (idEl) idEl.value = u.id;
      if (nameEl) nameEl.value = u.name || '';
      if (emailEl) emailEl.value = u.email || '';
      if (phoneEl) phoneEl.value = u.phone || '';
      if (roleEl) roleEl.value = u.role || 'customer';
      if (statusEl) statusEl.value = u.status || 'active';
      if (deptEl) deptEl.value = u.department || '';
      if (avatarEl) avatarEl.value = u.avatar || '';
      if (addressEl) addressEl.value = u.address || '';
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-user-pen text-primary"></i> Chỉnh Sửa Tài Khoản Người Dùng';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Cập Nhật Tài Khoản';
    } else {
      if (formAdminUser) formAdminUser.reset();
      if (idEl) idEl.value = '';
      if (avatarEl) avatarEl.value = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-user-plus text-primary"></i> Thêm Tài Khoản Người Dùng Mới';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Lưu Tài Khoản';
    }

    openModal('modalAdminUser');
  };

  if (formAdminUser) {
    formAdminUser.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('adminUserId')?.value || '';
      const name = document.getElementById('adminUserName').value.trim();
      const email = document.getElementById('adminUserEmail').value.trim();
      const phone = document.getElementById('adminUserPhone').value.trim();
      const role = document.getElementById('adminUserRole').value;
      const status = document.getElementById('adminUserStatus').value;
      const department = document.getElementById('adminUserDepartment').value.trim();
      const avatar = document.getElementById('adminUserAvatar').value.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
      const address = document.getElementById('adminUserAddress').value.trim();

      if (id) {
        const u = db.users.find(item => item.id === id);
        if (u) {
          Object.assign(u, { name, email, phone, role, status, department, avatar, address });
          showToast(`Đã cập nhật thông tin tài khoản ${name}!`, 'success');
        }
      } else {
        const newUser = {
          id: `usr-${Date.now()}`,
          name,
          email,
          phone,
          role,
          status,
          department,
          avatar,
          address,
          joinedDate: new Date().toLocaleDateString('vi-VN')
        };
        db.users.unshift(newUser);
        showToast(`Đã tạo tài khoản người dùng mới cho ${name}!`, 'success');
      }

      saveMockDatabase(db);
      closeModal('modalAdminUser');
      renderAdminUsers();
      updateAdminKPIs();
      renderRoleBasedNav();
    });
  }

  window.deleteAdminUser = (userId) => {
    const user = db.users.find(u => u.id === userId);
    if (!user) return;
    if (user.role === 'admin' && db.users.filter(u => u.role === 'admin').length <= 1) {
      showToast('Không thể xóa Quản trị viên duy nhất của hệ thống.', 'warning');
      return;
    }
    if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${user.name}" (${user.email})?`)) return;

    db.users = db.users.filter(u => u.id !== userId);
    saveMockDatabase(db);
    renderAdminUsers();
    updateAdminKPIs();
    showToast(`Đã xóa tài khoản ${user.name} thành công.`, 'info');
  };

  window.changeUserRole = (userId, newRole) => {
    const user = db.users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      saveMockDatabase(db);
      renderAdminUsers();
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

  // --- 3. ROLE-PERMISSION CRUD MATRIX ---
  function renderRolePills() {
    const pillsContainer = document.getElementById('adminRolePills');
    if (!pillsContainer) return;

    const rolesList = db.roles || DEFAULT_MOCK_DATA.roles;
    pillsContainer.innerHTML = rolesList.map(r => `
      <button type="button" class="admin-role-pill ${r.code === activeRoleCode ? 'active' : ''}" onclick="selectMatrixRole('${r.code}')">
        <span>${r.name}</span>
        <span class="badge ${r.badgeClass}" style="font-size:0.68rem; padding:2px 6px;">${r.code}</span>
      </button>
    `).join('');
  }

  window.selectMatrixRole = (roleCode) => {
    activeRoleCode = roleCode;
    renderRolePills();
    const roleObj = (db.roles || DEFAULT_MOCK_DATA.roles).find(r => r.code === roleCode);
    const activeLabelEl = document.getElementById('matrixActiveRoleLabel');
    if (activeLabelEl) activeLabelEl.textContent = roleObj ? roleObj.name : roleCode;
    renderRolePermissionMatrix();
  };

  function renderRolePermissionMatrix() {
    if (!adminMatrixTableBody) return;

    const modulesList = db.modules || DEFAULT_MOCK_DATA.modules;
    if (!db.role_permissions) db.role_permissions = DEFAULT_MOCK_DATA.role_permissions;

    adminMatrixTableBody.innerHTML = modulesList.map(mod => {
      let perm = db.role_permissions.find(p => p.roleCode === activeRoleCode && p.moduleCode === mod.code);
      if (!perm) {
        perm = { roleCode: activeRoleCode, moduleCode: mod.code, canCreate: false, canRead: false, canUpdate: false, canDelete: false };
        db.role_permissions.push(perm);
      }

      // Summary label
      let summaryHtml = '';
      if (perm.canCreate && perm.canRead && perm.canUpdate && perm.canDelete) {
        summaryHtml = '<span class="badge badge-success" style="font-size:0.75rem;"><i class="fa-solid fa-shield-check"></i> Toàn quyền (Full CRUD)</span>';
      } else if (!perm.canCreate && perm.canRead && !perm.canUpdate && !perm.canDelete) {
        summaryHtml = '<span class="badge badge-info" style="font-size:0.75rem;"><i class="fa-regular fa-eye"></i> Chỉ xem (Read-only)</span>';
      } else if (!perm.canCreate && !perm.canRead && !perm.canUpdate && !perm.canDelete) {
        summaryHtml = '<span class="badge badge-neutral" style="font-size:0.75rem;"><i class="fa-solid fa-ban"></i> Không có quyền</span>';
      } else {
        const parts = [];
        if (perm.canCreate) parts.push('C');
        if (perm.canRead) parts.push('R');
        if (perm.canUpdate) parts.push('U');
        if (perm.canDelete) parts.push('D');
        summaryHtml = `<span class="badge badge-warning" style="font-size:0.75rem;">${parts.join(' - ')}</span>`;
      }

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:34px; height:34px; border-radius:8px; background:#f0fdfa; color:#0f766e; display:flex; align-items:center; justify-content:center; font-size:1rem;">
                <i class="fa-solid ${mod.icon}"></i>
              </div>
              <div>
                <strong style="color:#0f172a; font-size:0.9rem;">${mod.name}</strong>
                <small class="text-muted" style="display:block; font-size:0.75rem;"><code>${mod.code}</code> • ${mod.desc}</small>
              </div>
            </div>
          </td>
          <td style="text-align:center;">
            <label class="matrix-checkbox-label ${perm.canCreate ? 'is-checked' : ''}">
              <input type="checkbox" ${perm.canCreate ? 'checked' : ''} onchange="updatePermissionCheckbox('${mod.code}', 'canCreate', this.checked)">
              <span>Tạo</span>
            </label>
          </td>
          <td style="text-align:center;">
            <label class="matrix-checkbox-label ${perm.canRead ? 'is-checked' : ''}">
              <input type="checkbox" ${perm.canRead ? 'checked' : ''} onchange="updatePermissionCheckbox('${mod.code}', 'canRead', this.checked)">
              <span>Đọc</span>
            </label>
          </td>
          <td style="text-align:center;">
            <label class="matrix-checkbox-label ${perm.canUpdate ? 'is-checked' : ''}">
              <input type="checkbox" ${perm.canUpdate ? 'checked' : ''} onchange="updatePermissionCheckbox('${mod.code}', 'canUpdate', this.checked)">
              <span>Sửa</span>
            </label>
          </td>
          <td style="text-align:center;">
            <label class="matrix-checkbox-label ${perm.canDelete ? 'is-checked' : ''}">
              <input type="checkbox" ${perm.canDelete ? 'checked' : ''} onchange="updatePermissionCheckbox('${mod.code}', 'canDelete', this.checked)">
              <span>Xóa</span>
            </label>
          </td>
          <td style="text-align:center;">
            ${summaryHtml}
          </td>
        </tr>
      `;
    }).join('');
  }

  window.updatePermissionCheckbox = (moduleCode, action, checked) => {
    let perm = db.role_permissions.find(p => p.roleCode === activeRoleCode && p.moduleCode === moduleCode);
    if (!perm) {
      perm = { roleCode: activeRoleCode, moduleCode: moduleCode, canCreate: false, canRead: false, canUpdate: false, canDelete: false };
      db.role_permissions.push(perm);
    }
    perm[action] = checked;
    renderRolePermissionMatrix();
  };

  window.saveCurrentRolePermissions = () => {
    saveMockDatabase(db);
    showToast(`Đã lưu cấu hình ma trận phân quyền cho vai trò "${activeRoleCode}" vào hệ thống!`, 'success');
  };

  window.setAllPermissionsForActiveRole = (enabled) => {
    const modulesList = db.modules || DEFAULT_MOCK_DATA.modules;
    modulesList.forEach(mod => {
      let perm = db.role_permissions.find(p => p.roleCode === activeRoleCode && p.moduleCode === mod.code);
      if (!perm) {
        perm = { roleCode: activeRoleCode, moduleCode: mod.code, canCreate: enabled, canRead: enabled, canUpdate: enabled, canDelete: enabled };
        db.role_permissions.push(perm);
      } else {
        perm.canCreate = enabled;
        perm.canRead = enabled;
        perm.canUpdate = enabled;
        perm.canDelete = enabled;
      }
    });
    saveMockDatabase(db);
    renderRolePermissionMatrix();
    showToast(`Đã ${enabled ? 'bật toàn bộ quyền CRUD' : 'bỏ toàn bộ quyền'} cho vai trò "${activeRoleCode}"!`, 'info');
  };

  window.resetPermissionsForActiveRole = () => {
    const defaultPerms = DEFAULT_MOCK_DATA.role_permissions.filter(p => p.roleCode === activeRoleCode);
    db.role_permissions = db.role_permissions.filter(p => p.roleCode !== activeRoleCode).concat(JSON.parse(JSON.stringify(defaultPerms)));
    saveMockDatabase(db);
    renderRolePermissionMatrix();
    showToast(`Đã khôi phục ma trận phân quyền mặc định cho vai trò "${activeRoleCode}"!`, 'success');
  };

  // --- 4. TOUR CATEGORIES MANAGEMENT CRUD ---
  function renderAdminCategories() {
    if (!adminCategoriesTable) return;

    if (!db.categories) db.categories = DEFAULT_MOCK_DATA.categories;

    adminCategoriesTable.innerHTML = db.categories.map(cat => {
      // Calculate active tour count in this category
      const matchedToursCount = db.tours.filter(t => t.theme === cat.code || (t.title && t.title.toLowerCase().includes(cat.name.toLowerCase()))).length;

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="category-icon-box" style="background:${cat.color}15; color:${cat.color};">
                <i class="fa-solid ${cat.icon || 'fa-tag'}"></i>
              </div>
              <div>
                <strong style="color:#0f172a; font-size:0.9rem;">${cat.name}</strong>
                <span class="text-muted" style="display:block; font-size:0.75rem;">Màu nhận diện: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${cat.color}; vertical-align:middle;"></span> ${cat.color}</span>
              </div>
            </div>
          </td>
          <td><code>${cat.code}</code></td>
          <td style="max-width:280px; font-size:0.84rem; color:#475569;">${cat.description || 'Chưa có mô tả'}</td>
          <td>
            <span class="badge badge-primary" style="font-size:0.75rem;">
              <i class="fa-solid fa-compass"></i> ${matchedToursCount || cat.tourCount || 0} Tour
            </span>
          </td>
          <td>
            <span class="badge ${cat.featured ? 'badge-warning' : 'badge-neutral'}">
              ${cat.featured ? '<i class="fa-solid fa-star"></i> Nổi bật' : 'Bình thường'}
            </span>
          </td>
          <td>
            <span class="badge ${cat.status === 'active' ? 'badge-success' : 'badge-danger'}">
              ${cat.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="openAdminCategoryModal('${cat.id}')" title="Chỉnh sửa danh mục">
                <i class="fa-solid fa-pen"></i> Sửa
              </button>
              <button type="button" class="btn btn-outline btn-sm ${cat.status === 'active' ? 'text-warning' : 'text-success'}" onclick="toggleCategoryStatus('${cat.id}')" title="${cat.status === 'active' ? 'Ẩn danh mục' : 'Kích hoạt'}">
                <i class="fa-solid ${cat.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}"></i>
              </button>
              <button type="button" class="btn btn-outline btn-sm text-danger" onclick="deleteAdminCategory('${cat.id}')" title="Xóa danh mục">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.autoGenerateCategoryCode = (name) => {
    const codeInput = document.getElementById('adminCategoryCode');
    const idInput = document.getElementById('adminCategoryId');
    if (!codeInput || (idInput && idInput.value)) return;
    const slug = name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    codeInput.value = slug;
  };

  window.openAdminCategoryModal = (catId = null) => {
    const idEl = document.getElementById('adminCategoryId');
    const nameEl = document.getElementById('adminCategoryName');
    const codeEl = document.getElementById('adminCategoryCode');
    const iconEl = document.getElementById('adminCategoryIcon');
    const colorEl = document.getElementById('adminCategoryColor');
    const descEl = document.getElementById('adminCategoryDesc');
    const statusEl = document.getElementById('adminCategoryStatus');
    const featuredEl = document.getElementById('adminCategoryFeatured');
    const titleEl = document.getElementById('categoryModalTitle');
    const submitBtn = document.getElementById('btnSubmitCategory');

    if (catId) {
      const cat = db.categories.find(item => item.id === catId);
      if (!cat) return;
      if (idEl) idEl.value = cat.id;
      if (nameEl) nameEl.value = cat.name || '';
      if (codeEl) codeEl.value = cat.code || '';
      if (iconEl) iconEl.value = cat.icon || 'fa-umbrella-beach';
      if (colorEl) colorEl.value = cat.color || '#0284c7';
      if (descEl) descEl.value = cat.description || '';
      if (statusEl) statusEl.value = cat.status || 'active';
      if (featuredEl) featuredEl.value = cat.featured ? 'true' : 'false';
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-folder-pen text-secondary"></i> Chỉnh Sửa Danh Mục Tour';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Cập Nhật Danh Mục';
    } else {
      if (formAdminCategory) formAdminCategory.reset();
      if (idEl) idEl.value = '';
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-folder-plus text-secondary"></i> Thêm Danh Mục Tour Mới';
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Lưu Danh Mục';
    }

    openModal('modalAdminCategory');
  };

  if (formAdminCategory) {
    formAdminCategory.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('adminCategoryId')?.value || '';
      const name = document.getElementById('adminCategoryName').value.trim();
      const code = document.getElementById('adminCategoryCode').value.trim().toLowerCase();
      const icon = document.getElementById('adminCategoryIcon').value;
      const color = document.getElementById('adminCategoryColor').value;
      const desc = document.getElementById('adminCategoryDesc').value.trim();
      const status = document.getElementById('adminCategoryStatus').value;
      const featured = document.getElementById('adminCategoryFeatured').value === 'true';

      if (id) {
        const cat = db.categories.find(item => item.id === id);
        if (cat) {
          Object.assign(cat, { name, code, icon, color, description: desc, status, featured });
          showToast(`Đã cập nhật danh mục "${name}"!`, 'success');
        }
      } else {
        const newCat = {
          id: `cat-${Date.now()}`,
          name,
          code,
          icon,
          color,
          description: desc,
          tourCount: 0,
          status,
          featured
        };
        db.categories.push(newCat);
        showToast(`Đã thêm danh mục mới "${name}" thành công!`, 'success');
      }

      saveMockDatabase(db);
      closeModal('modalAdminCategory');
      renderAdminCategories();
      updateAdminKPIs();
    });
  }

  window.toggleCategoryStatus = (catId) => {
    const cat = db.categories.find(c => c.id === catId);
    if (cat) {
      cat.status = cat.status === 'active' ? 'inactive' : 'active';
      saveMockDatabase(db);
      renderAdminCategories();
      showToast(`Đã ${cat.status === 'active' ? 'kích hoạt' : 'tạm ẩn'} danh mục "${cat.name}"!`, 'info');
    }
  };

  window.deleteAdminCategory = (catId) => {
    const cat = db.categories.find(c => c.id === catId);
    if (!cat) return;
    const tourCount = db.tours.filter(t => t.theme === cat.code).length;
    if (tourCount > 0) {
      if (!confirm(`Danh mục "${cat.name}" đang có ${tourCount} tour thuộc nhóm này. Bạn vẫn muốn xóa danh mục này?`)) return;
    } else {
      if (!confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`)) return;
    }

    db.categories = db.categories.filter(c => c.id !== catId);
    saveMockDatabase(db);
    renderAdminCategories();
    updateAdminKPIs();
    showToast(`Đã xóa danh mục "${cat.name}" thành công.`, 'info');
  };

  // --- 5. REVIEWS MODERATION ---
  function renderAdminReviews() {
    if (!adminReviewsTable) return;
    adminReviewsTable.innerHTML = db.reviews.map(r => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${r.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}" style="width:34px; height:34px; border-radius:50%; object-fit:cover;" alt="${r.userName}">
            <div>
              <strong style="color:#0f172a; font-size:0.88rem;">${r.userName}</strong>
              <span class="text-muted" style="display:block; font-size:0.75rem;">${r.tourTitle}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="text-warning" style="font-size:0.8rem;">
            ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          </div>
        </td>
        <td style="max-width:300px; font-size:0.84rem; color:#475569;">"${r.comment}"</td>
        <td>
          <span class="badge ${r.status === 'approved' ? 'badge-success' : 'badge-warning'}">
            ${r.status === 'approved' ? '<i class="fa-solid fa-circle-check"></i> Đã duyệt' : '<i class="fa-solid fa-hourglass-half"></i> Chờ duyệt'}
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

  window.toggleReviewStatus = (reviewId, newStatus) => {
    const rev = db.reviews.find(r => r.id === reviewId);
    if (rev) {
      rev.status = newStatus;
      saveMockDatabase(db);
      renderAdminReviews();
      showToast(`Đã cập nhật trạng thái đánh giá thành "${newStatus === 'approved' ? 'Đã duyệt' : 'Đã ẩn'}"!`, 'success');
    }
  };

  // Initialize all Admin modules
  updateAdminKPIs();
  renderAdminUsers();
  renderRolePills();
  renderRolePermissionMatrix();
  renderAdminCategories();
  renderAdminReviews();
}

// ==========================================
// 17B. MANAGER PROMOTIONS & VOUCHERS MODULE
// ==========================================

function initManagerPromotions() {
  const tableBody = document.getElementById('managerPromotionsTableBody');
  const formPromotion = document.getElementById('formPromotion');
  if (!tableBody && !formPromotion) return;

  const db = getMockDatabase();

  window.formatDisplayDate = function(dateStr) {
    if (!dateStr) return 'N/A';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  window.renderManagerPromotions = function() {
    const tbody = document.getElementById('managerPromotionsTableBody');
    if (!tbody) return;
    const currentDb = getMockDatabase();
    const promotions = currentDb.promotions || [];

    const searchInput = document.getElementById('promoSearchInput');
    const statusFilter = document.getElementById('promoStatusFilter');
    const typeFilter = document.getElementById('promoTypeFilter');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value : 'all';
    const type = typeFilter ? typeFilter.value : 'all';

    const filtered = promotions.filter(p => {
      const matchKey = p.code.toLowerCase().includes(keyword) || p.title.toLowerCase().includes(keyword);
      const matchStatus = status === 'all' || p.status === status;
      const matchType = type === 'all' || p.discountType === type;
      return matchKey && matchStatus && matchType;
    });

    // Update KPI badges if present
    const kpiActivePromos = document.getElementById('kpiActivePromos');
    const kpiTotalUsed = document.getElementById('kpiTotalUsed');
    const kpiTotalPromos = document.getElementById('kpiTotalPromos');
    if (kpiActivePromos) kpiActivePromos.textContent = `${promotions.filter(p => p.status === 'active').length} Mã Đang Chạy`;
    if (kpiTotalUsed) {
      const totalUsed = promotions.reduce((sum, p) => sum + (p.usedCount || 0), 0);
      kpiTotalUsed.textContent = `${totalUsed} Lượt Dùng`;
    }
    if (kpiTotalPromos) kpiTotalPromos.textContent = `${promotions.length} Chương Trình`;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-5 text-muted"><i class="fa-solid fa-ticket-simple fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không tìm thấy mã khuyến mãi nào phù hợp.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((p, idx) => {
      const isPercent = p.discountType === 'percent';
      const discountLabel = isPercent ? `Giảm ${p.discountValue}%` : `Giảm ${formatCurrency(p.discountValue)}`;
      const maxDiscountText = isPercent && p.maxDiscount ? `Tối đa ${formatCurrency(p.maxDiscount)}` : '';
      const usagePercent = Math.min(100, Math.round((p.usedCount / (p.usageLimit || 1)) * 100));

      return `
        <tr>
          <td style="text-align:center; padding:10px 6px;"><strong class="text-muted">#${idx + 1}</strong></td>
          <td style="padding:10px 8px;">
            <div class="promo-code-badge" title="Mã khuyến mãi: ${p.code}" style="padding:4px 8px; font-size:0.8rem;">
              <i class="fa-solid fa-ticket"></i>
              <span>${p.code}</span>
            </div>
          </td>
          <td style="padding:10px 10px;">
            <strong style="display:block; color:#0f172a; font-size:0.85rem; line-height:1.3; margin-bottom:2px;">${p.title}</strong>
            <div style="font-size:0.73rem; color:#64748b; line-height:1.3; max-width:240px;" title="${p.description || ''}">
              ${p.description || 'Chương trình ưu đãi giảm giá'}
            </div>
          </td>
          <td style="padding:10px 8px;">
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span class="badge ${isPercent ? 'badge-primary' : 'badge-warning'}" style="font-weight:700; width:fit-content; font-size:0.72rem; padding:3px 7px;">
                ${discountLabel}
              </span>
              ${maxDiscountText ? `<span style="font-size:0.7rem; color:#64748b;">${maxDiscountText}</span>` : ''}
              <span style="font-size:0.7rem; color:#0f766e; white-space:nowrap; font-weight:500;">Đơn tối thiểu: ${formatCurrency(p.minOrderValue || 0)}</span>
            </div>
          </td>
          <td style="padding:10px 8px;">
            <div style="font-size:0.73rem; color:#334155; line-height:1.4; white-space:nowrap;">
              <div><i class="fa-regular fa-calendar-plus text-primary" style="width:13px;"></i> ${formatDisplayDate(p.startDate)}</div>
              <div><i class="fa-regular fa-calendar-xmark text-danger" style="width:13px;"></i> ${formatDisplayDate(p.endDate)}</div>
            </div>
          </td>
          <td style="padding:10px 8px; min-width:115px;">
            <div style="display:flex; justify-content:space-between; font-size:0.7rem; margin-bottom:3px; gap:4px; white-space:nowrap;">
              <strong style="color:#0f766e;">${p.usedCount} đã dùng</strong>
              <span class="text-muted">Hạn: ${p.usageLimit}</span>
            </div>
            <div style="width:100%; height:5px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
              <div style="width:${usagePercent}%; height:100%; background:${usagePercent >= 90 ? '#ef4444' : '#0f766e'}; border-radius:3px;"></div>
            </div>
          </td>
          <td style="text-align:center; padding:10px 6px;">
            <span class="badge ${p.status === 'active' ? 'badge-success' : p.status === 'expired' ? 'badge-danger' : 'badge-neutral'}" style="white-space:nowrap; font-size:0.7rem; padding:3px 7px;">
              ${p.status === 'active' ? '<i class="fa-solid fa-circle-check"></i> Đang chạy' : p.status === 'expired' ? '<i class="fa-solid fa-clock-rotate-left"></i> Đã hết hạn' : '<i class="fa-solid fa-pause"></i> Tạm ngưng'}
            </span>
          </td>
          <td style="text-align:center; padding:10px 6px;">
            <div style="display:inline-flex; gap:3px; justify-content:center;">
              <button class="btn btn-outline btn-xs" onclick="openPromotionModal('${p.id}')" title="Chỉnh sửa" style="padding:4px 7px;"><i class="fa-regular fa-pen-to-square"></i></button>
              <button class="btn btn-outline btn-xs ${p.status === 'active' ? 'text-warning' : 'text-success'}" onclick="togglePromotionStatus('${p.id}')" title="${p.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}" style="padding:4px 7px;">
                <i class="fa-solid ${p.status === 'active' ? 'fa-pause' : 'fa-play'}"></i>
              </button>
              <button class="btn btn-outline btn-xs text-danger" onclick="deletePromotion('${p.id}')" title="Xóa" style="padding:4px 7px;"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.openPromotionModal = function(promoId) {
    const currentDb = getMockDatabase();
    const modalTitle = document.getElementById('promoModalTitle');
    const idInput = document.getElementById('promoId');
    const codeInput = document.getElementById('promoCode');
    const titleInput = document.getElementById('promoTitle');
    const typeSelect = document.getElementById('promoDiscountType');
    const valInput = document.getElementById('promoDiscountValue');
    const maxValInput = document.getElementById('promoMaxDiscount');
    const minOrderInput = document.getElementById('promoMinOrder');
    const startInput = document.getElementById('promoStartDate');
    const endInput = document.getElementById('promoEndDate');
    const limitInput = document.getElementById('promoUsageLimit');
    const descInput = document.getElementById('promoDesc');
    const statusSelect = document.getElementById('promoStatus');

    if (promoId) {
      const p = currentDb.promotions.find(x => x.id === promoId);
      if (!p) return;
      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> Chỉnh Sửa Mã Khuyến Mãi';
      if (idInput) idInput.value = p.id;
      if (codeInput) codeInput.value = p.code;
      if (titleInput) titleInput.value = p.title;
      if (typeSelect) typeSelect.value = p.discountType;
      if (valInput) valInput.value = p.discountValue;
      if (maxValInput) maxValInput.value = p.maxDiscount || '';
      if (minOrderInput) minOrderInput.value = p.minOrderValue || 0;
      if (startInput) startInput.value = p.startDate;
      if (endInput) endInput.value = p.endDate;
      if (limitInput) limitInput.value = p.usageLimit;
      if (descInput) descInput.value = p.description || '';
      if (statusSelect) statusSelect.value = p.status;
    } else {
      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-plus-circle text-primary"></i> Tạo Mã Khuyến Mãi Mới';
      if (idInput) idInput.value = '';
      if (codeInput) codeInput.value = `PROMO${Math.floor(1000 + Math.random() * 9000)}`;
      if (titleInput) titleInput.value = '';
      if (typeSelect) typeSelect.value = 'percent';
      if (valInput) valInput.value = '15';
      if (maxValInput) maxValInput.value = '1000000';
      if (minOrderInput) minOrderInput.value = '2000000';
      if (startInput) startInput.value = '2026-09-18';
      if (endInput) endInput.value = '2026-10-31';
      if (limitInput) limitInput.value = '100';
      if (descInput) descInput.value = '';
      if (statusSelect) statusSelect.value = 'active';
    }
    openModal('modalPromotion');
  };

  window.generateRandomPromoCode = function() {
    const prefixes = ['SALE', 'VIETNAM', 'TOUR', 'DISCOUNT', 'HOLIDAY', 'AUTUMN', 'SUMMER', 'VIP'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(10 + Math.random() * 90);
    const codeInput = document.getElementById('promoCode');
    if (codeInput) codeInput.value = `${prefix}${num}`;
  };

  window.togglePromotionStatus = function(promoId) {
    const currentDb = getMockDatabase();
    const p = currentDb.promotions.find(x => x.id === promoId);
    if (p) {
      p.status = p.status === 'active' ? 'disabled' : 'active';
      saveMockDatabase(currentDb);
      renderManagerPromotions();
      showToast(`Đã chuyển trạng thái mã "${p.code}" thành "${p.status === 'active' ? 'Đang chạy' : 'Tạm dừng'}"!`, 'info');
    }
  };

  window.deletePromotion = function(promoId) {
    const currentDb = getMockDatabase();
    const p = currentDb.promotions.find(x => x.id === promoId);
    if (!p) return;
    if (confirm(`Bạn có chắc chắn muốn xóa mã khuyến mãi "${p.code}" (${p.title})?`)) {
      currentDb.promotions = currentDb.promotions.filter(x => x.id !== promoId);
      saveMockDatabase(currentDb);
      renderManagerPromotions();
      showToast('Đã xóa mã khuyến mãi thành công!', 'success');
    }
  };

  if (formPromotion) {
    formPromotion.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentDb = getMockDatabase();
      const id = document.getElementById('promoId').value.trim();
      const code = document.getElementById('promoCode').value.trim().toUpperCase();
      const title = document.getElementById('promoTitle').value.trim();
      const discountType = document.getElementById('promoDiscountType').value;
      const discountValue = parseInt(document.getElementById('promoDiscountValue').value, 10) || 0;
      const maxDiscount = parseInt(document.getElementById('promoMaxDiscount').value, 10) || 0;
      const minOrderValue = parseInt(document.getElementById('promoMinOrder').value, 10) || 0;
      const startDate = document.getElementById('promoStartDate').value;
      const endDate = document.getElementById('promoEndDate').value;
      const usageLimit = parseInt(document.getElementById('promoUsageLimit').value, 10) || 100;
      const description = document.getElementById('promoDesc').value.trim();
      const status = document.getElementById('promoStatus').value;

      if (!id) {
        // Create
        const newPromo = {
          id: `promo-${Date.now()}`,
          code,
          title,
          discountType,
          discountValue,
          maxDiscount,
          minOrderValue,
          startDate,
          endDate,
          usageLimit,
          usedCount: 0,
          status,
          applicableTours: 'all',
          description
        };
        if (!currentDb.promotions) currentDb.promotions = [];
        currentDb.promotions.unshift(newPromo);
        showToast('Đã tạo chương trình khuyến mãi mới thành công!', 'success');
      } else {
        // Update
        const p = currentDb.promotions.find(x => x.id === id);
        if (p) {
          p.code = code;
          p.title = title;
          p.discountType = discountType;
          p.discountValue = discountValue;
          p.maxDiscount = maxDiscount;
          p.minOrderValue = minOrderValue;
          p.startDate = startDate;
          p.endDate = endDate;
          p.usageLimit = usageLimit;
          p.description = description;
          p.status = status;
          showToast('Đã cập nhật mã khuyến mãi thành công!', 'success');
        }
      }

      saveMockDatabase(currentDb);
      renderManagerPromotions();
      closeModal('modalPromotion');
    });
  }

  renderManagerPromotions();
}

// ==========================================
// 17C. MANAGER BOOKINGS MODULE
// ==========================================

function initManagerBookings() {
  const tableBody = document.getElementById('managerBookingsTableBody');
  if (!tableBody) return;

  const db = getMockDatabase();

  window.renderManagerBookings = function() {
    const tbody = document.getElementById('managerBookingsTableBody');
    if (!tbody) return;
    const currentDb = getMockDatabase();
    const bookings = currentDb.bookings || [];

    const searchInput = document.getElementById('bookingSearchInput');
    const statusFilter = document.getElementById('bookingStatusFilter');
    const paymentFilter = document.getElementById('bookingPaymentFilter');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value : 'all';
    const payment = paymentFilter ? paymentFilter.value : 'all';

    const filtered = bookings.filter(b => {
      const matchKey = (b.bookingCode || b.id).toLowerCase().includes(keyword) || 
                       (b.customerName || '').toLowerCase().includes(keyword) || 
                       (b.customerPhone || '').includes(keyword) ||
                       (b.tourTitle || '').toLowerCase().includes(keyword);
      const matchStatus = status === 'all' || b.status === status;
      const matchPayment = payment === 'all' || b.paymentStatus === payment;
      return matchKey && matchStatus && matchPayment;
    });

    const kpiTotalBookings = document.getElementById('kpiTotalBookings');
    const kpiConfirmedBookings = document.getElementById('kpiConfirmedBookings');
    const kpiTotalRevenue = document.getElementById('kpiTotalRevenue');

    if (kpiTotalBookings) kpiTotalBookings.textContent = `${bookings.length} Đơn Đặt`;
    if (kpiConfirmedBookings) kpiConfirmedBookings.textContent = `${bookings.filter(b => b.status === 'confirmed').length} Đã Duyệt`;
    if (kpiTotalRevenue) {
      const rev = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? (b.totalPrice || 0) : 0), 0);
      kpiTotalRevenue.textContent = formatCurrency(rev);
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-muted"><i class="fa-solid fa-receipt fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không có đơn đặt tour nào phù hợp.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(b => {
      const statusBadge = b.status === 'confirmed' 
        ? '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Đã xác nhận</span>'
        : b.status === 'cancelled'
        ? '<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Đã hủy</span>'
        : '<span class="badge badge-warning"><i class="fa-solid fa-hourglass-half"></i> Chờ duyệt</span>';

      const payBadge = b.paymentStatus === 'paid'
        ? '<span class="badge badge-emerald" style="font-size:0.75rem;"><i class="fa-solid fa-check"></i> Đã thanh toán</span>'
        : '<span class="badge badge-amber" style="font-size:0.75rem;"><i class="fa-regular fa-clock"></i> Chưa thanh toán</span>';

      return `
        <tr>
          <td><strong class="text-primary font-mono">${b.bookingCode || b.id}</strong></td>
          <td>
            <div>
              <strong style="display:block; color:#0f172a; font-size:0.9rem;">${b.customerName || 'Khách hàng'}</strong>
              <span style="font-size:0.75rem; color:#64748b;"><i class="fa-solid fa-phone"></i> ${b.customerPhone || 'N/A'} • <i class="fa-regular fa-envelope"></i> ${b.customerEmail || ''}</span>
            </div>
          </td>
          <td>
            <div>
              <strong style="color:#0f766e; font-size:0.88rem; display:block;">${b.tourTitle || 'Tour Du Lịch'}</strong>
              <span style="font-size:0.75rem; color:#64748b;"><i class="fa-regular fa-calendar"></i> ${b.departureDate || 'Theo lịch'} • <strong>${b.guestsCount || 1} Khách</strong></span>
            </div>
          </td>
          <td><strong class="text-primary" style="font-size:0.92rem;">${formatCurrency(b.totalPrice || 0)}</strong></td>
          <td>${payBadge}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; gap:6px;">
              ${b.status !== 'confirmed' ? `<button class="btn btn-primary btn-xs" onclick="updateManagerBookingStatus('${b.id}', 'confirmed')" title="Duyệt đơn"><i class="fa-solid fa-check"></i> Duyệt</button>` : ''}
              ${b.status !== 'cancelled' ? `<button class="btn btn-outline btn-xs text-danger" onclick="updateManagerBookingStatus('${b.id}', 'cancelled')" title="Hủy đơn"><i class="fa-solid fa-xmark"></i> Hủy</button>` : ''}
              <a href="booking-detail.html?id=${b.id}" class="btn btn-outline btn-xs" title="Xem chi tiết"><i class="fa-regular fa-eye"></i></a>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.updateManagerBookingStatus = function(bookingId, newStatus) {
    const currentDb = getMockDatabase();
    const b = currentDb.bookings.find(x => x.id === bookingId);
    if (b) {
      b.status = newStatus;
      if (newStatus === 'confirmed') b.paymentStatus = 'paid';
      saveMockDatabase(currentDb);
      renderManagerBookings();
      showToast(`Đã cập nhật đơn đặt tour thành "${newStatus === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}"!`, 'success');
    }
  };

  renderManagerBookings();
}

// ==========================================
// 17D. MANAGER GUIDES & DEPARTURES MODULES
// ==========================================

function initManagerGuides() {
  const tableBody = document.getElementById('managerGuidesTableBody');
  if (!tableBody) return;

  const db = getMockDatabase();
  const guides = db.users.filter(u => u.role === 'guide');

  tableBody.innerHTML = guides.map((g, idx) => `
    <tr>
      <td><strong>#${idx + 1}</strong></td>
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${g.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid #0f766e;" alt="${g.name}">
          <div>
            <strong style="color:#0f172a; font-size:0.92rem; display:block;">${g.name}</strong>
            <span style="font-size:0.75rem; color:#64748b;"><i class="fa-solid fa-phone"></i> ${g.phone || '0988 776 655'} • <i class="fa-regular fa-envelope"></i> ${g.email}</span>
          </div>
        </div>
      </td>
      <td><span class="badge badge-primary" style="font-size:0.78rem;">${g.experience || '6 năm kinh nghiệm'}</span></td>
      <td><span style="color:#475569; font-size:0.84rem;">${g.languages || 'Tiếng Việt, Tiếng Anh'}</span></td>
      <td>
        <div style="color:#f59e0b; font-weight:700; font-size:0.88rem; display:flex; align-items:center; gap:4px;">
          <i class="fa-solid fa-star"></i> ${g.rating || 4.9} <span class="text-muted" style="font-weight:400; font-size:0.75rem;">(48 đoàn)</span>
        </div>
      </td>
      <td><span class="badge badge-success"><i class="fa-solid fa-circle-dot"></i> Sẵn sàng dẫn đoàn</span></td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="openManagerDepartureModal()" title="Gán chuyến đi"><i class="fa-solid fa-calendar-plus"></i> Gán Tour</button>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// 17E. MANAGER DESTINATIONS MODULE
// ==========================================

function initManagerDestinations() {
  const tableBody = document.getElementById('managerDestinationsTableBody');
  if (!tableBody) return;

  window.renderManagerDestinations = function() {
    const tbody = document.getElementById('managerDestinationsTableBody');
    if (!tbody) return;
    const db = getMockDatabase();
    const destinations = db.destinations || [];

    const searchInput = document.getElementById('destSearchInput');
    const regionFilter = document.getElementById('destRegionFilter');
    const statusFilter = document.getElementById('destStatusFilter');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const region = regionFilter ? regionFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = destinations.filter(d => {
      const matchKey = d.name.toLowerCase().includes(keyword) || d.province.toLowerCase().includes(keyword) || (d.highlights || '').toLowerCase().includes(keyword);
      const matchRegion = region === 'all' || d.region === region;
      const matchStatus = status === 'all' || d.status === status;
      return matchKey && matchRegion && matchStatus;
    });

    // Update KPIs
    const kpiTotal = document.getElementById('kpiTotalDest');
    const kpiActive = document.getElementById('kpiActiveDest');
    const kpiProvinces = document.getElementById('kpiProvinces');
    if (kpiTotal) kpiTotal.textContent = `${destinations.length} Địa Điểm`;
    if (kpiActive) kpiActive.textContent = `${destinations.filter(d => d.status === 'active').length} Đang Khai Thác`;
    if (kpiProvinces) {
      const provs = new Set(destinations.map(d => d.province));
      kpiProvinces.textContent = `${provs.size} Tỉnh Thành`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-muted"><i class="fa-solid fa-map-location-dot fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không tìm thấy địa điểm du lịch nào.</td></tr>`;
      return;
    }

    const regionNames = { north: 'Miền Bắc', central: 'Miền Trung', south: 'Miền Nam' };
    const regionBadges = { north: 'badge-primary', central: 'badge-warning', south: 'badge-success' };

    tbody.innerHTML = filtered.map((d, idx) => `
      <tr>
        <td style="text-align:center; padding:10px 6px;"><strong class="text-muted">#${idx + 1}</strong></td>
        <td style="padding:10px 12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${d.image || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=200&q=80'}" style="width:54px; height:42px; border-radius:6px; object-fit:cover; border:1px solid #e2e8f0;" alt="${d.name}">
            <div>
              <strong style="color:#0f172a; font-size:0.88rem; display:block; line-height:1.3;">${d.name}</strong>
              <span style="font-size:0.73rem; color:#64748b; line-height:1.3; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden;">${d.description || ''}</span>
            </div>
          </div>
        </td>
        <td style="padding:10px 8px;">
          <div>
            <span style="font-weight:600; color:#1e293b; font-size:0.84rem; display:block;"><i class="fa-solid fa-location-dot text-danger" style="font-size:0.75rem;"></i> ${d.province}</span>
            <span class="badge ${regionBadges[d.region] || 'badge-neutral'}" style="font-size:0.68rem; margin-top:2px;">${regionNames[d.region] || d.region}</span>
          </div>
        </td>
        <td style="padding:10px 10px;">
          <span style="font-size:0.74rem; color:#475569; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${d.highlights || 'Đang cập nhật danh thắng'}
          </span>
        </td>
        <td style="text-align:center; padding:10px 8px;">
          <span class="badge badge-primary" style="font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-route"></i> ${d.toursCount || 0} Tour</span>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <span class="badge ${d.status === 'active' ? 'badge-success' : 'badge-neutral'}" style="font-size:0.72rem;">
            ${d.status === 'active' ? '<i class="fa-solid fa-circle-check"></i> Đang mở' : '<i class="fa-solid fa-pause"></i> Tạm ngưng'}
          </span>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <div style="display:inline-flex; gap:4px; justify-content:center;">
            <button class="btn btn-outline btn-xs" onclick="openDestinationModal('${d.id}')" title="Chỉnh sửa" style="padding:4px 7px;"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
            <button class="btn btn-outline btn-xs ${d.status === 'active' ? 'text-warning' : 'text-success'}" onclick="toggleDestinationStatus('${d.id}')" title="${d.status === 'active' ? 'Tạm ẩn' : 'Mở lại'}" style="padding:4px 7px;">
              <i class="fa-solid ${d.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}"></i>
            </button>
            <button class="btn btn-outline btn-xs text-danger" onclick="deleteDestination('${d.id}')" title="Xóa" style="padding:4px 7px;"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  window.openDestinationModal = function(destId) {
    const db = getMockDatabase();
    const modalTitle = document.getElementById('destModalTitle');
    const idInput = document.getElementById('destId');
    const nameInput = document.getElementById('destName');
    const provInput = document.getElementById('destProvince');
    const regInput = document.getElementById('destRegion');
    const imgInput = document.getElementById('destImage');
    const descInput = document.getElementById('destDescription');
    const highInput = document.getElementById('destHighlights');
    const statusInput = document.getElementById('destStatus');

    if (destId) {
      const item = (db.destinations || []).find(d => d.id === destId);
      if (!item) return;
      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> Chỉnh Sửa Địa Điểm Tham Quan';
      if (idInput) idInput.value = item.id;
      if (nameInput) nameInput.value = item.name;
      if (provInput) provInput.value = item.province;
      if (regInput) regInput.value = item.region;
      if (imgInput) imgInput.value = item.image || '';
      if (descInput) descInput.value = item.description || '';
      if (highInput) highInput.value = item.highlights || '';
      if (statusInput) statusInput.value = item.status || 'active';
    } else {
      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-map-location-dot text-primary"></i> Thêm Địa Điểm Mới';
      const form = document.getElementById('formDestination');
      if (form) form.reset();
      if (idInput) idInput.value = '';
      if (statusInput) statusInput.value = 'active';
    }
    if (typeof previewDestinationImage === 'function') previewDestinationImage();
    openModal('modalDestination');
  };

  window.saveDestination = function(e) {
    if (e) e.preventDefault();
    const db = getMockDatabase();
    if (!db.destinations) db.destinations = [];

    const id = document.getElementById('destId').value;
    const name = document.getElementById('destName').value.trim();
    const province = document.getElementById('destProvince').value.trim();
    const region = document.getElementById('destRegion').value;
    const image = document.getElementById('destImage').value.trim() || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80';
    const description = document.getElementById('destDescription').value.trim();
    const highlights = document.getElementById('destHighlights').value.trim();
    const status = document.getElementById('destStatus').value;

    if (!name || !province) {
      showToast('Vui lòng nhập tên địa điểm và tỉnh thành!', 'warning');
      return;
    }

    if (id) {
      const idx = db.destinations.findIndex(d => d.id === id);
      if (idx !== -1) {
        db.destinations[idx] = {
          ...db.destinations[idx],
          name, province, region, image, description, highlights, status
        };
        showToast('Đã cập nhật thông tin địa điểm thành công!', 'success');
      }
    } else {
      const newDest = {
        id: `dest-${Date.now()}`,
        name, province, region, image, description, highlights, status,
        toursCount: 0
      };
      db.destinations.unshift(newDest);
      showToast('Đã thêm địa điểm tham quan mới thành công!', 'success');
    }

    saveMockDatabase(db);
    closeModal('modalDestination');
    renderManagerDestinations();
  };

  window.toggleDestinationStatus = function(destId) {
    const db = getMockDatabase();
    const item = (db.destinations || []).find(d => d.id === destId);
    if (!item) return;
    item.status = item.status === 'active' ? 'inactive' : 'active';
    saveMockDatabase(db);
    showToast(`Đã ${item.status === 'active' ? 'mở lại' : 'tạm ẩn'} địa điểm ${item.name}!`, 'info');
    renderManagerDestinations();
  };

  window.deleteDestination = function(destId) {
    if (!confirm('Bạn có chắc chắn muốn xóa địa điểm tham quan này?')) return;
    const db = getMockDatabase();
    db.destinations = (db.destinations || []).filter(d => d.id !== destId);
    saveMockDatabase(db);
    showToast('Đã xóa địa điểm tham quan!', 'info');
    renderManagerDestinations();
  };

  window.previewDestinationImage = function() {
    const input = document.getElementById('destImage');
    const preview = document.getElementById('destImagePreview');
    if (input && preview) {
      preview.src = input.value.trim() || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80';
    }
  };

  const form = document.getElementById('formDestination');
  if (form) form.addEventListener('submit', window.saveDestination);

  renderManagerDestinations();
}

// ==========================================
// 17F. MANAGER REVIEWS MODULE
// ==========================================

function initManagerReviews() {
  const tbody = document.getElementById('managerReviewsTableBody');
  if (!tbody) return;

  window.renderManagerReviews = function() {
    const tableBody = document.getElementById('managerReviewsTableBody');
    if (!tableBody) return;
    const db = getMockDatabase();
    const reviews = db.reviews || [];

    const searchInput = document.getElementById('mgrReviewSearchInput');
    const ratingFilter = document.getElementById('mgrReviewRatingFilter');
    const statusFilter = document.getElementById('mgrReviewStatusFilter');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const rating = ratingFilter ? ratingFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = reviews.filter(r => {
      const matchKey = (r.tourTitle || '').toLowerCase().includes(keyword) || (r.userName || '').toLowerCase().includes(keyword) || (r.comment || '').toLowerCase().includes(keyword);
      const matchRating = rating === 'all' || String(r.rating) === rating;
      const matchStatus = status === 'all' || r.status === status;
      return matchKey && matchRating && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-muted"><i class="fa-regular fa-comment-dots fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không có đánh giá nào phù hợp.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map((r, idx) => `
      <tr>
        <td style="text-align:center; padding:10px 6px;"><strong class="text-muted">#${idx + 1}</strong></td>
        <td style="padding:10px 10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${r.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}" style="width:34px; height:34px; border-radius:50%; object-fit:cover;" alt="${r.userName}">
            <div>
              <strong style="color:#0f172a; font-size:0.85rem; display:block;">${r.userName}</strong>
              <span style="font-size:0.72rem; color:#64748b;">${r.date || 'Hôm qua'}</span>
            </div>
          </div>
        </td>
        <td style="padding:10px 10px;">
          <strong style="color:#0f172a; font-size:0.84rem; display:block; line-height:1.3;">${r.tourTitle}</strong>
        </td>
        <td style="padding:10px 8px;">
          <div style="color:#f59e0b; font-size:0.8rem;">
            ${Array.from({length: 5}, (_, i) => `<i class="fa-${i < r.rating ? 'solid' : 'regular'} fa-star"></i>`).join('')}
            <span style="font-weight:700; margin-left:3px; color:#0f172a;">${r.rating}.0</span>
          </div>
        </td>
        <td style="padding:10px 10px;">
          <p style="font-size:0.75rem; color:#334155; line-height:1.35; margin:0; max-width:280px;">${r.comment}</p>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <span class="badge ${r.status === 'approved' ? 'badge-success' : r.status === 'pending' ? 'badge-warning' : 'badge-neutral'}" style="font-size:0.72rem;">
            ${r.status === 'approved' ? 'Đã duyệt' : r.status === 'pending' ? 'Chờ duyệt' : 'Đã ẩn'}
          </span>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <div style="display:inline-flex; gap:4px; justify-content:center;">
            <button class="btn btn-outline btn-xs ${r.status === 'approved' ? 'text-warning' : 'text-success'}" onclick="toggleManagerReviewStatus('${r.id}')" title="${r.status === 'approved' ? 'Ẩn bình luận' : 'Duyệt hiển thị'}" style="padding:4px 7px;">
              <i class="fa-solid ${r.status === 'approved' ? 'fa-eye-slash' : 'fa-check'}"></i>
            </button>
            <button class="btn btn-outline btn-xs text-danger" onclick="deleteManagerReview('${r.id}')" title="Xóa" style="padding:4px 7px;"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  window.toggleManagerReviewStatus = function(reviewId) {
    const db = getMockDatabase();
    const item = (db.reviews || []).find(r => r.id === reviewId);
    if (!item) return;
    item.status = item.status === 'approved' ? 'hidden' : 'approved';
    saveMockDatabase(db);
    showToast(`Đã ${item.status === 'approved' ? 'duyệt hiển thị' : 'ẩn'} bình luận!`, 'info');
    renderManagerReviews();
  };

  window.deleteManagerReview = function(reviewId) {
    if (!confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) return;
    const db = getMockDatabase();
    db.reviews = (db.reviews || []).filter(r => r.id !== reviewId);
    saveMockDatabase(db);
    showToast('Đã xóa đánh giá!', 'info');
    renderManagerReviews();
  };

  renderManagerReviews();
}

// ==========================================
// 17G. GUIDE TOUR REAL-TIME UPDATES MODULE
// ==========================================

function initGuideTourUpdates() {
  const container = document.getElementById('guideTourUpdateContainer');
  if (!container) return;

  const db = getMockDatabase();
  const departures = db.departures || [];
  const tours = db.tours || [];
  const assigned = departures.filter(d => d.guideId === 'usr-guide-1' || d.guideName === 'Trần Quốc Hưng').map(d => {
    const t = tours.find(item => item.id === d.tourId) || {};
    const booked = (d.maxSlots || 20) - (d.slots || 0);
    return {
      ...d,
      tourTitle: t.title || 'Tour Du Lịch Di Sản',
      startDate: d.date || 'Hôm nay',
      currentGuests: booked,
      maxGuests: d.maxSlots || 20
    };
  });

  const selector = document.getElementById('guideDepartureSelector');
  if (selector) {
    selector.innerHTML = assigned.map(d => `
      <option value="${d.id}">${d.tourTitle} (Khởi hành: ${d.startDate} • ${d.currentGuests}/${d.maxGuests} khách)</option>
    `).join('');
  }

  window.loadGuideTourUpdate = function(depId) {
    const currentDepId = depId || (selector ? selector.value : (assigned[0] ? assigned[0].id : null));
    if (!currentDepId) return;

    const currentDb = getMockDatabase();
    const updateRecord = (currentDb.tourUpdates || []).find(u => u.departureId === currentDepId) || {
      departureId: currentDepId,
      checkpointStatus: 'in_progress',
      headcountChecked: 18,
      weather: 'Nắng nhẹ 27°C, rất thuận lợi tham quan',
      vehicleStatus: 'Xe 29 chỗ Universe số 43B-029.88 vận hành tốt',
      fieldNotes: 'Đoàn di chuyển đúng tiến độ, khách vui vẻ, an toàn.',
      updatedAt: 'Vừa xong'
    };

    const weatherInput = document.getElementById('guideWeather');
    const vehicleInput = document.getElementById('guideVehicle');
    const notesInput = document.getElementById('guideFieldNotes');
    const lastUpdateSpan = document.getElementById('guideLastUpdate');

    if (weatherInput) weatherInput.value = updateRecord.weather || '';
    if (vehicleInput) vehicleInput.value = updateRecord.vehicleStatus || '';
    if (notesInput) notesInput.value = updateRecord.fieldNotes || '';
    if (lastUpdateSpan) lastUpdateSpan.textContent = updateRecord.updatedAt || 'Hôm nay';
  };

  window.saveGuideTourUpdate = function(e) {
    if (e) e.preventDefault();
    const currentDb = getMockDatabase();
    if (!currentDb.tourUpdates) currentDb.tourUpdates = [];

    const depId = selector ? selector.value : (assigned[0] ? assigned[0].id : 'dep-1');
    const weather = document.getElementById('guideWeather')?.value || '';
    const vehicleStatus = document.getElementById('guideVehicle')?.value || '';
    const fieldNotes = document.getElementById('guideFieldNotes')?.value || '';
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()}`;

    const existingIdx = currentDb.tourUpdates.findIndex(u => u.departureId === depId);
    const newUpdate = {
      id: `upd-${Date.now()}`,
      departureId: depId,
      guideId: 'usr-guide-1',
      guideName: 'Trần Quốc Hưng',
      weather,
      vehicleStatus,
      fieldNotes,
      updatedAt: timeStr
    };

    if (existingIdx !== -1) {
      currentDb.tourUpdates[existingIdx] = { ...currentDb.tourUpdates[existingIdx], ...newUpdate };
    } else {
      currentDb.tourUpdates.unshift(newUpdate);
    }

    saveMockDatabase(currentDb);
    showToast('Đã cập nhật thông tin và tiến độ tour thực địa thành công!', 'success');
    const lastUpdateSpan = document.getElementById('guideLastUpdate');
    if (lastUpdateSpan) lastUpdateSpan.textContent = timeStr;
  };

  if (selector) {
    selector.addEventListener('change', () => window.loadGuideTourUpdate(selector.value));
  }
  const form = document.getElementById('formGuideTourUpdate');
  if (form) form.addEventListener('submit', window.saveGuideTourUpdate);

  window.loadGuideTourUpdate();
}

// ==========================================
// 17H. MANAGER MEDIA GALLERY MODULE
// ==========================================

function initManagerMedia() {
  const grid = document.getElementById('managerMediaGrid');
  if (!grid) return;

  window.renderManagerMedia = function() {
    const container = document.getElementById('managerMediaGrid');
    if (!container) return;
    const db = getMockDatabase();
    const media = db.media || [];

    const categoryFilter = document.getElementById('mediaCategoryFilter');
    const cat = categoryFilter ? categoryFilter.value : 'all';

    const filtered = media.filter(m => cat === 'all' || m.category === cat);

    const kpiTotal = document.getElementById('kpiTotalMedia');
    if (kpiTotal) kpiTotal.textContent = `${media.length} Hình Ảnh`;

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1;" class="text-center py-5 text-muted"><i class="fa-regular fa-image fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không có hình ảnh nào phù hợp.</div>`;
      return;
    }

    container.innerHTML = filtered.map(m => `
      <div class="admindek-card" style="border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; background:#ffffff; transition:transform 0.2s, box-shadow 0.2s;">
        <div style="position:relative; height:160px; overflow:hidden; background:#f1f5f9;">
          <img src="${m.url}" alt="${m.title}" style="width:100%; height:100%; object-fit:cover;">
          <span class="badge ${m.category === 'Tour' ? 'badge-primary' : 'badge-warning'}" style="position:absolute; top:8px; left:8px; font-size:0.7rem; font-weight:700;">
            ${m.category}
          </span>
        </div>
        <div style="padding:14px;">
          <strong style="color:#0f172a; font-size:0.88rem; display:block; margin-bottom:4px; line-height:1.3;">${m.title}</strong>
          <div style="font-size:0.75rem; color:#64748b; margin-bottom:12px; display:flex; justify-content:space-between;">
            <span><i class="fa-regular fa-calendar"></i> ${m.date}</span>
            <span><i class="fa-solid fa-file"></i> ${m.size}</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-outline btn-xs" style="flex:1;" onclick="navigator.clipboard.writeText('${m.url}'); showToast('Đã sao chép link ảnh vào clipboard!', 'success');" title="Sao chép link">
              <i class="fa-regular fa-copy"></i> Link
            </button>
            <button class="btn btn-outline btn-xs" onclick="window.open('${m.url}', '_blank')" title="Xem ảnh gốc">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button class="btn btn-outline btn-xs text-danger" onclick="deleteMediaImage('${m.id}')" title="Xóa ảnh">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  window.openMediaUploadModal = function() {
    const form = document.getElementById('formMediaUpload');
    if (form) form.reset();
    openModal('modalMediaUpload');
  };

  window.previewMediaModalImage = function() {
    const input = document.getElementById('mediaUrl');
    const preview = document.getElementById('mediaModalPreview');
    if (input && preview) {
      preview.src = input.value.trim() || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=200&q=80';
    }
  };

  window.saveMediaImage = function(e) {
    if (e) e.preventDefault();
    const db = getMockDatabase();
    if (!db.media) db.media = [];

    const title = document.getElementById('mediaTitle').value.trim();
    const category = document.getElementById('mediaCategory').value;
    const url = document.getElementById('mediaUrl').value.trim();

    if (!title || !url) {
      showToast('Vui lòng nhập tên ảnh và đường dẫn hợp lệ!', 'warning');
      return;
    }

    const now = new Date();
    const newMedia = {
      id: `med-${Date.now()}`,
      title,
      category,
      url,
      date: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()}`,
      size: '1.5 MB'
    };

    db.media.unshift(newMedia);
    saveMockDatabase(db);
    showToast('Đã thêm hình ảnh mới vào thư viện!', 'success');
    closeModal('modalMediaUpload');
    renderManagerMedia();
  };

  window.deleteMediaImage = function(mediaId) {
    if (!confirm('Bạn có chắc chắn muốn xóa hình ảnh này khỏi thư viện?')) return;
    const db = getMockDatabase();
    db.media = (db.media || []).filter(m => m.id !== mediaId);
    saveMockDatabase(db);
    showToast('Đã xóa hình ảnh!', 'info');
    renderManagerMedia();
  };

  renderManagerMedia();
}

// ==========================================
// 17I. MANAGER PAYMENTS MODULE
// ==========================================

function initManagerPayments() {
  const tbody = document.getElementById('managerPaymentsTableBody');
  if (!tbody) return;

  window.renderManagerPayments = function() {
    const tableBody = document.getElementById('managerPaymentsTableBody');
    if (!tableBody) return;
    const db = getMockDatabase();
    const payments = db.payments || [];

    const methodFilter = document.getElementById('paymentMethodFilter');
    const statusFilter = document.getElementById('paymentStatusFilter');

    const method = methodFilter ? methodFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = payments.filter(p => {
      const matchMethod = method === 'all' || p.method === method;
      const matchStatus = status === 'all' || p.status === status;
      return matchMethod && matchStatus;
    });

    const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const kpiRev = document.getElementById('kpiTotalRevenue');
    if (kpiRev) kpiRev.textContent = formatCurrency(totalRevenue);

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-5 text-muted"><i class="fa-solid fa-credit-card fa-2x mb-2" style="color:#cbd5e1; display:block;"></i>Không tìm thấy giao dịch thanh toán nào.</td></tr>`;
      return;
    }

    const methodIcons = {
      vnpay: 'fa-solid fa-qrcode text-primary',
      bank_transfer: 'fa-solid fa-building-columns text-success',
      momo: 'fa-solid fa-wallet text-danger',
      credit_card: 'fa-solid fa-credit-card text-blue',
      cash: 'fa-solid fa-money-bill-wave text-amber'
    };

    tableBody.innerHTML = filtered.map((p, idx) => `
      <tr>
        <td style="text-align:center; padding:10px 6px;"><strong class="text-muted">#${idx + 1}</strong></td>
        <td style="padding:10px 10px;">
          <strong style="color:#0f766e; font-family:monospace; font-size:0.84rem;">${p.transactionId}</strong>
          <span style="display:block; font-size:0.72rem; color:#64748b;">${p.date}</span>
        </td>
        <td style="padding:10px 8px;">
          <span class="badge badge-neutral" style="font-weight:700; font-family:monospace; font-size:0.75rem;">${p.bookingId}</span>
        </td>
        <td style="padding:10px 10px;">
          <strong style="color:#0f172a; font-size:0.86rem; display:block;">${p.customerName}</strong>
          <span style="font-size:0.74rem; color:#64748b; line-height:1.3; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden;">${p.tourTitle}</span>
        </td>
        <td style="padding:10px 8px;">
          <strong style="color:#0f766e; font-size:0.9rem;">${formatCurrency(p.amount)}</strong>
        </td>
        <td style="padding:10px 8px;">
          <div style="font-size:0.8rem; color:#334155; display:flex; align-items:center; gap:6px;">
            <i class="${methodIcons[p.method] || 'fa-solid fa-money-check'}"></i>
            <span>${p.methodLabel}</span>
          </div>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <span class="badge ${p.status === 'paid' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-danger'}" style="font-size:0.72rem;">
            ${p.status === 'paid' ? '<i class="fa-solid fa-circle-check"></i> Đã thanh toán' : p.status === 'pending' ? '<i class="fa-solid fa-clock"></i> Chờ duyệt' : '<i class="fa-solid fa-arrow-rotate-left"></i> Đã hoàn tiền'}
          </span>
        </td>
        <td style="text-align:center; padding:10px 6px;">
          <div style="display:inline-flex; gap:4px; justify-content:center;">
            <button class="btn btn-outline btn-xs ${p.status === 'pending' ? 'text-success' : ''}" onclick="togglePaymentStatus('${p.id}')" title="${p.status === 'pending' ? 'Xác nhận thanh toán' : 'Chuyển trạng thái'}" style="padding:4px 7px;">
              <i class="fa-solid ${p.status === 'pending' ? 'fa-check' : 'fa-arrows-rotate'}"></i>
            </button>
            <button class="btn btn-outline btn-xs text-danger" onclick="refundPayment('${p.id}')" title="Hoàn tiền" style="padding:4px 7px;">
              <i class="fa-solid fa-arrow-rotate-left"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  window.togglePaymentStatus = function(payId) {
    const db = getMockDatabase();
    const item = (db.payments || []).find(p => p.id === payId);
    if (!item) return;
    item.status = item.status === 'paid' ? 'pending' : 'paid';
    saveMockDatabase(db);
    showToast(`Đã chuyển trạng thái thanh toán đơn ${item.bookingId}!`, 'info');
    renderManagerPayments();
  };

  window.refundPayment = function(payId) {
    if (!confirm('Bạn có chắc chắn muốn ghi nhận hoàn tiền cho giao dịch này?')) return;
    const db = getMockDatabase();
    const item = (db.payments || []).find(p => p.id === payId);
    if (!item) return;
    item.status = 'refunded';
    saveMockDatabase(db);
    showToast(`Đã ghi nhận hoàn tiền cho giao dịch ${item.transactionId}!`, 'warning');
    renderManagerPayments();
  };

  renderManagerPayments();
}

// ==========================================
// 17J. TOUR CATEGORIES STANDALONE MODULE
// ==========================================

function initAdminCategories() {
  const table = document.getElementById('adminCategoriesTableBody') || document.getElementById('managerCategoriesTableBody');
  if (!table) return;

  window.renderAdminCategories = function() {
    const targetTable = document.getElementById('adminCategoriesTableBody') || document.getElementById('managerCategoriesTableBody');
    if (!targetTable) return;
    const db = getMockDatabase();
    if (!db.categories) db.categories = DEFAULT_MOCK_DATA.categories;

    targetTable.innerHTML = db.categories.map((cat, idx) => {
      const matchedToursCount = (db.tours || []).filter(t => t.theme === cat.code || (t.title && t.title.toLowerCase().includes(cat.name.toLowerCase()))).length;

      return `
        <tr>
          <td style="text-align:center; padding:10px 6px;"><strong class="text-muted">#${idx + 1}</strong></td>
          <td style="text-align:center; padding:10px 6px;">
            <div style="width:36px; height:36px; border-radius:8px; background:${cat.color || '#0f766e'}15; color:${cat.color || '#0f766e'}; display:inline-flex; align-items:center; justify-content:center; font-size:1rem;">
              <i class="fa-solid ${cat.icon || 'fa-tag'}"></i>
            </div>
          </td>
          <td style="padding:10px 10px;">
            <strong style="color:#0f172a; font-size:0.88rem;">${cat.name}</strong>
          </td>
          <td style="padding:10px 8px;">
            <code style="background:#f1f5f9; padding:3px 6px; border-radius:4px; color:#0f766e; font-size:0.8rem;">${cat.code || cat.slug || ''}</code>
          </td>
          <td style="padding:10px 10px; font-size:0.78rem; color:#475569;">
            ${cat.description || 'Danh mục tour tiêu chuẩn'}
          </td>
          <td style="text-align:center; padding:10px 6px;">
            <span class="badge badge-primary" style="font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-route"></i> ${matchedToursCount || cat.tourCount || 0} Tour</span>
          </td>
          <td style="text-align:center; padding:10px 6px;">
            <div style="display:inline-flex; gap:4px; justify-content:center;">
              <button class="btn btn-outline btn-xs" onclick="openAdminCategoryModal('${cat.id}')" title="Sửa" style="padding:4px 7px;"><i class="fa-regular fa-pen-to-square"></i></button>
              <button class="btn btn-outline btn-xs text-danger" onclick="deleteAdminCategory('${cat.id}')" title="Xóa" style="padding:4px 7px;"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  renderAdminCategories();
}

// Auto-run individual page initializers when loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initManagerPromotions === 'function') initManagerPromotions();
  if (typeof initManagerBookings === 'function') initManagerBookings();
  if (typeof initManagerGuides === 'function') initManagerGuides();
  if (typeof initManagerDestinations === 'function') initManagerDestinations();
  if (typeof initManagerReviews === 'function') initManagerReviews();
  if (typeof initManagerMedia === 'function') initManagerMedia();
  if (typeof initManagerPayments === 'function') initManagerPayments();
  if (typeof initAdminCategories === 'function') initAdminCategories();
  if (typeof initGuideTourUpdates === 'function') initGuideTourUpdates();
});


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
