import React, { FC } from 'react';
import styles from './CssSpinner.module.scss';

const CssSpinner: FC = () => {
  return (
    <div className={styles.spinnerRoot}>
      <div className={`${styles.spinner} ${styles.bounce1}`} />
      <div className={`${styles.spinner} ${styles.bounce2}`} />
      <div className={styles.spinner} />
    </div>
  );
};

export default CssSpinner;
