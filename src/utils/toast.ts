import { toast, ToastOptions } from 'react-toastify';

// Custom toast configurations
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

export const customToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { 
      ...defaultToastOptions, 
      ...options 
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, { 
      ...defaultToastOptions, 
      ...options 
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, { 
      ...defaultToastOptions, 
      ...options 
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, { 
      ...defaultToastOptions, 
      ...options 
    });
  },

  // Custom todo-specific toasts
  todoAdded: (title: string) => {
    return toast.success(`✅ Todo "${title}" added successfully!`, {
      ...defaultToastOptions,
      autoClose: 2500,
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
      },
    });
  },

  todoUpdated: (title: string) => {
    return toast.warning(`📝 Todo "${title}" updated successfully!`, {
      ...defaultToastOptions,
      autoClose: 2500,
      style: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
      },
    });
  },

  todoDeleted: (title: string) => {
    return toast.error(`🗑️ Todo "${title}" deleted successfully!`, {
      ...defaultToastOptions,
      autoClose: 2500,
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
      },
    });
  },

  todoCompleted: (title: string) => {
    return toast.success(`🎉 Great! "${title}" completed!`, {
      ...defaultToastOptions,
      autoClose: 2500,
    });
  },

  todoReactivated: (title: string) => {
    return toast.info(`🔄 "${title}" marked as active!`, {
      ...defaultToastOptions,
      autoClose: 2500,
    });
  },
};