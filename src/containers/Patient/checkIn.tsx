import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Modal from "components/Modal/modal";
import Button from "components/Button/button";

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

const CheckinItem = (props) => {
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

const CheckInModalContent = (props) => {
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

const PhysicalExaminationModal = (props) => {
  const handleAddResult = (e) => {
    e.preventDefault();
    console.log("Clicked");
    props.onAddResult(physicalExamination);
  };
  const [physicalExamination, setPhysicalExamination] = useState({
    rectalTemperature: "",
    respiratoryRate: "",
    pulseRate: "",
    prepuceVulvaExamination: "",
    ocularMucousMembrane: "",
    rectalExamination: "",
    lamenessLocation: "",
    anyLameness: "",
    lungsSound: "",
    natureOfBreathing: "",
    consistencyOfFeaces: "",
    natureOfDiarrhea: "",
    anyDiarrhea: "",
    conformation: "",
    generalDisposation: "",
    ectoParasites: "",
    locationOfLesion: "",
    natureOfLesion: "",
    integementFur: "",
    nasalCavity: "",
    oralMucousMembrane: "",
  });
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setPhysicalExamination((input: any) => ({
      ...input,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <CheckInModalContent
      title="Physical Examination Result"
      date="16/08/2020 12:46 PM"
    >
      <form className="physical__examination__form">
        <div className="physical__examination__form--input">
          <label>Rectal Temperatur (°C)</label>
          <input
            type="text"
            name={physicalExamination.rectalTemperature}
            defaultValue="38.5 °C"
            onChange={handleInputChange}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Respiratory Rate (cycle/min)</label>
          <input
            type="text"
            value={physicalExamination.respiratoryRate}
            name="respiratoryRate"
            onChange={handleInputChange}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Pulse Rate (Beat/min)</label>
          <input
            type="text"
            value={physicalExamination.pulseRate}
            onChange={handleInputChange}
            name="pulseRate"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Ocular Mucous Membrane</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="ocularMucousMembrane"
            value={physicalExamination.ocularMucousMembrane}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Oral Mucous Membrane</label>
          <input
            onChange={handleInputChange}
            type="text"
            name="oralMucousMembrane"
            value={physicalExamination.oralMucousMembrane}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Nasal Cavity</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="nasalCavity"
            value={physicalExamination.nasalCavity}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Integument Fur</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={physicalExamination.integementFur}
            name="integumentFur"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Nature of lesion</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="None"
            value={physicalExamination.natureOfLesion}
            name="natureOfLesion"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Location of lesion</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="None"
            value={physicalExamination.locationOfLesion}
            name="locationOfLesion"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Ectoparasites</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Tick, Lice"
            value={physicalExamination.ectoParasites}
            name="ectoParasites"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>General Disposation</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Active"
            value={physicalExamination.generalDisposation}
            name="generalDisposation"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Conformation</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={physicalExamination.conformation}
            name="conformation"
          />
        </div>
        <div className="divider" />
        <div className="physical__examination__form--input">
          <label>Any Diarrhea</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={physicalExamination.anyDiarrhea}
            name="anyDiarrhea"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Nature of Diarrhea</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={physicalExamination.natureOfDiarrhea}
            name="natureOfDiarrhea"
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Consistency of feaces</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Normal"
            value={physicalExamination.consistencyOfFeaces}
            name="consistencyOfFeaces"
          />
        </div>
        <div className="physical__examination__form--input">
          <label>Nature of Breathing</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="natureOfBreathing"
            value={physicalExamination.natureOfBreathing}
          />
        </div>
        <div className="physical__examination__form--input">
          <label>Lungs Sound</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Normal"
            name="lungsSound"
            value={physicalExamination.lungsSound}
          />
        </div>
        <div className="physical__examination__form--input">
          <label>Any Lameness</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Yes"
            name="anyLameness"
            value={physicalExamination.anyLameness}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Lameness Location</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Right fore limb"
            name="lamenessLocation"
            value={physicalExamination.lamenessLocation}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Rectal Examination</label>
          <input
            type="text"
            onChange={handleInputChange}
            defaultValue="Normal"
            name="rectalExamination"
            value={physicalExamination.rectalExamination}
          />
        </div>

        <div className="physical__examination__form--input">
          <label>Prepuce/Vulva Examination</label>
          <input
            type="text"
            onChange={handleInputChange}
            name="prepuceVulvaExamination"
            value={physicalExamination.prepuceVulvaExamination}
          />
        </div>
        <div className="physical__examination__form--buttons">
          <Button onClick={handleAddResult}>Add Result</Button>
          <Button onClick={props.onCancel}>Cancel</Button>
        </div>
      </form>
    </CheckInModalContent>
  );
};
const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  const [physicalExaminationResult, setPhysicalExaminationResult] = useState(
    {}
  );
  const [showModal, setShowModal] = useState(false);
  const handleAddResult = (data) => {
    setPhysicalExaminationResult(data);
    setShowModal(false);
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
              <div className="checkin__items">
                <div>
                  <form className="checkin-form">
                    <div className="form-item">
                      <label>Check In</label>

                      <input type="text" disabled defaultValue={new Date()} />
                    </div>

                    <div className="form-item">
                      <label>Visit Type</label>

                      <select disabled>
                        {[{ value: "Follow Up", label: "Follow Up" }].map(
                          (opt) => {
                            return (
                              <option value={opt.value}>{opt.label}</option>
                            );
                          }
                        )}
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
                            value:
                              physicalExaminationResult.ocularMucousMembrane,
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
                            value:
                              physicalExaminationResult.prepuceVulvaExamination,
                          },
                        ].map(({ label, value }) => {
                          return (
                            <li className="exam__result__item">
                              <span className="exam__result__item--name">
                                {label}
                              </span>
                              <span className="exam__result__item--value">
                                {value}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </CheckinItem>
              </div>
            </div>
          </div>
          <div className="patient__checkin__container--footer">
            <Button> Checkin</Button>
            <Button>Return</Button>
          </div>
        </div>
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
