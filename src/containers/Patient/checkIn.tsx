import React from "react";
import { NextPage, NextPageContext } from "next";

// import {
//   FormErrors,
//   Input,
//   InputGroup,
//   InputValidationTypes,
//   Label,
//   Select,
// } from "components/Input/input";
// import { SubSectionHeader } from "components/SectionHeader/sectionHeader";
// import Card, { CardHeader } from "components/Card/card";
// import Button from "components/Button/button";

// import styles from "./patient.module.scss";
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
  return <div>Patient Checkin</div>;
};

PatientCheckIn.getInitialProps = async ({ query }: NextPageContext) => {
  const patientId = (query && query.patientId) as string;
  return {
    patientId,
  };
};

export default PatientCheckIn;
