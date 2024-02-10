import {useCallback, useState} from 'react';
import {UploadBillingForm} from '../utils';

interface UseBillingFormProps {
  initialState: UploadBillingForm;
}

const useBillingForm = ({initialState}: UseBillingFormProps) => {
  const [form, setForm] = useState(initialState);

  const onBilingFormChange = useCallback(
    (key: keyof typeof initialState, value: string) => {
      setForm(prev => ({...prev, [key]: value}));
    },
    [setForm],
  );

  return {form, setForm, onBilingFormChange};
};

export default useBillingForm;
