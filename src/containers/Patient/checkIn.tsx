import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Modal from "components/Modal/modal";
import Button from "components/Button/button";
import PatientDetails from "components/CheckIn/PatientDetails";
import CheckinItem from "components/CheckIn/CheckinItem";
import PhysicalExaminationModal from "components/CheckIn/PhysicalExaminationModal";

const MedicalRecordsItems = (props: {
  onRecordItemTypeUpdate: Function;
  children: React.FunctionComponentFactory;
}) => {
  const handleAddMedicalRecordItem = (item: string) => {
    console.log(item);
    props.onRecordItemTypeUpdate(item);
  };

  return (
    <>
      <div className="medical__records">
        <div className="medical__records--buttons">
          <div className="buttons__list">
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Chief complain")}
            >
              + Chief complain
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Physical Examination")}
            >
              + Physical Examination
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Clinical Signs")}
            >
              + Clinical Signs
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Tentative Diagnosis")}
            >
              + Tentative Diagnosis
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Diagnosis Test")}
            >
              + Diagnosis Test
            </Button>
          </div>

          <div className="buttons__list">
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Final Diagnosis")}
            >
              + Final Diagnosis
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Treatment")}
            >
              + Treatment
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Vaccination")}
            >
              + Vaccination
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Note")}
            >
              + Note
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Medical Bill")}
            >
              + Medical Bill
            </Button>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

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

interface IphysicalExamination {
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
}

const PhysicalCheckResult = (props: {
  physicalExaminationResult: IphysicalExamination;
  showModal: Function;
}) => {
  const { physicalExaminationResult, showModal } = props;
  return (
    <CheckinItem
      title="Physical Examination"
      actions={
        <>
          <input defaultValue={new Date().toString()} />
          <Button onClick={() => showModal(true)}>Add New Results</Button>
          <Button onClick={() => {}}>Delete Results</Button>
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
  );
};

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

const MedicalRecordModal = ({
  show,
  currentModal,
  getResult,
  closeModal,
}: {
  show: boolean;
  currentModal: string;
  getResult: Function;
  closeModal: Function;
}) => {
  console.log(currentModal);
  return (
    <Modal
      fullMode={true}
      visible={show}
      closeModal={() => {
        closeModal(false);
      }}
    >
      {currentModal === "Chief complain" && <>Toggle Chief Complain</>}
      {currentModal === "Physical Examination" && (
        <>Toggle Physical Examination</>
      )}
      {currentModal === "Clinical Signs" && <>Toggle Clinical Signs</>}
      {currentModal === "Tentative Diagnosis" && (
        <>Toggle Tentative Diagnosis</>
      )}
      {currentModal === "Diagnosis Test" && <>Toggle Diagnosis Test</>}
      {currentModal === "Final Diagnosis" && <>Toggle Final Diagnosis</>}
      {currentModal === "Treatment" && <>Toggle Treatment</>}
      {currentModal === "Vaccination" && <>Toggle Vaccination</>}
      {currentModal === "Note" && <>Toggle Note</>}
      {currentModal === "Medical Bill" && <>Toggle Medical Bill</>}
    </Modal>
  );
};

const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  const [physicalExaminationResult, setPhysicalExaminationResult] = useState<
    IphysicalExamination
  >({
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

  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [medicalContentState, setMedicalContentState] = useState("");

  const handleAddResult = (data: any) => {
    setPhysicalExaminationResult(data);
    console.log(physicalExaminationResult);

    setShowModal(false);
  };

  const handleCheckinPatient = () => {
    setCheckedIn(true);
    console.log(patientId);
  };

  const [activeCheckedInItem, setActiveCheckedInItem] = useState("");
  const handleActiveCheckedInItemChange = (item: string) => {
    setActiveCheckedInItem(item);
  };

  const handleMedicalItemUpdate = (item: string) => {
    setMedicalContentState(item);
    setShowMedicalModal(true);
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

              {checkedIn && (
                <CheckedinItemsDisplay
                  activeNavItem={activeCheckedInItem}
                  onActiveItemChange={handleActiveCheckedInItemChange}
                >
                  <>
                    {"Client Details" === activeCheckedInItem && (
                      <div>Client Details</div>
                    )}

                    {"Patient Details" === activeCheckedInItem && (
                      <div>Patient Details</div>
                    )}

                    {"Vaccination" === activeCheckedInItem && (
                      <div>Vaccination</div>
                    )}

                    {"Medical Records" === activeCheckedInItem && (
                      <MedicalRecordsItems
                        onRecordItemTypeUpdate={handleMedicalItemUpdate}
                      >
                        {physicalExaminationResult.respiratoryRate && (
                          <PhysicalCheckResult
                            showModal={() => setShowModal(true)}
                            physicalExaminationResult={
                              physicalExaminationResult
                            }
                          />
                        )}
                      </MedicalRecordsItems>
                    )}

                    {"Laboratory" === activeCheckedInItem && (
                      <div>Laboratory</div>
                    )}

                    {"Radiology" === activeCheckedInItem && (
                      <div>Radiology</div>
                    )}

                    {"Appointment" === activeCheckedInItem && (
                      <div>Appointment</div>
                    )}
                  </>
                </CheckedinItemsDisplay>
              )}
              {!checkedIn && (
                <CheckinItemsDisplay>
                  <PhysicalCheckResult
                    showModal={() => setShowModal(true)}
                    physicalExaminationResult={physicalExaminationResult}
                  />
                </CheckinItemsDisplay>
              )}
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

      <MedicalRecordModal
        show={showMedicalModal}
        closeModal={() => {
          setShowMedicalModal(false);
          setMedicalContentState("");
        }}
        getResult={() => {}}
        currentModal={medicalContentState}
      />
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
