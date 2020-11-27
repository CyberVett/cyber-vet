import React from 'react'
import { formatDate } from 'lib/utils'

export const VaccinationSection = ({ 
  // @ts-ignore
  data }) => {

  return (
    data === null ? <h2 style={{textAlign: 'center'}}>No Vaccination Recorded</h2> :
    <div>
      <h4>
        Name:{" "}
        {data?.name ||
          // @ts-ignore
          data?.nameOfVaccine}
      </h4>
      <h4>
        Type:{" "}
        {data?.type ||
          // @ts-ignore
          data?.vaccinationType}
      </h4>
      <h4>
        Dosage: {data?.dosage}
      </h4>
      <h4>
        Date:{" "}
        {data?.nextDate ||
          // @ts-ignore
          formatDate(data?.dateOfNextShot)}
      </h4>
      <h4>
        Email Reminder:{" "}
        {data?.emailReminder?.toString()}
      </h4>
      <h4>
        SMS Reminder:{" "}
        <span>{data?.smsReminder?.toString()}</span>
      </h4>
    </div>
  )
}