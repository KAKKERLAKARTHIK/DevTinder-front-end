import React, { use, useEffect } from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import { Outlet, useNavigate } from 'react-router'
import { useLazyGetProfileQuery } from './profileApi/profile'
import { toast } from 'react-toastify'
import { loginData } from './slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Body() {
  const [getProfile] = useLazyGetProfileQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state?.userProfile?.user);
 const fetchProfile = async (params) => {
  try {
   
    const data = await getProfile(params).unwrap();  
    dispatch(loginData(data));
  } catch (error) {
     debugger
    if (error?.originalStatus === 401) {
      toast(error?.data || "Unauthorized", { theme: "dark" });
      navigate('/login');
    }  
  }
};

  useEffect(() => {
  
     if (!user) { 
        fetchProfile()
    }
  
  }, [ ])
  
  return(
    <div>
            <NavBar />
            <Outlet/>
            <Footer/>
    </div>
  )
}

export default Body
    