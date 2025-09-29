const handleError = ({ code }) => {
  if (code === 'ERR_NETWORK') {
    throw 'toast.net';
  }

  throw 'error.unknown';
};

export default handleError;
