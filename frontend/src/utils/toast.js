import { toast } from "react-toastify";

const createToastPromise = async (handler, messages, options = {}) => {
  // messages -> { pending: '', success: '', error: '' }
  return toast.promise(handler, messages, {
    autoClose: 2000,
    ...options
  });
};

const createToastError = (message) => toast.error(message, { autoClose: 2000 });

export { createToastPromise, createToastError };
