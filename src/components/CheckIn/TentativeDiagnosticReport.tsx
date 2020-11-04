import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const DiagnosticTestReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: {
    differential: string[];
    tentative: string[];
  };
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{
    tentativeDiagnosis: { differential: string[]; tentative: string[] };
  }>({
    tentativeDiagnosis: {
      differential: [...props.data.differential],
      tentative: [...props.data.tentative],
    },
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues) => {
      const split = event.target.name.split(".");
      if (split[0] === "tentative") {
        formValues.tentativeDiagnosis.tentative.splice(
          parseInt(split[1]),
          1,
          event.target.value
        );
      } else {
        formValues.tentativeDiagnosis.differential.splice(
          parseInt(split[1]),
          1,
          event.target.value
        );
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
            name={"tentative.0"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.tentative[0]}
          />
        </div>
        <div className="physical__examination__form--input">
          <input
            name={"tentative.1"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.tentative[1]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"tentative.2"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.tentative[2]}
          />
        </div>
        <h5>Differential</h5>
        <div className="physical__examination__form--input">
          <input
            name={"differential.0"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.differential[0]}
          />
        </div>
        <div className="physical__examination__form--input">
          <input
            name={"differential.1"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.differential[1]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"differential.2"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.differential[2]}
          />
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"differential.3"}
            onChange={handleInputChange}
            defaultValue={formValues.tentativeDiagnosis.differential[3]}
          />
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default DiagnosticTestReport;
