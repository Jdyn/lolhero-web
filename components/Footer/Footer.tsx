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
          <ul>
            {boostOptions.solo.map(item => (
              <Link href={`${item.url}`} key={item.title}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
          <ul>
            {boostOptions.duo.map(item => (
              <Link href={`${item.url}`} key={item.title}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
          <ul>
            <li>F.A.Q</li>
            <li>About</li>
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
          <ul>
            <Link href="/account/login">
              <li>Log In</li>
            </Link>
            <Link href="/account/signup">
              <li>Sign Up</li>
            </Link>
            <Link href="/account/recover">
              <li>Forgot Password</li>
            </Link>
          </ul>
        </div>
        <div />
      </div>
    </footer>
  );
};

export default Footer;
