# BookingTour - Hệ Thống Website Đặt Tour Du Lịch Trực Tuyến

Giao diện hoàn chỉnh gồm **17 màn hình tương tác** cho Website Đặt Tour Du Lịch, xây dựng bằng **HTML5, CSS3 và Vanilla JavaScript thuần**, không sử dụng backend, framework hay API bên ngoài, chạy mượt mà trực tiếp trên mọi trình duyệt hoặc qua GitHub Pages.

---

## 🔑 Danh Sách Tài Khoản Đăng Nhập Hệ Thống

Để đăng nhập và trải nghiệm các vai trò, hãy truy cập trang [login.html](login.html) và nhập Email cùng Mật khẩu từ bảng bên dưới:

| STT | Vai Trò (Role) | Email Đăng Nhập | Mật Khẩu | Tên Người Dùng | Quyền Hạn & Tính Năng Trọng Tâm |
|:---:|:---|:---|:---:|:---|:---|
| 1 | 👤 **Khách Vãng Lai**<br>`guest` | *(Không cần đăng nhập)* | *(Trống)* | Khách Vãng Lai | • Trạng thái mặc định khi truy cập website.<br>• Tìm kiếm & xem chi tiết tour.<br>• Nhắc nhở đăng nhập khi bấm *Đặt Tour*. |
| 2 | 🎒 **Khách Hàng**<br>`customer` | `customer@example.com`<br>*(hoặc `hao.nguyen@example.com`)* | `12345678` | Nguyễn Văn Hào | • Đặt tour, tự động điền thông tin hành khách.<br>• Thanh toán VietQR với đồng hồ đếm ngược 10:00.<br>• Xem lịch sử đơn đặt tour ([booking-history.html](booking-history.html)).<br>• Xem chi tiết vé & mã QR ([booking-detail.html](booking-detail.html)).<br>• Gửi đánh giá tour ([review.html](review.html)).<br>• Chỉnh sửa hồ sơ cá nhân ([profile.html](profile.html)). |
| 3 | 🎒 **Khách Hàng 2**<br>`customer` | `mai.tran@example.com` | `12345678` | Trần Thị Mai | • Tài khoản khách hàng phụ để thử nghiệm dữ liệu đa người dùng. |
| 4 | 🚩 **Hướng Dẫn Viên**<br>`guide` | `guide@example.com` | `12345678` | Trần Quốc Hưng | • Bảng điều khiển HDV ([guide-dashboard.html](guide-dashboard.html)).<br>• Xem lịch khởi hành được phân công (Vịnh Hạ Long 25/10/2026).<br>• Xem danh sách 18 khách đoàn & điểm danh từng khách lên xe.<br>• **Cập nhật tiến độ tour 5 bước** qua Stepper tương tác (*Sắp diễn ra ➔ Chuẩn bị ➔ Đón khách ➔ Đang diễn ra ➔ Hoàn thành*). |
| 5 | 🚩 **Hướng Dẫn Viên 2**<br>`guide` | `tuan.guide@example.com` | `12345678` | Phạm Minh Tuấn | • HDV phụ trách tuyến Sa Pa (5 năm kinh nghiệm, 4.88★). |
| 6 | 📋 **Quản Lý Tour**<br>`manager` | `manager@example.com` | `12345678` | Nguyễn Thu Hà | • Bảng quản lý tour & lịch trình ([manager-dashboard.html](manager-dashboard.html)).<br>• **Thêm Tour Mới** qua Modal & lưu vào hệ thống.<br>• **Tạo Lịch Khởi Hành & Phân Công HDV** phụ trách.<br>• Xóa tour và theo dõi các chỉ số KPI vận hành. |
| 7 | 🛡️ **Quản Trị Viên**<br>`admin` | `admin@example.com` | `12345678` | Lê Hoàng Long | • Bảng quản trị hệ thống ([admin-dashboard.html](admin-dashboard.html)).<br>• **Thay đổi phân quyền vai trò (Role)** của người dùng theo thời gian thực.<br>• **Khóa / Mở khóa** tài khoản người dùng.<br>• **Kiểm duyệt đánh giá (Review Moderation)**: Duyệt hoặc ẩn nhận xét.<br>• Xem tổng quan đơn đặt tour & doanh thu toàn sàn. |

---

## 🎭 Hệ Thống 5 Vai Trò (Actor & Roles) & Dynamic Navbar

Hệ thống hỗ trợ phân quyền tự động theo vai trò người dùng sau khi đăng nhập qua trang [login.html](login.html):

1. 👤 **Khách Vãng Lai (Guest - Mặc định)**:
   - Navbar hiển thị nút *Đăng nhập* / *Đăng ký*.
   - Khám phá tour, tìm kiếm & xem chi tiết.
   - Nhắc đăng nhập khi bấm *Đặt Tour* hoặc vào các trang yêu cầu tài khoản.
2. 🎒 **Khách Hàng (Customer)**:
   - Navbar hiển thị Avatar, Dropdown menu: *Xem tour của tôi* ([booking-history.html](booking-history.html)), *Hồ sơ cá nhân* ([profile.html](profile.html)), *Đăng xuất*.
   - Đặt tour, thanh toán VietQR với đồng hồ đếm ngược, hủy tour và viết đánh giá.
3. 🚩 **Hướng Dẫn Viên (Tour Guide)**:
   - Navbar hiển thị Badge HDV, Dropdown menu: *Bảng điều khiển HDV* ([guide-dashboard.html](guide-dashboard.html)).
   - Quản lý các đoàn được phân công, xem danh sách hành khách & điểm danh, cập nhật tiến độ đoàn qua Stepper 5 bước (*Sắp diễn ra -> Chuẩn bị đoàn -> Đang đón khách -> Đang diễn ra -> Hoàn thành tour*).
