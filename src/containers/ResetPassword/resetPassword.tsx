import React, { useState } from 'react';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg'
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg'

import Card from '../../components/Card/card';
import { InputGroup, Label, Input, InputValidationTypes, FormErrors, FormMessages } from 'components/Input/input';
import Button, { ButtonTypes } from 'components/Button/button';

import requestClient from 'lib/requestClient';

import styles from './resetPassword.module.scss';
import { NextPage } from 'next';
import Router from 'next/router';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<any>([]);
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if(password !== confirmPassword) {
      setError('Password do not match');
      setLoading(false);
      return;
    }

    requestClient.put('users/update-password', {
      "password": password,
      "token": token,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
          setResponse(response.data.message);
          setTimeout(() => {
            Router.push('/auth/login');
          }, 2000)
        } else {
          setLoading(false);
          setError([response.data.message, 'Something went wrong, pls try again']);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        // TODO: handle resposnse if it is a 400
        setError(['Passowrd Update Failed!', error.message]);
      })
  };

  return (
    <div className={styles.container}>
      <img src={require('../../assets/images/login-background.png')} alt="background logo" />
      <LogoIcon />
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <h4>Reset Password</h4>
          <form className={styles.loginForm} onSubmit={(e) => { submitForm(e) }} >
            <InputGroup className={styles.passwordBox} horizontal>
              <Label>Password</Label>
              <div>
                <Input
                  autoComplete="true"
                  handleInputChange={(e: any) => setPassword(e?.target?.value)}
                  name="password"
                  required
                  type={!showPassword ? 'password' : 'text'}
                  validation={InputValidationTypes.freeText}
                  value={password}
                /> <EyeIcon
                  className={showPassword ? styles.showPassword : styles.hidePassword}
                  onClick={() => { setShowPassword(!showPassword) }} />
              </div>
            </InputGroup>
            <InputGroup className={styles.passwordBox} horizontal>
              <Label>Confirm Password</Label>
              <div>
                <Input
                  autoComplete="true"
                  handleInputChange={(e: any) => setConfirmPassword(e?.target?.value)}
                  name="password"
                  required
                  type={!showPassword ? 'password' : 'text'}
                  validation={InputValidationTypes.freeText}
                  value={confirmPassword}
                /> <EyeIcon
                  className={showPassword ? styles.showPassword : styles.hidePassword}
                  onClick={() => { setShowPassword(!showPassword) }} />
              </div>
            </InputGroup>
            <Button htmlType="submit" loading={loading} type={ButtonTypes.primary}>Login</Button>
            <FormErrors errors={error} />
            <FormMessages messages={response} />
          </form>
        </Card>
      </div>
    </div>
  )
};

ResetPassword.getInitialProps = ({query}) => {
  const token = query?.token as string;
  return {
    token
  }
};

export default ResetPassword;
