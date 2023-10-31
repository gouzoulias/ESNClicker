import { MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
};

export const Button = ({ onClick, title, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button type="button" onClick={onClick} title={title} style={{ width: '100%', padding: 8 }}>
      {children}
    </button>
  );
};
