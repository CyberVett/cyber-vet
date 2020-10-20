import React from "react";
import ChiefComplainReport from "./ChiefComplainReport";
import NoteReport from "./NoteReport";
import ClinicalSignsReport from "./ClinicalSignsReport";
import DiagnosticTestReport from "./DiagnosticTestReport";
import TreatmentReport from "./TreatmentReport";
import FinalDiagnosisReport from "././FinalDiagnosisReport";
import Modal from "../Modal/modal";

const MedicalRecordModal = ({
  show,
  currentModal,
  getResult,
  closeModal,
  results,
}: {
  show: boolean;
  currentModal: string;
  getResult: Function;
  closeModal: Function;
  results: IMedicalReport;
}) => {
  return (
    <Modal
      fullMode={true}
      visible={show}
      closeModal={() => {
        closeModal(false);
      }}
    >
      {currentModal === "Chief Complain" && (
        <ChiefComplainReport
          onCancel={closeModal}
          title={currentModal}
          data={results.chiefComplain}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}
      {currentModal === "Physical Examination" && (
        <>Toggle Physical Examination</>
      )}
      {currentModal === "Clinical Signs" && (
        <ClinicalSignsReport
          onCancel={closeModal}
          title={currentModal}
          data={results.clinicalSigns}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}
      {currentModal === "Tentative Diagnosis" && (
        <>Toggle Tentative Diagnosis</>
      )}
      {currentModal === "Diagnostic Test" && (
        <DiagnosticTestReport
          onCancel={closeModal}
          title={currentModal}
          data={results.diagnosticTest}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}

      {currentModal === "Treatment" && (
        <TreatmentReport
          onCancel={closeModal}
          title={currentModal}
          data={results.treatment}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}
      {currentModal === "Final Diagnosis" && (
        <FinalDiagnosisReport
          onCancel={closeModal}
          title={currentModal}
          data={results.finalDiagnosis}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}
      {currentModal === "Vaccination" && <>Toggle Vaccination</>}
      {currentModal === "Note" && (
        <NoteReport
          onCancel={closeModal}
          title={currentModal}
          data={results.note}
          onAdd={(data: {}) => getResult(data, currentModal)}
        />
      )}
      {currentModal === "Medical Bill" && <>Toggle Medical Bill</>}
    </Modal>
  );
};

export interface IMedicalReport {
  chiefComplain: string;
  note: string;
  clinicalSigns: string[];
  diagnosticTest: string[];
  treatment: string[];
  finalDiagnosis: string[];
}

export default MedicalRecordModal;
