import React, { useContext, useState } from 'react';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label, Input, InputValidationTypes, FormErrors, FormMessages } from 'components/Input/input';

import styles from './changePassword.module.scss';
import requestClient from 'lib/requestClient';
import { AuthContext } from 'contexts/auth';
import Modal from 'components/Modal/modal';

const ChangePassword: React.FunctionComponent<{ closeModal: () => void; visible: boolean }> = ({
  closeModal,
  visible
}) => {
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<any>([]);

  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError('Password do not match');
      setLoading(false);
      return;
    }

    requestClient.put('users/change-password', {
      "accountId": user?.info?.accountId,
      "newPassword": newPassword,
      "password": password,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse(response.data.message);
        } else {
          setLoading(false);
          setError([response.data.message, 'Please enter correct password and try again']);
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
    <Modal
      closeModal={closeModal}
      noTitle={true}
      visible={visible}
    >
      <div className={styles.card}>
        <h4>Change Password</h4>
        <form className={styles.passwordForm} onSubmit={(e) => { submitForm(e) }}>
          <InputGroup className={styles.passwordBox} horizontal>
            <Label>Current Password</Label>
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
            <Label>New Password</Label>
            <div>
              <Input
                autoComplete="true"
                handleInputChange={(e: any) => setNewPassword(e?.target?.value)}
                name="password"
                required
                type={!showNewPassword ? 'password' : 'text'}
                validation={InputValidationTypes.freeText}
                value={newPassword}
              /> <EyeIcon
                className={showNewPassword ? styles.showPassword : styles.hidePassword}
                onClick={() => { setShowNewPassword(!showNewPassword) }} />
            </div>
          </InputGroup>
          <InputGroup className={styles.passwordBox} horizontal>
            <Label>Confirm New Password</Label>
            <div>
              <Input
                autoComplete="true"
                handleInputChange={(e: any) => setConfirmPassword(e?.target?.value)}
                name="password"
                required
                type={!showConfirmPassword ? 'password' : 'text'}
                validation={InputValidationTypes.freeText}
                value={confirmPassword}
              /> <EyeIcon
                className={showConfirmPassword ? styles.showPassword : styles.hidePassword}
                onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} />
            </div>
          </InputGroup>
          <Button htmlType="submit" loading={loading} type={ButtonTypes.primary}>Change Password</Button>
        </form>
        <FormErrors errors={error} />
        <FormMessages messages={response} />
      </div>
    </Modal>
  )
};

export default ChangePassword;
