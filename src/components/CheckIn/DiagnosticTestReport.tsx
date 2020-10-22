import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const DiagnosticTestReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string[];
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ diagnosticTest: string[] }>({
    diagnosticTest: [...props.data],
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: any) => {
      const arr = [...formValues.diagnosticTest];
      arr.splice(parseInt(event.target.name), 1, event.target.value);
      return {
        diagnosticTest: arr,
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
        <div className="medical__report__form--input">
          <div className="physical__examination__form--input">
            <input
              name={"0"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[0]}
            />
          </div>

          <div className="physical__examination__form--input">
            <input
              name={"1"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[1]}
            />
          </div>

          <div className="physical__examination__form--input">
            <input
              name={"2"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[2]}
            />
          </div>

          <div className="physical__examination__form--input">
            <input
              name={"3"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[3]}
            />
          </div>

          <div className="physical__examination__form--input">
            <input
              name={"4"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[4]}
            />
          </div>
          <div className="physical__examination__form--input">
            <input
              name={"5"}
              onChange={handleInputChange}
              defaultValue={formValues.diagnosticTest[5]}
            />
          </div>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default DiagnosticTestReport;
