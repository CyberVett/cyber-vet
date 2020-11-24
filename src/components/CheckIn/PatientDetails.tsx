import { formatDate, getAge } from "lib/utils";
import React from "react";

const PatientDetails = (patientData: any) => {
  return (
    <div className="patient__details">
      <div className="patient__details--info">
        <div className="patient__info--title">Client&apos;s Name</div>
        <div className="patient__info--value">
          {patientData?.patientData?.client?.title} {patientData?.patientData?.client?.firstName} {patientData?.patientData?.client?.lastName}
        </div>
        <div className="patient__info--title">Patient Name</div>
        <div className="patient__info--value">
          {patientData?.patientData?.name}
        </div>
        <div className="patient__info--title">Specie</div>
        <div className="patient__info--value">
          {patientData?.patientData?.specie}
        </div>
        <div className="patient__info--title">Breed</div>
        <div className="patient__info--value">
          {patientData?.patientData?.breed}
        </div>
        <div className="patient__info--title">Sex</div>
        <div className="patient__info--value">
          {patientData?.patientData?.gender}
        </div>

        <div className="patient__info--title">Age</div>
        <div className="patient__info--value">
          {getAge(patientData?.patientData?.dob)}
        </div>

        <div className="patient__info--title">Date Registered</div>
        <div className="patient__info--value">
          {formatDate(patientData?.patientData?.createdAt)}
        </div>
        {/* <div className="patient__info--value">{formatDate(patientData.patientData.createdAt)}</div> */}
        <div className="patient__info--title">Number of visit</div>
        <div className="patient__info--value">
          {patientData?.patientData?.noOfVisits}
        </div>
      </div>

      <div className="patient__details--img">
        <img
          src={patientData?.patientData?.imageUrl}
          alt={`${patientData?.patientData?.name}'s Photo`}
        />

        <div>
          Status:{" "}
          <span className="status">{patientData?.patientData?.status}</span>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails;
