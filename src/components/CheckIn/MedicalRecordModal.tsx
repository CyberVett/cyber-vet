import React from "react";
import ChiefComplainReport from "./ChiefComplainReport";
import NoteReport from "./NoteReport";
import ClinicalSignsReport from "./ClinicalSignsReport";
import DiagnosticTestReport from "./DiagnosticTestReport";
import TreatmentReport from "./TreatmentReport";
import FinalDiagnosisReport from "././FinalDiagnosisReport";
import TentativeDiagnosticReport from "./TentativeDiagnosticReport";
import VacinationReport from "./VacinationReport";
import MedicalBill from "./MedicalBill";
import Modal from "../Modal/modal";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";

const MedicalRecordModal = ({
  show,
  currentModal,
  getResult,
  closeModal,
  results,
  modalLoading,
  billingServices,
  medicalBillData,
}: {
  show: boolean;
  modalLoading: boolean;
  currentModal: string;
  getResult: Function;
  closeModal: Function;
  results: IMedicalReport;
  billingServices: object;
  medicalBillData: object;
}) => {
  return (
    <Modal
      fullMode={true}
      visible={show}
      closeModal={() => {
        closeModal(false);
      }}
    >
      {modalLoading ? (
        <Loader />
      ) : (
        <>
          {currentModal === "Chief Complain" && (
            <ChiefComplainReport
              onCancel={closeModal}
              title={currentModal}
              data={results.chiefComplain}
              date={results.chiefComplainDate}
              added={!!results.chiefComplainDate}
              onAdd={(data: {}) => getResult(data, currentModal)}
            />
          )}
          {currentModal === "Clinical Signs" && (
            <ClinicalSignsReport
              onCancel={closeModal}
              title={currentModal}
              data={results.clinicalSigns}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.clinicalSignsDate}
              added={!!results.clinicalSignsDate}
            />
          )}
          {currentModal === "Tentative Diagnosis" && (
            <TentativeDiagnosticReport
              onCancel={closeModal}
              title={currentModal}
              data={results.tentativeDiagnosis}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.tentativeDiagnosisDate}
              added={!!results.tentativeDiagnosisDate}
            />
          )}
          {currentModal === "Diagnosis Test" && (
            <DiagnosticTestReport
              onCancel={closeModal}
              title={currentModal}
              data={results.diagnosticTest}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.diagnosticTestDate}
              added={!!results.diagnosticTestDate}
            />
          )}

          {currentModal === "Treatment" && (
            <TreatmentReport
              onCancel={closeModal}
              title={currentModal}
              data={results.treatment}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.treatmentDate}
              added={!!results.treatmentDate}
            />
          )}
          {currentModal === "Final Diagnosis" && (
            <FinalDiagnosisReport
              onCancel={closeModal}
              title={currentModal}
              data={results.finalDiagnosis}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.finalDiagnosisDate}
              added={!!results.finalDiagnosisDate}
            />
          )}
          {currentModal === "Vaccination" && (
            <VacinationReport
              onCancel={closeModal}
              title={currentModal}
              data={{ vaccination: results.vaccination }}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.vaccinationDate}
              added={!!results.vaccinationDate}
            />
          )}
          {currentModal === "Note" && (
            <NoteReport
              onCancel={closeModal}
              title={currentModal}
              data={results.note}
              onAdd={(data: {}) => getResult(data, currentModal)}
              date={results.noteDate}
              added={!!results.noteDate}
            />
          )}
          {currentModal === "Medical Bill" && (
            <MedicalBill
              onCancel={closeModal}
              title={currentModal}
              // @ts-ignore
              billingServices={billingServices}
              // @ts-ignore
              data={medicalBillData}
              date={medicalBillData.createdAt}
              onAdd={(data: {}) => getResult(data, currentModal)}
            />
          )}
        </>
      )}
    </Modal>
  );
};

enum PaymentMethod {
  cash = "CASH",
  card = "CARD",
}

export interface IMedicalReport {
  chiefComplain: string;
  chiefComplainDate?: string;
  note: string;
  noteDate?: string;
  clinicalSigns: string;
  clinicalSignsDate?: string;
  diagnosticTest: string;
  diagnosticTestDate?: string;
  treatment: string;
  treatmentDate?: string;
  finalDiagnosis: string;
  finalDiagnosisDate?: string;

  vaccination: {
    type: string;
    name: string;
    dosage: string;
    nextDate: string;
    smsReminder: boolean;
    emailReminder: boolean;
  };
  vaccinationDate?: string;

  tentativeDiagnosis: {
    differential: string;
    tentative: string;
  };
  tentativeDiagnosisDate?: string;
  medicalBill: {
    services: [{ name: string; price: string }] | null;
    paid: string;
    balance: string;
    method: PaymentMethod | null;
  };
}

export default MedicalRecordModal;
