import React, { useState } from "react";
import { Input, InputGroup, Label, TextArea } from "components/Input/input";
import Modal from "components/Modal/modal";
import { ReactComponent as Loader } from "../../../../assets/icons/loader.svg";
import styles from "../laboratory.module.scss";
import Button from "components/Button/button";

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  data: IPathologyData;
  onAdd: Function;
  onComplete: Function;
  onCancel: Function;
  modalLoading: boolean;
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
}

const AddPathologyModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onCancel,
  onComplete,
}) => {
  const [formValues, setFormValues] = useState<IPathologyData>({ ...data });
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
          {visible ? (
            <div className={styles.formMenu}>
              <h3>Add Pathology Form</h3>
              <InputGroup horizontal>
                <Label>Date Requested</Label>
                <input disabled placeholder={new Date().toLocaleString()} />
              </InputGroup>
              <InputGroup horizontal>
                <Label>Date Completed</Label>
                <input disabled placeholder={new Date().toLocaleString()} />
              </InputGroup>
            </div>
          ) : null}
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
              <Label>Type of sample submitted</Label>
              <input
                type="text"
                value={formValues.typeOfSampleSubmitted}
                onChange={handleInputChange}
                name="typeOfSampleSubmitted"
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Test(s) Required</Label>
              <textarea
                style={{ height: "10rem" }}
                name={"testsRequired"}
                onChange={handleInputChange}
              >
                {formValues.testsRequired}
              </textarea>
            </InputGroup>
            {/* <InputGroup horizontal>
          <Label>Result(s)</Label>
          <textarea
            style={{ height: "10rem" }}
            name={"testsRequired"}
            onChange={handleInputChange}
          >
            {formValues.testsRequired}
          </textarea>
        </InputGroup> */}
            <div className={styles.formDetailsGrid}>
              <div>
                <h3>HAEMATOLOGY</h3>
                <InputGroup horizontal>
                  <Label>
                    rbc (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    type="text"
                    value={formValues.RBC}
                    onChange={handleInputChange}
                    name="RBC"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Haemoglobin (g/dl)</Label>

                  <input
                    type="text"
                    value={formValues.haemoglobin}
                    onChange={handleInputChange}
                    name="haemoglobin"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>PCV (&#37;)</Label>

                  <input
                    type="text"
                    value={formValues.PCV}
                    onChange={handleInputChange}
                    name="PCV"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>MCV (fl)</Label>

                  <input
                    type="text"
                    value={formValues.MCV}
                    onChange={handleInputChange}
                    name="MCV"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>MCH (pg)</Label>
                  <input
                    type="text"
                    value={formValues.MCH}
                    onChange={handleInputChange}
                    name="MCH"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>MCHC (g/l)</Label>
                  <input
                    type="text"
                    value={formValues.MCHC}
                    onChange={handleInputChange}
                    name="MCHC"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>
                    WBC (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    type="text"
                    value={formValues.WBC}
                    onChange={handleInputChange}
                    name="WBC"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Neutrophils (&#37;)</Label>
                  <input
                    type="text"
                    value={formValues.neutrophils}
                    onChange={handleInputChange}
                    name="neutrophils"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>bands (&#37;)</Label>
                  <input
                    type="text"
                    value={formValues.bands}
                    onChange={handleInputChange}
                    name="bands"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Lymphocytes (&#37;)</Label>
                  <input
                    type="text"
                    value={formValues.lymphocytes}
                    onChange={handleInputChange}
                    name="lymphocytes"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Monocytes (&#37;)</Label>
                  <input
                    type="text"
                    value={formValues.monocytes}
                    onChange={handleInputChange}
                    name="monocytes"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Eosinophils (&#37;)</Label>
                  <input
                    type="text"
                    value={formValues.eosinophils}
                    onChange={handleInputChange}
                    name="eosinophils"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>
                    Platelets (x10<sup>13</sup>/l)
                  </Label>
                  <input
                    type="text"
                    value={formValues.platelets}
                    onChange={handleInputChange}
                    name="platelets"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>MPV (fl)</Label>
                  <input
                    type="text"
                    value={formValues.mpv}
                    onChange={handleInputChange}
                    name="mpv"
                  />
                </InputGroup>
              </div>
              <div>
                <h3>SERUM CHEMISTRY</h3>
                <InputGroup horizontal>
                  <Label>Total Protein (g/dl)</Label>
                  <input
                    type="text"
                    value={formValues.totalProtein}
                    onChange={handleInputChange}
                    name="totalProtein"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Total bilirubin (&micro;mol/l)</Label>
                  <input
                    type="text"
                    value={formValues.totalBilirubin}
                    onChange={handleInputChange}
                    name="totalBilirubin"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Conjugated bilirubin (μmol/l)</Label>
                  <input
                    type="text"
                    value={formValues.conjugatedBilirubin}
                    onChange={handleInputChange}
                    name="conjugatedBilirubin"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>
                    Na<sup>+</sup> (μmol/l)
                  </Label>
                  <input
                    type="text"
                    value={formValues.sodium}
                    onChange={handleInputChange}
                    name="sodium"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>
                    K<sup>+</sup> (μmol/l)
                  </Label>
                  <input
                    type="text"
                    value={formValues.potassium}
                    onChange={handleInputChange}
                    name="potassium"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Creatinine (μmol/l)</Label>
                  <input
                    type="text"
                    value={formValues.creatinine}
                    onChange={handleInputChange}
                    name="creatinine"
                  />{" "}
                </InputGroup>
                <InputGroup horizontal>
                  <Label>BUN (μmol/l)</Label>
                  <input
                    type="text"
                    value={formValues.BUN}
                    onChange={handleInputChange}
                    name="BUN"
                  />{" "}
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Albumin (g/dl)</Label>
                  <input
                    type="text"
                    value={formValues.albumin}
                    onChange={handleInputChange}
                    name="albumin"
                  />{" "}
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Glucose (μmol/l)</Label>
                  <input
                    type="text"
                    value={formValues.glucose}
                    onChange={handleInputChange}
                    name="glucose"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>SGOT/AST (IU/L)</Label>
                  <input
                    type="text"
                    value={formValues.SGOTAST}
                    onChange={handleInputChange}
                    name="SGOTAST"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>SGPT/ALT (IUL)</Label>
                  <input
                    type="text"
                    value={formValues.SGPTALT}
                    onChange={handleInputChange}
                    name="SGPTALT"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>ALP (IU/L)</Label>
                  <input
                    type="text"
                    value={formValues.ALT}
                    onChange={handleInputChange}
                    name="ALT"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Liquid Profile (μmol/l)</Label>
                  <input
                    type="text"
                    value={formValues.liquidProfile}
                    onChange={handleInputChange}
                    name="liquidProfile"
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Other Specified</Label>
                  <input
                    type="text"
                    value={formValues.other}
                    onChange={handleInputChange}
                    name="other"
                  />
                </InputGroup>
              </div>
            </div>
            <br />
            <InputGroup horizontal>
              <Label>Name of Technologist</Label>
              <input
                type="text"
                value={formValues.nameOfTechnologist}
                onChange={handleInputChange}
                name="nameOfTechnologist"
              />
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

export default AddPathologyModal;
