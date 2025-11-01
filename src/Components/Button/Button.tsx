import { MouseEventHandler, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  disabled?: boolean;
};

export const Button = ({ onClick, title, disabled, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button type="button" onClick={onClick} title={title} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};
