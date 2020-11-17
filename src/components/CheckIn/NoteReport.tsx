import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const noteReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ note: string }>({
    note: props.data || "",
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
          <textarea name={"note"} style={{ height: "10rem" }} onChange={handleInputChange}>
            {formValues.note}
          </textarea>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default noteReport;
