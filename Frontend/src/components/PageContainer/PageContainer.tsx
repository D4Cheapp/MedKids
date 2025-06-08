type Props = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: Props) => {
  return <div className="max-w-[1024px] mx-auto py-10 px-5">{children}</div>;
};
