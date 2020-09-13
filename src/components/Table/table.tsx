/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { composeClasses } from 'lib/utils';
import styles from './table.module.scss';

const Table: React.FC<{
  data: any[];
  headers?: {
    className?: string;
    id: number;
    label: string | JSX.Element;
  }[];
  renderRow: (row: any) => any;
}> = ({ data = [], headers = [], renderRow }) => {
    return (

      <table className={styles.table}>
        <thead>
          <tr>
            {
              headers.map(header => (
                <th key={header.id} className={composeClasses(header.className)}>
                  {header.label}
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            Array.isArray(data) && data.map((rowItem: any) => renderRow(rowItem))
          }
        </tbody>
      </table>
    );
  };


export default Table;
