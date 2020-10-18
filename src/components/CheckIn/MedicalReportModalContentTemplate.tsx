import React from "react";
import Button, { ButtonTypes } from "../Button/button";

const MedicalReportModalContentTemplate = (props: {
  children: any;
  title: string;
  onAdd: Function;
  onCancel: Function;
}) => {
  return (
    <div className="medical__report__template">
      <div className="medical__report__template--head">
        <span className="template__head--title">Add {props.title}</span>
        <span className="template__head--date">
          <span>Date Recorded</span>
          <input 
          defaultValue={new Date().toString()} 
          disabled 
          type="text" 
          />
        </span>
      </div>

      <div className="medical__report__template--content">{props.children}</div>

      <div className="medical__report__template--footer">
        <Button 
        onClick={(e) => props.onAdd(e)}
        type={ButtonTypes.primary} 
        >
          Add
        </Button>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
      </div>
    </div>
  );
};

export default MedicalReportModalContentTemplate;
