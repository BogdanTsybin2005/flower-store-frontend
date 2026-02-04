import type { ButtonHTMLAttributes } from 'react';
import './ui.css';

export const Button = ({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`btn ${className}`} {...props} />
);
