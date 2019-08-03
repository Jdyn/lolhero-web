import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Link from "next/link";

const propTypes = {};

const templates = {
  profile: {
    title: "Profile",
    items: [{ title: "Orders", link: "/account/orders" }]
  }
};

const AuthProfile = props => {
  const { modalRef, updateModal, session, isOpen, type } = props;
  const classes = useStyes(props);

  return (
    <div className={classes.root} ref={modalRef}>
      <div className={classes.container} onClick={() => updateModal("profile")}>
        <div className={classes.wrapper}>{session.user.username}</div>
        <div className={classes.portrait} />
      </div>
      {isOpen ? (
        <div className={classes.modal}>
          {type === "profile" && (
            <>
              {templates[type].items.map((item, index) => (
                <Link key={index} href={item.link}>
                  <a>{item.title}</a>
                </Link>
              ))}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

const useStyes = createUseStyles(theme => ({
  root: {
    margin: "-20px 0 -22px 0",
    position: "relative",
    height: "auto",
    width: "100%",
    maxWidth: "250px",
    display: "grid",
    gridTemplateRows: "79px 1fr",
    gridTemplateColumns: "1fr",
    gridTemplateAreas: ` 
      'profile profile'
      'modal modal'
    `
  },
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    cursor: "pointer",
    maxWidth: "200px",
    margin: "0px 25px",
    borderBottom: "2px solid #999",
    "&:hover": {
      color: theme.accent,
      borderBottom: `2px solid ${theme.accent}`
    }
  },
  wrapper: {
    color: theme.white,
    height: "100%",
    display: "flex",
    padding: "8px 22px 8px 10px",
    flexGrow: 1,
    maxHeight: "37px",
    alignItems: "center",
    fontWeight: 600,
    marginRight: "-20px",
    borderRadius: "8px 0px 0px 8px",
    justifyContent: "center",
    backgroundColor: theme.primary
  },
  portrait: {
    width: "44px",
    height: "44px",
    border: "2px solid #999",
    borderRadius: "50%",
    backgroundColor: theme.primary
  },
  modal: {
    display: "flex",
    padding: "25px",
    position: "relative",
    gridArea: "modal",
    margin: "0px 25px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,.4)",
    borderRadius: "0px 0px 12px 12px",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    transitionDuration: ".2s"
  }
}));

AuthProfile.propTypes = propTypes;

export default AuthProfile;
