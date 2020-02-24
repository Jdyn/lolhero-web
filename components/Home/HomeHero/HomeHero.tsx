import React, { useState } from 'react';
import Router from 'next/router';
import Button from '../../Reusable/Button';
import styles from './styles.module.css';
import Stripes from '../../Reusable/Stripes';

const HomeHero = (): JSX.Element => {
  const [form, setForm] = useState({ trackingId: '' });

  const handleSearch = (event: React.FormEvent): void => {
    event.preventDefault();

    const { trackingId } = form;

    if (form.trackingId) {
      Router.push('/order/track/[trackingId]', `/order/track/${trackingId}`);
    }
  };

  return (
    <section className={styles.root}>
      <Stripes version="v1" />
      <div className={styles.container}>
        <h1>LoLHero</h1>
        <h2>League Of Legends</h2>
        <h2>Elo Boosting</h2>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            value={form.trackingId}
            onChange={(event): void => setForm({ trackingId: event.target.value })}
            placeholder="Enter Tracking ID"
            aria-label="search"
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>
            Go
          </button>
        </form>
        <div className={styles.wrapper}>
          <Button large href="/demo">
            order demo
          </Button>
          <Button secondary large href="/boost">
            order pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
