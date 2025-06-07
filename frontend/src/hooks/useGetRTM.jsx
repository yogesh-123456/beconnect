import { setMessages } from "@/redux/chatSlice1";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetRTM = () => {
    const dispatch = useDispatch();
    const {socket} = useSelector(newstore=>newstore.socketio1);
    const {messages}=useSelector(newstore=>newstore.chat1);
  useEffect(() => {
    socket?.on('newMessage',(newMessage)=>{
        dispatch(setMessages([...messages, newMessage]));
    })

    return ()=>{
        socket?.off('newMessage');
    }
  },[messages, setMessages]);
};
export default useGetRTM;
