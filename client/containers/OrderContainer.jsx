import React from 'react';
import { connect } from 'react-redux';
import Order from '../components/Order';

class OrderContainer extends React.PureComponent {
  render() {
    return <Order {...this.props} />;
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);
