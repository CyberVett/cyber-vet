import { composeClasses } from 'lib/utils';
import React, { ElementType } from 'react';

import styles from './sectionHeader.module.scss';

export interface ISectionHeaderProps {
  className?: string;
  RenderTitle?: ElementType;
  title?: string;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  children, className, RenderTitle, title,
}) => {
  return (
    <div className={composeClasses(styles.container, className)}>
      <h2 className={styles.title}>
        {
          typeof RenderTitle === 'function'
            ? <RenderTitle />
            : title
        }
      </h2>

      <div className={styles.rightItems}>
        {children}
      </div>
    </div>
  );
};

export default SectionHeader;


export const SubSectionHeader: React.FC<{
  title: string;
}> = ({
  title,
}) => {
  return (
    <h3 className={styles.subsectionHeader}>
      {title}
    </h3>
  );
};
