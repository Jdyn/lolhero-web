import React from 'react';
import Link from 'next/link';
import styles from './styles.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>
            League of Legends is a registered trademark of Riot Games, Inc. We are in no way
            affiliated with, associated with or endorsed by Riot Games, Inc.
          </p>
          <span>© 2019 lolhero.gg | All Rights Reserved</span>
        </div>
        <div className={styles.list}>
          <ul>
            <li>F.A.Q</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
          <ul>
            <li>Contact</li>
            <Link href="/order/track">
              <li>Find Order</li>
            </Link>
            <Link href="/boost">
              <li>Create Order</li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
