import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../Reusable/Button/Button';
import HomeCard from './Cards/HomeCard';
import styles from './styles.module.css';
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
      'After order completion, you will be able to set-up and track your order right away. Once you complete the initial set-up, a booster will be able to begin.',
    step: 'step 3'
  }
];

const Home = (): JSX.Element => {
  const [form, setForm] = useState({ trackingId: '' });

  const handleOrderSearch = (event: React.FormEvent): void => {
    event.preventDefault();

    const { trackingId } = form;

    if (form.trackingId) {
      Router.push('/order/track/[trackingId]', `/order/track/${trackingId}`);
    }
  };

  return (
    <div className={styles.root}>
      <Stripes version="v1" zIndex={110}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1>LoL Hero</h1>
            <h2>S10 Boosting Services</h2>
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
            <div className={styles.content}>
              <Link href="/demo">
                <Button width="155px" secondary large>
                  View Demo
                </Button>
              </Link>
              <Link href="/boost">
                <Button width="155px" large>
                  View Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Stripes>

      {/* <div className={styles.test}>
        <div />
      </div> */}

      {/* <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cardsContainer}>
            {cards.map(item => (
              <HomeCard card={item} key={item.title} />
            ))}
          </div>
        </div>
      </section> */}

      {/* <div className={styles.container}>
        <div className={styles.dashboard}>
          <img src="/static/images/dashboard.png" />
        </div>
      </div> */}

      {/* <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <div style={{ backgroundImage: 'url(/static/images/art/strategy.jpg)' }} />
        </div>
        <div className={styles.infoItem}>
          <div style={{ backgroundImage: 'url(/static/images/art/legacy.jpg)' }} />
        </div>
        <div className={styles.infoItem}>
          <div style={{ backgroundImage: 'url(/static/images/art/glory.jpg)' }} />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
