import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Label,
} from "components/Input/input";
import Modal from "components/Modal/modal";

import styles from "../laboratory.module.scss";
import Button, { ButtonTypes } from "components/Button/button";
import { ReactComponent as Loader } from "../../../../assets/icons/loader.svg";
import { formatDate } from "lib/utils";

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  data: IParasitologyData;
  onAdd: Function;
  onComplete: Function;
  onCancel: Function;
  modalLoading: boolean;
  isReview?: boolean;
}

export interface IParasitologyData {
  tentativeDiagnosis: string;
  caseHistory: string;
  testsRequired: string;
  bloodSampleSubmitted: boolean;
  urineSampleSubmitted: boolean;
  stoolSampleSubmitted: boolean;
  skinScrappingSampleSubmitted: boolean;
  otherSampleSubmitted: boolean;
  conditionOfSpecimen: string;
  bloodResult: string;
  PCVResult: string;
  wetMountResult: string;
  skinScrappingResult: string;
  facialAnalysisResult: string;
  urineAnalysisResult: string;
  dateCompleted?: string;
  createdAt?: string;
}

const ParasitologyModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onCancel,
  onComplete,
  isReview
}) => {
  // @ts-ignore
  const [formValues, setFormValues] = useState<IParasitologyData>({});
  const handleInputChange = (event: {
    persist: () => void;
    // @ts-ignore
    target: { name: any; value: any };
  }) => {
    event.persist();
    // @ts-ignore
    let value = event.target.value;
    // @ts-ignore
    if (event.target.type === "checkbox") {
      // @ts-ignore
      value = event.target.checked;
    }
    setFormValues((formValues: any) => ({
      ...formValues,
      [event.target.name]: value,
    }));
  };

  useEffect(() => {
    setFormValues(data);
  }, [data]);

  return (
    <Modal closeModal={closeModal} fullMode noTitle visible={visible}>
      {modalLoading ? (
        <Loader />
      ) : (
          <>
            <div className={styles.formMenu}>
              <h3>Parasitology Form</h3>
              <InputGroup horizontal>
                <Label>Date Requested</Label>
                <input disabled placeholder={
                  // @ts-ignore
                  formatDate(data?.createdAt) || new Date().toLocaleString()} />
              </InputGroup>
              <InputGroup horizontal>
                <Label>Date Completed</Label>
                <input disabled placeholder={
                  // @ts-ignore
                  formatDate(data?.dateCompleted) || ''} />
              </InputGroup>
            </div>
            <div className={styles.formDetailsInput}>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Case history</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.caseHistory}
                  onChange={handleInputChange}
                  name="caseHistory"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Tentative Diagnosis</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.tentativeDiagnosis}
                  onChange={handleInputChange}
                  name="tentativeDiagnosis"
                />
              </InputGroup>

              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Test(s) Required</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.testsRequired}
                  onChange={handleInputChange}
                  name="testsRequired"
                />
              </InputGroup>
              <div className={styles.formDetailsSmallGrid}>
                <div>
                  <h3>Type of Sample Submitted</h3>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Blood</Label>
                    <input
                      type="checkbox"
                      defaultChecked={formValues?.bloodSampleSubmitted === true}
                      checked={formValues?.bloodSampleSubmitted === true}
                      onChange={handleInputChange}
                      name="bloodSampleSubmitted"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Urine</Label>
                    <input
                      type="checkbox"
                      defaultChecked={formValues?.urineSampleSubmitted === true}
                      checked={formValues?.urineSampleSubmitted === true}
                      onChange={handleInputChange}
                      name="urineSampleSubmitted"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Stool</Label>
                    <input
                      type="checkbox"
                      defaultChecked={formValues?.stoolSampleSubmitted === true}
                      checked={formValues?.stoolSampleSubmitted === true}
                      onChange={handleInputChange}
                      name="stoolSampleSubmitted"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Skin scrapping</Label>
                    <input
                      type="checkbox"
                      defaultChecked={["on", true].includes(
                        formValues?.skinScrappingSampleSubmitted
                      )}
                      checked={["on", true].includes(
                        formValues?.skinScrappingSampleSubmitted
                      )}
                      onChange={handleInputChange}
                      name="skinScrappingSampleSubmitted"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Other</Label>
                    <input
                      type="checkbox"
                      defaultChecked={formValues?.urineSampleSubmitted === true}
                      checked={formValues?.otherSampleSubmitted === true}
                      onChange={handleInputChange}
                      name="otherSampleSubmitted"
                    />
                  </InputGroup>
                </div>
                <div>
                  <h3>Condition of Specimen</h3>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Good</Label>
                    <input
                      type="radio"
                      value="Good"
                      checked={formValues?.conditionOfSpecimen === "Good"}
                      defaultChecked={formValues?.conditionOfSpecimen === "Good"}
                      onChange={handleInputChange}
                      name="conditionOfSpecimen"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Fair</Label>
                    <input
                      type="radio"
                      value="Fair"
                      checked={formValues?.conditionOfSpecimen === "Fair"}
                      defaultChecked={formValues?.conditionOfSpecimen === "Fair"}
                      onChange={handleInputChange}
                      name="conditionOfSpecimen"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Poor</Label>
                    <input
                      type="radio"
                      value="Poor"
                      checked={formValues?.conditionOfSpecimen === "Poor"}
                      defaultChecked={formValues?.conditionOfSpecimen === "Poor"}
                      onChange={handleInputChange}
                      name="conditionOfSpecimen"
                    />
                  </InputGroup>
                  <InputGroup className={styles.spaceBetween} horizontal>
                    <Label>Other</Label>
                    <input
                      type="radio"
                      value="Other"
                      checked={formValues?.conditionOfSpecimen === "Other"}
                      defaultChecked={formValues?.conditionOfSpecimen === "Other"}
                      onChange={handleInputChange}
                      name="conditionOfSpecimen"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className={styles.formDetailsInfo}>
                <h4>Test</h4>
                <h4>Result</h4>
              </div>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Blood</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.bloodResult}
                  onChange={handleInputChange}
                  name="bloodResult"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>PCV (&#37;)</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.PCVResult}
                  onChange={handleInputChange}
                  name="PCVResult"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Wet mount/Blood film/ Haemoparasite</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.wetMountResult}
                  onChange={handleInputChange}
                  name="wetMountResult"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Skin Scrapping</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.skinScrappingResult}
                  onChange={handleInputChange}
                  name="skinScrappingResult"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Feacal analysis - Egg/ Oocyst/Parasite Count</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.facialAnalysisResult}
                  onChange={handleInputChange}
                  name="facialAnalysisResult"
                />
              </InputGroup>
              <InputGroup className={styles.spaceBetween} horizontal>
                <Label>Urine Analysis</Label>
                <input
                  className={styles.width500}
                  type="text"
                  value={formValues?.urineAnalysisResult}
                  onChange={handleInputChange}
                  name="urineAnalysisResult"
                />{" "}
              </InputGroup>
            </div>
            <div className={styles.buttonContainer}>
            {!isReview && <Button type={ButtonTypes.primary} onClick={() => onAdd(formValues, "create")}>Add</Button>}
              <Button type={ButtonTypes.orange} onClick={() => onComplete(formValues, "complete")}>
                Complete
            </Button>
              <Button type={ButtonTypes.grey} onClick={() => onCancel()}>Cancel</Button>
            </div>
          </>
        )}
    </Modal>
  );
};

export default ParasitologyModal;
