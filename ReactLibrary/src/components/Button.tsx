import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  variant?: 'primary' | 'secondary' | 'quiet';
};

export function Button({ variant = 'primary', text, className = '', ...props }: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');

  if (text) {
    return <button className={classes} {...props}>{text}</button>;
  }
  return <button className={classes} {...props}/>;
}
