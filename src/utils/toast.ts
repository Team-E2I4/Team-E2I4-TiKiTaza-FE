import { ReactNode } from 'react';
import type { ToastOptions } from 'react-toastify';
import { Bounce, toast } from 'react-toastify';

export const defaultToastOption: ToastOptions = {
  position: 'bottom-right',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultToastOption, ...options });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, ...options });
  },
};
