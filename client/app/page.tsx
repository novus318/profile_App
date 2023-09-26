'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const {authData,setAuthData } = useAuth()
  const router = useRouter();
  const [error, seterror] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async(values) => {
      try{
        const res=await axios.post('http://localhost:8080/auth/login',{
          email2:values.email,password2:values.password
        })
        if(res &&res.data.success){
          setAuthData({
            ...authData,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))
          router.push('/dashboard');
        }else{
         seterror(res.data.message)
        }
      }
      catch(e){
       
      }
     
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#60758f]">
            Log in to your Account
          </h2>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#e8ba79]'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#e8ba79]'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white bg-[#60758f] hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
          >
            Log In
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-[#60758f] hover:text-[#e8ba79] cursor-pointer">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
