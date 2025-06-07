import newstore from '@/redux/newstore'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(newstore=>newstore.auth1);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/login");

        }

    },[])
  return <>{children}</>
}

export default ProtectedRoutes;