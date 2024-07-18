import api from '@/api';
import { navigationRef } from '@/rootNav';
import { Screen } from '@/types/navigation.type';
import { useCallback } from 'react';
import * as Yup from 'yup';

const useLogin = () => {
  const fieldValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const loginaction = async (values: { email: string; password: string }) => {
    const result = await api.auth.login(values);
    console.log(result);
    if (result.token) {
      return { status: true, token: result.token };
    } else {
      return { status: false, message: 'Email or password not account.' };
    }
  };

  const handleNavigationRegister = useCallback(() => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(Screen.REGISTER);
    }
  }, []);

  return {
    fieldValidation,
    loginaction,
    handleNavigationRegister,
  };
};

export default useLogin;
