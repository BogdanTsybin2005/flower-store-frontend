import type { HTMLAttributes } from 'react';
import './ui.css';

export const Badge = ({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={`badge ${className}`} {...props} />
);
