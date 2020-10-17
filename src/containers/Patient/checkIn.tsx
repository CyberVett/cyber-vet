import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Modal from "components/Modal/modal";
import Button from "components/Button/button";
import PatientDetails from "components/CheckIn/PatientDetails";
import PhysicalExaminationModal from "components/CheckIn/PhysicalExaminationModal";
import MedicalRecordsItems from "components/CheckIn/MedicalRecordsItems";
import CheckinItemsDisplay from "components/CheckIn/CheckinItemsDisplay";
import PhysicalCheckResult, {
  IphysicalExamination,
} from "components/CheckIn/PhysicalCheckResult";

import CheckedinItemsDisplay from "components/CheckIn/CheckedinItemsDisplay";
import MedicalRecordModal, {
  IMedicalReport,
} from "components/CheckIn/MedicalRecordModal";
import CheckinItem from "components/CheckIn/CheckinItem";

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

  const [medicalReports, setMedicalReports] = useState<IMedicalReport>({
    chiefComplain: "",
  });

  const handleAddResult = (data: any) => {
    setPhysicalExaminationResult(data);
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

  const handleGetMedicalReportData = (data: object, field: string) => {
    console.log({ data, field });
    let splittedField = field.split(" ");
    splittedField[0] = splittedField[0].toLowerCase();
    field = splittedField.join("");
    setMedicalReports({ ...medicalReports, ...data });
    setShowMedicalModal(false);
  };

  const handleEditMedicalReport = () => {
    setMedicalContentState("Chief Complain");
    setShowMedicalModal(true);
  };

  const handleDeleteMedicalReport = () => {
    setMedicalReports({ ...medicalReports, chiefComplain: "" });
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
                        {medicalReports.chiefComplain && (
                          <CheckinItem
                            title="Chief Complain"
                            date={new Date().toString()}
                            onEdit={handleEditMedicalReport}
                            onDelete={handleDeleteMedicalReport}
                          >
                            {medicalReports.chiefComplain}
                          </CheckinItem>
                        )}

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
        getResult={(data: object, field: string) => {
          handleGetMedicalReportData(data, field);
        }}
        currentModal={medicalContentState}
        results={medicalReports}
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
