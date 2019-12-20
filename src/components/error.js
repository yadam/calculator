import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from '../styles/error.module.css';

export const ErrorMessage = memo(({ message }) => {
  return <div className={styles.error}>{message}</div>;
});

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: undefined,
};

export default ErrorMessage;
