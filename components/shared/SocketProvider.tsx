import React, { createContext, useEffect, useState } from 'react';
import { Socket } from 'phoenix';

interface Props {
  children: React.ReactChild;
  url: string;
  params: {
    token: string;
  };
}

// const init = () => {

// };

const SocketContext = createContext({ socket: null });

const SocketProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const { children, url, params } = props;

  const [socket, setSocket] = useState();

  useEffect(() => {
    let ws;
    if (params.token && !socket) {
      ws = new Socket(url, { params });
      ws.connect();
      setSocket(ws);
    }

    return () => {
      ws.disconnect();
    };
  }, [params, url, socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

SocketProvider.defaultProps = {
  params: {
    token: null
  }
};

export { SocketContext, SocketProvider };
