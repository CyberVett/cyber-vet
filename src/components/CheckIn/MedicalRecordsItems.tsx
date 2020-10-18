import React from "react";
import Button from "../Button/button";

const MedicalRecordsItems = (props: {
  onRecordItemTypeUpdate: Function;
  children: React.FunctionComponentFactory;
}) => {
  const handleAddMedicalRecordItem = (item: string) => {
    console.log(item);
    props.onRecordItemTypeUpdate(item);
  };

  return (
    <>
      <div className="medical__records">
        <div className="medical__records--buttons">
          <div className="buttons__list">
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Chief Complain")}
            >
              + Chief Complain
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Physical Examination")}
            >
              + Physical Examination
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Clinical Signs")}
            >
              + Clinical Signs
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Tentative Diagnosis")}
            >
              + Tentative Diagnosis
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Diagnosis Test")}
            >
              + Diagnosis Test
            </Button>
          </div>

          <div className="buttons__list">
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Final Diagnosis")}
            >
              + Final Diagnosis
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Treatment")}
            >
              + Treatment
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Vaccination")}
            >
              + Vaccination
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Note")}
            >
              + Note
            </Button>
            <Button
              type="primary"
              onClick={() => handleAddMedicalRecordItem("Medical Bill")}
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
