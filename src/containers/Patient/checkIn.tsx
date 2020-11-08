import React, { useState, useEffect } from "react";
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
import config from "config";

import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import CheckedinItemsDisplay from "components/CheckIn/CheckedinItemsDisplay";
import MedicalRecordModal, {
  IMedicalReport,
} from "components/CheckIn/MedicalRecordModal";
import CheckinItem from "components/CheckIn/CheckinItem";
import { ILabRecords } from "types/checkInn";
import LaboratoryTab from "./Laboratory/laboratoryTab";
import Radiology from "./Radiology/radiology";
import Appointment from "./Appointment/appointment";
import requestClient from "lib/requestClient";

const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  const [data, setData] = useState([]);
  const [checkInData, setCheckIndata] = useState(null);

  useEffect(() => {
    requestClient
      .get(`/patients/${patientId}`)
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setData(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const [physicalExaminationResult, setPhysicalExaminationResult] = useState<
    IphysicalExamination
  >({
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
    consistencyOfFaeces: "",
    natureOfDiarrhea: "",
    anyDiarrhea: "",
    conformation: "",
    generalDisposation: "",
    ectoparasite: "",
    locationOfLesion: "",
    natureOfLesion: "",
    integumentFur: "",
    nasalCavity: "",
    oralMucousMembrane: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [medicalContentState, setMedicalContentState] = useState("");

  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    requestClient
      .get("patients/bro-01-01")
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setPatientData(response.data.data);
          const checkins = response.data.data.checkins;
          const checkinData = checkins.find((checkin: any) => checkin.checkIn);

          if (checkinData) {
            setCheckedIn(true);
            setCheckIndata(checkinData);
            if (checkinData.physicalExamination) {
              setPhysicalExaminationResult(checkinData.physicalExamination);
            }
            if (checkinData.chiefComplain) {
              setMedicalReports({
                ...medicalReports,
                chiefComplain: checkinData.chiefComplain.chiefComplain,
              });
            }

            if (checkinData.diagnosis) {
              setMedicalReports({
                ...medicalReports,
                tentativeDiagnosis: {
                  tentative: checkinData.diagnosis.tentativeDiagnosis,
                  differential: checkinData.diagnosis.differentialDiagnosis,
                },
              });
            }
            if (checkinData.clinicalSigns) {
              setMedicalReports({
                ...medicalReports,
                clinicalSigns: checkinData.clinicalSigns.signs,
              });
            }
            if (checkinData.diagnosticTest) {
              setMedicalReports({
                ...medicalReports,
                diagnosticTest: checkinData.diagnosticTest.test,
              });
            }
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const [medicalReports, setMedicalReports] = useState<IMedicalReport>({
    chiefComplain: "",
    note: "",
    clinicalSigns: "",
    diagnosticTest: "",
    treatment: [],
    finalDiagnosis: [],
    tentativeDiagnosis: {
      differential: "",
      tentative: "",
    },
    vaccination: {
      type: "",
      name: "",
      dosage: "",
      nextDate: "",
    },
    medicalBill: {
      services: null,
      paid: "",
      balance: "",
      method: null,
    },
  });

  const [labRecords, setLabRecords] = useState<ILabRecords>({
    microbiology: {},
    parasitology: {},
    pathology: {},
    rapidTest: {},
  });

  const handleEditPhysicalResult = (physicalResult: IphysicalExamination) => {
    setModalLoading(true);

    const data = {
      ...physicalResult,
      anyDiarrhea: physicalResult.anyDiarrhea + "",
      anyLameness: physicalResult.anyLameness + "",
      checkinId: checkInData.id,
    };
    delete data.id;
    delete data.patientId;
    delete data.updatedAt;
    delete data.lastModifiedBy;
    delete data.createdAt;
    delete data.addedBy;
    requestClient
      .put("/patients/bro-01-01/physical-examination", data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setPhysicalExaminationResult(physicalResult);
          setShowModal(false);
        } else {
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const handleAddResult = (data: any) => {
    setModalLoading(true);
    const _data = {
      checkinId: patientData.checkins[0].id,
      rectalTemperature: data.rectalTemperature,
      respiratoryRate: data.respiratoryRate,
      pulseRate: data.pulseRate,
      ocularMucousMembrane: data.ocularMucousMembrane,
      oralMucousMembrane: data.oralMucousMembrane,
      nasalCavity: data.nasalCavity,
      integumentFur: data.integumentFur,
      natureOfLesion: data.natureOfLesion,
      locationOfLesion: data.locationOfLesion,
      ectoparasite: data.ectoparasite,
      generalDisposition: data.generalDisposation,
      conformation: data.conformation,
      anyDiarrhea: data.anyDiarrhea,
      natureOfDiarrhea: data.natureOfDiarrhea,
      consistencyOfFaeces: data.consistencyOfFaeces,
      natureOfBreathing: data.natureOfBreathing,
      lungsSound: data.lungsSound,
      anyLameness: data.anyLameness,
      lamenessLocation: data.lamenessLocation,
      rectalExamination: data.rectalExamination,
      prepuceVulvaExamination: data.prepuceVulvaExamination,
    };
    setModalError("");

    requestClient
      .post("/patients/bro-01-01/physical-examination", _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setCheckedIn(true);
          setPhysicalExaminationResult(data);
          setShowModal(false);
        } else {
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const handleCheckinPatient = () => {
    setCheckedIn(true);
    console.log(patientId);
    requestClient
      .post("/patients/abcd-01-04/check-in", {})
      .then((response) => {
        console.log(response.data);
        // setLoading(false);
        // if (response.status === 200 && response.statusText === "OK") {
        //   setPatientData(response.data.data);
        //   // setCheckedIn
        // }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const [activeCheckedInItem, setActiveCheckedInItem] = useState("");
  const handleActiveCheckedInItemChange = (item: string) => {
    setActiveCheckedInItem(item);
  };

  const handleMedicalItemUpdate = (item: string) => {
    if (item === "Physical Examination") {
      setShowModal(true);
    } else {
      setMedicalContentState(item);
      setShowMedicalModal(true);
    }
  };

  const handleGetMedicalReportData = (data: object, field: string) => {
    setModalLoading(true);
    let method = "put";
    let endpoint = "chief-complain";
    let body = {
      checkinId: checkInData.id,
    };
    if (field === "Chief Complain" && !medicalReports.chiefComplain) {
      // Adding new chief complain
      body.chiefComplain = data.chiefComplain;
      method = "post";
    } else if (field === "Clinical Signs") {
      method = !medicalReports.clinicalSigns ? "post" : "put";
      endpoint = "clinical-sign";
      body.signs = data.clinicalSigns;
    } else if (field === "Tentative Diagnosis") {
      method = !medicalReports.tentativeDiagnosis.tentative ? "post" : "put";
      endpoint = "diagnosis";
      body = {
        ...body,
        tentativeDiagnosis: data.tentativeDiagnosis.tentative,
        differentialDiagnosis: data.tentativeDiagnosis.differential,
      };
    } else if (field === "Diagnosis Test") {
      // diagnostic-test
      method = !medicalReports.diagnosticTest ? "post" : "put";
      endpoint = "diagnostic-test";
      body = {
        ...body,
        test: data.diagnosticTest,
      };
    }

    requestClient[method](`/patients/${patientId}/${endpoint}`, body)
      .then((response) => {
        // setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setModalLoading(false);
          setMedicalReports({ ...medicalReports, ...data });
          setShowMedicalModal(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        console.log(error);
      });
  };

  const handleEditMedicalReport = () => {
    setMedicalContentState("Chief Complain");
    setShowMedicalModal(true);
  };

  const handleDeleteMedicalReport = (
    endpoint = "chief-complain",
    defaultValue: any = { chiefComplain: "" }
  ) => {
    let url = `patients/${patientId}/${endpoint}`;

    // Else, update the request to get the user token from the localstorage
    // @ts-ignore
    const user = JSON.parse(localStorage?.getItem(config.storageKeys.auth));
    // @ts-ignore
    const accessToken = `Bearer ${user.accessToken}`;
    fetch(config.apiRoot + url, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkinId: checkInData.id }),
    })
      .then((response) => {
        if (response.ok) {
          setMedicalReports({ ...medicalReports, ...defaultValue });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClinicalSigns = () => {
    setMedicalContentState("Clinical Signs");
    setShowMedicalModal(true);
  };

  const handleDeleteClinicalSigns = () => {
    setMedicalReports({ ...medicalReports, clinicalSigns: "" });
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
    setMedicalContentState("Diagnosis Test");
    setShowMedicalModal(true);
  };

  const handleDeleteDiagnosticTest = () => {
    setMedicalReports({ ...medicalReports, diagnosticTest: "" });
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

  const handleDeleteItem = (key: string) => {
    let url = "patients/bro-01-01/physical-examination";

    // Else, update the request to get the user token from the localstorage
    // @ts-ignore
    const user = JSON.parse(localStorage?.getItem(config.storageKeys.auth));
    // @ts-ignore
    const accessToken = `Bearer ${user.accessToken}`;
    fetch(config.apiRoot + url, {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkinId: checkInData.id }),
    })
      .then((response) => {
        console.log(response.status);
        // setModalLoading(false);
        if (response.ok) {
          if (key === "physicalExamination") {
            setCheckedIn(false);
          }
          // Clear the data from here
        }
      })
      .catch((error) => {
        console.log(error);
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="patient__checkin">
      <div className="patient__checkin__container">
        <div className="patient__checkin__container--header">
          <h1>Patient Check In</h1>
        </div>
        <div className="patient__checkin__container--content">
          <div className="checkin__card">
            <div className="checkin__card--header">
              <span>Signalment</span>
              <span>{`Patient No: ${data.id}`}</span>
            </div>
            <div className="checkin__card--body">
              <PatientDetails patientData={data} />
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
                            checkedIn={checkedIn}
                            date={new Date().toString()}
                            onDelete={() =>
                              handleDeleteMedicalReport("clinical-sign", {
                                clinicalSigns: "",
                              })
                            }
                            onEdit={handleEditClinicalSigns}
                            title="Clinical Signs"
                          >
                            <p>{medicalReports.clinicalSigns}</p>
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
                            checkedIn={checkedIn}
                            date={new Date().toString()}
                            onDelete={handleDeleteDiagnosticTest}
                            onEdit={handleEditDiagnosticTest}
                            title="Diagnostic Test"
                          >
                            <p>{medicalReports.diagnosticTest}</p>
                          </CheckinItem>
                        )}

                        {(medicalReports.treatment.length || "") && (
                          <CheckinItem
                            checkedIn={checkedIn}
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
                            checkedIn={checkedIn}
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
                        {(medicalReports.tentativeDiagnosis.tentative.length ||
                          "") && (
                          <CheckinItem
                            checkedIn={checkedIn}
                            date={new Date().toString()}
                            onDelete={() =>
                              handleDeleteMedicalReport("diagnosis", {
                                tentativeDiagnosis: {
                                  tentative: "",
                                  differential: "",
                                },
                              })
                            }
                            onEdit={handleEditTentativeTest}
                            title="Diagnostic Test"
                          >
                            <h5>Differential</h5>
                            <p>
                              {medicalReports.tentativeDiagnosis.differential}
                            </p>

                            <h5>Tentative</h5>
                            <p>{medicalReports.tentativeDiagnosis.tentative}</p>
                          </CheckinItem>
                        )}

                        {physicalExaminationResult &&
                          physicalExaminationResult.respiratoryRate && (
                            <PhysicalCheckResult
                              checkedIn={checkedIn}
                              onAddNew={() => setShowModal(true)}
                              onEdit={() => setShowModal(true)}
                              onDelete={() =>
                                handleDeleteItem("physicalExaminationResult")
                              }
                              physicalExaminationResult={
                                physicalExaminationResult
                              }
                              showModal={() => setShowModal(true)}
                            />
                          )}
                      </MedicalRecordsItems>
                    )}

                    {"Laboratory" === activeCheckedInItem && <LaboratoryTab />}

                    {"Radiology" === activeCheckedInItem && <Radiology />}

                    {"Appointment" === activeCheckedInItem && <Appointment />}
                  </>
                </CheckedinItemsDisplay>
              )}
              {!checkedIn && (
                <CheckinItemsDisplay>
                  <PhysicalCheckResult
                    onAddNew={() => setShowModal(true)}
                    checkedIn={checkedIn}
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
          result={physicalExaminationResult}
          loading={modalLoading}
          onAddResult={handleAddResult}
          onEditResult={handleEditPhysicalResult}
          onDeleteResult={() => handleDeleteItem("physicalExamination")}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <MedicalRecordModal
        modalLoading={modalLoading}
        show={showMedicalModal}
        onDeleteItem={handleDeleteItem}
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
