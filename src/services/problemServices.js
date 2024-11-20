import axios from '../config/axiosConfig';
import { setLoading } from '../store/stateSlice';
import { setProblems } from '../store/problemSlice';

export const createProblem = async (problemData, dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post('/problem/create', problemData);
        console.log('Response Data:', response.data);
        dispatch(setLoading(false));

    } catch (error) {
        console.log('Error:', error);
        dispatch(setLoading(false));
        throw error;
    }
};

export const getAllProblem = async (dispatch) => {
    try {
      const response = await axios.get('/problem/problemall');
      const data = response.data.data;
      dispatch(setProblems(data));
    } catch (error) {
      console.log(error);
    }
  };
  

