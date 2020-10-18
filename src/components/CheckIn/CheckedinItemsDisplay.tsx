import React from "react";

const CheckedinItemsDisplay = (props: {
  onActiveItemChange: Function;
  children: any;
  activeNavItem: string;
}) => {
  const handleChangeActiveItem = (newItem: string) => {
    props.onActiveItemChange(newItem);
  };

  return (
    <div className="checkedin__items">
      <ul className="checkedin__navbar">
        {[
          "Client Details",
          "Patient Details",
          "Medical Records",
          "Vaccination",
          "Laboratory",
          "Radiology",
          "Appointment",
        ].map((name: string) => {
          return (
            <li
              className={`checkedin__navbar--item${
                name === props.activeNavItem ? " active--item" : ""
              }`}
              onClick={() => handleChangeActiveItem(name)}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <div className="checkedin__items--content">{props.children}</div>
    </div>
  );
};

export default CheckedinItemsDisplay;
