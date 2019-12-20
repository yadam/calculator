import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from '../styles/result.module.css';

export const Result = memo(({ result }) => {
  return <div className={styles.result}>{result.toString()}</div>;
});

Result.propTypes = {
  result: PropTypes.number,
};

Result.defaultProps = {
  result: 0,
};

export default Result;
