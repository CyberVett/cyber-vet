import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label } from 'components/Input/input';
import React, { useState } from 'react';

import styles from './radiology.module.scss';
import RadiologyModal from './radiologyModal';

const Radiology = () => {

  const [toggleModal, setToggleModal] = useState(false);


  return (
    <section>
      <div className={styles.formMenu}>
        <Button onClick={() => setToggleModal(true)}type={ButtonTypes.primary}>+ Radiology</Button>
      </div>
      <div className={styles.formDetails}>
        <div className={styles.formDetailsInfo}>
          <InputGroup>
            <Label>Check In</Label>
            <input
              disabled
              placeholder={new Date().toLocaleString()} />
          </InputGroup>
          <InputGroup>
            <Label>Visit Type</Label>
            <select>
              <option>Follow up</option>
              <option>First Visit</option>
            </select>
          </InputGroup>
          <InputGroup>
            <Label>Doctor</Label>
            <input
              disabled
              placeholder={`Wande Coal`} />
          </InputGroup>
          <InputGroup>
            <Label>Check Out</Label>
            <input
              disabled
              placeholder={new Date().toLocaleString()} />
          </InputGroup>
        </div>
      </div>
      <RadiologyModal 
        closeModal={() => setToggleModal(false)}
        visible={toggleModal}
      />
    </section>
  )
};

export default Radiology;
