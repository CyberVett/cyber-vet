import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const ChiefComplainReport = (props: {
  title: string;
  added: boolean;
  onAdd: Function;
  onCancel: Function;
  data?: string;
  date?: string;
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
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      date={props.date}
      canEdit={props.added}
    >
      <form className="medical__report__form">
        <div className="medical__report__form--input">
          <textarea
            style={{ height: "10rem" }}
            name={"chiefComplain"}
            onChange={handleInputChange}
            // rows={10}
            // cols={10}
          >
            {formValues.chiefComplain}
          </textarea>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default ChiefComplainReport;
