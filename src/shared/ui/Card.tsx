import type { HTMLAttributes } from 'react';
import './ui.css';

export const Card = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`card ${className}`} {...props} />
);
