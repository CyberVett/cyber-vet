import React from "react";
import ChiefComplainReport from "./ChiefComplainReport";
import Modal from "../Modal/modal";

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
      {currentModal === "Chief complain" && (
        <ChiefComplainReport
          onCancel={closeModal}
          title={currentModal}
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
      {currentModal === "Note" && <>Toggle Note</>}
      {currentModal === "Medical Bill" && <>Toggle Medical Bill</>}
    </Modal>
  );
};

export default MedicalRecordModal;
