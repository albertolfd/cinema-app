import React, { FC } from 'react';
import styles from './CssSpinner.module.scss';

const CssSpinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  );
};

export default CssSpinner;
