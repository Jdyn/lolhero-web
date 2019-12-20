import { Options } from 'braintree-web-drop-in';

const options: Options = {
  authorization: 'sandbox_7brmzhhx_cfcsbff65qmxzrgf', // process.env.NODE_ENV === 'production' ? '' : 'sandbox_7brmzhhx_cfcsbff65qmxzrgf',
  container: '#dropin-container',
  card: {
    overrides: {
      styles: {
        input: {
          color: '#fff'
        },
        '.number': {
          color: '#fff'
        },
        '.cvv': {
          color: '#fff'
        },
        '.postalCode': {
          color: '#fff'
        },
        '.expirationDate': {
          color: '#fff'
        }
      }
    }
  },
  paypal: {
    flow: 'vault',
    buttonStyle: {
      color: 'blue',
      shape: 'rect',
      size: 'responsive'
    }
  },
  venmo: {
    allowNewBrowserTab: false
  }
};

export default options;
