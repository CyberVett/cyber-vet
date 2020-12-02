import React, { useEffect, useState } from "react";
import { InputGroup, Label } from "components/Input/input";
import Modal from "components/Modal/modal";
import { ReactComponent as Loader } from "../../../../assets/icons/loader.svg";
import styles from "../laboratory.module.scss";
import Button, { ButtonTypes } from "components/Button/button";
import { formatDate } from "lib/utils";

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  data: IPathologyData;
  onAdd: Function;
  onComplete: Function;
  onCancel: Function;
  modalLoading: boolean;
  isReview?: boolean;
}

export interface IPathologyData {
  tentativeDiagnosis: string;
  caseHistory: string;
  testsRequired: string;
  typeOfSampleSubmitted: string;
  RBC: string;
  haemoglobin: string;
  PCV: string;
  MCV: string;
  MCH: string;
  MCHC: string;
  WBC: string;
  neutrophils: string;
  bands: string;
  lymphocytes: string;
  monocytes: string;
  eosinophils: string;
  platelets: string;
  mpv: string;
  totalProtein: string;
  totalProteinRequired: boolean;
  totalBilirubin: string;
  totalBilirubinRequired: boolean;
  conjugatedBilirubin: string;
  conjugatedBilirubinRequired: boolean;
  sodium: string;
  sodiumRequired: boolean;
  potassium: string;
  potassiumRequired: boolean;
  creatinine: string;
  creatinineRequired: boolean;
  BUN: string;
  BUNRequired: boolean;
  albumin: string;
  albuminRequired: boolean;
  glucose: string;
  glucoseRequired: boolean;
  SGOTAST: string;
  SGOTASTRequired: boolean;
  SGPTALT: string;
  SGPTALTRequired: boolean;
  ALT: string;
  ALTRequired: boolean;
  liquidProfile: string;
  liquidProfileRequired: boolean;
  other: string;
  otherRequired: false;
  nameOfTechnologist: string;
  dateCompleted?: string;
  createdAt?: string;
}

const AddPathologyModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onCancel,
  onComplete,
  canEdit,
  isReview,
}) => {
  // @ts-ignore
  const [formValues, setFormValues] = useState<IPathologyData>({});
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    // @ts-ignore
    if (Object.keys(formValues).includes(`${event.target.name}Required`)) {
      // @ts-ignore
      formValues[
        `${event.target.name}Required`
      ] = !!`${event.target.name}Required`;
    }
    setFormValues((formValues: any) => ({
      ...formValues,
      [event.target.name]: event.target.value,
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
          {visible ? (
            <div className={styles.formMenu}>
              <h3>{isReview ? "Edit" : "Add"} Pathology Form</h3>
              <InputGroup horizontal>
                {isReview ? (
                  <>
                    <Label>Date Requested</Label>
                    <input
                      disabled
                      placeholder={
                        // @ts-ignore
                        formatDate(data?.createdAt) ||
                        new Date().toLocaleString()
                      }
                    />{" "}
                  </>
                ) : null}
              </InputGroup>
              {data?.dateCompleted ? (
                <InputGroup horizontal>
                  <Label>Date Completed</Label>
                  <input
                    disabled
                    placeholder={
                      // @ts-ignore
                      formatDate(data?.dateCompleted) || ""
                    }
                  />
                </InputGroup>
              ) : null}
            </div>
          ) : null}
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
              <Label>Type of sample submitted</Label>
              <input
                className={styles.width500}
                type="text"
                value={formValues?.typeOfSampleSubmitted}
                onChange={handleInputChange}
                name="typeOfSampleSubmitted"
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Test(s) Required</Label>
              <textarea
                className={styles.width500}
                style={{ height: "10rem" }}
                name={"testsRequired"}
                onChange={handleInputChange}
              >
                {formValues?.testsRequired}
              </textarea>
            </InputGroup>
            <div className={styles.formDetailsGrid}>
              <div>
                <h3>HAEMATOLOGY</h3>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>
                    rbc (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.RBC}
                    onChange={handleInputChange}
                    name="RBC"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Haemoglobin (g/dl)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.haemoglobin}
                    onChange={handleInputChange}
                    name="haemoglobin"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>PCV (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.PCV}
                    onChange={handleInputChange}
                    name="PCV"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>MCV (fl)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.MCV}
                    onChange={handleInputChange}
                    name="MCV"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>MCH (pg)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.MCH}
                    onChange={handleInputChange}
                    name="MCH"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>MCHC (g/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.MCHC}
                    onChange={handleInputChange}
                    name="MCHC"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>
                    WBC (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.WBC}
                    onChange={handleInputChange}
                    name="WBC"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Neutrophils (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.neutrophils}
                    onChange={handleInputChange}
                    name="neutrophils"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>bands (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.bands}
                    onChange={handleInputChange}
                    name="bands"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Lymphocytes (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.lymphocytes}
                    onChange={handleInputChange}
                    name="lymphocytes"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Monocytes (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.monocytes}
                    onChange={handleInputChange}
                    name="monocytes"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Eosinophils (&#37;)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.eosinophils}
                    onChange={handleInputChange}
                    name="eosinophils"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>
                    Platelets (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.platelets}
                    onChange={handleInputChange}
                    name="platelets"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>MPV (fl)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.mpv}
                    onChange={handleInputChange}
                    name="mpv"
                  />
                </InputGroup>
              </div>
              <div>
                <h3>SERUM CHEMISTRY</h3>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Total Protein (g/dl)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.totalProtein}
                    onChange={handleInputChange}
                    name="totalProtein"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Total bilirubin (&micro;mol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.totalBilirubin}
                    onChange={handleInputChange}
                    name="totalBilirubin"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Conjugated bilirubin (μmol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.conjugatedBilirubin}
                    onChange={handleInputChange}
                    name="conjugatedBilirubin"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>
                    Na<sup>+</sup> (μmol/l)
                  </Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.sodium}
                    onChange={handleInputChange}
                    name="sodium"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>
                    K<sup>+</sup> (μmol/l)
                  </Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.potassium}
                    onChange={handleInputChange}
                    name="potassium"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Creatinine (μmol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.creatinine}
                    onChange={handleInputChange}
                    name="creatinine"
                  />{" "}
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>BUN (μmol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.BUN}
                    onChange={handleInputChange}
                    name="BUN"
                  />{" "}
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Albumin (g/dl)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.albumin}
                    onChange={handleInputChange}
                    name="albumin"
                  />{" "}
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Glucose (μmol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.glucose}
                    onChange={handleInputChange}
                    name="glucose"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>SGOT/AST (IU/L)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.SGOTAST}
                    onChange={handleInputChange}
                    name="SGOTAST"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>SGPT/ALT (IUL)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.SGPTALT}
                    onChange={handleInputChange}
                    name="SGPTALT"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>ALP (IU/L)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.ALT}
                    onChange={handleInputChange}
                    name="ALT"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Liquid Profile (μmol/l)</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.liquidProfile}
                    onChange={handleInputChange}
                    name="liquidProfile"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>Other Specified</Label>
                  <input
                    className={styles.width250}
                    type="text"
                    value={formValues?.other}
                    onChange={handleInputChange}
                    name="other"
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {!isReview && (
              <Button
                type={ButtonTypes.primary}
                onClick={() => onAdd(formValues, "create")}
              >
                Add
              </Button>
            )}
            <Button
              type={ButtonTypes.orange}
              onClick={() => onComplete(formValues, "complete")}
            >
              Complete
            </Button>
            <Button type={ButtonTypes.grey} onClick={() => onCancel()}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AddPathologyModal;
