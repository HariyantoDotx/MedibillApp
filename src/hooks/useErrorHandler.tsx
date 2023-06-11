import {View, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from '../store';
import {setAllert} from '../store/reducer/allert';

interface UseErrorhandler {
  isError: boolean;
  error?: any;
}

const useErrorHandler = ({isError, error}: UseErrorhandler) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      dispatch(
        setAllert({
          type: 'error',
          message: error?.message || 'something when wrong',
          visible: true,
        }),
      );
    }
  }, [isError, error]);

  const handleLoading = useCallback((err: any) => {
    dispatch(
      setAllert({
        type: 'error',
        message: err?.message || 'something when wrong',
        visible: true,
      }),
    );
  }, []);

  return {handleLoading};
};

export default useErrorHandler;
