import { Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';

import useRegister from './registerAction';
import { BaseLayout, Text } from '@/bluprints';
import Logo from '@/assets/logo.svg';
import Eyes from '@/assets/eyes.svg';
import { useAppState } from '@/utils/zustand';

const Register = () => {
  const { handleNavigationLogin, fieldValidation, registerAction } =
    useRegister();
  const [secureText, setSecureText] = useState(true);

  const { setAuth } = useAppState();

  return (
    <BaseLayout backgroundView={true} style={{ alignItems: 'center' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 110,
        }}>
        <Logo width={345} height={42} />
      </View>
      <Text
        type="loginText1"
        style={{ marginTop: 51, width: 252, textAlign: 'center' }}>
        Please fill out the form below to complete your profile
      </Text>

      <Text
        type="loginText1"
        style={{ marginTop: 51, width: 270, textAlign: 'center' }}>
        Do you have an account already ?
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          handleNavigationLogin();
        }}>
        <Text
          type="loginText1"
          style={{ width: 270, textAlign: 'center', fontWeight: 'bold' }}>
          Log In
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 34 }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmpassword: '',
          }}
          validationSchema={fieldValidation}
          onSubmit={async values => {
            const result = await registerAction(values);

            if (result.status) {
              setAuth(result.token);
              Toast.show({
                type: 'success',
                text1: 'Hello',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: result.message,
              });
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View
                style={{
                  borderColor: '#36445B',
                  borderWidth: 1,
                  height: 45,
                  width: 285,
                  justifyContent: 'center',

                  borderRadius: 6,
                }}>
                <TextInput
                  style={{
                    marginLeft: 9,
                    color: 'white',
                  }}
                  textContentType="emailAddress"
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholderTextColor={'#ffffff33'}
                />
              </View>
              {errors.email && touched.email ? (
                <Text style={{ marginTop: 10, color: 'red', fontSize: 12 }}>
                  *{errors.email}
                </Text>
              ) : null}
              <View
                style={{
                  borderColor: '#36445B',
                  borderWidth: 1,
                  height: 45,
                  width: 285,
                  justifyContent: 'space-between',

                  borderRadius: 6,
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    marginLeft: 9,
                    color: 'white',

                    flex: 1,
                  }}
                  placeholder="Password"
                  secureTextEntry={secureText}
                  textContentType="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholderTextColor={'#ffffff33'}
                />
                <Pressable
                  onPress={() => {
                    setSecureText(!secureText);
                  }}
                  style={{
                    height: 15,
                    width: 16,

                    justifyContent: 'center',

                    marginRight: 10,
                  }}>
                  <Eyes width={14} height={15} />
                </Pressable>
              </View>
              {errors.password && touched.password ? (
                <Text style={{ marginTop: 10, color: 'red', fontSize: 12 }}>
                  *{errors.password}
                </Text>
              ) : null}
              <View
                style={{
                  borderColor: '#36445B',
                  borderWidth: 1,
                  height: 45,
                  width: 285,
                  justifyContent: 'space-between',

                  borderRadius: 6,
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    marginLeft: 9,
                    color: 'white',

                    flex: 1,
                  }}
                  placeholder="Repeat Password"
                  secureTextEntry={secureText}
                  textContentType="password"
                  onChangeText={handleChange('confirmpassword')}
                  onBlur={handleBlur('confirmpassword')}
                  value={values.confirmpassword}
                  placeholderTextColor={'#ffffff33'}
                />
                <Pressable
                  onPress={() => {
                    setSecureText(!secureText);
                  }}
                  style={{
                    height: 15,
                    width: 16,

                    justifyContent: 'center',

                    marginRight: 10,
                  }}>
                  <Eyes width={14} height={15} />
                </Pressable>
              </View>
              {errors.confirmpassword && touched.confirmpassword ? (
                <Text style={{ marginTop: 10, color: 'red', fontSize: 12 }}>
                  *{errors.confirmpassword}
                </Text>
              ) : null}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}
                  style={{
                    marginTop: 111,
                    borderRadius: 75,

                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor: '#264061',
                  }}>
                  <Text
                    style={{
                      paddingVertical: 19,
                      paddingHorizontal: 50,
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </BaseLayout>
  );
};

export default Register;
