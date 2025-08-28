import React, { useState } from 'react';
import { useLoginMutation } from '../loginApi/loginApi';
import { useDispatch } from 'react-redux';
import { loginData } from '../slice/userSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Karthik@123');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const res = await login({ emailId: email, password }).unwrap();
    
    dispatch(loginData(res));
    navigate('/feed');
  } catch (error) { 
    toast(error?.data || "Something went wrong", {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
    });
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center mt-10'>
        <div className="card card-border bg-base-100 w-96">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <div className='my-2'>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name='email'
                className="input"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='my-2'>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name='password'
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
              <button type='submit' className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}