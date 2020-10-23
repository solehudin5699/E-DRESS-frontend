import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Container, Header} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {loginAPICreator, resetStatusLoginCreator} from '../redux/actions/auth';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Minimun length of 4')
    .max(12, 'Max length of 12')
    .required('Required'),
  password: Yup.string().min(8, 'Minimun length of 8').required('Required'),
});

function Login() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const {statusLogin, isLoginPending} = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    if (Number(statusLogin) === 200) {
      navigation.navigate('BottomTab', {screen: 'Home'});
    } else if (Number(statusLogin) === 500) {
      navigation.navigate('Login');
      setError(true);

      setTimeout(() => {
        dispatch(resetStatusLoginCreator());
      }, 5000);
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [dispatch, statusLogin]);
  // setTimeout(setError(false), 1000);
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.containerheader}>
          <Text style={styles.header}>LOGIN</Text>
          {error === true ? (
            <Text style={{...styles.subHeader, color: 'red'}}>
              Username or password is wrong, please login again
            </Text>
          ) : (
            <Text style={styles.subHeader}>
              Please, login first to access your account...
            </Text>
          )}
        </View>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          //Will submit if not error
          onSubmit={(values) => {
            let body = {
              username: values.username,
              password: values.password,
            };
            dispatch(loginAPICreator(body));
          }}
          validationSchema={SigninSchema}>
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
                    placeholder="Username must be between 4 and 12 characters"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    label="Username"
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
                </View>
                <View style={styles.formAction}>
                  <Button
                    {...isSubmitting}
                    // {!errors?(onPress={handleSubmit}):null}
                    onPress={handleSubmit}
                    text="Login"
                  />
                  <View style={styles.signIn}>
                    <Text>Have not an account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Register');
                      }}>
                      <Text style={styles.signInText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
        {isLoginPending ? (
          <ActivityIndicator
            animating
            size="large"
            color="#198711"
            // style={{marginTop: 15, marginBottom: 15}}
          />
        ) : null}
      </View>
    </Container>
  );
}

export default Login;

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
  button: {backgroundColor: '#CBE15A'},
  signIn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: 'rgb(51,130,246)',
  },
});
