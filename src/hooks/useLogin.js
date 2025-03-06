import React from 'react'
import { getUserName } from '../utils/utils'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../services/publicRequest';
import { PATH } from '../utils/pagePath';

const useLogin = () => {
    const navigate = useNavigate();

    const userLogin = async(data, reset) => {
        try {
            const res = await publicRequest.post("/account/authenticate", data);
            if (res.data.success) {
              // Combine them into a string 'username:password'
              const combined = `${data.username}:${data.password}`;
      
              // Base64 encode the combined string
              const base64Encoded = btoa(combined);
              localStorage.setItem("token", base64Encoded);
              const userDetail = res.data?.userDetail?.data;
              localStorage.setItem("userId", userDetail?.UserId);
              localStorage.setItem("userName", userDetail?.Name);
              localStorage.setItem("userEmail", userDetail?.Email);
              localStorage.setItem("userImage", userDetail?.UserImage);
              toast.success("LoggedIn successfully");
              navigate(PATH.DASHBOARD);
            }
            reset();
          } catch (error) {
            toast.error("Failed To login");
          }
    }
  return {userLogin}
}

export default useLogin