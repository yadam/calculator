import React, { useState } from 'react';
import { Input } from './components/input';
import { Result } from './components/result';
import { parse } from './services/parser';
import styles from './styles/app.module.css';

function App() {
  const [errorState, setErrorState] = useState();
  const [resultState, setResultState] = useState(0);

  const onChangeHandler = value => {
    setErrorState();
    try {
      const result = parse(value);
      setResultState(result);
    } catch (e) {
      setErrorState(e.message);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <Result result={resultState} />
        <Input onChange={onChangeHandler} errorMessage={errorState} />
      </div>
    </div>
  );
}

export default App;
