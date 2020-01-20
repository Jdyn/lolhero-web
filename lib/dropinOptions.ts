// import { Options } from 'braintree-web-drop-in';

const options: any = {
  authorization:
    process.env.NODE_ENV === 'production'
      ? 'production_kt5hfrt9_rjbznr7xz82wjj7x'
      : 'sandbox_7brmzhhx_cfcsbff65qmxzrgf',
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
      size: 'responsive',
      tagline: false,
      label: 'paypal'
    }
  },
  venmo: {
    allowNewBrowserTab: false
  }
};

export default options;
