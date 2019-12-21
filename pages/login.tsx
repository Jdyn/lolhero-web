import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Reusable/Layout';
import { handleAuth } from '../store/session/actions';
import { AppState } from '../store';
import AccountAuth from '../components/Reusable/AccountAuth';

interface Props {
  authenticate?: (type: string, form: object) => void;
}

const LogIn = (props: Props): JSX.Element => {
  const { authenticate } = props;
  return (
    <Layout>
      <AccountAuth type="login" authenticate={authenticate} />
    </Layout>
  );
};

const mapStateToProps = (state: AppState): Partial<AppState> => ({});

const mapDispatch = (dispatch): object => ({
  authenticate: (type: 'login' | 'logout' | 'signup', form: object, redirect: boolean): void =>
    dispatch(handleAuth(type, form, redirect))
});

export default connect(mapStateToProps, mapDispatch)(LogIn);
