'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'next/navigation';
const Signup = () => {
  const router = useRouter();
  const {authData,setAuthData } = useAuth()
  const [error, seterror] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',       
      companyName: '', 
      phoneNumber: '', 
      password: '',
      verifyPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required'),
      companyName: Yup.string().required('Company name is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      verifyPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password'),
    }),
    onSubmit: async (values) => {
      try{

        const res=await axios.post('http://localhost:8080/auth/signup',{ name:values.name,
          email:values.email,
          username:values.username,
          companyName:values.companyName,
          phoneNumber:values.phoneNumber,
          password:values.password,})
        if(res &&res.data.success){
          setAuthData({
            ...authData,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))
          router.push('/dashboard');
      
        }else{
         seterror(true)
        }
      }
      catch(e){
       console.log(e)
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#60758f]">Create your Space</h2>
        </div>
        {error && <p className="text-red-500 text-sm">Already registered please login...</p>}
        <form className="mt-8 space-y-6" method="post" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-[#e8ba79]'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                ) : null}
              </div>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-[#e8ba79]'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className="text-red-500 text-sm">{formik.errors.username}</p>
                ) : null}
              </div>
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formik.touched.companyName && formik.errors.companyName ? 'border-red-500' : 'border-[#e8ba79]'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                  placeholder="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <p className="text-red-500 text-sm">{formik.errors.companyName}</p>
                ) : null}
              </div>
              <div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="tel"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-[#e8ba79]'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <input
                  id="verifyPassword"
                  name="verifyPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    formik.touched.verifyPassword && formik.errors.verifyPassword ? 'border-red-500' : 'border-[#e8ba79]'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10 sm:text-sm`}
                  placeholder="Verify Password"
                  value={formik.values.verifyPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.verifyPassword && formik.errors.verifyPassword ? (
                  <p className="text-red-500 text-sm">{formik.errors.verifyPassword}</p>
                ) : null}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white bg-[#60758f] hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/" className="font-medium text-[#60758f] hover:text-[#e8ba79] cursor-pointer">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
