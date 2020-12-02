import React from "react";
import Button, { ButtonTypes } from "../Button/button";
import { formatDate } from "lib/utils";

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
          {props.canEdit ? (
            <>
              <span>Date Recorded</span>
              <input
                defaultValue={
                  // @ts-ignore
                  formatDate(props?.date)
                }
                disabled
                type="text"
              />{" "}
            </>
          ) : null}
        </span>
      </div>

      <div className="medical__report__template--content">{props.children}</div>

      <div className="medical__report__template--footer">
        <Button onClick={(e) => props.onAdd(e)} type={ButtonTypes.primary}>
          {props.canEdit ? "Edit" : "Add"}
        </Button>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
      </div>
    </div>
  );
};

export default MedicalReportModalContentTemplate;
