import React from "react";

const CheckinItemsDisplay = (props: { children: any }) => {
  return (
    <div className="checkin__items">
      <div>
        <form className="checkin-form">
          <div className="form-item">
            <label>Check In</label>

            <input type="text" disabled defaultValue={new Date().toString()} />
          </div>

          <div className="form-item">
            <label>Visit Type</label>

            <select disabled>
              {[{ value: "Follow Up", label: "Follow Up" }].map((opt) => {
                return <option value={opt.value}>{opt.label}</option>;
              })}
            </select>
          </div>
        </form>
      </div>
      {props.children}
    </div>
  );
};

export default CheckinItemsDisplay;
