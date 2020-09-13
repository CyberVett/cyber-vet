import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { composeClasses } from 'lib/utils';
import styles from './card.module.scss';

const Card: React.SFC<{
  className?: string;
}> = ({
  children,
  className,
}) => {
  return (
    <div className={composeClasses(
      styles.card,
      className,
    )}
    >
      {children}
    </div>
  );
};

export default Card;

export const CardHeader: React.SFC<{
  className?: string;
}> = ({
  children,
  className,
}) => {
  return (
    <div className={composeClasses(
      styles.cardHeader,
      className,
    )}
    >
      <h3>
        {children}
      </h3>
    </div>
  );
};

export const BaseCardTabs: React.SFC<{
  className?: string;
  items: {
    href: string;
    id: number;
    name: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: number, item?: any) => void;
    data?: any;
    icon?: React.ElementType;
  }[];
  currentTab?: number; // Current tab ID
}> = ({
  className,
  currentTab,
  items,
}) => {
  const router = useRouter();

  return (
    <ul className={composeClasses(styles.tabList, className)}>
      {
        items.map((item) => {
          const LinkContainer = item.href ? Link : Fragment;

          const isActiveItem = (currentTab && currentTab === item.id)
              || router.asPath.split('?')[0] === item.href.split('?')[0];

          const props: any = item.href? {href: item.href} : {};

          return (
            <li key={item.id}>
              <LinkContainer {...props}>
                <a
                  className={composeClasses(
                    styles.tabItem,
                    isActiveItem && styles.tabItemActive,
                  )}
                  href={item.href}
                  onClick={(event) => {
                    if (item.onClick && typeof item.onClick === 'function') {
                      event.preventDefault();
                      item.onClick(event, item.id, item.data);
                    }
                  }}
                >
                  {item.icon && <item.icon/>}
                  <span>{item.name}</span>
                </a>
              </LinkContainer>
            </li>
          );
        })
      }
    </ul>
  );
};

export const CardTabs = BaseCardTabs;
