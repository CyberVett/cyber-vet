import React from "react";
import Button from "../Button/button";

const CheckinItem = (props: {
  date: string;
  onEdit: Function;
  onAddNew?: Function;
  onDelete: Function;
  title: string;
  checkedIn?: Boolean;
  children: any;
}) => {
  return (
    <div className="checkin__item">
      <div className="checkin__item--head">
        <div className="item__head--title">{props.title}</div>
        <div className="item__head--actions">
          {props.checkedIn ? (
            <>
              <input defaultValue={props.date || new Date().toString()} />
              <Button onClick={() => props.onEdit()}>Edit Result</Button>
              <Button onClick={() => props.onDelete()}>Delete Results</Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => (props.onAddNew ? props.onAddNew() : undefined)}
              >
                Add New Result
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="checkin__item--content">{props.children}</div>
    </div>
  );
};

export default CheckinItem;
