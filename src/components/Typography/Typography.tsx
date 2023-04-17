import { ReactNode } from 'react';

import { tw } from '~/utils/tailwind.utils';

type Props = {
  children: ReactNode;
  className?: string;
};
export default function Typography({ children, className }: Props) {
  return <p className={tw('text-slate-300', className)}>{children}</p>;
}
