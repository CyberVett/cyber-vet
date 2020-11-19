import React from 'react'

export const VaccinationSection = ({ data }) => {

  return (
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
          data?.dateOfNextShot}
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