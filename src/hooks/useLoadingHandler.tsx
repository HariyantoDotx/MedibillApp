import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from '../store';
import {setLoading} from '../store/reducer/loading';

interface useLoadingHandlerProps {
  isLoading: boolean;
}

const useLoadingHandler = ({isLoading}: useLoadingHandlerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  const handleLoading = useCallback((loading: boolean) => {
    dispatch(setLoading(loading));
  }, []);

  return {handleLoading};
};

export default useLoadingHandler;
