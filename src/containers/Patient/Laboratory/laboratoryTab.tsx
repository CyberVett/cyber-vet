import Button, { ButtonTypes } from 'components/Button/button';
import { InputGroup, Label } from 'components/Input/input';
import React, { useState } from 'react';

import styles from './laboratory.module.scss';
import MicrobiologyModal from './Modal/microbiologyModal';
import ParasitologyModal from './Modal/parasitologyModal';
import AddPathologyModal from './Modal/pathologyModal';
import RapidTestModal from './Modal/rapidTestModal';

const LaboratoryTab = () => {

  const [togglePathology, setTogglePathology] = useState(false);
  const [toggleParasitology, setToggleParasitology] = useState(false);
  const [toggleMicrobiology, setToggleMicrobiology] = useState(false);
  const [toggleRapidtest, setToggleRapidtest] = useState(false);

  return (
    <section>
      <div className={styles.formMenu}>
        <Button onClick={() => setTogglePathology(true)} type={ButtonTypes.primary}>+ Pathology Form</Button>
        <Button onClick={() => setToggleParasitology(true)} type={ButtonTypes.primary}>+ Parasitology Form</Button>
        <Button onClick={() => setToggleMicrobiology(true)} type={ButtonTypes.primary}>+ Microbiology Form</Button>
        <Button onClick={() => setToggleRapidtest(true)} type={ButtonTypes.primary}>+ Rapid Test Kit</Button>
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
      <MicrobiologyModal
        closeModal={() => setToggleMicrobiology(false)}
        visible={toggleMicrobiology} />
      <RapidTestModal
        closeModal={() => setToggleRapidtest(false)}
        visible={toggleRapidtest} />
      <AddPathologyModal
        closeModal={() => setTogglePathology(false)}
        visible={togglePathology}
      />
      <ParasitologyModal
         closeModal={() => setToggleParasitology(false)}
         visible={toggleParasitology}
         ></ParasitologyModal>
    </section>
  )
};

export default LaboratoryTab;
