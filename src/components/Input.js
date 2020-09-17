import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

const Input = ({
  label,
  inputStyle,
  containerStyle,
  touched,
  error,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <Text>{label}</Text>
      <TextInput style={styles.input} {...props} />
      <Text style={styles.errorInput}>{touched && error}</Text>
    </View>
  );
};

// This creates an object of styles using React Native StyleSheet
const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 40,
    padding: 10,
    color: '#517fa4',
  },
  errorInput: {color: 'red', fontSize: 12},
});

// this made me thing about TypeScript
// and what it was created to solve😅
const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Input.propTypes = {
  inputStyle: stylePropsType,
  containerStyle: stylePropsType,
  ...TextInput.propTypes, // this makes the Input component have proptypes of Textinput
};
Input.defaultProps = {
  inputStyle: styles.input,
  containerStyle: styles.containerStyle,
  touched: false,
  error: null,
};

export default Input;
