Thành viên
- Trần Minh Quang - 20020464
- Nguyễn Văn Vũ – 20020504 
- Nguyễn Thanh Tùng – 20020270

Phân chia công việc:
- Nguyễn Thanh Tùng (Backend ExpressJS + MongoDB)
+ Thiết kế và xây dựng database
+ Xây dựng cấu trúc ban đầu cho dự án theo mô hình MVC
+ Cấu hình và kết nối với database
+ Xây dựng các model user, product, order, orderGuarantee, guarantee, factory, delivery, customer, agency
+ Xây dựng các hàm xử lý khi order
  - Tạo hóa đơn
  - Lấy ra tất cả các hóa đơn theo id của các Đại lý
+ Xây dựng các hàm xử lý cho factory
  - Lấy ra danh sách tất cả các Kho
  - Lấy ra thông tin 1 Kho theo id 
  - Cập nhật số lượng của các sản phẩm trong từng Kho
+ Xây dựng các hàm xử lý cho agency
  - Lấy ra danh sách tất cả các Đại lý
  - Lấy ra thông tin 1 Đại lý theo id 
  - Cập nhật số lượng của các sản phẩm trong từng Đại lý
+ Xây dựng các hàm xử lý cho delivery
  - Tạo thông tin đơn hàng được vận chuyển bởi Kho
  - Tạo thông tin đơn hàng được vận chuyển bởi Đại lý
  - Lấy thông tin đơn hàng được chuyển đi theo id
  - Lấy thông tin đơn hàng được nhận theo id
  - Cập nhật trạng thái của đơn hàng
+ Xây dựng các hàm xử lý cho guarantee
  - Lấy ra danh sách tất cả các Trung tâm bảo hành
  - Lấy ra thông tin 1 Trung tâm bảo hành theo id 
+ Xây dựng các hàm xử lý cho guaranteeOrder
  - Lấy ra danh sách tất cả các Trung tâm bảo hành
  - Lấy ra thông tin 1 Trung tâm bảo hành theo id 
  - Lấy ra thông tin các đơn hàng được chuyển đến Trung tâm bảo hành 
  - Lấy ra thông tin các đơn hàng được Trung tâm bảo hành chuyển trả cho Kho
  - Lấy ra thông tin các đơn hàng được Trung tâm bảo hành bảo hành thành công chuyển về cho Đại lý
  - Cập nhật thông tin đơn hàng được chuyển đến Trung tâm bảo hành 

- Nguyễn Văn Vũ (Frontend ReactJS) + (Backend ExpressJS + MongoDB)
+ Thiết kế và xây dựng database
+ Xây dựng các model user, product, order, orderGuarantee, guarantee, factory, delivery, customer, agency
+ Xây dựng các hàm xử lý cho product
  - Thêm, sửa, xóa
  - Lấy ra danh sách tất cả các product theo từng điều kiện khác nhau
+ Xây dựng trang quản lý dành cho Đại lý
  - Tạo giao diện Quản lý sản phẩm
  - Tạo hóa đơn bán hàng khi người dùng mua sản phẩm
  - Xây dựng chức năng nhập hàng từ Kho sản xuất chuyển tới
  - Xây dựng chức năng bảo hành khi sản phẩm bị lỗi và chuyển trả cho khách hàng khi sản phẩm đã bảo hành thành công
  - Thống kê trạng thái của các sản phẩm đang được vận chuyển từ Đại lý đến Trung tâm bảo hành
+ Xây dựng trang quản lý dành cho Trung tâm bảo hành
  - Xây dựng chức năng nhận hàng từ Đại lý chuyển tới
  - Thống kê các sản phẩm đang được bảo hành, 
  - Sau khi bảo hành có thể chuyển sản phẩm về Đại lý nếu thành công hoặc Kho sản xuất nếu thất bại

- Trần Minh Quang (Frontend ReactJS) + (Backend ExpressJS + MongoDB)
+ Thiết kế và xây dựng database
+ Xây dựng các model user, product, order, orderGuarantee, guarantee, factory, delivery, customer, agency
+ Xây dựng các hàm xử lý cho user
  - Thêm, sửa, xóa, đăng nhập
  - Lấy ra danh sách tất cả các user theo từng vai trò khác nhau
+ Xây dưng trang quản lý dành cho Admin
  - Xây dựng giao diện và chức năng thêm sửa xóa sản phẩm
  - Xây dựng giao diện và chức năng thêm sửa xóa tài khoản Admin, Kho sản xuất, Đại lý, Trung tâm bảo hành
  - Thống kê các Kho sản xuất có những sản phẩm gì và số lượng bao nhiêu
  - Thống kê các Đại lý có những sản phẩm gì và số lượng bao nhiêu
  - Thống kê các Trung tâm bảo hành có những sản phẩm gì đang bị lỗi
+ Xây dựng trang quản lý dành cho Kho sản xuất
  - Thống kê các sản phẩm đang có trong Kho
  - Xây dựng chức năng nhập hàng
  - Xây dựng chức năng chuyển hàng tới các Đại lý
  - Thống kê các sản phẩm lỗi được chuyển từ Trung tâm bảo hành về
  - Thống kê trạng thái của các sản phẩm đang được vận chuyển từ Kho đến Đại lý

Cách để chạy project:
- Tại thư mục server
+ Mở terminal, gõ lệnh: npm install
+ Sau khi quá trình install thực hiện xong, gõ lệnh: npm start
- Tại thư mục client
+ Mở terminal, gõ lệnh: npm install
+ Sau khi quá trình install thực hiện xong, gõ lệnh: npm start