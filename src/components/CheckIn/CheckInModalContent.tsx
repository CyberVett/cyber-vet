import React from "react";

const CheckInModalContent = (props: {
  title: string;
  date: string;
  children: any;
}) => {
  return (
    <div className="checkin__modal__content">
      <div className="checkin__modal__content--header">
        <span className="content__title">{props.title}</span>
        <span className="content__date">
          Date Recorded
          <input defaultValue={props.date} disabled />
        </span>
      </div>
      <div className="checkin__modal__content--body">{props.children}</div>
    </div>
  );
};

export default CheckInModalContent;
