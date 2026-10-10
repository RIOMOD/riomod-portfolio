# HƯỚNG DẪN TRIỂN KHAI & QUẢN TRỊ PORTFOLIO
### Firebase Hosting • Render.com • Neon.tech • Bố Cục Kéo Thả Widgets

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Dự án Portfolio hỗ trợ cả 2 mô hình linh hoạt:
1. **Chế độ Client-Only / Tĩnh (Static)**: Chạy hoàn toàn trên trình duyệt, lưu cấu hình vào `localStorage`. Rất phù hợp deploy lên **Firebase Hosting** hoặc **Cloudflare Pages**.
2. **Chế độ Full-Stack Cloud Database**: 
   - **Frontend**: React 19 + Vite + 3D Three.js + Framer Motion.
   - **Backend API**: Node.js / Express phục vụ đồng bộ dữ liệu tại `/api/portfolio`.
   - **Database**: **Neon.tech Serverless PostgreSQL** lưu trữ vĩnh viễn toàn bộ hồ sơ, dự án, sự kiện, cấu hình bố cục và widgets.
   - **Cloud Host**: **Render.com** (tự động build Vite và chạy Express server full-stack 1-click qua `render.yaml`).

---

## 2. QUẢN LÝ BỐ CỤC & THÊM WIDGETS TRONG TRANG ADMIN

### 2.1. Cách truy cập trang Quản Trị:
- **Cách 1**: Bấm vào nút **"Quản Trị"** (biểu tượng chiếc khiên tím) ở góc trên thanh Header.
- **Cách 2**: Truy cập trực tiếp đường dẫn có chứa hash `#admin` (Ví dụ: `https://your-domain.com/#admin` hoặc `http://localhost:5173/#admin`).
- **Mã PIN quản trị mặc định**: `2026` (Có thể đổi trong tab *Sao Lưu & Cloud* hoặc biến môi trường `ADMIN_PIN`).

### 2.2. Tab "Bố Cục & Widgets" (Layout Builder):
- **Kéo & Thả (Drag and Drop)**: Nhấn giữ biểu tượng kéo ở cột trái của từng mục để di chuyển vị trí lên/xuống theo ý muốn.
- **Mũi tên Lên / Xuống**: Dễ dàng đổi thứ tự trên cả điện thoại và máy tính.
- **Bật / Tắt hiển thị (Hiện / Ẩn)**: Nhấn nút mắt (Eye) để ẩn bất kỳ Section hoặc Widget nào mà bạn chưa muốn công khai.
- **Thêm Widget Mới**: Nhấn nút `+ Thêm Widget Mới` để mở thư viện widget:
  1. **GitHub Activity & Stats**: Thẻ thống kê commits, repositories nổi bật và liên kết GitHub.
  2. **Lo-Fi Music Player Bar**: Trình phát nhạc nền chill coding beats với visualizer sóng nhạc.
  3. **Interactive Tech Matrix**: Bảng radar kỹ năng tương tác kèm bộ lọc theo ngành.
  4. **Triết Lý Sống & Phương Châm (Quote Banner)**: Trích dẫn triết lý nghề nghiệp phát sáng ấn tượng.
  5. **Quick Booking & Coffee Chat (CTA)**: Khối kêu gọi liên hệ đặt lịch trò chuyện / trao đổi cơ hội.
  6. **Social Network Connect Grid**: Lưới mạng xã hội và kênh liên lạc nhanh.
- **Cấu hình Widget (Biểu tượng ⚙️)**: Tùy chỉnh tiêu đề, nội dung câu nói, username GitHub, nút bấm liên hệ,...
- **Khôi phục Gốc**: Đặt lại thứ tự và cấu hình các mục về mặc định nếu cần.

---

## 3. TRIỂN KHAI LÊN NEON.TECH (POSTGRESQL DATABASE)

[Neon.tech](https://neon.tech) cung cấp cơ sở dữ liệu PostgreSQL Serverless miễn phí, tốc độ cao.

### Các bước thiết lập:
1. Đăng ký tài khoản tại [https://neon.tech](https://neon.tech).
2. Tạo một Project mới (ví dụ đặt tên: `riomod-portfolio-db`).
3. Tại trang **Dashboard**, chọn mục **Connection Details**:
   - Chọn mục **Connection string** (dạng `Postgres` hoặc `Node.js`).
   - Sao chép chuỗi kết nối dạng:
     ```bash
     postgresql://neondb_owner:mật_khẩu@ep-xxxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
4. **Không cần tạo bảng thủ công**: Hệ thống server (`server/db.js`) sẽ **tự động khởi tạo bảng `portfolio_store`** khi có kết nối đầu tiên!

---

## 4. TRIỂN KHAI LÊN RENDER.COM

[Render.com](https://render.com) cho phép triển khai ứng dụng Node.js Full-Stack miễn phí. Dự án đã có sẵn file `render.yaml`.

### Cách 1: Triển khai 1-Click bằng Blueprint (Khuyên dùng)
1. Đăng nhập [https://render.com](https://render.com).
2. Chọn **Blueprints** -> **New Blueprint Instance**.
3. Kết nối với repository GitHub: `RIOMOD/riomod-portfolio`.
4. Render sẽ tự động đọc file `render.yaml` và nhận diện cấu hình:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Tại mục Environment Variables, dán giá trị `DATABASE_URL` (chuỗi kết nối Neon.tech đã lấy ở Bước 3).
6. Nhấn **Apply**. Sau khoảng 2-3 phút, trang web của bạn sẽ hoạt động trực tiếp tại URL của Render (ví dụ `https://riomod-portfolio.onrender.com`).

### Cách 2: Tạo Web Service thủ công trên Render
1. Tại Dashboard Render, chọn **New +** -> **Web Service**.
2. Chọn repo `RIOMOD/riomod-portfolio`.
3. Điền các trường:
   - **Name**: `riomod-portfolio`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Trong phần **Environment Variables**, thêm:
   - `DATABASE_URL`: chuỗi kết nối PostgreSQL từ Neon.tech
   - `NODE_ENV`: `production`
   - `ADMIN_PIN`: `2026`
5. Bấm **Create Web Service**.

---

## 5. TRIỂN KHAI LÊN FIREBASE HOSTING

Firebase Hosting rất lý tưởng để lưu trữ bản dựng tĩnh của Portfolio với CDN toàn cầu của Google.

### Các bước triển khai:
1. Cài đặt Firebase CLI (nếu chưa có):
   ```bash
   npm install -g firebase-tools
   ```
2. Đăng nhập Firebase:
   ```bash
   firebase login
   ```
3. Khởi tạo / liên kết dự án Firebase (nếu muốn liên kết project của bạn trên Firebase Console):
   ```bash
   firebase use --add
   ```
4. Build và deploy chỉ với 1 lệnh:
   ```bash
   npm run deploy:firebase
   ```
   *(Lệnh này sẽ tự động chạy `vite build` ra thư mục `dist` và đưa lên Firebase Hosting theo cấu hình chuẩn trong file `firebase.json`)*.

---

## 6. CHẠY THỬ NGHIỆM LOCAL (LOCAL DEVELOPMENT)

### Chế độ Frontend dev thông thường:
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

### Chế độ Full-stack Server (kết nối Neon DB):
1. Tạo file `.env` từ `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Điền chuỗi `DATABASE_URL` của Neon vào file `.env`.
3. Chạy build và start server:
   ```bash
   npm run build
   npm start
   ```
Truy cập: `http://localhost:10000`
