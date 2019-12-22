import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Reusable/Layout';
import { handleAuth } from '../store/session/actions';
import { AppState } from '../store';
import AccountAuth from '../components/Reusable/AccountAuth';
import { Request } from '../store/request/types';

interface Props {
  authenticate?: (type: string, form: object) => void;
  sessionRequest?: Request;
}

const SignUp = (props: Props): JSX.Element => {
  const { authenticate, sessionRequest } = props;
  return (
    <Layout title="Sign Up">
      <AccountAuth type="signup" authenticate={authenticate} sessionRequest={sessionRequest} />
    </Layout>
  );
};

const mapStateToProps = (state: AppState): object => ({
  sessionRequest: state.request.AUTHENTICATE || {}
});

const mapDispatch = (dispatch): object => ({
  authenticate: (type: 'login' | 'logout' | 'signup', form: object, redirect: boolean): void =>
    dispatch(handleAuth(type, form, redirect))
});

export default connect(mapStateToProps, mapDispatch)(SignUp);
