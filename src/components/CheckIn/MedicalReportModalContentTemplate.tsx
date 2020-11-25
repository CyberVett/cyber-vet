import React from "react";
import Button, { ButtonTypes } from "../Button/button";

const MedicalReportModalContentTemplate = (props: {
  children: any;
  title: string;
  onAdd: Function;
  date?: string;
  canEdit: boolean;
  onCancel: Function;
}) => {
  return (
    <div className="medical__report__template">
      <div className="medical__report__template--head">
        <span className="template__head--title">
          <h3>
            {props.canEdit ? "Update" : "Add"} {props.title}
          </h3>
        </span>
        <span className="template__head--date">
          <span>Date Recorded</span>
          <input
            defaultValue={props?.date || new Date().toString()}
            disabled
            type="text"
          />
        </span>
      </div>

      <div className="medical__report__template--content">{props.children}</div>

      <div className="medical__report__template--footer">
        <Button onClick={(e) => props.onAdd(e)} type={ButtonTypes.primary}>
          Add
        </Button>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
      </div>
    </div>
  );
};

export default MedicalReportModalContentTemplate;
