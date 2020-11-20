import React, { useState } from "react";
import { Input, InputGroup, Label, TextArea } from "components/Input/input";
import Modal from "components/Modal/modal";
import { ReactComponent as Loader } from "../../../../assets/icons/loader.svg";
import styles from "../laboratory.module.scss";
import Button from "components/Button/button";

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  data: IRapidTestData;
  onAdd: Function;
  onComplete: Function;
  onCancel: Function;
  modalLoading: boolean;
}

export interface IRapidTestData {
  typeOfSpecimen: string;
  clinicalDetails: string;
  tentativeDiagnosis: string;
  testsRequired: string;
  result: string;
}

const RapidTestModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onCancel,
  onComplete,
}) => {
  const [formValues, setFormValues] = useState<IRapidTestData>({ ...data });
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    let value = event.target.value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }
    setFormValues((formValues: any) => ({
      ...formValues,
      [event.target.name]: value,
    }));
  };

  return (
    <Modal closeModal={closeModal} fullMode noTitle visible={visible}>
      {modalLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formMenu}>
            <h3>Rapid Test Kit</h3>
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
              <Label>Type of Specimen</Label>
              <input
                type="text"
                value={formValues.typeOfSpecimen}
                onChange={handleInputChange}
                name="typeOfSpecimen"
              />{" "}
            </InputGroup>
            <InputGroup horizontal>
              <Label>Clinical Details</Label>
              <textarea
                style={{ height: "10rem" }}
                name={"clinicalDetails"}
                onChange={handleInputChange}
              >
                {formValues.clinicalDetails}
              </textarea>{" "}
            </InputGroup>
            <InputGroup horizontal>
              <Label>Tentative Diagnosis</Label>
              <input
                type="text"
                value={formValues.tentativeDiagnosis}
                onChange={handleInputChange}
                name="tentativeDiagnosis"
              />{" "}
            </InputGroup>
            <InputGroup horizontal>
              <Label>Test(s) Required</Label>
              <input
                type="text"
                value={formValues.testsRequired}
                onChange={handleInputChange}
                name="testsRequired"
              />{" "}
            </InputGroup>
            <InputGroup horizontal>
              <Label>Result(s)</Label>
              <textarea
                style={{ height: "10rem" }}
                name={"result"}
                onChange={handleInputChange}
              >
                {formValues.result}
              </textarea>{" "}
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

export default RapidTestModal;
