type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function Text({ children, className }: Props) {
  return <p className={tw('text-slate-300', className)}>{children}</p>;
}
