import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../loginApi/loginApi';
import { loginData } from '../slice/userSlice';
import { feedData } from '../slice/feedSlice';

function NavBar() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.userProfile?.user);
  const [logOutApi] = useLogoutMutation()
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => navigate('/feed')}>Dev Tinder</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          {userData && <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userData?.avatarUrl}
              />
            </div>
          </div>}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between" onClick={() => {

                return navigate('/profile');
              }}>
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a onClick={() => {

              return navigate('/connections');
            }}>Connections</a></li>
            <li> <a onClick={() => {

              return navigate('/requests');
            }}>Requests</a></li>
            <li>


              <a
                onClick={() => {
                  logOutApi();
                  dispatch(loginData(null));
                  dispatch(feedData(null));
                  return navigate('/login');
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
