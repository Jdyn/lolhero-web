import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../Reusable/Button';
import HomeCard from './Cards/HomeCard';
import styles from './styles.css';
import Stripes from '../Reusable/Stripes';

const cards = [
  {
    title: 'First, begin By Choosing Your Service',
    description:
      'Customize your order from the ground up based on your goals. We offer the most in-depth order customizations.',
    step: 'step 1'
  },
  {
    title: 'Next, Choosing Your Payment Method',
    description:
      'We work with the most trusted payment processors, allowing us to confidently offer the most popular payment methods like Venmo, Paypal, and more.',
    step: 'step 2'
  },
  {
    title: 'Finally, Begin Tracking Your Order',
    description:
      'After your purchase, you will recieve detailed instructions on how to further set-up and track your order.',
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
      <Stripes />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>LoL Hero</h1>
          <h2>Boosting Services</h2>
          <form className={styles.form} onSubmit={handleOrderSearch}>
            <input
              value={form.trackingId}
              onChange={(event): void => setForm({ trackingId: event.target.value })}
              placeholder="Enter Tracking ID"
              aria-label="search"
              className={styles.search}
            />
            <button type="submit" className={styles.formSubmit}>
              Go
            </button>
          </form>
          <Link href="/boost">
            <Button padding="15px 20px">Customize Order</Button>
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {cards.map(item => (
            <HomeCard card={item} key={item.title} />
          ))}
        </div>
      </div>
      {/* <div className={styles.infoContainer}>
        <div className={styles.stripe} />
      </div> */}
    </div>
  );
};

export default Home;
