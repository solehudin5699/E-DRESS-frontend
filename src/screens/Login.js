import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import {Container, Header} from "native-base";
import {useSelector, useDispatch} from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import {Formik} from "formik";
import * as Yup from "yup";
import {useNavigation} from "@react-navigation/native";
import {loginAPICreator, resetStatusLoginCreator} from "../redux/actions/auth";
import {
  getOrderByCustomerAPICreator,
  getAllOrderAPICreator,
} from "../redux/actions/order";

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^([a-z0-9]|_){0,}$/,
      "Only lowercase (a-z), number (0-9) and underscore (_) are allowed",
    )
    .min(4, "Minimum length of 4")
    .max(12, "Max length of 12")
    .required("Required"),
  password: Yup.string().min(8, "Minimum length of 8").required("Required"),
});

function Login() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const {statusLogin, isLoginPending, dataLogin} = useSelector(
    (state) => state.authAPI,
  );
  const dispatch = useDispatch();
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    if (Number(statusLogin) === 200) {
      if (dataLogin.level_id === 1) {
        dispatch(getAllOrderAPICreator());
      } else {
        dispatch(getOrderByCustomerAPICreator(dataLogin.user_id));
      }
      navigation.navigate("BottomTab", {screen: "Home"});
    } else if (Number(statusLogin) === 500) {
      navigation.navigate("Login");
      setError(true);

      setTimeout(() => {
        dispatch(resetStatusLoginCreator());
      }, 5000);
    }
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [dispatch, statusLogin]);
  // setTimeout(setError(false), 1000);
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.containerheader}>
          <Text style={styles.header}>E - D R E S S</Text>
          <Text style={styles.headerLogin}>LOGIN</Text>
          {error === true ? (
            <Text style={{...styles.subHeader, color: "red", fontSize: 15}}>
              Username or password is wrong, please login again
            </Text>
          ) : (
            <Text style={styles.subHeader}>
              Please, login first to access your account.
            </Text>
          )}
        </View>
        <Formik
          initialValues={{
            username: "",
            password: "",
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
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    label="Username"
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
                </View>
                <View>
                  <Button
                    {...isSubmitting}
                    // {!errors?(onPress={handleSubmit}):null}
                    onPress={handleSubmit}
                    text="Login"
                  />
                  <View style={styles.signOut}>
                    <Text style={{color: "#517fa4", fontSize: 15}}>
                      Have not an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Register");
                      }}>
                      <Text style={styles.signOutText}> Sign Up</Text>
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
    paddingTop: 50,
    fontSize: 30,
    textAlign: "center",
    marginVertical: 5,
    color: "#517fa4",
    fontWeight: "700",
  },
  headerLogin: {
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
  button: {backgroundColor: "#CBE15A"},
  signOut: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signOutText: {
    color: "rgb(51,130,246)",
    fontSize: 15,
  },
});
