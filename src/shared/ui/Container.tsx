import type { HTMLAttributes } from 'react';
import './ui.css';

export const Container = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`container ${className}`} {...props} />
);
