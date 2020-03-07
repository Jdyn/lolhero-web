import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const boostOptions = {
  solo: [
    { title: 'Solo Division', url: '/boost?type=solo-divisions' },
    { title: 'Solo Net Wins', url: '/boost?type=solo-net-wins' },
    { title: 'Solo Placements', url: '/boost?type=solo-placements' }
  ],
  duo: [
    { title: 'Duo Division', url: '/boost?type=duo-divisions' },
    { title: 'Duo Net Wins', url: '/boost?type=duo-net-wins' },
    { title: 'Duo Placements', url: '/boost?type=duo-placements' }
  ]
};

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>
            LoLHero isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot
            Games or anyone officially involved in producing or managing League of Legends. League
            of Legends is a registered trademark of Riot Games, Inc. We are in no way affiliated
            with, associated with or endorsed by Riot Games, Inc.
          </p>
          <span>© 2020 lolhero.gg | All Rights Reserved</span>
        </div>
        <div className={styles.list}>
          <div className={styles.content}>
            <h3>Solo Services</h3>
            <ul>
              {boostOptions.solo.map(item => (
                <Link prefetch={false} href={`${item.url}`} key={item.title}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Duo Services</h3>
            <ul>
              {boostOptions.duo.map(item => (
                <Link prefetch={false} href={`${item.url}`} key={item.title}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Resources</h3>
            <ul>
              <Link prefetch={false} href="/faq">
                <li>F.A.Q</li>
              </Link>

              <Link prefetch={false} href="privacy">
                <li>Privacy Policy</li>
              </Link>
              <Link prefetch={false} href="/tos">
                <li>Terms of Service</li>
              </Link>
            </ul>
          </div>
          <div className={styles.content}>
            <div className={styles.spacer} />
            <ul>
              <Link prefetch={false} href="/demo">
                <li>View Demo</li>
              </Link>
              <Link prefetch={false} href="/order/track">
                <li>Find Order</li>
              </Link>
              <Link prefetch={false} href="/boost">
                <li>Order Boost</li>
              </Link>
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Account</h3>
            <ul>
              <Link prefetch={false} href="/account/login">
                <li>Log In</li>
              </Link>
              <Link prefetch={false} href="/account/signup">
                <li>Sign Up</li>
              </Link>
              <Link prefetch={false} href="/account/recover">
                <li>Recovery</li>
              </Link>
            </ul>
          </div>
          {/* <div className={styles.content}>
            <h3>Orders</h3>
            <ul>
              <Link prefetch={false} href="/demo">
                <li>View Demo</li>
              </Link>
              <Link prefetch={false} href="/order/track">
                <li>Find Order</li>
              </Link>
              <Link prefetch={false} href="/boost">
                <li>Order Boost</li>
              </Link>
            </ul>
          </div> */}
        </div>
        <div />
      </div>
    </footer>
  );
};

export default Footer;
