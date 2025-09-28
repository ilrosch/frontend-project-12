import { toast } from "react-toastify";

const createToastPromise = async (handler, messages, options = {}) => {
  // messages -> { pending: '', success: '', error: '' }
  return toast.promise(handler, messages, {
    autoClose: 2000,
    ...options
  });
};

export default createToastPromise;