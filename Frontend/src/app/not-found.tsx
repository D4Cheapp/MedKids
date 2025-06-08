import { AppRoutes } from 'constants/routes';

import { redirect } from 'next/navigation';

const NotFound = () => {
  return redirect(AppRoutes.Home);
};

export default NotFound;
