import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({
  text,
  onPress,
  containerStyle,
  textStyle,
  isSubmitting,
  disabled,
  indicatorColor,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isSubmitting}
      style={containerStyle}>
      {isSubmitting ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={textStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 10,
    backgroundColor: '#CBE15A',
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#CBE15A',
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

Button.defaultProps = {
  text: '',
  isSubmitting: false,
  indicatorColor: 'white',
  ...styles, // this would spread the styles object
};

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Button.propTypes = {
  containerStyle: stylePropsType,
  textStyle: stylePropsType,
};

export default Button;
