import * as Sentry from '@sentry/browser';
import Api from '../../services/api';
import { BoostOrder } from './types';

export const routes = {
  purchase: '/order/create'
};

interface Response {
  ok: boolean;
  result: any;
  error?: string;
}

export const purchase = async (order: BoostOrder): Promise<Response> => {
  const defaultError =
    'There was an error placing your order. Please try again later or contact support.';

  try {
    const response = await Api.post(routes.purchase, order);

    const { ok, result } = response;
    console.log(response);
    if (ok) {
      return { ok, result };
    }

    const errors: string[] = response.errors || [];
    const error: string = errors[Object.keys(errors)[0]] || defaultError;
    return { ok, result, error };
  } catch (err) {
    Sentry.captureException(err);
    return { ok: false, result: null, error: defaultError };
  }
};
