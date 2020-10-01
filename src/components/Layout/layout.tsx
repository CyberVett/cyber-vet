import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button, { ButtonTypes } from '../Button/button';
import { composeClasses } from '../../lib/utils';

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
import { AuthContext } from 'contexts/auth';

const TopNav = () => {
  const { hospital, staff } = useContext(AuthContext)

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <Link href="/"><LogoIcon /></Link>
        <SettingIcon />
      </div>
      <div className={styles.navRight}>
        <Button type={ButtonTypes.outline}>{hospital?.name}</Button>
        <NotificationIcon />
        <HelpIcon />
        <AvatarIcon />
        <div className={styles.userSection}>
          <span>{staff?.firstName} {staff?.lastName}</span>
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
        id: 100,
        name: 'patient list',
      },
      {
        href: '/app/patient/add/client',
        id: 200,
        name: 'add new patient',
      },
      {
        href: '/app/patient/referred',
        id: 300,
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
        id: 400,
        name: 'test requested',
      },
      {
        href: '/app/diagnostic/lab/completed',
        id: 500,
        name: 'test completed',
      },
      {
        href: '/app/diagnostic/xray/requested',
        id: 600,
        name: 'xray requested',
      },
      {
        href: '/app/diagnostic/xray/completed',
        id: 700,
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
        href: '/app/admin',
        id: 800,
        name: 'Staff list',
      },
      {
        href: '/app/admin/add',
        id: 900,
        name: 'add new staff',
      }
    ]
  },
];

const SideNav = () => {
  const router = useRouter();
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
                    key={item.id}
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
                ((router as any).asPath.includes(item.href) && (item.childMenu && item?.childMenu?.length > 0)) &&
                <ul className={styles.navListChild}>
                  {
                    item.childMenu?.map(child => (
                      <>
                        <li key={child.id}>
                          <Link href={child.href}>
                            <a key={item.id}>{child.name}&nbsp;<RightArrow /></a>
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

interface ILayout {
  showDashboard: boolean;
};

const Layout: React.FC<ILayout> = ({ children, showDashboard, ...rest }) => {
  return (
    <>
      {
        showDashboard ?
          <div className={styles.mainGrid} {...rest}>
            <TopNav />
            <main>
              <SideNav />
              <div className={styles.mainWrapper}>{children}</div>
            </main>
          </div> : <React.Fragment {...rest}>{children}</React.Fragment>
      }
    </>
  );
};

export default Layout;
