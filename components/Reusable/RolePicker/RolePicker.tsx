import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import addons from '../../../lib/content';

interface Props {
  onClick?: (payload: { primaryRole: string | null; secondaryRole?: string | null }) => void;
  size?: string;
  single?: boolean;
}

const RolePicker: React.FC<Props> = (props: Props): JSX.Element => {
  const { onClick, size, single } = props;

  const [roles, setRoles] = useState({
    primaryRole: 'Middle',
    secondaryRole: 'Bottom'
  });

  const handleOnClick = useCallback(onClick, []);

  const handleSingleUpdate = (item: { title: string; image: string }): void => {
    setRoles({ ...roles, primaryRole: item.title });
    onClick({ primaryRole: item.title });
  };

  const handleUpdate = (payload): void => {
    const { primaryRole, secondaryRole } = roles;

    if (payload.primaryRole === secondaryRole || payload.secondaryRole === primaryRole) {
      setRoles(prev => ({ primaryRole: prev.secondaryRole, secondaryRole: prev.primaryRole }));

      return;
    }

    setRoles({ ...roles, ...payload });
  };

  useEffect(() => {
    handleOnClick(roles);
  }, [roles, handleOnClick]);

  return single ? (
    <div className={styles.roles}>
      {addons.roles.map(item => {
        const selected = roles.primaryRole === item.title;
        return (
          <button
            type="button"
            className={` ${styles.role} ${selected && styles.roleSelected}`}
            key={item.title}
            onClick={(): void => handleSingleUpdate(item)}
          >
            <img alt="role" src={item.image} style={{ width: size, height: size }} />
          </button>
        );
      })}
    </div>
  ) : (
    <>
      <span className={styles.title}>Primary Role</span>
      <div className={styles.roles}>
        {addons.roles.map(item => {
          const selected = roles.primaryRole === item.title;
          return (
            <button
              type="button"
              className={` ${styles.role} ${selected && styles.roleSelected}`}
              key={item.title}
              onClick={(): void => handleUpdate({ primaryRole: item.title })}
            >
              <img alt="role" src={item.image} style={{ width: size, height: size }} />
            </button>
          );
        })}
      </div>
      <span className={styles.title}>Secondary Role</span>
      <div className={styles.roles}>
        {addons.roles.map(item => {
          const selected = roles.secondaryRole === item.title;
          return (
            <button
              type="button"
              className={` ${styles.role} ${selected && styles.roleSelected}`}
              key={item.title}
              onClick={(): void => handleUpdate({ secondaryRole: item.title })}
            >
              <img alt="role" src={item.image} style={{ width: size, height: size }} />
            </button>
          );
        })}
      </div>
    </>
  );
};

RolePicker.defaultProps = {
  onClick: (): void => {},
  size: '16px',
  single: false
};

export default RolePicker;
