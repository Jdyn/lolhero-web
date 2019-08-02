import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleAuth } from "../../actions/SessionActions";

const propTypes = {
  children: PropTypes.object.isRequired
};

const Layout = props => {
  const { children, session, handleAuth, sessionRequest } = props;

  return (
    <>
      <Header session={session} handleAuth={handleAuth} sessionRequest={sessionRequest} />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => ({
  sessionRequest: state.request.AUTHENTICATE || {},
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (form, type) => dispatch(handleAuth(form, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
