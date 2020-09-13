import React from 'react';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg'

import Card from '../../components/Card/card';
import { InputGroup, Label, Input } from 'components/Input/input';
import Button, { ButtonTypes } from 'components/Button/button';

import styles from './login.module.scss';

const Login: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <img src={require('../../assets/images/login-background.png')} alt="background logo" />
      <LogoIcon />
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <h4>Staff Login</h4>
          <form className={styles.loginForm}>
            <InputGroup horizontal>
              <Label>Email</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Password</Label>
              <Input />
            </InputGroup>
            <Button type={ButtonTypes.primary}>Login</Button>
          </form>
          <div style={{textAlign:'center'}}><Link href="/auth/forgot-password">Forgot Password&nbsp;&#63;</Link></div>
        </Card>
      </div>
    </div>
  )
};

export default Login;
