import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Modal from "components/Modal/modal";
import Button from "components/Button/button";
import PatientDetails from "components/CheckIn/PatientDetails";
import CheckinItem from "components/CheckIn/CheckinItem";
import PhysicalExaminationModal from "components/CheckIn/PhysicalExaminationModal";

const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  const [physicalExaminationResult, setPhysicalExaminationResult] = useState<{
    respiratoryRate: string;
    rectalTemperature: string;
    ocularMucousMembrane: string;
    oralMucousMembrane: string;
    nasalCavity: string;
    integumentFur: string;
    natureOfLesion: string;
    locationOfLesion: string;
    ectoparasite: string;
    generalDisposation: string;
    conformation: string;
    anyDiarrhea: string;
    natureOfDiarrhea: string;
    lungsSound: string;
    anyLameness: string;
    lamenessLocation: string;
    rectalExamination: string;
    prepuceVulvaExamination: string;
  }>({
    respiratoryRate: "",
    rectalTemperature: "",
    ocularMucousMembrane: "",
    oralMucousMembrane: "",
    nasalCavity: "",
    integumentFur: "",
    natureOfLesion: "",
    locationOfLesion: "",
    ectoparasite: "",
    generalDisposation: "",
    conformation: "",
    anyDiarrhea: "",
    natureOfDiarrhea: "",
    lungsSound: "",
    anyLameness: "",
    lamenessLocation: "",
    rectalExamination: "",
    prepuceVulvaExamination: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const handleAddResult = (data: any) => {
    setPhysicalExaminationResult(data);
    setShowModal(false);
  };

  const CheckinItemsDisplay = () => {
    return (
      <div className="checkin__items">
        <div>
          <form className="checkin-form">
            <div className="form-item">
              <label>Check In</label>

              <input
                type="text"
                disabled
                defaultValue={new Date().toString()}
              />
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
        <CheckinItem
          title="Physical Examination"
          actions={
            <>
              <Button onClick={() => setShowModal(true)}>
                Add New Results
              </Button>
            </>
          }
        >
          <div className="patient__checkin__exam__result">
            {physicalExaminationResult.respiratoryRate && (
              <ul className="exam__result__list">
                {[
                  {
                    label: "Rectal Temperature",
                    value: physicalExaminationResult.rectalTemperature,
                  },
                  {
                    label: "Respiratory Rate",
                    value: physicalExaminationResult.respiratoryRate,
                  },
                  {
                    label: "Ocular Mucous Membrane",
                    value: physicalExaminationResult.ocularMucousMembrane,
                  },
                  {
                    label: "Oral Mucous Membrane",
                    value: physicalExaminationResult.oralMucousMembrane,
                  },
                  {
                    label: "Nasal cavity",
                    value: physicalExaminationResult.nasalCavity,
                  },
                  {
                    label: "Integument/Fur",
                    value: physicalExaminationResult.integumentFur,
                  },
                  {
                    label: "Nature of Lesion ",
                    value: physicalExaminationResult.natureOfLesion,
                  },
                  {
                    label: "Location of Lesion ",
                    value: physicalExaminationResult.locationOfLesion,
                  },
                  {
                    label: "Ectoparasite",
                    value: physicalExaminationResult.ectoparasite,
                  },
                  {
                    label: "General Disposation",
                    value: physicalExaminationResult.generalDisposation,
                  },
                  {
                    label: "Conformation",
                    value: physicalExaminationResult.conformation,
                  },
                  {
                    label: "Any Diarrhea",
                    value: physicalExaminationResult.anyDiarrhea,
                  },
                  {
                    label: "Nature of Diarrhea",
                    value: physicalExaminationResult.natureOfDiarrhea,
                  },
                  {
                    label: "Lungs Sound",
                    value: physicalExaminationResult.lungsSound,
                  },
                  {
                    label: "Any Lameness",
                    value: physicalExaminationResult.anyLameness,
                  },
                  {
                    label: "Lameness Location",
                    value: physicalExaminationResult.lamenessLocation,
                  },
                  {
                    label: "Rectal examination",
                    value: physicalExaminationResult.rectalExamination,
                  },
                  {
                    label: "Prepuce/Vulva Examination",
                    value: physicalExaminationResult.prepuceVulvaExamination,
                  },
                ].map(({ label, value }) => {
                  return (
                    <li className="exam__result__item">
                      <span className="exam__result__item--name">{label}</span>
                      <span className="exam__result__item--value">{value}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </CheckinItem>
      </div>
    );
  };

  const handleCheckinPatient = () => {
    setCheckedIn(true);
    console.log(patientId);
  };

  return (
    <div className="patient__checkin">
      <div className="patient__checkin__container">
        <div className="patient__checkin__container--header">
          <h1>Patient Check In</h1>
        </div>
        <div className="patient__checkin__container--content">
          <div className="checkin__card">
            <div className="checkin__card--header">
              <span>Signalment</span>
              <span>Patient No: SAC01/16/08/2020</span>
            </div>
            <div className="checkin__card--body">
              <PatientDetails />
              <div style={{ padding: "1rem" }}>
                <p style={{ color: "red" }}>Treatment warnings and allergies</p>
              </div>

              {checkedIn ? <>Checked In</> : <CheckinItemsDisplay />}
            </div>
          </div>
          <div className="patient__checkin__container--footer">
            {!checkedIn && (
              <>
                {" "}
                <Button onClick={() => handleCheckinPatient()}> Checkin</Button>
                <Button>Return</Button>
              </>
            )}
          </div>
        </div>
        {checkedIn && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {" "}
            <Button>Check Out</Button>{" "}
          </div>
        )}
      </div>
      <Modal
        fullMode={true}
        visible={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <PhysicalExaminationModal
          onAddResult={handleAddResult}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

PatientCheckIn.getInitialProps = async ({ query }: NextPageContext) => {
  const patientId = (query && query.patientId) as string;
  return {
    patientId,
  };
};

export default PatientCheckIn;
