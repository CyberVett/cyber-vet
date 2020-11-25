import React, { useState } from 'react';
import Link from 'next/link';

import { ReactComponent as LogoIcon } from 'assets/icons/logo-white.svg';

import Card from '../../components/Card/card';
import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label, Input, InputValidationTypes, FormErrors, FormMessages } from 'components/Input/input';

import styles from './forgotPassword.module.scss';
import requestClient from 'lib/requestClient';
import config from 'config';

const ForgotPassword: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<any>([]);

  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.put('users/reset-password', {
      "accountId": email,
      "callbackUrl": config.reset_url,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse(response.data.message);
        } else {
          setLoading(false);
          setError([response.data.message, 'Please check your email address and try again']);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        // TODO: handle resposnse if it is a 400
        setError(['Reset Password Failed!', error.message]);
      });
  };

  return (
    <div className={styles.container}>
      <img src={require('../../assets/images/login-background.png')} alt="background logo" />
      <LogoIcon />
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <h4>Forgot Password</h4>
          <form className={styles.passwordForm} onSubmit={(e) => { submitForm(e) }}>
            <InputGroup horizontal>
              <Label>Email</Label>
              <Input
                autoComplete="true"
                handleInputChange={(e: any) => setEmail(e?.target?.value)}
                name="email"
                required
                type="email"
                validation={InputValidationTypes.email}
                value={email}
              />
            </InputGroup>
            <Button htmlType="submit" loading={loading} type={ButtonTypes.primary}>Reset Password</Button>
          </form>
          <FormErrors errors={error} />
          <FormMessages messages={response} />
          <div style={{ textAlign: 'center' }}>Remember Password&#63; <Link href="/auth/login"><span style={{ color: '#1E638F', cursor: 'pointer' }}>Login</span></Link></div>
        </Card>
      </div>
    </div>
  )
};

export default ForgotPassword;
