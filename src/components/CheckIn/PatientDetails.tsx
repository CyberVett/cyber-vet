import React from "react";

const PatientDetails = () => {
  return (
    <div className="patient__details">
      <div className="patient__details--info">
        <div className="patient__info--title">Client's Name</div>
        <div className="patient__info--value">Mr Oladele Mayowa</div>
        <div className="patient__info--title">Patient Name</div>
        <div className="patient__info--value">Demara</div>
        <div className="patient__info--title">Specie</div>
        <div className="patient__info--value">Canine</div>
        <div className="patient__info--title">Breed</div>
        <div className="patient__info--value">Rottweiler</div>
        <div className="patient__info--title">Sex</div>
        <div className="patient__info--value">Male</div>

        <div className="patient__info--title">Age</div>
        <div className="patient__info--value">1 year, 2 Months, 21 Days</div>

        <div className="patient__info--title">Date Registered</div>
        <div className="patient__info--value">16/08/2020</div>
        <div className="patient__info--title">Number of visit</div>
        <div className="patient__info--value">0</div>
      </div>

      <div className="patient__details--img">
        <img src="https://res.cloudinary.com/dzgdxmfjw/image/upload/v1601793472/zuk4vuzk2epspzrsyphf.jpg" />

        <div>
          Status: <span className="status">Alive</span>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails;
