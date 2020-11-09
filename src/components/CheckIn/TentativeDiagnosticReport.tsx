import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const DiagnosticTestReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: {
    differential: string;
    tentative: string;
  };
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{
    tentativeDiagnosis: { differential: string; tentative: string };
  }>({
    tentativeDiagnosis: {
      differential: props.data.differential,
      tentative: props.data.tentative,
    },
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues) => {
      if (event.target.name === "tentative") {
        formValues.tentativeDiagnosis.tentative = event.target.value;
      } else {
        formValues.tentativeDiagnosis.differential = event.target.value;
      }
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
        <h5>Tentative</h5>
        <div className="physical__examination__form--input">
          <input
            name={"tentative"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.tentative}
          />
        </div>
        <h5>Differential</h5>
        <div className="physical__examination__form--input">
          <input
            name={"differential"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.differential}
          />
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default DiagnosticTestReport;
