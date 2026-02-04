import type { SelectHTMLAttributes } from 'react';
import './ui.css';

export const Select = ({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={`input ${className}`} {...props} />
);
