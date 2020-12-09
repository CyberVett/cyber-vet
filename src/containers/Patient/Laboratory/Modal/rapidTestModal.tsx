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
  data: IRapidTestData;
  onAdd: Function;
  onComplete: Function;
  onEdit: Function;
  onCancel: Function;
  modalLoading: boolean;
  isReview?: boolean;
}

export interface IRapidTestData {
  typeOfSpecimen: string;
  clinicalDetails: string;
  tentativeDiagnosis: string;
  testsRequired: string;
  result: string;
  dateCompleted?: string;
  createdAt?: string;
}

const RapidTestModal: React.FC<IModalProps> = ({
  visible,
  closeModal,
  modalLoading,
  data,
  onAdd,
  onEdit,
  onCancel,
  onComplete,
  isReview,
}) => {
  // @ts-ignore
  const [formValues, setFormValues] = useState<IRapidTestData>({});
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
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
            <h3>{isReview ? "Edit" : "Add"} Rapid Test Kit</h3>
            <InputGroup horizontal>
              {isReview ? (
                <>
                  <Label>Date Requested</Label>
                  <input
                    disabled
                    placeholder={
                      // @ts-ignore
                      formatDate(data?.createdAt) || new Date().toLocaleString()
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
          <div className={styles.formDetailsInput}>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Type of Specimen</Label>
              <input
                className={styles.width500}
                type="text"
                value={formValues?.typeOfSpecimen}
                onChange={handleInputChange}
                name="typeOfSpecimen"
              />{" "}
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Clinical Details</Label>
              <textarea
                className={styles.width500}
                style={{ height: "10rem" }}
                name={"clinicalDetails"}
                onChange={handleInputChange}
              >
                {formValues?.clinicalDetails}
              </textarea>{" "}
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Tentative Diagnosis</Label>
              <input
                className={styles.width500}
                type="text"
                value={formValues?.tentativeDiagnosis}
                onChange={handleInputChange}
                name="tentativeDiagnosis"
              />{" "}
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Test(s) Required</Label>
              <input
                className={styles.width500}
                type="text"
                value={formValues?.testsRequired}
                onChange={handleInputChange}
                name="testsRequired"
              />{" "}
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Result(s)</Label>
              <textarea
                className={styles.width500}
                style={{ height: "10rem" }}
                name={"result"}
                onChange={handleInputChange}
              >
                {formValues?.result}
              </textarea>{" "}
            </InputGroup>
          </div>
          <div className={styles.buttonContainer}>
            {!data.dateCompleted && (
              <>
                {!isReview ? (
                  <Button
                    type={ButtonTypes.primary}
                    onClick={() => onAdd(formValues, "create")}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    type={ButtonTypes.basic}
                    onClick={() => onEdit(formValues, "edit")}
                  >
                    Edit
                  </Button>
                )}
              </>
            )}
            {isReview && (
              <Button
                type={ButtonTypes.orange}
                onClick={() => onComplete(formValues, "complete")}
              >
                Complete
              </Button>
            )}

            <Button type={ButtonTypes.grey} onClick={() => onCancel()}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default RapidTestModal;
