import axios from '../config/axiosConfig'
import { setUserRoom } from "../store/userSlice";
import { setUser } from "../store/userSlice";


import { setLoading } from '../store/stateSlice';

export const getUserInformation = async (username, dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`/identityusers/information?username=${username}`);
        dispatch(setUser( {userInfo : response.data.data}))
        dispatch(setLoading(false));
        return response.data.data
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};


export const getAllRoomByUserId = async (userId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`/room/getallroombyuseridmb?id=${userId}`);
        dispatch(setUserRoom(response.data.data)); 
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

