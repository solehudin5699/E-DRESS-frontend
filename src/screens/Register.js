import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {registrationAPICreator, loginAPICreator} from '../redux/actions/auth';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Minimun length of 4')
    .max(12, 'Max length of 12')
    .required('Required'),
  fullname: Yup.string()
    // .min(11, 'Minimun length of 11')
    .max(20, 'Maximum length of 20')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Minimun length of 8').required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(8, 'Minimun length of 8')
    .required('Required'),
});

function Register() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const {statusLogin, statusRegist} = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();
  const goToLogin = (body) => {
    return body;
  };
  useEffect(() => {
    setError(false);
    if (Number(statusRegist) === 200) {
      dispatch(loginAPICreator(goToLogin()));
      if (Number(statusLogin) === 200) {
        navigation.navigate('BottomTab');
      } else if (Number(statusLogin) === 500) {
        setError(true);
      }
    } else if (Number(statusRegist) === 500) {
      setError(true);
    }
  }, [dispatch, statusRegist, statusLogin]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerheader}>
          <Text style={styles.header}>Create Account</Text>
          <Text style={styles.subHeader}>
            Create a new account to get you products
          </Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            username: '',
            fullname: '',
            password: '',
            confirm_password: '',
          }}
          onSubmit={(values) => {
            let body = {
              name: values.fullname,
              username: values.username,
              email: values.email,
              password: values.password,
              level_id: 2,
            };
            dispatch(registrationAPICreator(body));

            goToLogin({
              username: values.username,
              password: values.password,
            });
            console.log({...values});
          }}
          validationSchema={SignupSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isSubmitting,
          }) => {
            // console.log({values});
            return (
              <>
                <View>
                  <Input
                    placeholder="Maximum fullname is 20 characters"
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    touched={touched.fullname}
                    error={errors.fullname}
                    label="Fullname"
                  />
                  <Input
                    placeholder="Username must be between 4 and 12 characters"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    label="Username"
                  />
                  <Input
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    touched={touched.email}
                    error={errors.email}
                    label="Email"
                  />
                  <Input
                    placeholder="Minimum password is 8 characters"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    touched={touched.password}
                    error={errors.password}
                    secureTextEntry
                    label="Password"
                  />
                  <Input
                    placeholder="Confirm your password"
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                    touched={touched.confirm_password}
                    error={errors.confirm_password}
                    secureTextEntry
                    label="Confirm Password"
                  />
                </View>
                <View style={styles.formAction}>
                  <Text style={styles.conditionText}>
                    By continuing you agree with our Terms and Condition
                  </Text>
                  <Button
                    {...isSubmitting}
                    onPress={handleSubmit}
                    text="Create Account"
                  />
                  <View style={styles.signIn}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Login');
                      }}>
                      <Text style={styles.signInText}> Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 10,
  },
  containerheader: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CBE15A',
    margin: -10,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 10,
    color: '#517fa4',
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    color: 'white',
  },
  formAction: {},
  conditionText: {
    marginVertical: 10,
    textAlign: 'center',
  },
  signIn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: 'rgb(51,130,246)',
  },
});
