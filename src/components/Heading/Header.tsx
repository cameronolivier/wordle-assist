import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.utils';

type Props = {
  children: ReactNode;
  className?: string;
  size?: 'h1' | 'h2' | 'h3' | 'h4';
};
export default function Header({ children, size = 'h2', className }: Props) {
  return (
    <h1
      className={tw(
        'text-slate-100',
        [
          size === 'h4' && 'text-xl',
          size === 'h3' && 'text-2xl',
          size === 'h2' && 'text-4xl',
          size === 'h1' && 'text-6xl',
        ],
        [
          size === 'h4' && 'mb-2',
          size === 'h3' && 'mb-4',
          size === 'h2' && 'mb-5',
          size === 'h1' && 'mb-8',
        ],
        className
      )}
    >
      {children}
    </h1>
  );
}
