import React from "react";
import { NextPage, NextPageContext } from "next";

import Button from "components/Button/button";
// import {
//   FormErrors,
//   Input,
//   InputGroup,
//   InputValidationTypes,
//   Label,
//   Select,
// } from "components/Input/input";
// import { SubSectionHeader } from "components/SectionHeader/sectionHeader";
// import Button from "components/Button/button";

import styles from "./patient.module.scss";
// import requestClient from "lib/requestClient";
// import { getAge } from "lib/utils";
// import Modal from "components/Modal/modal";
// import ProgressBar from "components/ProgressBar/progressBar";
// import Router from "next/router";
// import { ISpecies } from "./addPatient";

// interface IEditPatient {
//   clientId: string;
//   name: string;
//   specie: string;
//   breed: string;
//   gender: string;
//   colour: string;
//   dob: string;
//   status: string;
//   ageWhenAcquired: string;
//   source: string;
//   flockHerdSize: string;
//   purposeOfKepping: string;
//   typeOfFood: string;
//   waterSource: string;
//   managementSystem: string;
//   vaccination: string;
//   vaccineUsed: string;
//   treatmentWarnings: string;
//   imageUrl: string;
//   otherSpecie: string;
//   otherPurposeOfKepping: string;
//   otherVaccination: string;
// }

const PatientDetails = () => {
  return (
    <div className="patient__details">
      <div className="patient__details--info">
        <div className="patient__info--title">Client's Name</div>
        <div className="patient__info--value">Mr Oladele Mayowa</div>
        <div className="patient__info--title">Patient Name</div>
        <div className="patient__info--value">Demara</div>
        <div className="patient__info--title">Specie</div>
        <div className="patient__info--value">Canine</div>
        <div className="patient__info--title">Breed</div>
        <div className="patient__info--value">Rottweiler</div>
        <div className="patient__info--title">Sex</div>
        <div className="patient__info--value">Male</div>

        <div className="patient__info--title">Age</div>
        <div className="patient__info--value">1 year, 2 Months, 21 Days</div>

        <div className="patient__info--title">Date Registered</div>
        <div className="patient__info--value">16/08/2020</div>
        <div className="patient__info--title">Number of visit</div>
        <div className="patient__info--value">0</div>
      </div>

      <div className="patient__details--img">
        <img src="https://res.cloudinary.com/dzgdxmfjw/image/upload/v1601793472/zuk4vuzk2epspzrsyphf.jpg" />

        <div>
          Status: <span className="status">Alive</span>
        </div>
      </div>
    </div>
  );
};

const CheckinItem = (props) => {
  return (
    <div className="checkin__item">
      <div className="checkin__item--head">
        <div className="item__head--title">{props.title}</div>
        <div className="item__head--actions">{props.actions}</div>
      </div>

      <div className="checkin__item--content">{props.children}</div>
    </div>
  );
};

