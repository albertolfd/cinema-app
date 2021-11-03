import React, { FC } from 'react';
import styles from './AnimatedGradientBar.module.scss';

interface AnimatedGradientBarProps {
  gradient: string;
  height?: number;
}

const AnimatedGradientBar: FC<AnimatedGradientBarProps> = (props: AnimatedGradientBarProps) => {
  const { gradient, height } = props;

  return (
    <div
      className={styles.root}
      style={{ background: gradient, backgroundSize: '400% 400%', height }}
    />
  );
};

export default AnimatedGradientBar;
