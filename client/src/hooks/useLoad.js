import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLoad = (thunk, arg) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const request = dispatch(thunk(arg));
    return () => request.abort();
  }, [dispatch, thunk, arg]);
};

export default useLoad;
