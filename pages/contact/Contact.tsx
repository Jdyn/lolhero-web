import React from 'react';
import Layout from '../../components/Reusable/Layout';

const content = {
  title: 'Contact Us',
  description:
    'See how your order will look when you purchase a league boost at LoL Hero. You can see how easy it is to track your order throughout the entire process.'
};

const Contact = (): JSX.Element => {
  return (
    <Layout title={content.title} description={content.description}>
      <div>ok</div>
    </Layout>
  );
};

export default Contact;
