import type { HTMLAttributes } from 'react';
import './ui.css';

export const Alert = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`alert ${className}`} {...props} />
);
