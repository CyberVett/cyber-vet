import Button, { ButtonTypes } from 'components/Button/button';
import CheckinItem from 'components/CheckIn/CheckinItem';
import { InputGroup, Label } from 'components/Input/input';
import { formatDate } from 'lib/utils';
import React, { useState } from 'react';

import styles from './radiology.module.scss';
import RadiologyModal from './radiologyModal';

const Radiology: React.FC<{ checkInData: any }> = ({ checkInData }) => {
  const { radiology } = checkInData;
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  
  return (
    <section>
      <div className={styles.formMenu}>
        <Button onClick={() => setToggleModal(true)} type={ButtonTypes.primary}>+ Radiology</Button>
      </div>
      <div className={styles.formDetails}>
        <div className={styles.formDetailsInfo}>
          <InputGroup>
            <Label>Check In</Label>
            <input
              disabled
              placeholder={formatDate(checkInData?.createdAt) || ""} />
          </InputGroup>
          <InputGroup>
            <Label>Visit Type</Label>
            <select>
              <option>Follow up</option>
              <option>First Visit</option>
            </select>
          </InputGroup>
          <InputGroup>
            <Label>Doctor</Label>
            <input
              disabled
              placeholder={`${checkInData?.checkInBy?.firstName} ${checkInData?.checkInBy?.otherName} ${checkInData?.checkInBy?.lastName}`} />
          </InputGroup>
          <InputGroup>
            <Label>Check Out</Label>
            <input
              disabled
              placeholder={''} />
          </InputGroup>
        </div>
      </div>
      <CheckinItem
        checkedIn={true}
        date={checkInData?.createdAt}
        disableDelete
        onDelete={() => { }}
        onEdit={() => {
          setToggleEditModal(true);
        }}
        title="Radiology Test"
      >
        {
          radiology === null ? <h4>No Radiology  Record Found</h4> :
            <div className={styles.formDetailsGrid}>
              <div>
                <table>
                  <tr>
                    <td>KV</td>
                    <td>{radiology?.KV}</td>
                  </tr>
                  <tr>
                    <td>MA</td>
                    <td>{radiology?.MA}</td>
                  </tr>
                  <tr>
                    <td>MAS</td>
                    <td>{radiology?.MAS}</td>
                  </tr>
                  <tr>
                    <td>MCHC</td>
                    <td>{radiology?.MCHC}</td>
                  </tr>
                  <tr>
                    <td>XRayRoomNo:</td>
                    <td>{radiology?.XRayRoomNo}</td>
                  </tr>
                  <tr>
                    <td>Clinical notes</td>
                    <td>{radiology?.clinicalNotes}</td>
                  </tr>
                  <tr>
                    <td>Examination Required</td>
                    <td>{radiology?.examinationRequired}</td>
                  </tr>
                  <tr>
                    <td>Remarks</td>
                    <td>{radiology?.shortRemarks}</td>
                  </tr>
                </table>
              </div>
              <div>
                <table>
                  <tr>
                    <td>Provisional Diagnostic</td>
                    <td>{radiology?.examinationRequired}</td>
                  </tr>
                  <tr>
                    <td>Reaction</td>
                    <td>{radiology?.reaction}</td>
                  </tr>
                  <tr>
                    <td>Remarks</td>
                    <td>{radiology?.remarks}</td>
                  </tr>
                  <tr>
                    <td>Report</td>
                    <td>{radiology?.report}</td>
                  </tr>
                  <tr>
                    <td>secs</td>
                    <td>{radiology?.secs}</td>
                  </tr>
                  <tr>
                    <td>Contrast Injected Rate</td>
                    <td>{radiology?.contrastInjectedRate}</td>
                  </tr>
                  <tr>
                    <td>Contrast Injected Type</td>
                    <td>{radiology?.contrastInjectedType}</td>
                  </tr>
                  <tr>
                    <td>Contrast Injected Volume</td>
                    <td>{radiology?.contrastInjectedVolume}</td>
                  </tr>
                </table>
              </div>
            </div>}
      </CheckinItem>
      <RadiologyModal
        checkInID={checkInData.id}
        closeModal={() => {
          setToggleModal(false);
          window.location.reload();
        }}
        patientNo={checkInData.patientId}
        visible={toggleModal}
      />
      {/* Edit Modal */}
      <RadiologyModal
        checkInData={radiology}
        checkInID={checkInData.id}
        closeModal={() => {
          setToggleEditModal(false);
          window.location.reload();
        }}
        patientNo={checkInData.patientId}
        visible={toggleEditModal}
      />
    </section>
  )
};

export default Radiology;