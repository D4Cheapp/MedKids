import { Navbar as HeroNavbar, NavbarItem } from '@heroui/react';
import { Routes } from 'constants/routes';

import Link from 'next/link';

const menuItems = [
  {
    label: 'Пациенты',
    href: Routes.RegistrarPatients,
  },
  {
    label: 'Записи на прием',
    href: Routes.RegistrarAppointments,
  },
  {
    label: 'Врачи',
    href: Routes.RegistrarDoctors,
  },
  {
    label: 'Причины записей',
    href: Routes.RegistrarAppointmentReasons,
  },
  {
    label: 'Типы записей',
    href: Routes.RegistrarAppointmentTypes,
  },
];

export const RegistrarsNavbar = () => {
  return (
    <HeroNavbar isBordered>
      {menuItems.map(item => (
        <NavbarItem key={item.label}>
          <Link color="primary" href={item.href}>
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </HeroNavbar>
  );
};
