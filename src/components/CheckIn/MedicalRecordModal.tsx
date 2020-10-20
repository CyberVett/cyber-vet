import React from "react";
import ChiefComplainReport from "./ChiefComplainReport";
import NoteReport from "./NoteReport";
import ClinicalSignsReport from "./ClinicalSignsReport";
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
      {currentModal === "Diagnosis Test" && <>Toggle Diagnosis Test</>}
      {currentModal === "Final Diagnosis" && <>Toggle Final Diagnosis</>}
      {currentModal === "Treatment" && <>Toggle Treatment</>}
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
}

export default MedicalRecordModal;
