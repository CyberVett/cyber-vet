import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as FolderIcon } from "../../assets/icons/folder.svg";
// import { ReactComponent as PawIcon } from "../../assets/icons/paw.svg";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import { Input } from "components/Input/input";
import Card, { CardHeader } from "components/Card/card";
import Button from "components/Button/button";

import styles from "./dashboard.module.scss";
import { AuthContext } from "contexts/auth";
import requestClient from "lib/requestClient";
import Table from "components/Table/table";
import { AppointmentDashboardHeaders, DashboardPatientHeaders } from "config/constants";
import Router from "next/router";
import { actionButton } from 'containers/Patient/patientList';
import { formatDate } from "lib/utils";

const Dashboard: React.FunctionComponent = () => {
  const { staff, role } = useContext(AuthContext);
  const [patientData, setPatientData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients();
    getAppointments();
  }, []);

  const getPatients = () => {
    requestClient
      .get("patients")
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setPatientData(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  const getAppointments = () => {
    requestClient
      .get("appointments")
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setAppointmentData(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  const checkIn = (id: string) => {
    setLoading(true);
    requestClient.put(`/patients/${id}/check-in`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          Router.push(`/app/patient/checkin/${id}`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }

  // const checkOut = (id: string) => {
  //   setLoading(true);
  //   requestClient.put(`/patients/${id}/check-out`)
  //     .then((response) => {
  //       console.log(response);

  //       setLoading(false);
  //       if (response.status === 200 && response.statusText === 'OK') {
  //         Router.push(`/app/dashboard`);
  //       }
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       console.log(error);
  //     })
  // }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.searchBar}>
          <SearchIcon />
          <Input placeholder="Search Patients" />
        </div>
        <div>
          <Card>
            <CardHeader>Recent patients</CardHeader>
            {loading && <Loader />}
            {patientData.length > 0 && !loading ? (
              <>
                <Table
                  data={patientData}
                  headers={DashboardPatientHeaders}
                  renderRow={(row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        {row.client.title}. {row.client.firstName}{" "}
                        {row.client.firstName}
                      </td>
                      <td>{row.name}</td>
                      <td>{row.specie}</td>
                      <td>{row.breed}</td>
                      <td>{actionButton(row.checkedIn, row.id, checkIn, true)}</td>
                    </tr>
                  )}
                />
              </>
            ) : (
                <div className={styles.patientCardBody}>
                  <FolderIcon />
                  <h3>Add new patient</h3>
                </div>
              )}
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>Appointment</CardHeader>
            {loading && <Loader />}
            {appointmentData.length > 0 && !loading ? (
              <>
                <Table
                  data={appointmentData}
                  headers={AppointmentDashboardHeaders}
                  renderRow={(row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row?.appointmentDate)}</td>
                      <td>{row?.patient?.name}</td>
                      <td>{row?.scheduler?.title}. {row?.scheduler?.firstName} {row?.scheduler?.otherName} {row?.scheduler?.lastName}</td>
                      <td>{row?.reason}</td>
                      <td>{row?.status}</td>
                      <td>&nbsp;</td>
                    </tr>
                  )}
                />
              </>) : (
                <div className={styles.appointmentCardBody}>
                  <FolderIcon />
                  <h3>No appointment added</h3>
                </div>
              )}
          </Card>
        </div>
      </div>
      <aside className={styles.rightInfoPanel}>
        <Button href="/app/patient/add/client">Add New patient</Button>
        <div>
          <Card className={styles.contactCard}>
            <div className={styles.contactCardPhoto}>
              <div>
                {
                  (staff?.imageUrl === null || staff?.imageUrl === "") ?
                    <img
                      alt="admin photo"
                      src={require("../../assets/images/figure.png")}
                    /> : <img
                      alt="admin photo"
                      src={staff?.imageUrl}
                    />
                }
              </div>
              <h3>
                {staff?.title} {staff?.firstName} {staff?.lastName}
              </h3>
              <p>{role}</p>
            </div>
            {/* <h4>0</h4>
            <p>Patient(s)</p> */}
          </Card>
        </div>
        {/* <div>
          <InfoCards data={12} text="New patients today" />
          <InfoCards data={12} text="Total patients" />
        </div> */}
      </aside>
    </div>
  );
};

// interface IInfoCard {
//   data: number;
//   text: string;
// }
// const InfoCards: React.FC<IInfoCard> = ({ data, text }) => (
//   <div className={styles.infoCards}>
//     <div className={styles.infoCardsCircle}>
//       <PawIcon />
//     </div>
//     <div>
//       <h2>{data}</h2>
//       <p>{text}</p>
//     </div>
//   </div>
// );

export default Dashboard;
