import { setMessages } from "@/redux/chatSlice1";
import newstore from "@/redux/newstore";
import { setPosts } from "@/redux/postSlice1";
import axios from "axios";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(newstore=>newstore.auth1);
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser?._id}`, {withCredentials:true});
        if(res.data.success){
            dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllMessage();
  },[selectedUser]);
};
export default useGetAllMessage;
