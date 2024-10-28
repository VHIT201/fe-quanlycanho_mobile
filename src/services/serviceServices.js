import axios from '../config/axiosConfig';
import { setLoading, setError } from '../store/stateSlice';
import { setService } from '../store/serviceSlice';

export const createService = async (dispatch, serviceData, token) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('/service/create', serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
        // console.log(response.data.data);
        return response
    //   dispatch(setService(response.data));
    } else {
      dispatch(setError('Lỗi tạo dịch vụ'));
      console.error('Lỗi tạo dịch vụ', response.data);
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Có lỗi xảy ra'));
    console.error('Lỗi:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
