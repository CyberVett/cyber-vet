import React from "react";
import Button from "../Button/button";

const CheckinItem = (props: {
  date: string;
  onEdit: Function;
  onDelete: Function;
  title: string;
  children: any;
}) => {
  return (
    <div className="checkin__item">
      <div className="checkin__item--head">
        <div className="item__head--title">{props.title}</div>
        <div className="item__head--actions">
          <input defaultValue={props.date || new Date().toString()} />
          <Button onClick={() => props.onEdit()}>Edit Result</Button>
          <Button onClick={() => props.onDelete()}>Delete Results</Button>
        </div>
      </div>

      <div className="checkin__item--content">{props.children}</div>
    </div>
  );
};

export default CheckinItem;
