import { formatDate } from "lib/utils";
import React from "react";
import CheckinItem from "./CheckinItem";

export interface IphysicalExamination {
  pulseRate: string;
  respiratoryRate: string;
  consistencyOfFaeces: string;
  natureOfBreathing: string;
  rectalTemperature: string;
  ocularMucousMembrane: string;
  oralMucousMembrane: string;
  nasalCavity: string;
  integumentFur: string;
  natureOfLesion: string;
  locationOfLesion: string;
  ectoparasite: string;
  generalDisposation: string;
  conformation: string;
  anyDiarrhea: string;
  natureOfDiarrhea: string;
  lungsSound: string;
  anyLameness: string;
  lamenessLocation: string;
  rectalExamination: string;
  prepuceVulvaExamination: string;
  updatedAt?: string;
}

const PhysicalCheckResult = (props: {
  physicalExaminationResult: IphysicalExamination;
  showModal: Function;
  onAddNew: Function;
  onEdit?: Function;
  onDelete?: Function;
  checkedIn: Boolean;
}) => {
  const { physicalExaminationResult } = props;
  
  return (
    <CheckinItem
      checkedIn={props.checkedIn}
      date={
        // @ts-ignore
        formatDate(physicalExaminationResult?.updatedAt)}
      onAddNew={() => props?.onAddNew()}
       // @ts-ignore
      onDelete={() => props?.onDelete()}
       // @ts-ignore
      onEdit={() => props?.onEdit()}
      title="Physical Examination"
    >
      <div className="patient__checkin__exam__result">
        {physicalExaminationResult.respiratoryRate && (
          <ul className="exam__result__list">
            {[
              {
                label: "Rectal Temperature",
                value: physicalExaminationResult.rectalTemperature,
              },
              {
                label: "Respiratory Rate",
                value: physicalExaminationResult.respiratoryRate,
              },
              {
                label: "Pulse Rate",
                value: physicalExaminationResult.pulseRate,
              },
              {
                label: "Consisitencies of feaces",
                value: physicalExaminationResult.consistencyOfFaeces,
              },
              {
                label: "Nature of breathing",
                value: physicalExaminationResult.natureOfBreathing,
              },
              {
                label: "Ocular Mucous Membrane",
                value: physicalExaminationResult.ocularMucousMembrane,
              },
              {
                label: "Oral Mucous Membrane",
                value: physicalExaminationResult.oralMucousMembrane,
              },
              {
                label: "Nasal cavity",
                value: physicalExaminationResult.nasalCavity,
              },
              {
                label: "Integument/Fur",
                value: physicalExaminationResult.integumentFur,
              },
              {
                label: "Nature of Lesion ",
                value: physicalExaminationResult.natureOfLesion,
              },
              {
                label: "Location of Lesion ",
                value: physicalExaminationResult.locationOfLesion,
              },
              {
                label: "Ectoparasite",
                value: physicalExaminationResult.ectoparasite,
              },
              {
                label: "General Disposation",
                value: physicalExaminationResult.generalDisposation,
              },
              {
                label: "Conformation",
                value: physicalExaminationResult.conformation,
              },
              {
                label: "Any Diarrhea",
                value: physicalExaminationResult.anyDiarrhea,
              },
              {
                label: "Nature of Diarrhea",
                value: physicalExaminationResult.natureOfDiarrhea,
              },
              {
                label: "Lungs Sound",
                value: physicalExaminationResult.lungsSound,
              },
              {
                label: "Any Lameness",
                value: physicalExaminationResult.anyLameness,
              },
              {
                label: "Lameness Location",
                value: physicalExaminationResult.lamenessLocation,
              },
              {
                label: "Rectal examination",
                value: physicalExaminationResult.rectalExamination,
              },
              {
                label: "Prepuce/Vulva Examination",
                value: physicalExaminationResult.prepuceVulvaExamination,
              },
            ].map(({label, value}, index) => {
              return (
                <li className="exam__result__item" key={index}>
                  <span className="exam__result__item--name">{label}</span>
                  <span className="exam__result__item--value">{value}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </CheckinItem>
  );
};

export default PhysicalCheckResult;