4. 📋 **Quản Lý Tour (Tour Manager)**:
   - Navbar hiển thị Badge Quản Lý, Dropdown menu: *Quản lý Tour & Lịch trình* ([manager-dashboard.html](manager-dashboard.html)).
   - Quản lý kho tour (Tạo tour mới, xóa tour), tạo lịch khởi hành & phân công HDV phụ trách, theo dõi các đơn booking.
5. 🛡️ **Quản Trị Viên (Admin)**:
   - Navbar hiển thị Badge Admin, Dropdown menu: *Bảng Quản Trị Hệ Thống* ([admin-dashboard.html](admin-dashboard.html)).
   - Quản lý người dùng, thay đổi phân quyền 5 vai trò theo thời gian thực, tạm khóa/mở khóa tài khoản, duyệt và ẩn đánh giá (Review Moderation).

---

## 🌟 Danh Sách 17 Trang & Chức Năng

### 🔹 Nhóm Trang Đặt Tour & Khách Hàng (14 trang)
1. [index.html](index.html) - **Trang Chủ**: Hero banner, Tìm kiếm theo từ khóa/ngày/giá (tự động chuyển hướng & lọc sang tours.html), Tour nổi bật, Điểm đến thịnh hành.
2. [tours.html](tours.html) - **Danh Sách Tour**: Đọc tham số URL tìm kiếm, bộ lọc danh mục vùng miền, thanh trượt giá tối đa, thời lượng, số sao đánh giá, sắp xếp giá/độ phổ biến, đếm số kết quả và Empty State.
3. [tour-detail.html](tour-detail.html) - **Chi Tiết Tour**: Lịch trình theo ngày, chọn ngày khởi hành, tăng giảm người lớn/trẻ em tự động tính nhẩm tổng tiền, kiểm tra trạng thái đăng nhập khi bấm Đặt Tour.
4. [explore.html](explore.html) - **Khám Phá**: Khám phá tour theo 3 miền Bắc - Trung - Nam và các chủ đề du lịch.
5. [about.html](about.html) - **Về Chúng Tôi**: Sứ mệnh, giá trị cốt lõi, đội ngũ và form liên hệ.
6. [login.html](login.html) - **Đăng Nhập**: Form đăng nhập theo tài khoản email và mật khẩu với validation.
7. [register.html](register.html) - **Đăng Ký**: Form đăng ký thành viên với validation khớp mật khẩu.
8. [booking.html](booking.html) - **Đặt Chỗ**: Form thông tin người đặt & danh sách hành khách, tự động điền thông tin từ tài khoản đang đăng nhập.
9. [payment.html](payment.html) - **Thanh Toán**: Đồng hồ đếm ngược **10:00** chạy realtime, quét mã VietQR, xác nhận thanh toán lưu đơn vào Mock DB.
10. [payment-result.html](payment-result.html) - **Kết Quả Thanh Toán**: 3 trạng thái (*Success*, *Failed*, *Expired*) kèm mã booking thật.
11. [booking-history.html](booking-history.html) - **Lịch Sử Đặt Tour**: Quản lý tour theo tab *Sắp khởi hành*, *Đã tham gia*, *Đã hủy*, Modal Hủy tour và Modal Đánh giá.
12. [booking-detail.html](booking-detail.html) - **Chi Tiết Đơn Booking**: Mã QR vé, thông tin HDV phụ trách, bảng kê tiền chi tiết.
13. [review.html](review.html) - **Đánh Giá Tour**: Chấm điểm 5 sao tương tác, nhận xét chi tiết và lưu trực tiếp vào danh sách review của hệ thống.
14. [profile.html](profile.html) - **Hồ Sơ Cá Nhân**: Cập nhật họ tên, điện thoại, địa chỉ và đồng bộ tức thời với Mock DB & session.

### 🔹 Nhóm Trang Vận Hành & Quản Trị (3 trang)
15. [guide-dashboard.html](guide-dashboard.html) - **Bảng Điều Khiển Hướng Dẫn Viên**: Cập nhật tiến độ tour 5 bước, xem danh sách hành khách và điểm danh lên xe.
16. [manager-dashboard.html](manager-dashboard.html) - **Quản Lý Tour & Lịch Trình**: Thống kê KPI, Modal Thêm Tour mới, Modal Mở ngày khởi hành & Phân công HDV, xóa tour.
17. [admin-dashboard.html](admin-dashboard.html) - **Bảng Quản Trị Hệ Thống**: Bảng người dùng với dropdown đổi vai trò, khóa tài khoản, duyệt/ẩn đánh giá khách hàng, tổng quan doanh thu toàn sàn.

---

## 🎨 Design System & Kỹ Thuật

- **Màu sắc chủ đạo**: `#0F766E` (Teal Primary), `#115E59` (Teal Dark), `#F59E0B` (Amber Accent), `#F8FAFC` (Slate Surface Background).
- **Typography**: Phông chữ chuẩn quốc tế 'Plus Jakarta Sans'.
- **Dữ liệu Mock**: File [js/mock-data.js](js/mock-data.js) chứa dữ liệu liên kết (Users, Tours, Departures, Bookings, Reviews) tự động lưu trữ và đồng bộ qua `localStorage`.
- **Tương tác Frontend**: File [js/main.js](js/main.js) điều khiển toàn bộ luồng session, dynamic navbar, tìm kiếm, stepper và modal.

---

© 2026 BookingTour. Tất cả quyền được bảo lưu.
