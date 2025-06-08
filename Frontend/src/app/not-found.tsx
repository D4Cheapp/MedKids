import { Routes } from 'constants/routes';

import { redirect } from 'next/navigation';

const NotFound = () => {
  return redirect(Routes.Home);
};

export default NotFound;
