import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { ErrorMessage } from './error';
import styles from '../styles/input.module.css';

export const Input = memo(({ errorMessage, onChange: parentOnChonge }) => {
  const onChangeHandler = e => parentOnChonge(e.target.value);
  return (
    <>
      <input
        className={styles.input}
        onChange={onChangeHandler}
        placeholder="Enter your comma delimited string"
      />
      <ErrorMessage message={errorMessage} />
    </>
  );
});

Input.propTypes = {
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  errorMessage: undefined,
};

export default Input;
