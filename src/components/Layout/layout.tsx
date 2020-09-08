import React from 'react';
import styles from './layout.module.scss';

const Layout: React.SFC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
