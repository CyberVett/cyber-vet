import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const ClinicalSignsReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string[];
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ clinicalSigns: string[] }>({
    clinicalSigns: [...props.data],
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: any) => {
      const arr = [...formValues.clinicalSigns];
      arr.splice(parseInt(event.target.name), 1, event.target.value);
      return {
        clinicalSigns: arr,
      };
    });
  };

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
    >
      <form className="medical__report__form">
        <div className="physical__examination__form--input">
          <input
            name={"0"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[0]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"1"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[1]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"2"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[2]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"3"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[3]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"4"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[4]}
          />
        </div>
        <div className="physical__examination__form--input">
          <input
            name={"5"}
            onChange={handleInputChange}
            defaultValue={formValues.clinicalSigns[5]}
          />
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default ClinicalSignsReport;
