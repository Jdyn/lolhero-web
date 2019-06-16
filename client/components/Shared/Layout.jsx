import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "./SEO";

const propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const Layout = props => {
  const { classes, children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const styles = {};

Layout.propTypes = propTypes;

export default withStyles(styles)(Layout);
