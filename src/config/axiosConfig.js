import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:5170/api/v1/', // Đặt URL gốc cho API
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Thêm interceptor để xử lý request và response
instance.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response;
  },
  (error) => {
    // Xử lý lỗi mà không để React Native hiển thị cảnh báo
    if (error.response) {
      // Xử lý khi server phản hồi với lỗi
      console.log('Error Response:', error.response.data); // Ghi log lỗi
      console.log('Error Status:', error.response.status); // Ghi log status
      // Ném lại lỗi để hàm gọi API có thể xử lý
      return Promise.reject(error); // Ném lại lỗi để tiếp tục xử lý ở nơi gọi
    } else if (error.request) {
      // Xử lý khi không nhận được phản hồi từ server
      console.log('No Response from server');
      return Promise.reject(new Error('No response from server')); // Ném lại lỗi để tiếp tục xử lý
    } else {
      // Xử lý các lỗi khác trong quá trình tạo request
      console.log('Request Error:', error.message);
      return Promise.reject(new Error(error.message)); // Ném lại lỗi để tiếp tục xử lý
    }
  }
);

export default instance;
