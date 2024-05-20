# Ứng dụng Quản lý Trọ
## Giới thiệu
Ứng dụng Quản lý Nhà trọ là một app phát triển để giúp người dùng tìm kiếm phòng trọ một cách dễ dàng, quản lý các thông tin liên quan đến việc quản lý một nhà trọ hoặc căn hộ cho thuê. Ứng dụng này cung cấp một giao diện đơn giản và dễ sử dụng cho việc quản lý danh sách các phòng trọ, thông tin hợp đồng khách thuê, hóa đơn.
## Tính năng
- Đăng nhập (Đăng nhập truyền thống, đăng nhập bằng facebook, đăng nhập bằng google)
- Chat giữa các người dùng với nhau.
- Quản lý danh sách phòng trọ, quản lý bài đăng.
- Quản lý yêu thích.
- Quản lý hợp đồng.
- Tạo và quản lý hóa đơn: Tạo hóa đơn cho từng khách thuê, ghi nhận các khoản thu.
## Kiến thức
- Ngôn ngữ typescript
- Framework FE: React native
- Framework Backend: NestJS
- CSDL: postgresql
- Firebase: firestore, storage database, storage, messaging, authentication
## Giao diện của ứng dụng
<table align="center">
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/6a2b71f3-19df-4c81-8bfc-17a4f6e63205" alt="Giao diện ứng dụng" width="250" />
         <div style="width: 150px; text-align: justify;">Màn hình splash</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình splash màn hình load đầu tiên trước khi vào ứng dụng, dùng để điều hướng nếu chưa có tài khoản nào đăng nhập thì nó điều hướng vào màn hình login, nếu đã có tài khoản đăng nhập từ trước thì nó sẽ được điều hướng sang màn hình chính của ứng dụng
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/b7b65231-743c-4708-a76a-0a3887a8c542" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/1c0ba52b-f1e5-4d5d-b2fe-4d740006df8b" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/7ef94ed6-dce5-424e-9dbc-055a52d8ef76" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình đăng nhập, và màn hình đăng ký, chúng ta có thể đăng nhập bằng google hoặc facebook
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/bd602644-7ce9-42bc-ba20-4723ae5d546c" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/c384eda1-389e-46fc-8882-f7b020f8dffd" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/c7d90dff-1491-4bf5-9c99-e0b1b92af9f7" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình thông báo khi lỗi và khi đăng ký tài khoản thành công</div>
      </td>
      <td align="center" width="250">
         Đây là một vài ràng buộc sẽ xuất hiện khi vi phạm ràng buộc, ví dụ như tài khoản chứa kí tự đặc biệt, để trống, không đúng định dạng .... 
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/cc428e75-485f-41f7-b274-1a61fcbd470d" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/6a375e37-2f42-4545-91a6-15bde7ebf722" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/76380670-a3f8-4f1f-bd56-72a543288407" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình, chứa các thông tin về các nhà trọ đang cho thuê, bài viết gần đây là 4 bài viết được đăng gần đây, Các bài viết nổi bậc là 10 bài viết được random ngẫu nhiên 
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/99e5a083-6418-4933-83a6-e4590371568d" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPiePie/assets/92388024/3df019fc-3f4e-4a18-8e16-b55b5baaac5c" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình hiển thị các bài đăng, hỗ trợ tìm kiếm và lọc, sử dung kỹ thuật debounce 2 giây để tìm kiếm địa chỉ chi tiết
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/841919e7-9602-4324-a8ff-4e463a9f2d1a" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPiePie/assets/92388024/89611363-7493-4feb-9d21-7e06677089b5" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình chứa các notifications, notifications gửi từ remote sẽ được lừu vào bộ nhớ local của app
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/10bef490-f678-4a2a-9649-8645382d77a8" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/e35dc199-39ea-438a-bccb-fce411b04591" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/47f8ce88-6aa6-48ed-a578-910199a367df" alt="Giao diện ứng dụng" width="200" />
         <img src=https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/2efde44c-0838-4eb7-a0e3-845bcdfed901" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình chi tiết của phòng chứa các thông tin, giá phòng, dịch vụ, nội thất, người đăng...
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/af8443fd-27c3-453f-9666-9ecd6cafc31d" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/967b70ae-7e8e-42b6-bc7e-cee2f655a4fb" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình chat chứa danh sách các tài khoản mà tài khoản mình đang chat, các thông tin sẽ được lưu trên firestorage.
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/62a4f2e5-27a0-4b45-b976-60c511848542" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/41681889-b795-4942-bf97-acb1f04dbe9c" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Màn hình đăng nhập</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình hiển thị thông tin tài khoản và các chức năng
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/74b28cbd-97a1-4858-b21d-7e01dfbc4cd5" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/0558b6e8-e9b0-4fd2-a0ee-06dc48506dac" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/e03d42db-a815-4f9f-bc0f-0e6c112f66db" alt="Giao diện ứng dụng" width="200" />
         <div style="width: 150px; text-align: justify;">Thông báo thêm, xóa yêu thích, và màn hình hiển thị các bài post yêu thích</div>
      </td>
      <td align="center" width="250">
         Đây là màn hình hiển thị các yêu thích của tài khoản.
      </td>
   </tr>
   <tr>
      <td style="text-align: center;">
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/bdd9d857-0f42-4b2a-8bde-f3b194dae172" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/0badc9b7-a2c4-48e5-94be-cb5e751765a5" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/1dab8455-c40e-4d29-ac1a-0be598d1924c" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/17a1b8fd-8683-4289-8ec8-1a19d87e7898" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/9517abaa-4c21-49bf-8263-fa21c563c792" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/2cb15ed2-7d0c-4c89-8917-ff4752598aa5" alt="Giao diện ứng dụng" width="200" />
         <img src="https://github.com/BThanhNhut/AppQuanLyTroPie/assets/92388024/f15e23be-0e6a-484b-adfe-bf4990ada4ef" alt="Giao diện ứng dụng" width="200" />
      </td>
      <td align="center" width="250">
         Đây là màn hình tạo phòng, tạo bài đăng, và quản lý phòng
      </td>
   </tr>
</table>
