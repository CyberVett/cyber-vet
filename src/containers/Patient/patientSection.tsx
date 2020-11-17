import React from 'react'

export const PatientSection = ({ data }) => {
console.log('whodey', data);

  return (
    <div>
      <div></div>
      <div></div>
      <h4>Name: {data?.title} {data.firstName} {data.otherName} {data.lastName}</h4>
      <h4>Gender: {data.gender}</h4>
      <h4>Address: {data.address}</h4>
      <h4>Phone: {data.phoneNumber}</h4>
      <h4>Email: {data.email} </h4>
    </div>
  )
}