import type { TextareaHTMLAttributes } from 'react';
import './ui.css';

export const TextArea = ({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={`textarea ${className}`} {...props} />
);
