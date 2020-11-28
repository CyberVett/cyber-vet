import React from 'react'
import styles from './patient.module.scss';

export const PatientSection = ({ // @ts-ignore
  data }) => {
  return (
    <div className={styles.columnGrid}>
      <div>
        <table>
          <tr>
            <td>Colour</td>
            <td>{data.colour}</td>
          </tr>
          <tr>
            <td>Flock Size</td>
            <td>{data.flockHerdSize}</td>
          </tr>
          <tr>
            <td>Purpose of Keeping</td>
            <td>{data.purposeOfKepping}</td>
          </tr>
          <tr>
            <td>Type of Food</td>
            <td>{data.typeOfFood}</td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>Source</td>
            <td>{data.source}</td>
          </tr>
          <tr>
            <td>Water Source</td>
            <td>{data.waterSource}</td>
          </tr>
          <tr>
            <td>Vaccination</td>
            <td>{data.vaccination}</td>
          </tr>
          <tr>
            <td>Vaccination Used</td>
            <td>{data.vaccineUsed}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}