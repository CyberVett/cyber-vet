import React, { useState } from "react";
import {
  RadioInput,
  Input,
  InputGroup,
  Label,
  TextArea,
} from "components/Input/input";
import Modal from "components/Modal/modal";

import styles from "../laboratory.module.scss";
import Button from "components/Button/button";
import { ReactComponent as Loader } from "../../../../assets/icons/loader.svg";

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  data: IParasitologyData;
  onAdd: Function;
  onComplete: Function;
  onCancel: Function;
  modalLoading: boolean;
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
}

const ParasitologyModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onCancel,
  onComplete,
}) => {
  const [formValues, setFormValues] = useState<IParasitologyData>({ ...data });
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    if (Object.keys(formValues).includes(`${event.target.name}Required`)) {
      formValues[
        `${event.target.name}Required`
      ] = !!`${event.target.name}Required`;
    }
    setFormValues((formValues: any) => ({
      ...formValues,
      [event.target.name]: event.target.value,
    }));
  };

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
              <input disabled placeholder={new Date().toLocaleString()} />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Date Completed</Label>
              <input disabled placeholder={new Date().toLocaleString()} />
            </InputGroup>
          </div>
          <div className={styles.formDetailsInput}>
            <InputGroup horizontal>
              <Label>Case history</Label>
              <input
                type="text"
                value={formValues.caseHistory}
                onChange={handleInputChange}
                name="caseHistory"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Tentative Diagnosis</Label>
              <input
                type="text"
                value={formValues.tentativeDiagnosis}
                onChange={handleInputChange}
                name="tentativeDiagnosis"
              />
            </InputGroup>

            <InputGroup horizontal>
              <Label>Test(s) Required</Label>
              <input
                type="text"
                value={formValues.testsRequired}
                onChange={handleInputChange}
                name="testsRequired"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Result(s)</Label>
              {/* <textarea name={"note"} rows={10} onChange={handleInputChange}>
                {formValues.res}
              </textarea> */}
            </InputGroup>
            <div className={styles.formDetailsGrid}>
              <div>
                <h3>Type of Sample Submitted</h3>
                <InputGroup horizontal>
                  <Label>Blood</Label>
                  <input
                    type="checkbox"
                    defaultChecked={formValues.bloodSampleSubmitted === true}
                    checked={formValues.bloodSampleSubmitted === true}
                    onChange={handleInputChange}
                    name="bloodSampleSubmitted"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Urine</Label>
                  <input
                    type="checkbox"
                    defaultChecked={formValues.urineSampleSubmitted === true}
                    checked={formValues.urineSampleSubmitted === true}
                    onChange={handleInputChange}
                    name="urineSampleSubmitted"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Stool</Label>
                  <input
                    type="checkbox"
                    defaultChecked={formValues.stoolSampleSubmitted === true}
                    checked={formValues.stoolSampleSubmitted === true}
                    onChange={handleInputChange}
                    name="stoolSampleSubmitted"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Skin scrapping</Label>
                  <input
                    type="checkbox"
                    defaultChecked={
                      formValues.skinScrappingSampleSubmitted === true
                    }
                    checked={formValues.skinScrappingSampleSubmitted === true}
                    onChange={handleInputChange}
                    name="skinScrappingSampleSubmitted"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Other</Label>
                  <input
                    type="checkbox"
                    defaultChecked={formValues.urineSampleSubmitted === true}
                    checked={formValues.urineSampleSubmitted === true}
                    onChange={handleInputChange}
                    name="urineSampleSubmitted"
                  />
                </InputGroup>
              </div>
              <div>
                <h3>Condition of Specimen</h3>
                <InputGroup horizontal>
                  <Label>Good</Label>
                  <input
                    value="Good"
                    checked={formValues.conditionOfSpecimen === "Good"}
                    defaultChecked={formValues.conditionOfSpecimen === "Good"}
                    onChange={handleInputChange}
                    name="conditionOfSpecimen"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Fair</Label>
                  <input
                    type="radio"
                    value="Fair"
                    checked={formValues.conditionOfSpecimen === "Fair"}
                    defaultChecked={formValues.conditionOfSpecimen === "Fair"}
                    onChange={handleInputChange}
                    name="conditionOfSpecimen"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Poor</Label>
                  <input
                    type="radio"
                    value="Poor"
                    checked={formValues.conditionOfSpecimen === "Poor"}
                    defaultChecked={formValues.conditionOfSpecimen === "Poor"}
                    onChange={handleInputChange}
                    name="conditionOfSpecimen"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Other</Label>
                  <input
                    type="radio"
                    value="Other"
                    checked={formValues.conditionOfSpecimen === "Other"}
                    defaultChecked={formValues.conditionOfSpecimen === "Other"}
                    onChange={handleInputChange}
                    name="conditionOfSpecimen"
                  />
                </InputGroup>
              </div>
            </div>
            <h4>Test</h4>
            <InputGroup horizontal>
              <Label>Blood</Label>
              <input
                type="text"
                value={formValues.bloodResult}
                onChange={handleInputChange}
                name="bloodResult"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>PCV (&#37;)</Label>

              <input
                type="text"
                value={formValues.PCVResult}
                onChange={handleInputChange}
                name="PCVResult"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Wet mount/Blood film/ Haemoparasite</Label>

              <input
                type="text"
                value={formValues.wetMountResult}
                onChange={handleInputChange}
                name="wetMountResult"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Skin Scrapping</Label>
              <input
                type="text"
                value={formValues.skinScrappingResult}
                onChange={handleInputChange}
                name="wetMountResult"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Feacal analysis - Egg/ Oocyst/Parasite Count</Label>
              <input
                type="text"
                value={formValues.facialAnalysisResult}
                onChange={handleInputChange}
                name="facialAnalysisResult"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Urine Analysis</Label>
              <input
                type="text"
                value={formValues.urineAnalysisResult}
                onChange={handleInputChange}
                name="urineAnalysisResult"
              />{" "}
            </InputGroup>
            <br />
            <br />
            <InputGroup horizontal>
              <Label>Name of Technologist</Label>
              <Input />
            </InputGroup>
          </div>
          <div>
            <Button onClick={() => onAdd(formValues, "create")}>Add</Button>
            <Button onClick={() => onComplete(formValues, "complete")}>
              Complete
            </Button>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ParasitologyModal;
