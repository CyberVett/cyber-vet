import React, { useState } from "react";
import Button from "../Button/button";
import CheckInModalContent from "./CheckinModalContent";

const PhysicalExaminationModal = (props: {
  onAddResult: Function;
  onCancel: Function;
}) => {
  const handleAddResult = (e: Event) => {
    e.preventDefault();
    console.log("Clicked");
    props.onAddResult(physicalExamination);
  };
  const [physicalExamination, setPhysicalExamination] = useState({
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
    consistencyOfFeaces: "",
    natureOfDiarrhea: "",
    anyDiarrhea: "",
    conformation: "",
    generalDisposation: "",
    ectoParasites: "",
    locationOfLesion: "",
    natureOfLesion: "",
    integementFur: "",
    nasalCavity: "",
    oralMucousMembrane: "",
  });
  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setPhysicalExamination((input: any) => ({
      ...input,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <CheckInModalContent
      title="Physical Examination Result"
      date="16/08/2020 12:46 PM"
    >
      <React.Fragment>
        <form className="physical__examination__form">
          <div className="physical__examination__form--input">
            <label>Rectal Temperatur (°C)</label>
            <input
              type="text"
              name={physicalExamination.rectalTemperature}
              defaultValue="38.5 °C"
              onChange={handleInputChange}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Respiratory Rate (cycle/min)</label>
            <input
              type="text"
              value={physicalExamination.respiratoryRate}
              name="respiratoryRate"
              onChange={handleInputChange}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Pulse Rate (Beat/min)</label>
            <input
              type="text"
              value={physicalExamination.pulseRate}
              onChange={handleInputChange}
              name="pulseRate"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Ocular Mucous Membrane</label>
            <input
              type="text"
              onChange={handleInputChange}
              name="ocularMucousMembrane"
              value={physicalExamination.ocularMucousMembrane}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Oral Mucous Membrane</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="oralMucousMembrane"
              value={physicalExamination.oralMucousMembrane}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Nasal Cavity</label>
            <input
              type="text"
              onChange={handleInputChange}
              name="nasalCavity"
              value={physicalExamination.nasalCavity}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Integument Fur</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={physicalExamination.integementFur}
              name="integumentFur"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Nature of lesion</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="None"
              value={physicalExamination.natureOfLesion}
              name="natureOfLesion"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Location of lesion</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="None"
              value={physicalExamination.locationOfLesion}
              name="locationOfLesion"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Ectoparasites</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Tick, Lice"
              value={physicalExamination.ectoParasites}
              name="ectoParasites"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>General Disposation</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Active"
              value={physicalExamination.generalDisposation}
              name="generalDisposation"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Conformation</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={physicalExamination.conformation}
              name="conformation"
            />
          </div>
          <div className="divider" />
          <div className="physical__examination__form--input">
            <label>Any Diarrhea</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={physicalExamination.anyDiarrhea}
              name="anyDiarrhea"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Nature of Diarrhea</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={physicalExamination.natureOfDiarrhea}
              name="natureOfDiarrhea"
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Consistency of feaces</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Normal"
              value={physicalExamination.consistencyOfFeaces}
              name="consistencyOfFeaces"
            />
          </div>
          <div className="physical__examination__form--input">
            <label>Nature of Breathing</label>
            <input
              type="text"
              onChange={handleInputChange}
              name="natureOfBreathing"
              value={physicalExamination.natureOfBreathing}
            />
          </div>
          <div className="physical__examination__form--input">
            <label>Lungs Sound</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Normal"
              name="lungsSound"
              value={physicalExamination.lungsSound}
            />
          </div>
          <div className="physical__examination__form--input">
            <label>Any Lameness</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Yes"
              name="anyLameness"
              value={physicalExamination.anyLameness}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Lameness Location</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Right fore limb"
              name="lamenessLocation"
              value={physicalExamination.lamenessLocation}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Rectal Examination</label>
            <input
              type="text"
              onChange={handleInputChange}
              defaultValue="Normal"
              name="rectalExamination"
              value={physicalExamination.rectalExamination}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Prepuce/Vulva Examination</label>
            <input
              type="text"
              onChange={handleInputChange}
              name="prepuceVulvaExamination"
              value={physicalExamination.prepuceVulvaExamination}
            />
          </div>
          <div className="physical__examination__form--buttons">
            <Button onClick={() => handleAddResult}>Add Result</Button>
            <Button onClick={() => props.onCancel}>Cancel</Button>
          </div>
        </form>
      </React.Fragment>
    </CheckInModalContent>
  );
};

export default PhysicalExaminationModal;
