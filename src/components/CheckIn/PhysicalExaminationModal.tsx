import React, { useState } from "react";
import Button, { ButtonTypes } from "../Button/button";
import CheckInModalContent from "./CheckInModalContent";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import { IphysicalExamination } from "./PhysicalCheckResult";
import { Input, InputValidationTypes } from "components/Input/input";

const PhysicalExaminationModal = (props: {
  onAddResult: Function;
  onEditResult: Function;
  onDeleteResult: Function;
  onCancel: Function;
  loading: Boolean;
  result: IphysicalExamination;
}) => {
  const handleAddResult = (e: Event) => {
    e.preventDefault();
    props.onAddResult(physicalExamination);
  };

  const handleEditResult = (e: Event) => {
    e.preventDefault();
    props.onEditResult(physicalExamination);
  };

  const [physicalExamination, setPhysicalExamination] = useState(props.result);
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setPhysicalExamination((Input: any) => ({
      ...Input,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <CheckInModalContent
      title="Physical Examination Result"
      // @ts-ignore
      date={physicalExamination?.updatedAt}
      // @ts-ignore
      canEdit={physicalExamination?.createdAt}
    >
      {props.loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <form className="physical__examination__form">
            <div className="physical__examination__form--input">
              <label>Rectal Temperature (°C)</label>
              <Input
                type="text"
                name="rectalTemperature"
                validation={InputValidationTypes.text}
                value={physicalExamination.rectalTemperature}
                defaultValue="38.5 °C"
                onChange={handleInputChange}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Respiratory Rate (cycle/min)</label>
              <Input
                type="text"
                value={physicalExamination.respiratoryRate}
                name="respiratoryRate"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Pulse Rate (Beat/min)</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                value={physicalExamination.pulseRate}
                onChange={handleInputChange}
                name="pulseRate"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Ocular Mucous Membrane</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                name="ocularMucousMembrane"
                value={physicalExamination.ocularMucousMembrane}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Oral Mucous Membrane</label>
              <Input
                onChange={handleInputChange}
                validation={InputValidationTypes.text}
                type="text"
                name="oralMucousMembrane"
                value={physicalExamination.oralMucousMembrane}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Nasal Cavity</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                name="nasalCavity"
                value={physicalExamination.nasalCavity}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Integument Fur</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                value={physicalExamination.integumentFur}
                name="integumentFur"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Nature of lesion</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                defaultValue="None"
                value={physicalExamination.natureOfLesion}
                name="natureOfLesion"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Location of lesion</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                defaultValue="None"
                value={physicalExamination.locationOfLesion}
                name="locationOfLesion"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Ectoparasites</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                defaultValue="Tick, Lice"
                value={physicalExamination.ectoparasite}
                name="ectoparasite"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>General Disposation</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                defaultValue="Active"
                value={physicalExamination.generalDisposation}
                name="generalDisposation"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Conformation</label>
              <Input
                type="text"
                validation={InputValidationTypes.text}
                onChange={handleInputChange}
                value={physicalExamination.conformation}
                name="conformation"
              />
            </div>
            <div className="divider" />
            <div className="physical__examination__form--input">
              <label>Any Diarrhea</label>
              <select
                onChange={handleInputChange}
                defaultValue="true"
                value={physicalExamination.anyDiarrhea}
                name="anyDiarrhea"
              >
                <option label="Yes" value="true">
                  Yes
                </option>
                <option label="No" value="false">
                  Yes
                </option>
              </select>
            </div>

            <div className="physical__examination__form--input">
              <label>Nature of Diarrhea</label>
              <Input
                type="text"
                onChange={handleInputChange}
                validation={InputValidationTypes.text}
                value={physicalExamination.natureOfDiarrhea}
                name="natureOfDiarrhea"
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Consistency of feaces</label>
              <Input
                type="text"
                onChange={handleInputChange}
                defaultValue="Normal"
                validation={InputValidationTypes.text}
                value={physicalExamination.consistencyOfFaeces}
                name="consistencyOfFaeces"
                
              />
            </div>
            <div className="physical__examination__form--input">
              <label>Nature of Breathing</label>
              <Input
                type="text"
                onChange={handleInputChange}
                name="natureOfBreathing"
                validation={InputValidationTypes.text}
                value={physicalExamination.natureOfBreathing}
              />
            </div>
            <div className="physical__examination__form--input">
              <label>Lungs Sound</label>
              <Input
                type="text"
                onChange={handleInputChange}
                defaultValue="Normal"
                name="lungsSound"
                validation={InputValidationTypes.text}
                value={physicalExamination.lungsSound}
              />
            </div>
            <div className="physical__examination__form--input">
              <label>Any Lameness</label>
              <select
                onChange={handleInputChange}
                defaultValue="true"
                value={physicalExamination.anyLameness}
                name="anyLameness"
              >
                <option label="Yes" value="true">
                  Yes
                </option>
                <option label="No" value="false">
                  Yes
                </option>
              </select>
            </div>

            <div className="physical__examination__form--input">
              <label>Lameness Location</label>
              <Input
                type="text"
                onChange={handleInputChange}
                validation={InputValidationTypes.text}
                defaultValue="Right fore limb"
                name="lamenessLocation"
                value={physicalExamination.lamenessLocation}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Rectal Examination</label>
              <Input
                type="text"
                onChange={handleInputChange}
                validation={InputValidationTypes.text}
                defaultValue="Normal"
                name="rectalExamination"
                value={physicalExamination.rectalExamination}
              />
            </div>

            <div className="physical__examination__form--input">
              <label>Prepuce/Vulva Examination</label>
              <Input
                type="text"
                onChange={handleInputChange}
                validation={InputValidationTypes.text}
                name="prepuceVulvaExamination"
                value={physicalExamination.prepuceVulvaExamination}
              />
            </div>
            <div className="physical__examination__form--buttons">
              {
                // @ts-ignore
              props.result.createdAt ? (
                <Button
                  onClick={(e: any) => handleEditResult(e)}
                  type={ButtonTypes.primary}
                >
                  Edit Result
                </Button>
              ) : (
                <Button
                  onClick={(e: any) => handleAddResult(e)}
                  type={ButtonTypes.primary}
                >
                  Add Result
                </Button>
              )}
              <Button onClick={(e) => props.onCancel(e)}>Cancel</Button>
            </div>
          </form>
        </React.Fragment>
      )}
    </CheckInModalContent>
  );
};

export default PhysicalExaminationModal;
