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
               <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 overflow-auto p-4 pb-20"> {/* extra padding bottom */}
        <Outlet />
      </main>
      <Footer className="fixed bottom-0 left-0 w-full" />
    </div>
    </div>
  )
}

export default Body
    