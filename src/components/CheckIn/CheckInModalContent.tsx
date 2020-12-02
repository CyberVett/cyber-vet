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
          <h3>
            {" "}
            {props.date ? "Edit" : "Add"} {props.title}
          </h3>
        </span>
        <span className="content__date">
          {props.date ? (
            <>
              Date Recorded
              <input
                disabled
                defaultValue={
                  // @ts-ignore
                  formatDate(props?.date || new Date().toString())
                }
              />
            </>
          ) : null}
        </span>
      </div>
      <div className="checkin__modal__content--body">{props.children}</div>
    </div>
  );
};

export default CheckInModalContent;
