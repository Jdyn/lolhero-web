import React, { useState, useMemo } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import addons from '../../lib/addonContent';
import Button from '../reusable/Button';
import Banner from '../Boost/Banner';
import ranks from '../../lib/ranks';

const fields = [
  { type: 'text', title: 'LoL Username', text: 'username' },
  { type: 'password', title: 'LoL Password', text: 'password' },
  { type: 'text', title: 'Summoner Name', text: 'summonerName' }
];

const content = [
  {
    title: 'Primary Role',
    text: 'primaryRole',
    roles: addons.addons.roles
  },
  {
    title: 'Secondary Role',
    text: 'secondaryRole',
    roles: addons.addons.roles
  }
];

const OrderHero = props => {
  const classes = useStyles(props);
  const theme = useTheme();
  const { order, updateOrder } = props;
  const { primaryRole, secondaryRole } = order.details;

  const ranksObject = useMemo(
    () => [].concat.apply([], [...ranks]).reduce((obj, item) => ((obj[item.rank] = item), obj), {}),
    []
  );

  const [form, setForm] = useState({
    details: {
      primaryRole: null,
      secondaryRole: null,
      summonerName: ''
    },
    accountDetails: {
      username: '',
      password: ''
    }
  });

  const handleOrderUpdate = () => {
    const { primaryRole, secondaryRole, summonerName } = form.details;
    const { username, password } = form.accountDetails;

    if (primaryRole && secondaryRole && summonerName && username && password) {
      updateOrder(form);
    }
  };

  const handleFormUpdate = formUpdate => {
    const { primaryRole, secondaryRole, summonerName, note } = formUpdate;

    if (primaryRole || secondaryRole) {
      const { details } = form;
      if (details.primaryRole !== undefined && details.secondaryRole !== undefined) {
        if (primaryRole === details.secondaryRole || secondaryRole === details.primaryRole) {
          setForm(prev => ({
            ...prev,
            details: {
              ...prev.details,
              secondaryRole: prev.details.primaryRole,
              primaryRole: prev.details.secondaryRole
            }
          }));
          return;
        }
        setForm({
          ...form,
          details: {
            ...details,
            ...formUpdate
          }
        });
      }

      return;
    }

    if (summonerName || note) {
      setForm(prev => ({
        ...prev,
        details: {
          ...prev.details,
          ...formUpdate
        }
      }));
      return;
    }

    setForm(prev => ({
      ...prev,
      accountDetails: { ...prev.accountDetails, ...formUpdate }
    }));
  };

  return (
    <div className={classes.root}>
      {order.isEditable ? (
        <div className={classes.container}>
          <Banner
            height="450px"
            type="default"
            rank={ranksObject[order.details.desiredRank] || {}}
          />
          <div className={classes.wrapper}>
            <h3>Order Details</h3>
            <div className={classes.rolesContainer}>
              {content.map(item => (
                <div key={item.title} className={classes.rolesWrapper}>
                  <span>{item.title}</span>
                  <div className={classes.roles}>
                    {item.roles.map(role => (
                      <button
                        type="button"
                        className={classes.role}
                        key={role.title}
                        onClick={() => handleFormUpdate({ [item.text]: role.title })}
                        style={{
                          backgroundColor:
                            form.details[item.text] === role.title
                              ? theme.quartinary
                              : theme.primary
                        }}
                      >
                        <img src={role.image}></img>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <form className={classes.form}>
              {fields.map(field => (
                <div key={field.title} className={classes.formWrapper}>
                  <span>{field.title}</span>
                  <input
                    type={field.type}
                    value={
                      field.text === 'summonerName' ? form[field.text] : form.details[field.text]
                    }
                    onChange={event => handleFormUpdate({ [field.text]: event.target.value })}
                    className={classes.formInput}
                  />
                </div>
              ))}
            </form>
            <span>Notes</span>
            <textarea
              value={form.note || ''}
              onChange={event => setForm({ ...form, note: event.target.value })}
              className={classes.notes}
              placeholder="Please enter your preferred champions here while we work on a better solution."
            />
            <Button onClick={handleOrderUpdate} margin="15px 0px 0px auto">
              save
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <Banner
            height="450px"
            type="default"
            rank={ranksObject[order.details.desiredRank] || {}}
          />
          <div className={classes.wrapper}>
            <h3>Order Details</h3>
            <div className={classes.rolesWrapper}>
              <div className={classes.rolesDisplay}>
                <span>Primary Role</span>
                <img
                  alt="role"
                  src={addons.addons.roles.filter(role => role.title === primaryRole)[0].image}
                />
              </div>
            </div>
            <div className={classes.rolesDisplay}>
              <span>Secondary Role</span>
              <img
                alt="role"
                src={addons.addons.roles.filter(role => role.title === secondaryRole)[0].image}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    padding: '0 30px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // flexGrow: 1,
    // flexBasis: '550px',
    width: '100%',
    gridArea: 'hero',
    padding: '24px',
    maxWidth: '750px',
    margin: '0 auto 30px auto',
    borderRadius: 18,
    backgroundColor: theme.quartinary,
    color: theme.white,
    '& span': {
      margin: '10px 0 10px 0',
      color: theme.secondaryWhite
    },
    '& h3': {
      margin: '0 0 15px 0',
      color: theme.white
    },
    '@media (min-width: 650px)': {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: '15px',
    width: '100%',
    height: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    color: theme.secondaryWhite,
    marginTop: '20px'
  },
  formInput: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    // height: '30px',
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.white,
    '@media (min-width: 650px)': {}
  },
  formWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0 5px',
    textAlign: 'left'
  },
  rolesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  rolesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.secondaryWhite
  },
  roles: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.primary,
    marginRight: '10px',
    padding: '3px',
    borderRadius: 8
  },
  role: {
    display: 'flex',
    minWidth: '36px',
    height: '36px',
    // padding: '15px 10px',
    outline: 'none',
    border: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    transitionDuration: '.2s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `${theme.quartinary} !important`
    }
  },
  notes: {
    fontSize: 14,
    lineHeight: '24px',
    padding: '15px',
    border: 'none',
    overFlow: 'auto',
    whiteSpace: 'pre-wrap',
    width: '100%',
    borderRadius: 6,
    resize: 'vertical',
    outline: 'none',
    color: theme.white,
    backgroundColor: theme.primary,
    height: '100px'
  },
  rolesDisplay: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 40px 15px 0',
    alignItems: 'center',
    '& span': {
      width: '100%',
      margin: 0
    },
    '& img': {
      width: '20px'
    }
  }
}));

export default OrderHero;
