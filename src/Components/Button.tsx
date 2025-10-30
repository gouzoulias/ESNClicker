import { MouseEventHandler, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
};

export const Button = ({ onClick, title, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button type="button" onClick={onClick} title={title} className={styles.button}>
      {children}
    </button>
  );
};
