import React from 'react';
import Router from 'next/router';

import { ReactComponent as Loader } from 'assets/icons/loading.svg';

import styles from './button.module.scss';
import { composeClasses } from '../../lib/utils';

export enum ButtonTypes {
  basic = 'basic',
  outline = 'outline',
  primary = 'primary',
  orange = 'orange',
  grey = 'grey',
  red = 'red'
}

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  htmlType?: string; // Type of button e.g. "submit", "reset", etc
  fullWidth?: boolean; // If the button should be full width
  loading?: boolean; // Loading indicator
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  type?: ButtonTypes;
}

const Button: React.FC<IButtonProps> = ({
  children, className, fullWidth, href, htmlType, loading, onClick, type, ...rest
}) => {
  const Element = href ? 'a' : 'button';

  const defaultLinkHandler = (event:
  React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (href) {
      // If it's a link, then handle the route with Next's router
      event.preventDefault();
      Router.push(href);
    }
  };

  const props = {
    className: composeClasses(
      className,
      styles.button,
      styles[type || ButtonTypes.outline],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
    ),
    onClick: onClick || defaultLinkHandler,
    type: htmlType,
    ...rest,
  };

  return (
    // @ts-ignore
    <Element {...props}>
      {
        loading
          ? (
            <Loader style={{
              maxHeight: '15px',
              stroke: 'currentColor',
            }}
            />
          )
          : children
      }
    </Element>
  );
};

export default Button;
