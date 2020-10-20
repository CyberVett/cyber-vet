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
import { string } from "yup";

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
    note: "",
    clinicalSigns: [],
    diagnosticTest: [],
    treatment: [],
    finalDiagnosis: [],
    tentativeDiagnosis: {
      differential: [],
      tentative: [],
    },
    vaccination: {
      type: "",
      name: "",
      dosage: "",
      nextDate: "",
    },
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
    console.log(medicalReports);
    setShowMedicalModal(false);
  };

  const handleEditMedicalReport = () => {
    setMedicalContentState("Chief Complain");
    setShowMedicalModal(true);
  };

  const handleDeleteMedicalReport = () => {
    setMedicalReports({ ...medicalReports, chiefComplain: "" });
  };

  const handleEditClinicalSigns = () => {
    setMedicalContentState("Clinical Signs");
    setShowMedicalModal(true);
  };

  const handleDeleteClinicalSigns = () => {
    setMedicalReports({ ...medicalReports, clinicalSigns: [] });
  };

  const handleEditTreatment = () => {
    setMedicalContentState("Treatment");
    setShowMedicalModal(true);
  };

  const handleDeleteTreatment = () => {
    setMedicalReports({ ...medicalReports, treatment: [] });
  };

  const handleEditFinalDiagnosis = () => {
    setMedicalContentState("Final Diagnosis");
    setShowMedicalModal(true);
  };

  const handleDeleteFinalDiagnosis = () => {
    setMedicalReports({ ...medicalReports, finalDiagnosis: [] });
  };

  const handleEditDiagnosticTest = () => {
    setMedicalContentState("Diagnostic Test");
    setShowMedicalModal(true);
  };

  const handleDeleteDiagnosticTest = () => {
    setMedicalReports({ ...medicalReports, diagnosticTest: [] });
  };

  const handleEditTentativeTest = () => {
    setMedicalContentState("Tentative Diagnosis");
    setShowMedicalModal(true);
  };

  const handleDeleteTentativeTest = () => {
    setMedicalReports({
      ...medicalReports,
      tentativeDiagnosis: {
        tentative: [],
        differential: [],
      },
    });
  };

  const handleEditNoteReport = () => {
    setMedicalContentState("Note");
    setShowMedicalModal(true);
  };

  const handleDeleteNoteReport = () => {
    setMedicalReports({ ...medicalReports, note: "" });
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
                        {(medicalReports.clinicalSigns.length || "") && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteClinicalSigns}
                            onEdit={handleEditClinicalSigns}
                            title="Clinical Signs"
                          >
                            {medicalReports.clinicalSigns.map((sign) => {
                              return <>{sign && <p>{sign}</p>}</>;
                            })}
                          </CheckinItem>
                        )}

                        {(medicalReports.finalDiagnosis.length || "") && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteFinalDiagnosis}
                            onEdit={handleEditFinalDiagnosis}
                            title="Final Diagnosis"
                          >
                            {medicalReports.finalDiagnosis.map((item) => {
                              return <>{item && <p>{item}</p>}</>;
                            })}
                          </CheckinItem>
                        )}

                        {(medicalReports.diagnosticTest.length || "") && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteDiagnosticTest}
                            onEdit={handleEditDiagnosticTest}
                            title="Diagnostic Test"
                          >
                            {medicalReports.diagnosticTest.map((test) => {
                              return <>{test && <p>{test}</p>}</>;
                            })}
                          </CheckinItem>
                        )}

                        {(medicalReports.treatment.length || "") && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteTreatment}
                            onEdit={handleEditTreatment}
                            title="Treatment"
                          >
                            {medicalReports.treatment.map((item) => {
                              return <>{item && <p>{item}</p>}</>;
                            })}
                          </CheckinItem>
                        )}

                        {medicalReports.chiefComplain && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteMedicalReport}
                            onEdit={handleEditMedicalReport}
                            title="Chief Complain"
                          >
                            {medicalReports.chiefComplain}
                          </CheckinItem>
                        )}

                        {medicalReports.note && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteNoteReport}
                            onEdit={handleEditNoteReport}
                            title="Note"
                          >
                            {medicalReports.note}
                          </CheckinItem>
                        )}

                        {/* Tentative medical test */}
                        {(medicalReports.tentativeDiagnosis.differential
                          .length ||
                          medicalReports.tentativeDiagnosis.tentative.length ||
                          "") && (
                          <CheckinItem
                            date={new Date().toString()}
                            onDelete={handleDeleteTentativeTest}
                            onEdit={handleEditTentativeTest}
                            title="Diagnostic Test"
                          >
                            <h5>Differential</h5>
                            {medicalReports.tentativeDiagnosis.differential.map(
                              (test) => {
                                return <>{test && <p>{test}</p>}</>;
                              }
                            )}
                            <h5>Tentative</h5>
                            {medicalReports.tentativeDiagnosis.tentative.map(
                              (test) => {
                                return <>{test && <p>{test}</p>}</>;
                              }
                            )}
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
                    physicalExaminationResult={physicalExaminationResult}
                    showModal={() => setShowModal(true)}
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
