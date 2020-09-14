import React from 'react';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg'

import Card from '../../components/Card/card';
import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label, Input } from 'components/Input/input';

import styles from './forgotPassword.module.scss';

const ForgotPassword: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <img src={require('../../assets/images/login-background.png')} alt="background logo" />
      <LogoIcon />
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <h4>Forgot Password</h4>
          <form className={styles.passwordForm}>
            <InputGroup horizontal>
              <Label>Email</Label>
              <Input />
            </InputGroup>
            <Button type={ButtonTypes.primary}>Reset Password</Button>
          </form>
          <div style={{textAlign:'center'}}>Remember Password&#63; <Link href="/auth/login"><span style={{color: '#1E638F'}}>Login</span></Link></div>
        </Card>
      </div>
    </div>
  )
};

export default ForgotPassword;
