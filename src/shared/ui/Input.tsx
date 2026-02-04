import type { InputHTMLAttributes } from 'react';
import './ui.css';

export const Input = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={`input ${className}`} {...props} />
);
