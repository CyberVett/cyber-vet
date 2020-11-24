import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const DiagnosticTestReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
  date?: string;
  added: boolean;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ diagnosticTest: string }>({
    diagnosticTest: props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues(() => {
      return {
        diagnosticTest: event.target.value,
      };
    });
  };

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      date={props.date}
      canEdit={props.added}
    >
      <form className="medical__report__form">
        <div className="physical__examination__form--input">
          <textarea
            name={"0"}
            style={{ height: "10rem" }}
            onChange={handleInputChange}
          >
            {formValues.diagnosticTest}
          </textarea>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default DiagnosticTestReport;
