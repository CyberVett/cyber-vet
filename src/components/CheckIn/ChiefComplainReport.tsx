import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const ChiefComplainReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ chiefComplain: string }>({
    chiefComplain: props.data || "",
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: any) => ({
      ...formValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <MedicalReportModalContentTemplate
      title={props.title}
      onAdd={handleGetReport}
      onCancel={props.onCancel}
    >
      <form className="medical__report__form">
        <div className="medical__report__form--input">
          <textarea
            name={"chiefComplain"}
            rows={10}
            onChange={handleInputChange}
          >
            {formValues.chiefComplain}
          </textarea>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default ChiefComplainReport;
