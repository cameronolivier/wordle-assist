import { ButtonHTMLAttributes, ReactNode } from 'react';

import { tw } from '~/utils/tailwind.utils';

type Props = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
  children,
  className,
  disabled,
  variant,
  ...props
}: Props) {
  return (
    <button
      className={tw(
        'mx-2 block flex-1 content-center justify-center rounded p-3',
        variant === 'primary' && 'bg-slate-200',
        variant === 'secondary' && 'bg-slate-500',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
