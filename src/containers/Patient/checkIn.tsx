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
import LaboratoryTab from "./Laboratory/laboratoryTab";
import Radiology from "./Radiology/radiology";
import Appointment from "./Appointment/appointment";
import requestClient from "lib/requestClient";
import Router from "next/router";
import { FormErrors } from "components/Input/input";
import { ClientSection } from "./clientSection";
import { PatientSection } from "./patientSection";
import { VaccinationSection } from "./VaccinationSection";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator.svg";
import { CalculatorModal } from "./calculatorModal";
import { formatDate } from "lib/utils";

const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  // TODO: refactor and set approproaite data type
  const [checkInData, setCheckIndata] = useState(null);

  const [
    physicalExaminationResult,
    setPhysicalExaminationResult,
  ] = useState<IphysicalExamination>({
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
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [medicalContentState, setMedicalContentState] = useState("");

  const [patientData, setPatientData] = useState({ checkins: [] });
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  const [checkinDataIndex, setCheckinDataIndex] = useState(0);

  const [billingServices, setBillingServices] = useState(null);
  const [checkInMedicalBill, setCheckInMedicalBill] = useState({});

  useEffect(() => {
    requestClient
      .get(`billings/services`)
      .then((response) => {
        // setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setBillingServices(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchMedicalBillForCheckin = (checkinId: string) => {
    setCheckInMedicalBill({});
    requestClient
      .get(`billings/medical-bill/${checkinId}`)
      .then((response) => {
        // console.log(response.data);

        if (response.status === 200 && response.statusText === "OK") {
          // console.log(response.data);
          const data = response.data.data;
          data.services = data.details;
          // console.log(data);
          setCheckInMedicalBill(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditMedicalBill = () => {
    setMedicalContentState("Medical Bill");
    setShowMedicalModal(true);
  };

  const handleDeleteMedicalBill = () => {};

  const populateCheckInData = (checkinData: any) => {
    if (checkinData) {
      setCheckedIn(true);
      setCheckIndata(checkinData);
      let _medicalReport = { ...medicalReports };
      if (checkinData.physicalExamination) {
        setPhysicalExaminationResult(checkinData.physicalExamination);
      } else {
        setPhysicalExaminationResult({
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
      }

      if (checkinData.chiefComplain) {
        _medicalReport = {
          ..._medicalReport,
          chiefComplain: checkinData.chiefComplain.chiefComplain,
          chiefComplainDate: checkinData.chiefComplain?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          chiefComplain: "",
        };
      }

      if (checkinData.diagnosis) {
        _medicalReport = {
          ..._medicalReport,
          tentativeDiagnosis: {
            differential: checkinData.diagnosis.differentialDiagnosis,
            tentative: checkinData.diagnosis.tentativeDiagnosis,
          },
          tentativeDiagnosisDate: checkinData.diagnosis?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          tentativeDiagnosis: {
            differential: "",
            tentative: "",
          },
        };
      }
      if (checkinData.clinicalSigns) {
        _medicalReport = {
          ..._medicalReport,
          clinicalSigns: checkinData.clinicalSigns.signs,
          clinicalSignsDate: checkinData.clinicalSigns?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          clinicalSigns: "",
        };
      }
      if (checkinData.diagnosticTest) {
        _medicalReport = {
          ..._medicalReport,
          diagnosticTest: checkinData.diagnosticTest.test,
          diagnosticTestDate: checkinData.diagnosticTest?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          diagnosticTest: "",
        };
      }
      if (checkinData.finalDiagnosis) {
        _medicalReport = {
          ..._medicalReport,
          finalDiagnosis: checkinData.finalDiagnosis.diagnosis,
          finalDiagnosisDate: checkinData.finalDiagnosis?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          finalDiagnosis: "",
        };
      }

      if (checkinData.treatment) {
        _medicalReport = {
          ..._medicalReport,
          treatment: checkinData.treatment.treatment,
          treatmentDate: checkinData.treatment?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          treatment: "",
        };
      }

      if (checkinData.notes) {
        _medicalReport = {
          ..._medicalReport,
          note: checkinData.notes.note,
          noteDate: checkinData.notes?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          note: "",
        };
      }

      if (checkinData.vaccination) {
        _medicalReport = {
          ..._medicalReport,
          vaccination: {
            type: checkinData.vaccination.vaccinationType,
            name: checkinData.vaccination.nameOfVaccine,
            dosage: checkinData.vaccination.dosage,
            nextDate: checkinData.vaccination.dateOfNextShot,
            smsReminder: checkinData.vaccination.smsReminder,
            emailReminder: checkinData.vaccination.emailReminder,
          },
          vaccinationDate: checkinData.vaccination?.updatedAt,
        };
      } else {
        _medicalReport = {
          ..._medicalReport,
          vaccination: {
            type: "",
            name: "",
            dosage: "",
            nextDate: "",
            smsReminder: false,
            emailReminder: false,
          },
        };
      }
      setMedicalReports(_medicalReport);
    }
  };

  useEffect(() => {
    requestClient
      .get(`/patients/${patientId}`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setPatientData(response.data.data);
          const checkins = response.data.data.checkins;
          setCheckinDataIndex(0);
          // console.log(checkins)
          setCheckIndata(checkins[checkinDataIndex]);
          if (checkins[checkinDataIndex]) {
            fetchMedicalBillForCheckin(checkins[checkinDataIndex].id);
          }
          populateCheckInData(checkins[checkinDataIndex]);
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
    treatment: "",
    finalDiagnosis: "",
    tentativeDiagnosis: {
      differential: "",
      tentative: "",
    },
    vaccination: {
      type: "",
      name: "",
      dosage: "",
      nextDate: "",
      smsReminder: false,
      emailReminder: false,
    },
    medicalBill: {
      services: null,
      paid: "",
      balance: "",
      method: null,
    },
  });

  const handleEditPhysicalResult = (physicalResult: IphysicalExamination) => {
    setModalLoading(true);

    const data = {
      ...physicalResult,
      anyDiarrhea: physicalResult.anyDiarrhea + "",
      anyLameness: physicalResult.anyLameness + "",
      // @ts-ignore
      checkinId: checkInData?.id,
    };
    // @ts-ignore
    delete data.id;
    // @ts-ignore
    delete data.patientId;
    // @ts-ignore
    delete data.clientId;
    // @ts-ignore
    delete data.hospitalId;
    // @ts-ignore
    delete data.updatedAt;
    // @ts-ignore
    delete data.lastModifiedBy;
    // @ts-ignore
    delete data.createdAt;
    // @ts-ignore
    delete data.addedBy;
    // delete data.checkinId

    requestClient
      .put(`/patients/${patientId}/physical-examination`, data)
      .then(async (response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          // const json = response.data.data;
          // setPhysicalExaminationResult({
          //   ...physicalResult,
          //   createdAt: json.createdAt,
          //   updatedAt: json.updatedAt,
          // });
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
      // @ts-ignore
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
      anyDiarrhea: data.anyDiarrhea === "true" ? true : false,
      natureOfDiarrhea: data.natureOfDiarrhea,
      consistencyOfFaeces: data.consistencyOfFaeces,
      natureOfBreathing: data.natureOfBreathing,
      lungsSound: data.lungsSound,
      anyLameness: data.anyLameness === "true" ? true : false,
      lamenessLocation: data.lamenessLocation,
      rectalExamination: data.rectalExamination,
      prepuceVulvaExamination: data.prepuceVulvaExamination,
    };
    setModalError("");

    requestClient
      .post(`/patients/${patientId}/physical-examination`, _data)
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
    requestClient
      .post(`/patients/${patientId}/check-in`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const checkOut = (id: string) => {
    setLoading(true);
    requestClient
      .put(`/patients/${id}/check-out`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          Router.push(`/app/dashboard`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const [activeCheckedInItem, setActiveCheckedInItem] = useState(
    "Medical Records"
  );
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
      // @ts-ignore
      checkinId: checkInData?.id,
    };
    if (field === "Chief Complain") {
      // Adding new chief complain
      // @ts-ignore
      body.chiefComplain = data.chiefComplain;
      // @ts-ignore
      data.chiefComplainDate = new Date().toString();
      method = !medicalReports.chiefComplain ? "post" : "put";
    } else if (field === "Clinical Signs") {
      method = !medicalReports.clinicalSigns ? "post" : "put";
      endpoint = "clinical-sign";
      // @ts-ignore
      body.signs = data.clinicalSigns;
      // @ts-ignore
      data.clinicalSignsDate = new Date().toString();
    } else if (field === "Tentative Diagnosis") {
      method = !medicalReports.tentativeDiagnosis.tentative ? "post" : "put";
      endpoint = "diagnosis";
      body = {
        ...body,
        // @ts-ignore
        tentativeDiagnosis: data.tentativeDiagnosis.tentative,
        // @ts-ignore
        differentialDiagnosis: data.tentativeDiagnosis.differential,
      };
      // @ts-ignore
      data.tentativeDiagnosisDate = new Date().toString();
    } else if (field === "Diagnosis Test") {
      // diagnostic-test
      method = !medicalReports.diagnosticTest ? "post" : "put";
      endpoint = "diagnostic-test";
      body = {
        ...body,
        // @ts-ignore
        test: data.diagnosticTest,
      };
      // @ts-ignore
      data.diagnosticTestDate = new Date().toString();
    } else if (field === "Final Diagnosis") {
      // diagnostic-test
      method = !medicalReports.finalDiagnosis ? "post" : "put";
      endpoint = "final-diagnosis";
      body = {
        ...body,
        // @ts-ignore
        diagnosis: data.finalDiagnosis,
      };
      // @ts-ignore
      data.finalDiagnosisDate = new Date().toString();
    } else if (field === "Treatment") {
      // diagnostic-test
      method = !medicalReports.treatment ? "post" : "put";
      endpoint = "treatment";
      body = {
        ...body,
        // @ts-ignore
        treatment: data.treatment,
      };
      // @ts-ignore
      data.treatmentDate = new Date().toString();
    } else if (field === "Vaccination") {
      // // diagnostic-test
      method = !medicalReports.vaccination.name ? "post" : "put";
      endpoint = "vaccination";
      body = {
        ...body,
        // @ts-ignore
        vaccinationType: data.vaccination.type,
        // @ts-ignore
        nameOfVaccine: data.vaccination.name,
        // @ts-ignore
        dosage: data.vaccination.dosage,
        // @ts-ignore
        dateOfNextShot: data.vaccination.nextDate,
        // @ts-ignore
        emailReminder: data.vaccination.emailReminder === "on",
        // @ts-ignore
        smsReminder: data.vaccination.smsReminder === "on",
      };
      // @ts-ignore
      data.vaccinationDate = new Date().toString();
      // @ts-ignore
      console.log(data.vaccination);
      // data.vaccination.emailReminder = data.vaccination.emailReminder === "on";
      // // @ts-ignore
      // data.vaccination.smsReminder = data.vaccination.smsReminder === "on";
    } else if (field === "Note") {
      // // diagnostic-test
      method = !medicalReports.note ? "post" : "put";
      endpoint = "notes";
      body = {
        ...body,
        // @ts-ignore
        note: data.note,
      };
      // @ts-ignore
      data.noteDate = new Date().toString();
    } else if (field === "Medical Bill") {
      // // diagnostic-test
      // @ts-ignore
      method = !checkInData.medicalBill ? "post" : "put";
      endpoint = "/billings/medical-bill";
      body = {
        ...body,
        // @ts-ignore
        ...data,
        // @ts-ignore
        patientId: patientId,
        // @ts-ignore
        paymentMethod: data.method,
        // @ts-ignore
        amountPaid: data.paid,
        // @ts-ignore
        amountToBalance: data.balance,
      };
      // @ts-ignore
      delete body.paid;
      // @ts-ignore
      delete body.method;
      // @ts-ignore
      delete body.balance;
      // @ts-ignore
      data.medicalBillDate = new Date().toString();
    }
    const __url =
      field === "Medical Bill"
        ? endpoint
        : `/patients/${patientId}/${endpoint}`;
    // @ts-ignore
    requestClient[method](__url, body)
      .then((response: any) => {
        // setLoading(false);
        if (
          (response.status === 200 && response.statusText === "OK") ||
          (response.status === 201 && response.statusText === "Created")
        ) {
          setModalLoading(false);
          if (field !== "Medical Bill") {
            setMedicalReports({ ...medicalReports, ...data });
            setShowMedicalModal(false);
          } else {
             // @ts-ignore
            fetchMedicalBillForCheckin(checkInData?.id);
            setShowMedicalModal(false);
          }
          setShowMedicalModal(false);
        }
      })
      .catch((error: any) => {
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
      // @ts-ignore
      body: JSON.stringify({ checkinId: checkInData?.id }),
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

  const handleEditTreatment = () => {
    setMedicalContentState("Treatment");
    setShowMedicalModal(true);
  };

  const handleEditFinalDiagnosis = () => {
    setMedicalContentState("Final Diagnosis");
    setShowMedicalModal(true);
  };

  const handleEditVaccination = () => {
    setMedicalContentState("Vaccination");
    setShowMedicalModal(true);
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

  const handleEditNoteReport = () => {
    setMedicalContentState("Note");
    setShowMedicalModal(true);
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
      // @ts-ignore
      body: JSON.stringify({ checkinId: checkInData?.id }),
    })
      .then((response) => {
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
          <CalculatorIcon onClick={() => setShowCalculator(true)} />
        </div>
        <div className="patient__checkin__container--content">
          <div className="checkin__card">
            <div className="checkin__card--header">
              <span>Signalment</span>
              <span>{`Patient No: ${
                // @ts-ignore
                patientData.id
              }`}</span>
            </div>
            <div className="checkin__card--body">
              <PatientDetails patientData={patientData} />
              <div style={{ padding: "1rem" }}>
                <p style={{ color: "red" }}>Treatment warnings and allergies</p>
                <p>
                  {
                    // @ts-ignore
                    patientData?.treatmentWarnings
                  }
                </p>
              </div>
              <FormErrors errors={modalError} />
              {checkedIn && (
                <CheckedinItemsDisplay
                  activeNavItem={activeCheckedInItem}
                  onActiveItemChange={handleActiveCheckedInItemChange}
                >
                  <>
                    {"Client Details" === activeCheckedInItem && (
                      <ClientSection
                        data={
                          // @ts-ignore
                          patientData?.client
                        }
                      />
                    )}

                    {"Patient Details" === activeCheckedInItem && (
                      <PatientSection data={patientData} />
                    )}

                    {"Vaccination" === activeCheckedInItem && (
                      <VaccinationSection
                        checkInData={checkInData}
                        data={
                          // @ts-ignore
                          checkInData?.vaccination
                        }
                      />
                    )}

                    {"Medical Records" === activeCheckedInItem && (
                      <MedicalRecordsItems
                        checkedIn={
                          // @ts-ignore
                          checkInData?.checkIn
                        }
                        onRecordItemTypeUpdate={handleMedicalItemUpdate}
                      >
                        {medicalReports.chiefComplain && (
                          <CheckinItem
                            checkedIn={checkedIn}
                            date={
                              // @ts-ignore
                              medicalReports.chiefComplain.createdAt ||
                              new Date().toString()
                            }
                            onDelete={handleDeleteMedicalReport}
                            onEdit={handleEditMedicalReport}
                            title="Chief Complain"
                          >
                            {medicalReports.chiefComplain}
                          </CheckinItem>
                        )}

                        {physicalExaminationResult &&
                          physicalExaminationResult.createdAt && (
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
                              date={physicalExaminationResult.updatedAt}
                              showModal={() => setShowModal(true)}
                            />
                          )}
                        {
                          // @ts-ignore
                          (checkInData?.clinicalSigns ||
                            medicalReports.clinicalSigns.length ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.clinicalSignsDate}
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
                          )
                        }

                        {/* Tentative medical test */}
                        {
                          // @ts-ignore
                          (checkInData?.tentativeDiagnosis ||
                            medicalReports.tentativeDiagnosis.tentative
                              .length ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.tentativeDiagnosisDate}
                              onDelete={() =>
                                handleDeleteMedicalReport("diagnosis", {
                                  tentativeDiagnosis: {
                                    differential: "",
                                    tentative: "",
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
                              <p>
                                {medicalReports.tentativeDiagnosis.tentative}
                              </p>
                            </CheckinItem>
                          )
                        }
                        {
                          // @ts-ignore
                          (checkInData?.diagnosticTest ||
                            medicalReports.diagnosticTest.length ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.diagnosticTestDate}
                              onDelete={handleDeleteDiagnosticTest}
                              onEdit={handleEditDiagnosticTest}
                              title="Diagnostic Test"
                            >
                              <p>{medicalReports.diagnosticTest}</p>
                            </CheckinItem>
                          )
                        }

                        {
                          // @ts-ignore
                          (checkInData?.finalDiagnosis ||
                            medicalReports.finalDiagnosis.length ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.finalDiagnosisDate}
                              onDelete={() =>
                                handleDeleteMedicalReport("final-diagnosis", {
                                  finalDiagnosis: "",
                                })
                              }
                              onEdit={handleEditFinalDiagnosis}
                              title="Final Diagnosis"
                            >
                              <p>{medicalReports.finalDiagnosis}</p>
                            </CheckinItem>
                          )
                        }
                        {
                          // @ts-ignore
                          (checkInData?.treatment ||
                            medicalReports.treatment.length ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.treatmentDate}
                              onDelete={() =>
                                handleDeleteMedicalReport("treatment", {
                                  treatment: "",
                                })
                              }
                              onEdit={handleEditTreatment}
                              title="Treatment"
                            >
                              <p>{medicalReports.treatment}</p>
                            </CheckinItem>
                          )
                        }
                        {
                          // @ts-ignore
                          (checkInData?.vaccination ||
                            medicalReports.vaccination.name ||
                            "") && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.vaccinationDate}
                              onDelete={() =>
                                handleDeleteMedicalReport("vaccination", {
                                  vaccination: {
                                    dosage: "",
                                    emailReminder: false,
                                    name: "",
                                    nextDate: "",
                                    smsReminder: false,
                                    type: "",
                                  },
                                })
                              }
                              onEdit={handleEditVaccination}
                              title="Vaccination"
                            >
                              <ul>
                              <li>
                                  Date Administered:{" "}
                                  {
                                    // @ts-ignore
                                  formatDate(medicalReports?.vaccinationDate)}
                                </li>
                                <li>
                                  Vaccine Name:{" "}
                                  {medicalReports?.vaccination?.name ||
                                    // @ts-ignore
                                    medicalReports?.vaccination?.nameOfVaccine}
                                </li>
                                <li>
                                  Vaccination Type:{" "}
                                  {medicalReports?.vaccination?.type ||
                                    // @ts-ignore
                                    medicalReports?.vaccination
                                     // @ts-ignore
                                      ?.vaccinationType}
                                </li>
                                <li>
                                  Dosage: {medicalReports?.vaccination?.dosage}
                                </li>
                                <li>
                                  Date of Next Shot:{" "}
                                  {formatDate(medicalReports?.vaccination?.nextDate) ||
                                    // @ts-ignore
                                    formatDate(medicalReports?.vaccination?.dateOfNextShot)}
                                </li>
                                <li>
                                  Email Reminder:{" "}
                                  {medicalReports?.vaccination?.emailReminder
                                    ? "Yes"
                                    : "No"}
                                </li>
                                <li>
                                  SMS Reminder:{" "}
                                  {medicalReports?.vaccination?.smsReminder
                                    ? "Yes"
                                    : "No"}
                                </li>
                              </ul>
                            </CheckinItem>
                          )
                        }
                        {
                          // @ts-ignore
                          (checkInData?.notes || medicalReports.note) && (
                            <CheckinItem
                              checkedIn={checkedIn}
                              date={medicalReports.noteDate}
                              onDelete={() =>
                                handleDeleteMedicalReport("notes", {
                                  note: "",
                                })
                              }
                              onEdit={handleEditNoteReport}
                              title="Note"
                            >
                              {medicalReports.note}
                            </CheckinItem>
                          )
                        }
                        {
                          // @ts-ignore
                          checkInMedicalBill && checkInMedicalBill.id && (
                            <CheckinItem
                              checkedIn={checkedIn}
                               // @ts-ignore
                              date={checkInMedicalBill.createdAt}
                              onDelete={() => handleDeleteMedicalBill()}
                              onEdit={() => {
                                handleEditMedicalBill();
                              }}
                              title="Medical Bill"
                            >
                              <ul className="medical__bill__report">
                                { // @ts-ignore
                                checkInMedicalBill.services.map((service, index) => {
                                  return (
                                    <li key={index}>
                                      <span>{service.name}</span>
                                      <span>
                                        ₦{service.amount || service.charge}
                                      </span>
                                    </li>
                                  );
                                })}
                                <li style={{ marginTop: "1rem" }}>
                                  <span>
                                    <strong>Paid</strong>
                                  </span>
                                  <span style={{ color: "#1E638F" }}>
                                    <strong>
                                      ₦{ // @ts-ignore
                                      checkInMedicalBill.amountPaid}
                                    </strong>
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    <strong>To Balance</strong>
                                  </span>
                                  <span style={{ color: "#F2761D" }}>
                                    <strong>
                                      ₦{ // @ts-ignore
                                      checkInMedicalBill.amountToBalance}
                                    </strong>
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    <strong>Payment Method</strong>
                                  </span>
                                  <span>
                                    <strong>
                                      { // @ts-ignore
                                      checkInMedicalBill.paymentMethod}
                                    </strong>
                                  </span>
                                </li>
                              </ul>
                            </CheckinItem>
                          )
                        }
                      </MedicalRecordsItems>
                    )}

                    {"Laboratory" === activeCheckedInItem && (
                      <LaboratoryTab
                        checkInData={checkInData}
                        patientData={patientData}
                      />
                    )}
                    {"Radiology" === activeCheckedInItem && (
                      <Radiology checkInData={checkInData} />
                    )}
                    {"Appointment" === activeCheckedInItem && (
                      <Appointment
                        // @ts-ignore
                        appointments={patientData?.appointments}
                        patientNo={
                          // @ts-ignore
                          patientData.id
                        }
                      />
                    )}
                  </>
                </CheckedinItemsDisplay>
              )}
              {!checkedIn && (
                <CheckinItemsDisplay>
                  <PhysicalCheckResult
                    checkedIn={checkedIn}
                    onAddNew={() => setShowModal(true)}
                    physicalExaminationResult={physicalExaminationResult}
                    showModal={() => setShowModal(true)}
                  />
                </CheckinItemsDisplay>
              )}
            </div>
          </div>
          {checkedIn && (
            <div className="patient__checkin__container--checkin--navigator">
              <span
                onClick={() => {
                  const newIndex =
                    checkinDataIndex > 0 ? checkinDataIndex - 1 : 0;
                  setCheckinDataIndex(newIndex);
                  setCheckIndata(patientData.checkins[newIndex]);
                   // @ts-ignore
                  fetchMedicalBillForCheckin(patientData.checkins[newIndex].id);
                  populateCheckInData(patientData.checkins[newIndex]);
                }}
              >
                <svg
                  width="19"
                  height="36"
                  viewBox="0 0 19 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 18L18.75 35.3205L18.75 0.679491L0 18Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span className="checkin__navigator--counter">
                Doc {checkinDataIndex + 1} of {patientData.checkins.length}
              </span>
              <span
                onClick={() => {
                  const newIndex =
                    checkinDataIndex < patientData.checkins.length - 1
                      ? checkinDataIndex + 1
                      : patientData.checkins.length - 1;
                  setCheckinDataIndex(newIndex);
                  setCheckIndata(patientData.checkins[newIndex]);
                   // @ts-ignore
                  fetchMedicalBillForCheckin(patientData.checkins[newIndex].id);
                  populateCheckInData(patientData.checkins[newIndex]);
                }}
              >
                <svg
                  width="19"
                  height="36"
                  viewBox="0 0 19 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 18L0.25 0.679489L0.25 35.3205L19 18Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
          )}
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
            <Button onClick={() => checkOut(patientId)}>Check Out</Button>
          </div>
        )}
      </div>
      <Modal
        closeModal={() => {
          setShowModal(false);
        }}
        fullMode={true}
        visible={showModal}
      >
        <PhysicalExaminationModal
          loading={modalLoading}
          onAddResult={handleAddResult}
          onCancel={() => setShowModal(false)}
          onDeleteResult={() => handleDeleteItem("physicalExamination")}
          onEditResult={handleEditPhysicalResult}
          result={physicalExaminationResult}
        />
      </Modal>

      <MedicalRecordModal
        modalLoading={modalLoading}
        show={showMedicalModal}
        medicalBillData={checkInMedicalBill}
        // @ts-ignore
        onDeleteItem={handleDeleteItem}
        // @ts-ignore
        closeModal={() => {
          setShowMedicalModal(false);
          setMedicalContentState("");
        }}
        // @ts-ignore
        billingServices={billingServices}
        getResult={(data: object, field: string) => {
          handleGetMedicalReportData(data, field);
        }}
        currentModal={medicalContentState}
        results={medicalReports}
      />
      <CalculatorModal
        closeModal={() => setShowCalculator(false)}
        visible={showCalculator}
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
