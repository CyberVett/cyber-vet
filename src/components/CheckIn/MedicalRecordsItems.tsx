import React from "react";
import Button, { ButtonTypes } from "../Button/button";

const MedicalRecordsItems = (props: {
  onRecordItemTypeUpdate: Function;
  children: any;
  checkedIn: boolean;
}) => {
  const handleAddMedicalRecordItem = (item: string) => {
    props.onRecordItemTypeUpdate(item);
  };

  return (
    <>
      <div className="medical__records">
        <div className="medical__records--buttons">
          <div className="buttons__list">
            <Button
              onClick={() => handleAddMedicalRecordItem("Chief Complain")}
              type={ButtonTypes.primary}
            >
              + Chief Complain
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Physical Examination")}
              type={ButtonTypes.primary}
            >
              + Physical Examination
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Clinical Signs")}
              type={ButtonTypes.primary}
            >
              + Clinical Signs
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Tentative Diagnosis")}
              type={ButtonTypes.primary}
            >
              + Tentative Diagnosis
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Diagnosis Test")}
              type={ButtonTypes.primary}
            >
              + Diagnosis Test
            </Button>
          </div>

          <div className="buttons__list">
            <Button
              onClick={() => handleAddMedicalRecordItem("Final Diagnosis")}
              type={ButtonTypes.primary}
            >
              + Final Diagnosis
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Treatment")}
              type={ButtonTypes.primary}
            >
              + Treatment
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Vaccination")}
              type={ButtonTypes.primary}
            >
              + Vaccination
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Note")}
              type={ButtonTypes.primary}
            >
              + Note
            </Button>
            <Button
              onClick={() => handleAddMedicalRecordItem("Medical Bill")}
              type={ButtonTypes.primary}
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

export default MedicalRecordsItems;
