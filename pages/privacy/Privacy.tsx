import React from 'react';
import Layout from '../../components/shared/Layout';
import styles from './styles.module.css';

const TOS = (): JSX.Element => {
  return (
    <Layout title="Privacy Policy">
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>Privacy Policy</h1>
            <h2>What we collect and how we protect it.</h2>
          </div>
          <section className={styles.section}>
            <h1>About this policy</h1>
            <p>
              By continuing to use LoLHero, you accept this privacy policy. If you do not agree with
              this privacy policy, you may contact us and we will delete your account.
            </p>
          </section>
          <section>
            <h1>What does LoLHero collect?</h1>
            <h3>For Users:</h3>
            <p>When you sign up for an account, LolHero will collect the following information:</p>
            <ul>
              <li>Your email address</li>
              <li>Your username</li>
              <li>
                Your password, which is turned into random numbers and letters before entering our
                database.
                <ul>
                  <li>
                    Technicals: Passwords are encrypted, hashed, and salted. We take extreme caution
                    in handling user information. Passwords can never be seen and are encrypted with
                    a modern hashing algorithm.
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              When you purchase an order on LoLHero, third party account details must be given to
              the currently assigned hero in order for them to access the account and complete the
              order. If you are uncomfortable with this, we recommend changing the password of your
              third party account for the duration of your order.
            </p>
            <h3>For Visitors:</h3>
            <p>Currently we do not track, store or use anything related to normal visitors.</p>
          </section>

          <section>
            <h1>How does LoLhero use your data?</h1>
            <h3>The Bottom Line:</h3>
            <p>
              Your data is yours, you have control over it, and only you will ever see it. Your data
              will never be sold, rented, or leased to third parties no matter what.
            </p>
            <p>
              We do not use any data given to us by our users for any reason other than completing
              the order.
            </p>
            <p>
              Order details will never be shared or given to anyone unless we have undoubtly
              confirmed that it is the original user requesting such information.
            </p>
          </section>
          <section>
            <h1>How does LoLHero protect data?</h1>
            <p>
              We have taken several steps to ensure that your data is safe and secure. We use
              industry-standard SSL encryption in all communications between the app and server.
            </p>
            <p>
              Our infrastructure is hosted on Amazon Web Services and is configured to be extremely
              secure and performant. Every server we own is protected by a private keys and has the
              latest security updates.
            </p>
          </section>
          <section>
            <h1>Cookies</h1>
            <p>
              Cookies are small digital signature files that are stored by your web browser that
              allow your preferences to be recorded when visiting the website. They also may be used
              to track return visits to the website.
            </p>
            <p>
              We currently only use cookies to authenticate users and prevent them from having to
              re-log into LoLHero every time they visit the site.
            </p>
            <p>
              Our 3rd party payment processors such as PayPal and Braintree may use cookies and
              anonymized telemetry data for purposes contained in their privacy policy.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TOS;
