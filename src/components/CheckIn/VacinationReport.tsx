import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";
import { CheckboxInput } from "../Input/input";

interface IData {
  vaccination: {
    type: string;
    name: string;
    dosage: string;
    nextDate: string;
    smsReminder: boolean;
    emailReminder: boolean;
  };
}

const VacinationReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: IData;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<IData>({
    ...props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: IData) => {
      formValues.vaccination = {
        ...formValues.vaccination,
        [event.target.name]: event.target.value,
      };
      return formValues;
    });
  };

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
    >
      <form className="medical__report__form">
        <div className="medical__report__form--input">
          <div className="physical__examination__form--input">
            <label>Vaccination Type</label>
            <input
              name={"type"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.type}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Vaccination Name</label>
            <input
              name={"name"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.name}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Vaccination Dosage</label>
            <input
              name={"dosage"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.dosage}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Date of next shot</label>
            <input
              type='date'
              name={"nextDate"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.nextDate}
            />
          </div>

          <div className="checkboxes">
            <div className="physical__examination__form--input ">
              <label>Email Reminder</label>
              <CheckboxInput
                name="emailReminder"
                onChange={handleInputChange}
                defaultValue={
                  formValues.vaccination.emailReminder ? "on" : "off"
                }
              />
            </div>

            <div className="physical__examination__form--input ">
              <label>SMS</label>
              <CheckboxInput
                name="smsReminder"
                onChange={handleInputChange}
                defaultValue={formValues.vaccination.smsReminder ? "on" : "off"}
              />
            </div>
          </div>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default VacinationReport;
