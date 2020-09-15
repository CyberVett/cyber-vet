import React from 'react';
import { useRouter } from 'next/router';

import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ReactComponent as AnimalFoot } from 'assets/icons/paw.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as BarChart } from 'assets/icons/chart.svg';
import { ReactComponent as AdminIcon } from 'assets/icons/admin.svg';
import { ReactComponent as AvatarIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as WalletIcon } from 'assets/icons/wallet.svg';
import { ReactComponent as MicroscopeIcon } from 'assets/icons/microscope.svg';
import { ReactComponent as LogoIcon } from 'assets/icons/logo-small.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/setting.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as DropDownIcon } from 'assets/icons/downArrow.svg';
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg';
import { ReactComponent as NotificationIcon } from 'assets/icons/notification.svg';
import { ReactComponent as RightArrow } from 'assets/icons/rightArrow.svg';

import styles from './layout.module.scss';
import Button, { ButtonTypes } from '../Button/button';
import { composeClasses } from '../../lib/utils';
import Link from 'next/link';

const TopNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <LogoIcon />
        <SettingIcon />
      </div>
      <div className={styles.navRight}>
        <Button type={ButtonTypes.outline}>Dr Kayode Clinic</Button>
        <NotificationIcon />
        <HelpIcon />
        <AvatarIcon />
        <div className={styles.userSection}>
          <span>Fola Agoro</span>
          <DropDownIcon />
        </div>
      </div>
    </nav>
  );
};

const navLinks = [
  {
    href: '/app/dashboard',
    icon: DashboardIcon,
    id: 1,
    name: 'Dashboard',
  },
  {
    href: '/app/patient',
    icon: AnimalFoot,
    id: 2,
    name: 'Patient & Client',
    childMenu: [
      {
        href: '/app/patient/list',
        id: 1,
        name: 'patient list',
      },
      {
        href: '/app/patient/add',
        id: 2,
        name: 'add new patient',
      },
      {
        href: '/app/patient/referred',
        id: 3,
        name: 'referred patient',
      }
    ]
  },
  {
    href: '/app/diagnostic',
    icon: MicroscopeIcon,
    id: 3,
    name: 'Diagnostic Unit',
    childMenu: [
      {
        href: '/app/diagnostic/lab/requested',
        id: 1,
        name: 'test requested',
      },
      {
        href: '/app/diagnostic/lab/completed',
        id: 2,
        name: 'test completed',
      },
      {
        href: '/app/diagnostic/xray/requested',
        id: 3,
        name: 'xray requested',
      },
      {
        href: '/app/diagnostic/xray/completed',
        id: 3,
        name: 'xray completed',
      }
    ]
  },
  {
    href: '/app/schedules',
    icon: CalendarIcon,
    id: 4,
    name: 'Scheduling',
  },
  {
    href: '/app/boarding',
    icon: HomeIcon,
    id: 5,
    name: 'Boarding',
  },
  {
    href: '/app/financial',
    icon: WalletIcon,
    id: 6,
    name: 'Financials',
  },
  {
    href: '/app/metrics',
    icon: BarChart,
    id: 7,
    name: 'Metrics & Report',
  },
  {
    href: '/app/admin',
    icon: AdminIcon,
    id: 8,
    name: 'Administration',
    childMenu: [
      {
        href: '/app/admin/staff/list',
        id: 1,
        name: 'Staff list',
      },
      {
        href: '/app/admin/staff/add',
        id: 2,
        name: 'add new staff',
      }
    ]
  },
];

const SideNav = () => {
s  const router = useRouter();

  return (
    <aside className={styles.sideMenu}>
      <ul className={styles.navList}>
        {
          navLinks.map(item => (
            <>
              <li
                key={item.id}
              >
                <Link href={item.href}>
                  <a
                    className={composeClasses(
                      styles.navItem,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (router as any).asPath.includes(item.href) && styles.navItemActive,
                    )}
                  >
                    <item.icon className={styles.navItemIcon} />
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
              {
                ((router as any).asPath.includes(item.href) && item.childMenu?.length > 0) &&
                <ul className={styles.navListChild}>
                  {
                    item.childMenu?.map(child => (
                      <>
                        <li key={child.id}>
                          <Link href={child.href}>
                            <a>{child.name}&nbsp;<RightArrow /></a>
                          </Link>
                        </li>
                      </>
                    ))
                  }
                </ul>
              }
            </>
          ))
        }
      </ul>
    </aside>
  );
};

const Layout: React.SFC = ({ children }) => {
  return (
    <>
      <TopNav />
      <main className={styles.mainWrapper}>
        <SideNav />
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;
