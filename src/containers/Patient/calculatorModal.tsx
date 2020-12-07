import Button, { ButtonTypes } from 'components/Button/button';
import Card from 'components/Card/card';
import { Input, InputGroup, Label } from 'components/Input/input';
import Modal from 'components/Modal/modal';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import React, { useEffect, useState } from 'react';
import styles from '../Patient/Radiology/radiology.module.scss';

interface ICalculator {
  closeModal: () => void;
  visible: boolean;
}

export const CalculatorModal: React.FC<ICalculator> = ({ closeModal, visible }) => {
  const [weight, setWeight] = useState<number>();
  const [concentration, setConcentration] = useState<number>();
  const [dose, setDose] = useState<number>();
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    let volume = 0;
    // @ts-ignore
    volume = weight * dose / concentration;
    setVolume(volume || 0);
  }, [weight, concentration, dose]);

  const resetFields = () => {
    setWeight(0);
    setConcentration(0);
    setDose(0);
    setVolume(0);
  }

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      visible={visible}
    >
      <Card>
        <SectionHeader title="Drug Dosage Calculator" />
        <div style={{padding: '0 16px'}}>
          <InputGroup className={styles.gridSpace} horizontal>
            <Label>Weight of Animal</Label>
            <Input
              className={styles.width500}
              name="weight"
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              step="0.01"
              type="text"
              value={weight}
            />
            <Input
              className={styles.width100}
              disabled
              type="text"
              value="KG"
            />
          </InputGroup>
          <InputGroup className={styles.gridSpace} horizontal>
            <Label>Dosage of Drug</Label>
            <Input
              className={styles.width500}
              name="dosage"
              onChange={(e) => setDose(parseFloat(e.target.value))}
              step=".01"
              type="text"
              value={dose}
            />
            <Input
              className={styles.width100}
              disabled
              type="text"
              value="MG/KG"
            />
          </InputGroup>
          <InputGroup className={styles.gridSpace} horizontal>
            <Label>Concentration of Drug</Label>
            <Input
              className={styles.width500}
              name="concentration"
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              step=".01"
              type="text"
              value={concentration}
            />
            <Input
              className={styles.width100}
              disabled
              type="text"
              value="MG/ML"
            />
          </InputGroup>
          <br />
          <br />
          <InputGroup className={styles.gridSpace} horizontal>
            <Label>The Volume of Drug is:</Label>
            <Input
              className={styles.width500}
              name="volume"
              step=".01"
              type="text"
              value={volume}
            />
            <Input
              className={styles.width100}
              disabled
              type="text"
              value="ML"
            />
          </InputGroup>
          <div className={styles.buttonContainer}>
            <Button
              onClick={closeModal}
              type={ButtonTypes.orange}
            >OK</Button>
            <Button
              onClick={resetFields}
              type={ButtonTypes.grey}
            >reset</Button>
          </div>
        </div>
      </Card>
    </Modal >
  )
};