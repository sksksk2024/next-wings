'use client';

import toast from 'react-hot-toast';

export const useToast = () => {
  const base = 'text-white bg-deep-dark';

  const toastClass: string = 'font-bold px-4 py-3 rounded-xl shadow-xl';

  const success = (message: string) =>
    toast.success(message, {
      duration: 4000,
      className: `${toastClass} ${base}`,
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    });

  const error = (message: string) =>
    toast.error(message, {
      duration: 5000,
      className: `${toastClass} ${base}`,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    });

  const loading = (message: string) =>
    toast.loading(message, {
      className: `${toastClass} ${base}`,
    });

  const dismiss = () => toast.dismiss();

  return {
    success,
    error,
    loading,
    dismiss,
  };
};
