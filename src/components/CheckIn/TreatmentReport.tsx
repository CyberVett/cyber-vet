import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const TreatmentReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ treatment: string }>({
    treatment: "",
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues(() => {
      return {
        treatment: event.target.value,
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
          <textarea name={"treatment"} style={{ height: "10rem" }} onChange={handleInputChange}>
            {formValues.treatment}
          </textarea>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default TreatmentReport;
