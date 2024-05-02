'use client';

import Tooltip from "../Tooltip"; 
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { AiOutlineInfoCircle } from 'react-icons/ai';






const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(data.email)) {
      toast.error('Invalid email address');
      setIsLoading(false);
      return;
    }
    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    if (!data.password.match(/[A-Z]/)) {
      toast.error('Password must contain at least one uppercase letter');
      setIsLoading(false);
      return;
    }
    if (!data.name.trim()) {
      toast.error('Name is required');
      setIsLoading(false);
      return;
    }
  
    // Check if name contains only letters
    if (!/^[a-zA-Z]+$/.test(data.name)) {
      toast.error('Name can only contain letters');
      setIsLoading(false);
      return;
    }
  
    axios.post('/api/register', data)
      .then(() => {
        const { name } = data;
        toast.success(`Registered! Welcome ${name} be ready to take a Trip!`);
      
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        if (error.response?.status === 400 && error.response?.data?.message === 'Email is already in use') {
          toast.error('Email already exists');
        } else {
          toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])



const bodyContent = (
  <div className="flex flex-col gap-4">
    <Heading
      title="Welcome to 'Travel with me'"
      subtitle="Create an account!"
    />
    <Input
      id="email"
      label="Email"
      disabled={isLoading}
      register={register}
      errors={errors}
      type='Email'
      required
    />
    <Input
      id="name"
      label="Name"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
    <Input
      id="password"
      label="Password"
      type="password"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />

    <Tooltip content="Password must be at least 6 characters long and contain an uppercase letter">
      <AiOutlineInfoCircle className="text-gray-400" /> {/* Icon for triggering the tooltip */}
    </Tooltip>
  </div>
)
  

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
        disabled 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
        disabled
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;