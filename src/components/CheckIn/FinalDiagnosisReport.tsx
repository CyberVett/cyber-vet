import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const FinalDiagnosisReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ finalDiagnosis: string }>({
    finalDiagnosis: props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: any) => {
      return {
        finalDiagnosis: event.target.value,
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
            name={"finalDiagnosis"}
            onChange={handleInputChange}
            defaultValue={formValues.finalDiagnosis}
          />
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default FinalDiagnosisReport;
