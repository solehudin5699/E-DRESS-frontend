import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import {Formik} from "formik";
import * as Yup from "yup";
import {useNavigation} from "@react-navigation/native";
import {useSelector, useDispatch} from "react-redux";
import {
  registrationAPICreator,
  loginAPICreator,
  resetStatusLoginCreator,
  resetStatusRegistCreator,
} from "../redux/actions/auth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^([a-z0-9]|_){0,}$/,
      "Only lowercase (a-z), number (0-9) and underscore (_) are allowed",
    )
    .min(4, "Minimum length of 4")
    .max(12, "Max length of 12")
    .required("Required"),
  fullname: Yup.string()
    // .min(11, 'Minimun length of 11')
    .max(20, "Maximum length of 20")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Minimun length of 8").required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(8, "Minimum length of 8")
    .required("Required"),
});

function Register() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [dataLogin, setDataLogin] = useState({});
  const {
    statusLogin,
    statusRegist,
    isLoginPending,
    isRegistPending,
    dataRegist,
    errorRegist,
  } = useSelector((state) => state.authAPI);
  const dispatch = useDispatch();
  useEffect(() => {
    // setError(false);
    if (Number(statusRegist) === 200) {
      dispatch(loginAPICreator(dataLogin));
      if (Number(statusLogin) === 200) {
        navigation.navigate("BottomTab");
      }
    }
  }, [dispatch, statusRegist, statusLogin]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch(resetStatusRegistCreator());
      dispatch(resetStatusLoginCreator());
    });
    return unsubscribe;
  }, [navigation, dispatch]);
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [navigation]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerheader}>
          <Text style={styles.header}>E - D R E S S</Text>
          <Text style={styles.headerRegist}>Create Account</Text>
          {statusRegist === 500 ? (
            <Text style={{...styles.subHeader, color: "red", fontSize: 15}}>
              {errorRegist !== undefined
                ? errorRegist.msg
                : "Registration failed"}
            </Text>
          ) : (
            <Text style={styles.subHeader}>
              Create a new account to get you products
            </Text>
          )}
        </View>
        {isLoginPending || isRegistPending ? (
          <ActivityIndicator
            animating
            size="large"
            color="#198711"
            // style={{marginTop: 15, marginBottom: 15}}
          />
        ) : null}
        <Formik
          initialValues={{
            email: "",
            username: "",
            fullname: "",
            password: "",
            confirm_password: "",
          }}
          onSubmit={(values) => {
            let body = {
              name: values.fullname,
              username: values.username,
              email: values.email,
              password: values.password,
              level_id: 2,
            };
            setDataLogin({
              username: values.username,
              password: values.password,
            });
            dispatch(registrationAPICreator(body));

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
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    value={values.fullname}
                    touched={touched.fullname}
                    error={errors.fullname}
                    label="Fullname"
                  />
                  <Input
                    placeholder="Username must be between 4 and 12 characters"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    label="Username"
                  />
                  <Input
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    touched={touched.email}
                    error={errors.email}
                    label="Email"
                  />
                  <Input
                    placeholder="Minimum password is 8 characters"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    touched={touched.password}
                    error={errors.password}
                    secureTextEntry
                    label="Password"
                  />
                  <Input
                    placeholder="Confirm your password"
                    onChangeText={handleChange("confirm_password")}
                    onBlur={handleBlur("confirm_password")}
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
                    <Text style={{color: "#517fa4", fontSize: 15}}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Login");
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
    backgroundColor: "#f3f3f3",
    padding: 10,
  },
  containerheader: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#CBE15A",
    margin: -10,
    marginBottom: 10,
  },
  header: {
    paddingTop: 30,
    fontSize: 30,
    textAlign: "center",
    marginVertical: 5,
    color: "#517fa4",
    fontWeight: "700",
  },
  headerRegist: {
    paddingTop: 10,
    fontSize: 20,
    textAlign: "center",
    // marginVertical: 5,
    color: "#517fa4",
    fontWeight: "700",
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
    color: "white",
  },
  formAction: {},
  conditionText: {
    marginVertical: 10,
    textAlign: "center",
    color: "#517fa4",
    fontSize: 15,
  },
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    fontSize: 15,
  },
  signInText: {
    color: "rgb(51,130,246)",
    fontSize: 15,
  },
});
