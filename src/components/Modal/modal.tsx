import React, { ReactType } from 'react';

import styles from './modal.module.scss';

interface IModalProps {
  closeModal: () => void;
  fullMode?: boolean;
  Icon?: ReactType;
  subtitle?: string;
  title?: string;
  visible: boolean;
  noTitle?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  children,
  closeModal,
  fullMode,
  Icon,
  subtitle,
  title,
  visible,
  noTitle
}) => {
  if (!visible) return null;

  return (
    <div className={styles.container}>

      <div
        className={styles.overlay}
        onClick={closeModal}
      />

      <div className={composeClasses(styles.modal, fullMode && styles.fullMode)}>
        {/* <CancelIcon className={styles.cancelIcon} onClick={closeModal} /> */}
        <div className={styles.header}>
          {
            (!fullMode && !noTitle) && (
              <>
                <div className={styles.icon}>
                  {Icon && <Icon />}
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.subtitle}>{subtitle}</p>
              </>
            )
          }
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
