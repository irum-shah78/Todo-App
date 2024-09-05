'use client';
import React from 'react';
import { useSignUp } from './useSignUpForm';
import googleLogo from "../../../public/assets/icons/google-logo.svg";
import Image from 'next/image';
import { inputFields as fields } from '../../constants/inputFields';

const SignUpForm: React.FC = () => {
  const { name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, loading, handleSubmit } = useSignUp();
  const inputFields = fields.map((field) => ({
    ...field,
    value: 
      field?.label === 'Name' ? name :
      field?.label === 'Email' ? email :
      field?.label === 'Password' ? password :
      confirmPassword,
    onChange: 
      field?.label === 'Name' ? setName :
      field?.label === 'Email' ? setEmail :
      field?.label === 'Password' ? setPassword :
      setConfirmPassword,
  }));

  return (
    <form onSubmit={handleSubmit}>
      {inputFields?.map((field, index) => (
        <div className="mb-4" key={index}>
          <label className='block text-customText text-xl ml-6'>{field?.label}</label>
          <input 
            type={field?.type}
            value={field?.value}
            onChange={(e) => field.onChange(e.target.value)} 
            placeholder={field?.placeholder}
            className="w-full p-2 bg-customBackground text-customText border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange placeholder-customText placeholder:text-xl placeholder:ps-3" 
          />
        </div>
      ))}
      
      <button 
        type="button" 
        className="w-full p-2 flex items-center text-center bg-customBackground text-customOrange border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-lg"
      >
        <Image src={googleLogo} alt="Google" className="w-6 h-6 ml-4 mr-4" />
        Sign Up with Google
      </button>
      <button 
        type="submit" 
        className="w-full p-2 bg-customOrange text-customBackground font-semibold border-4 border-customOrange rounded-3xl focus:outline-none focus:ring-1 focus:ring-customOrange text-xl mt-2"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <p className="text-center text-white mt-2">
        Already have an account? <a href="/signin" className="text-orange-500 underline">Sign in</a>
      </p>
    </form>
  );
};

export default SignUpForm;