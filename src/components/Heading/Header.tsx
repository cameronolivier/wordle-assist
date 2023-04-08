import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.utils';

type Props = {
  children: ReactNode;
  className?: string;
};
export default function Header({ children, className }: Props) {
  return (
    <h1 className={tw('mb-5 text-4xl text-slate-100', className)}>
      {children}
    </h1>
  );
}
