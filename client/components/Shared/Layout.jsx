import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAuth } from '../../actions/SessionActions';
import { createUseStyles } from 'react-jss';

const propTypes = {
  children: PropTypes.object.isRequired
};

const Layout = props => {
  const { children, session, handleAuth, sessionRequest } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Header session={session} handleAuth={handleAuth} sessionRequest={sessionRequest} />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = propTypes;

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'min-content 1fr min-content',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
    'header'
    'component'
    'footer'
    `
  }
}));

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
