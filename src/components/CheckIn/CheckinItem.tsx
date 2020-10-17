import React from "react";

const CheckinItem = (props: { title: string; actions: any; children: any }) => {
  return (
    <div className="checkin__item">
      <div className="checkin__item--head">
        <div className="item__head--title">{props.title}</div>
        <div className="item__head--actions">{props.actions}</div>
      </div>

      <div className="checkin__item--content">{props.children}</div>
    </div>
  );
};

export default CheckinItem;
