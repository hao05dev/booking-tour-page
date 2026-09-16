# BookingTour - Website Booking Tour Interactive Prototype (HTML5 / CSS3 / Vanilla JS)

Bộ Prototype giao diện hoàn chỉnh gồm **17 màn hình tương tác** cho Website Đặt Tour Du Lịch, xây dựng bằng **HTML5, CSS3 và Vanilla JavaScript thuần**, không sử dụng backend, framework hay API ngoài, chạy mượt mà ngay khi mở file HTML trên trình duyệt hoặc qua GitHub Pages.

---

## 🎭 Hệ Thống 5 Vai Trò (Actor & Roles) & Dynamic Navbar

Hệ thống hỗ trợ chuyển đổi linh hoạt giữa 5 vai trò mô phỏng qua thanh **Floating Demo Role Switcher** (góc dưới bên trái) hoặc qua trang [login.html](login.html):

1. 👤 **Khách Vãng Lai (Guest - Mặc định)**:
   - Navbar hiển thị nút *Đăng nhập* / *Đăng ký*.
   - Khám phá tour, tìm kiếm & xem chi tiết.
   - Nhắc đăng nhập khi bấm *Đặt Tour* hoặc vào các trang yêu cầu tài khoản.
2. 🎒 **Khách Hàng (Customer)**:
   - Navbar hiển thị Avatar, Dropdown menu: *Xem tour của tôi* ([ooking-history.html](booking-history.html)), *Hồ sơ cá nhân* ([profile.html](profile.html)), *Đăng xuất*.
   - Đặt tour, thanh toán VietQR với đồng hồ đếm ngược, hủy tour và viết đánh giá.
3. 🚩 **Hướng Dẫn Viên (Tour Guide)**:
   - Navbar hiển thị Badge HDV, Dropdown menu: *Bảng điều khiển HDV* ([guide-dashboard.html](guide-dashboard.html)).
   - Quản lý các đoàn được phân công, xem danh sách hành khách & điểm danh, cập nhật tiến độ đoàn qua Stepper 5 bước (*Sắp diễn ra -> Chuẩn bị đoàn -> Đang đón khách -> Đang diễn ra -> Hoàn thành tour*).
4. 📋 **Quản Lý Tour (Tour Manager)**:
   - Navbar hiển thị Badge Quản Lý, Dropdown menu: *Quản lý Tour & Lịch trình* ([manager-dashboard.html](manager-dashboard.html)).
   - Quản lý kho tour (Tạo tour mới, xóa tour), tạo lịch khởi hành & phân công HDV phụ trách, theo dõi các đơn booking.
5. 🛡️ **Quản Trị Viên (Admin)**:
   - Navbar hiển thị Badge Admin, Dropdown menu: *Bảng Quản Trị Hệ Thống* ([dmin-dashboard.html](admin-dashboard.html)).
   - Quản lý người dùng, thay đổi phân quyền 5 vai trò theo thời gian thực, tạm khóa/mở khóa tài khoản, duyệt và ẩn đánh giá (Review Moderation).

---

## 🌟 Danh Sách 17 Trang & Chức Năng

### 🔹 Nhóm Trang Đặt Tour & Khách Hàng (14 trang)
1. [index.html](index.html) - **Trang Chủ**: Hero banner, Tìm kiếm theo từ khóa/ngày/giá (tự động chuyển hướng & lọc sang 	ours.html), Tour nổi bật, Điểm đến thịnh hành.
2. [	ours.html](tours.html) - **Danh Sách Tour**: Đọc tham số URL tìm kiếm, bộ lọc danh mục vùng miền, thanh trượt giá tối đa, thời lượng, số sao đánh giá, sắp xếp giá/độ phổ biến, đếm số kết quả và Empty State.
3. [	our-detail.html](tour-detail.html) - **Chi Tiết Tour**: Lịch trình theo ngày, chọn ngày khởi hành, tăng giảm người lớn/trẻ em tự động tính nhẩm tổng tiền, kiểm tra trạng thái đăng nhập khi bấm Đặt Tour.
4. [explore.html](explore.html) - **Khám Phá**: Khám phá tour theo 3 miền Bắc - Trung - Nam và các chủ đề du lịch.
5. [bout.html](about.html) - **Về Chúng Tôi**: Sứ mệnh, giá trị cốt lõi, đội ngũ và form liên hệ.
6. [login.html](login.html) - **Đăng Nhập**: Form đăng nhập + 4 nút 1-click Demo Login cho từng vai trò.
7. [egister.html](register.html) - **Đăng Ký**: Form đăng ký thành viên với validation khớp mật khẩu.
8. [ooking.html](booking.html) - **Đặt Chỗ**: Form thông tin người đặt & danh sách hành khách, tự động điền thông tin từ tài khoản đang đăng nhập.
9. [payment.html](payment.html) - **Thanh Toán**: Đồng hồ đếm ngược **10:00** chạy realtime, quét mã VietQR, xác nhận thanh toán lưu đơn vào Mock DB.
10. [payment-result.html](payment-result.html) - **Kết Quả Thanh Toán**: 3 trạng thái linh hoạt (*Success*, *Failed*, *Expired*) kèm mã booking thật.
11. [ooking-history.html](booking-history.html) - **Lịch Sử Đặt Tour**: Quản lý tour theo tab *Sắp khởi hành*, *Đã tham gia*, *Đã hủy*, Modal Hủy tour và Modal Đánh giá.
12. [ooking-detail.html](booking-detail.html) - **Chi Tiết Đơn Booking**: Mã QR vé, thông tin HDV phụ trách, bảng kê tiền chi tiết.
13. [eview.html](review.html) - **Đánh Giá Tour**: Chấm điểm 5 sao tương tác, nhận xét chi tiết và lưu trực tiếp vào danh sách review của hệ thống.
14. [profile.html](profile.html) - **Hồ Sơ Cá Nhân**: Cập nhật họ tên, điện thoại, địa chỉ và đồng bộ tức thời với Mock DB & session.

### 🔹 Nhóm Trang Vận Hành & Quản Trị (3 trang mới)
15. [guide-dashboard.html](guide-dashboard.html) - **Bảng Điều Khiển Hướng Dẫn Viên**: Cập nhật tiến độ tour 5 bước, xem danh sách hành khách và điểm danh lên xe.
16. [manager-dashboard.html](manager-dashboard.html) - **Quản Lý Tour & Lịch Trình**: Thống kê KPI, Modal Thêm Tour mới, Modal Mở ngày khởi hành & Phân công HDV, xóa tour.
17. [dmin-dashboard.html](admin-dashboard.html) - **Bảng Quản Trị Hệ Thống**: Bảng người dùng với dropdown đổi vai trò, khóa tài khoản, duyệt/ẩn đánh giá khách hàng, tổng quan doanh thu toàn sàn.

---

## 🎨 Design System & Kỹ Thuật

- **Màu sắc chủ đạo**: #0F766E (Teal Primary), #115E59 (Teal Dark), #F59E0B (Amber Accent), #F8FAFC (Slate Surface Background).
- **Typography**: Phông chữ chuẩn quốc tế 'Plus Jakarta Sans'.
- **Dữ liệu Mock**: File [js/mock-data.js](js/mock-data.js) chứa dữ liệu liên kết (Users, Tours, Departures, Bookings, Reviews) tự động lưu trữ và đồng bộ qua localStorage.
- **Tương tác Frontend**: File [js/main.js](js/main.js) điều khiển toàn bộ luồng session, dynamic navbar, tìm kiếm, stepper và modal.

---

© 2026 BookingTour Prototype. Thiết kế bởi Senior UI/UX Team.
