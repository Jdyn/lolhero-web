import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../reusable/Button';
import HomeCard from './Cards/HomeCard';
import styles from './styles.css';

const cards = [
  {
    title: 'It Begins With Choosing Your Service',
    description:
      'Fully customize your order from the ground up with custom options tailored to your needs.',
    step: 'step 1'
  },
  {
    title: 'Next, Choose Your Payment Method',
    description:
      'We work with the most trusted payment processors like PayPal to ensure your order is secure.',
    step: 'step 2'
  },
  {
    title: 'Then, Begin Tracking Your Order',
    description:
      'After your purchase, you will recieve detailed instructions on how to track and further set-up your order.',
    step: 'step 3'
  }
];

const Home = (): JSX.Element => {
  const [form, setForm] = useState({ trackingId: '' });

  const handleOrderSearch = (event: React.FormEvent): void => {
    event.preventDefault();

    const { trackingId } = form;

    if (form.trackingId) {
      Router.push('/order/[trackingId]', `/order/${trackingId}`);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>LoL Hero</h1>
        <h2>League Of Legends</h2>
        <form className={styles.form} onSubmit={handleOrderSearch}>
          <input
            value={form.trackingId}
            onChange={event => setForm({ trackingId: event.target.value })}
            placeholder="Enter tracking ID"
            aria-label="search"
            className={styles.search}
          />
          <button type="submit" className={styles.formSubmit}>
            Go
          </button>
        </form>
        <Link href="/boost">
          <Button padding="15px 20px" margin="60px 0 0 0">
            Customize Order
          </Button>
        </Link>
      </div>
      <div className={styles.content}>
        {cards.map(item => (
          <HomeCard card={item} key={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Home;