const PatientCheckIn: NextPage<{ patientId: string }> = ({ patientId }) => {
  //   const [species, setSpecies] = useState<ISpecies[]>([]);
  //   const [patientInput, setPatientInput] = useState<IEditPatient>({
  //     clientId: "",
  //     name: "",
  //     specie: "",
  //     breed: "",
  //     gender: "",
  //     colour: "",
  //     dob: "",
  //     status: "",
  //     ageWhenAcquired: "",
  //     source: "",
  //     flockHerdSize: "",
  //     purposeOfKepping: "",
  //     typeOfFood: "",
  //     waterSource: "",
  //     managementSystem: "",
  //     vaccination: "",
  //     vaccineUsed: "",
  //     treatmentWarnings: "",
  //     imageUrl: "",
  //     otherSpecie: "",
  //     otherPurposeOfKepping: "",
  //     otherVaccination: "",
  //   });
  //   const [loading, setLoading] = useState(false);
  //   const [showModal, setShowModal] = useState(false);
  //   const [percentage, setPercentage] = useState(0);
  //   const [error, setError] = useState("");
  //   const fileInput = useRef();

  //   const handleInputChange = (event: {
  //     persist: () => void;
  //     target: { name: any; value: any };
  //   }) => {
  //     event.persist();
  //     setPatientInput((input: any) => ({
  //       ...input,
  //       [event.target.name]: event.target.value,
  //     }));
  //   };

  //   useEffect(() => {
  //     setLoading(true);
  //     requestClient
  //       .get(`patients/${patientId}`)

  //       .then((response) => {
  //         setLoading(false);
  //         if (response.status === 200 && response.statusText === "OK") {
  //           setPatientInput(response.data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log(error.response);
  //         setError(error.response.data.message);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     setLoading(true);
  //     requestClient
  //       .get("settings/species")
  //       .then((response) => {
  //         setLoading(false);
  //         if (response.status === 200 && response.statusText === "OK") {
  //           setSpecies(response.data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log(error);
  //       });
  //   }, []);

  //   const handleFileChange = (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     let formData = new FormData();
  //     //  @ts-ignore
  //     formData.append("image", fileInput?.current?.files[0]);
  //     requestClient
  //       .post("images", formData, {
  //         onUploadProgress: (ProgressEvent) => {
  //           const { loaded, total } = ProgressEvent;
  //           setPercentage(Math.floor((loaded * 100) / total));
  //         },
  //       })
  //       .then((res) => {
  //         setLoading(false);
  //         patientInput.imageUrl = res.data.imageUrl;
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log(err);
  //       });
  //   };

  //   const submitPatientForm = (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     requestClient
  //       .put(`patients/${patientId}`, {
  //         // @ts-ignore
  //         clientId: patientInput.clientId.clientId,
  //         name: patientInput.name,
  //         specie:
  //           patientInput.specie === "Others"
  //             ? patientInput.otherSpecie
  //             : patientInput.specie,
  //         breed: patientInput.breed,
  //         gender: patientInput.gender,
  //         colour: patientInput.colour,
  //         dob: patientInput.dob,
  //         status: patientInput.status,
  //         ageWhenAcquired: patientInput.ageWhenAcquired,
  //         source: patientInput.source,
  //         flockHerdSize: patientInput.flockHerdSize,
  //         purposeOfKepping:
  //           patientInput.purposeOfKepping === "5"
  //             ? patientInput.otherPurposeOfKepping
  //             : patientInput.purposeOfKepping,
  //         typeOfFood: patientInput.typeOfFood,
  //         waterSource: patientInput.waterSource,
  //         managementSystem: patientInput.managementSystem,
  //         vaccination:
  //           patientInput.vaccination === "4"
  //             ? patientInput.otherVaccination
  //             : patientInput.vaccination,
  //         vaccineUsed: patientInput.vaccineUsed,
  //         treatmentWarnings: patientInput.treatmentWarnings,
  //         imageUrl: patientInput.imageUrl,
  //       })
  //       .then((response) => {
  //         setLoading(false);
  //         if (response.status === 200 && response.statusText === "OK") {
  //           setShowModal(true);
  //         } else {
  //           setLoading(false);
  //           setError(response.data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         setError(error.response.data.message);
  //       });
  //   };
  return (
    <div className="patient__checkin">
      <div className="patient__checkin__container">
        <div className="patient__checkin__container--header">
          <h1>Patient Check In</h1>
        </div>
        <div className="patient__checkin__container--content">
          <div className="checkin__card">
            <div className="checkin__card--header">
              <span>Signalment</span>
              <span>Patient No: SAC01/16/08/2020</span>
            </div>
            <div className="checkin__card--body">
              <PatientDetails />
              <div style={{ padding: "1rem" }}>
                <p style={{ color: "red" }}>Treatment warnings and allergies</p>
              </div>
              <div className="checkin__items">
                <div>
                  <form className="checkin-form">
                    <div className="form-item">
                      <label>Check In</label>

                      <input type="text" defaultValue={new Date()} />
                    </div>

                    <div className="form-item">
                      <label>Visit Type</label>

                      <select>
                        {[{ value: "Follow Up", label: "Follow Up" }].map(
                          (opt) => {
                            return (
                              <option value={opt.value}>{opt.label}</option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </form>
                </div>
                <CheckinItem
                  title="Physical Examination"
                  actions={
                    <>
                      <Button>Add New Results</Button>
                    </>
                  }
                >
                  <div>This is the children</div>
                </CheckinItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PatientCheckIn.getInitialProps = async ({ query }: NextPageContext) => {
  const patientId = (query && query.patientId) as string;
  return {
    patientId,
  };
};

export default PatientCheckIn;
