import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg'

import Card from '../../components/Card/card';
import { InputGroup, Label, Input, InputValidationTypes, FormErrors, FormMessages } from 'components/Input/input';
import Button, { ButtonTypes } from 'components/Button/button';

import config from 'config';
import { AuthContext } from 'contexts/auth';
import requestClient from 'lib/requestClient';

import styles from './login.module.scss';

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const [loginInput, setLoginInput] = useState<ILogin>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const {
    updateUser,
  } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem(config.storageKeys.auth);
  }, []);

  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
    event.persist();
    setLoginInput((input: any) => ({
      ...input,
      [event.target.name]: event.target.value
    }));
  };

  const submitLoginForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post('users/login', {
      "accountId": loginInput.email,
      "password": loginInput.password,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse(response.data.message);
          updateUser(response.data.data);
          const redirectUrl = window.location.search && new URLSearchParams(window.location.search).get('to');
          const defaultPath = '/app/dashboard';
          Router.push(redirectUrl || defaultPath);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      })
  };

  return (
    <div className={styles.container}>
      <img src={require('../../assets/images/login-background.png')} alt="background logo" />
      <LogoIcon />
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <h4>Staff Login</h4>
          <form className={styles.loginForm} onSubmit={(e) => { submitLoginForm(e) }} >
            <InputGroup horizontal>
              <Label>Email</Label>
              <Input
                autoComplete="true"
                handleInputChange={handleInputChange}
                name="email"
                required
                type="email"
                validation={InputValidationTypes.email}
                value={loginInput.email}
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Password</Label>
              <Input
                autoComplete="true"
                handleInputChange={handleInputChange}
                name="password"
                required
                type="password"
                validation={InputValidationTypes.freeText}
                value={loginInput.password}
              />
            </InputGroup>
            <Button type={ButtonTypes.primary} htmlType="submit" loading={loading}>Login</Button>
            <FormErrors errors={error} />
            <FormMessages messages={response} />
          </form>
          <div style={{ textAlign: 'center' }}><Link href="/auth/forgot-password"><span style={{ color: '#1E638F' }}>Forgot Password&nbsp;&#63;</span></Link></div>
        </Card>
      </div>
    </div>
  )
};

export default Login;
