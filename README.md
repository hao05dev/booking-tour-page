# BookingTour - Website Booking Tour UI Prototype

Bộ Prototype giao diện hoàn chỉnh gồm **14 màn hình** cho Website Đặt Tour Du Lịch, xây dựng bằng **HTML5, CSS3 và Vanilla JavaScript**, chuẩn phong cách Modern Travel Booking.

## 🌟 Danh Sách 14 Trang & Luồng Trải Nghiệm (User Flow)

1. [`index.html`](index.html) - **Trang Chủ (Home)**: Navbar, Hero banner du lịch, Thanh tìm kiếm thông minh, Tour nổi bật, Điểm đến thịnh hành, Giá trị cốt lõi & Footer.
2. [`tours.html`](tours.html) - **Danh Sách Tour (Tour Listing)**: Sidebar bộ lọc đa tiêu chí (địa điểm, giá, thời lượng, ngày đi), Sắp xếp, Phân trang, cùng các trạng thái Normal / Empty / Error state.
3. [`tour-detail.html`](tour-detail.html) - **Chi Tiết Tour (Tour Detail)**: Thư viện ảnh Lightbox, Timeline lịch trình chi tiết (Day 1, 2, 3), Thẻ chuyến đi (Departure) chọn ngày & tăng giảm hành khách tự động tính nhẩm tổng tiền, Sticky Booking Summary.
4. [`explore.html`](explore.html) - **Khám Phá (Explore)**: Khám phá theo vùng miền (Bắc - Trung - Nam) và 6 chủ đề du lịch (Biển đảo, Thiên nhiên, Văn hóa, Ẩm thực, Nghỉ dưỡng, Gia đình).
5. [`about.html`](about.html) - **Về Chúng Tôi (About Us)**: Sứ mệnh, Tầm nhìn 2030, Con số thống kê ấn tượng, Lý do chọn BookingTour và Form liên hệ.
6. [`login.html`](login.html) - **Đăng Nhập (Login)**: Form validate UI, Toggle ẩn/hiện mật khẩu, Đăng nhập mạng xã hội giả lập.
7. [`register.html`](register.html) - **Đăng Ký (Register)**: Form đăng ký thành viên với validation khớp mật khẩu và điều khoản dịch vụ.
8. [`booking.html`](booking.html) - **Đặt Chỗ (Checkout)**: Form 4 bước (Thông tin người đặt, Danh sách hành khách, Điều kiện tour, Thanh toán Online) & Sticky Summary.
9. [`payment.html`](payment.html) - **Thanh Toán (Payment)**: Đồng hồ đếm ngược **10:00** chạy realtime, Mã VietQR tự động, Bộ nút giả lập kết quả thanh toán cho tester.
10. [`payment-result.html`](payment-result.html) - **Kết Quả Thanh Toán**: 3 trạng thái giao diện linh hoạt (`Success`, `Failed`, `Expired`).
11. [`booking-history.html`](booking-history.html) - **Lịch Sử Đặt Tour (Dashboard)**: Quản lý các chuyến đi theo tab `Sắp khởi hành`, `Đã tham gia`, `Đã hủy`, tích hợp Modal Hủy tour và Modal Đánh giá nhanh.
12. [`booking-detail.html`](booking-detail.html) - **Chi Tiết Vé Đã Đặt**: Xem mã QR/Barcode vé, Thông tin Hướng dẫn viên phụ trách, Danh sách đoàn và Nút In vé / Tải PDF.
13. [`review.html`](review.html) - **Đánh Giá Tour (Review)**: Bộ chọn 5 sao tương tác, Đánh giá chi tiết từng tiêu chí dịch vụ và Upload ảnh kỷ niệm.
14. [`profile.html`](profile.html) - **Hồ Sơ Của Tôi (My Profile)**: Quản lý thông tin cá nhân, Đổi ảnh đại diện, Modal Đổi mật khẩu và Đăng xuất.

---

## 🚀 Hướng Dẫn Chạy & Thuyết Trình Prototype

- **Không cần cài đặt backend hay build tool**: Chỉ cần mở trực tiếp bất kỳ file `.html` nào bằng trình duyệt web (Chrome, Edge, Firefox, Safari) hoặc dùng VS Code Live Server.
- **Màu sắc chủ đạo**: Primary `#0F766E`, Primary Dark `#115E59`, Accent `#F59E0B`, Background `#F8FAFC`.
- **Responsive đầy đủ**: Tối ưu mượt mà trên Desktop (1440px/1280px), Tablet (768px) và Mobile (390px/375px).