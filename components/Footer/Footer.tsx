import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const boostOptions = {
  solo: [
    { title: 'Solo Division', url: '/boost?type=solo-divisions' },
    { title: 'Solo Net Wins', url: '/boost?type=solo-net-wins' },
    { title: 'Solo Net Games', url: '/boost?type=solo-net-games' },
    { title: 'Solo Placements', url: '/boost?type=solo-placements' }
  ],
  duo: [
    { title: 'Duo Division', url: '/boost?type=duo-divisions' },
    { title: 'Duo Net Wins', url: '/boost?type=duo-net-wins' },
    { title: 'Duo Net Games', url: '/boost?type=duo-net-games' },
    { title: 'Duo Placements', url: '/boost?type=duo-placements' }
  ]
};

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
          <div className={styles.content}>
            <h3>Solo Services</h3>
            <ul>
              {boostOptions.solo.map(item => (
                <Link href={`${item.url}`} key={item.title}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Duo Services</h3>
            <ul>
              {boostOptions.duo.map(item => (
                <Link href={`${item.url}`} key={item.title}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Resources</h3>
            <ul>
              <li>F.A.Q</li>
              {/* <li>About</li> */}
              <li>Contact</li>
              <li>Privacy Policy</li>
              <Link href="/tos">
                <li>Terms of Service</li>
              </Link>
            </ul>
          </div>
          <div className={styles.content}>
            <div className={styles.spacer} />
            <ul>
              <Link href="/order/track">
                <li>Find Order</li>
              </Link>
              <Link href="/boost">
                <li>Order Boost</li>
              </Link>
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Account</h3>
            <ul>
              <Link href="/account/login">
                <li>Log In</li>
              </Link>
              <Link href="/account/signup">
                <li>Sign Up</li>
              </Link>
              <Link href="/account/recover">
                <li>Recovery</li>
              </Link>
            </ul>
          </div>
        </div>
        <div />
      </div>
    </footer>
  );
};

export default Footer;
