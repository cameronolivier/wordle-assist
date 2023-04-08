import { ButtonHTMLAttributes, ReactNode } from 'react';

import { tw } from '~/utils/tailwind.utils';

type Props = {
  children: ReactNode;
  className?: string;
  variant: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
  children,
  className,
  variant,
  ...props
}: Props) {
  return (
    <button
      className={tw(
        'mx-2 block flex-1 content-center justify-center rounded p-3',
        variant === 'primary' && 'bg-slate-200',
        variant === 'secondary' && 'bg-slate-500',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
