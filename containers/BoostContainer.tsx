import React from 'react';
import { connect } from 'react-redux';
import Boost from '../components/Boost';
import { fetchBoostPrices, updateOrder as orderUpdate, submitOrder } from '../store/boost/actions';
import { handleAuth } from '../store/session/actions';
import { AppState } from '../store';

interface Props {
  type?: string;
  updateOrder?: (detailsUpdate: object, OrderUpdate?: object) => void;
}

class BoostContainer extends React.PureComponent<Props> {
  render(): JSX.Element {
    return <Boost {...this.props} />;
  }
}

const mapStateToProps = (state: AppState): object => ({
  session: state.session,
  purchaseOrderRequest: state.request.PURCHASE_ORDER || { error: { errored: false, message: '' } },
  currentOrder: state.boost.order.details,
  boost: state.boost
});

const mapDispatchToProps = dispatch => ({
  handleAuth: (type, form) => dispatch(handleAuth(type, form)),
  fetchBoostPrices: () => dispatch(fetchBoostPrices()),
  updateOrder: (detailsUpdate, OrderUpdate) => dispatch(orderUpdate(detailsUpdate, OrderUpdate)),
  submitOrder: () => dispatch(submitOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(BoostContainer);
