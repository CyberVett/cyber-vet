import React from "react";
import { formatDate } from "lib/utils";

const CheckInModalContent = (props: {
  title: string;
  date: string;
  children: any;
}) => {
  return (
    <div className="checkin__modal__content">
      <div className="checkin__modal__content--header">
        <span className="content__title">
          <h3>{props.title}</h3>
        </span>
        <span className="content__date">
          Date Recorded
          <input
            disabled
            defaultValue={
              // @ts-ignore
              formatDate(props?.date || new Date().toString())
            }
          />
        </span>
      </div>
      <div className="checkin__modal__content--body">{props.children}</div>
    </div>
  );
};

export default CheckInModalContent;
