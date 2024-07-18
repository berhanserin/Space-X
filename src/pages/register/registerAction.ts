import api from '@/api';
import { navigationRef } from '@/rootNav';
import { Screen } from '@/types/navigation.type';
import { useCallback } from 'react';
import * as Yup from 'yup';

const useRegister = () => {
  const fieldValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const registerAction = async (values: {
    email: string;
    password: string;
  }) => {
    const result = await api.auth.register(values);

    if (result.token) {
      return { status: true, token: result.token };
    } else {
      return { status: false, message: 'Email or password not account.' };
    }
  };

  const handleNavigationLogin = useCallback(() => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(Screen.LOGIN);
    }
  }, []);

  return {
    fieldValidation,
    registerAction,
    handleNavigationLogin,
  };
};

export default useRegister;
