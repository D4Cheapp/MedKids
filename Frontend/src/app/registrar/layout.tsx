import { RegistrarsNavbar } from 'components/RegistrarsNavbar/RegistrarsNavbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <RegistrarsNavbar />
      {children}
    </>
  );
};

export default Layout;
