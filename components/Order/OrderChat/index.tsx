import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { Order } from '../../../store/account/types';
import socket from '../../../services/socket';
import { SessionState } from '../../../store/session/types';

interface Props {
  messages?: any;
  session: SessionState;
  isDemo: boolean;
}

const OrderChat: React.FC<Props> = (props: Props): JSX.Element => {
  const { messages, session, isDemo } = props;
  const [form, setForm] = useState({
    message: ''
  });

  useEffect(() => {
    const display = document.getElementById('chat');

    if (display) {
      display.scrollTop = display.scrollHeight;
    }
  }, [messages]);

  const handleMessage = (event): void => {
    event.preventDefault();
    if (isDemo) {
      event.preventDefault();
      setForm({ message: '' });
      return;
    }

    if (socket.exists()) {
      socket.sendMessage(form.message);
      setForm({ message: '' });
    }
  };

  return (
    <div className={styles.root}>
      {messages && (
        <>
          <h3>Order Chat</h3>
          <div className={styles.container}>
            <div id="chat" className={styles.scroll}>
              {messages.map(message => (
                <div key={message.id} className={`${styles.message}`}>
                  <span
                    className={`${
                      message.user.id === session.user.id ? styles.alignRight : styles.alignLeft
                    }`}
                  >
                    {message.user.username}
                  </span>
                  <div
                    className={`${
                      message.user.id === session.user.id ? styles.blue : styles.green
                    } ${
                      message.user.id === session.user.id ? styles.alignRight : styles.alignLeft
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className={styles.inputContainer} onSubmit={handleMessage}>
            <input
              className={styles.input}
              type="text"
              value={form.message}
              placeholder="Write your message..."
              onChange={event => setForm({ message: event.target.value })}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default OrderChat;
