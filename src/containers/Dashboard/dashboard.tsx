import React from 'react';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg'

import Card from '../../components/Card/card';
import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label, Input } from 'components/Input/input';

import styles from './dashboard.module.scss';

const ForgotPassword: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
       hellow
      </div>
    </div>
  )
};

export default ForgotPassword;
