import React from "react";
import ChiefComplainReport from "./ChiefComplainReport";
import NoteReport from "./NoteReport";
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
  console.log(currentModal);
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
      {currentModal === "Clinical Signs" && <>Toggle Clinical Signs</>}
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
}

export default MedicalRecordModal;
