import { Socket } from 'phoenix';
import { orderChatUpdated } from '../store/account/reducers';

let socket = null;
let channel = null;

const listeners = dispatch => {
  if (channel) {
    channel.on('recieve:message', message => {
      dispatch(orderChatUpdated({ message }));
    });
  }
};

export default {
  init: (url, params) => {
    if (params.token && url && !socket) {
      socket = new Socket('ws://localhost:4000/socket', { params: { token: params.token } });
      socket.connect();
    }
  },
  exists: () => {
    return socket !== null;
  },
  joinChat: (url, dispatch) => {
    if (socket) {
      channel = socket.channel(url);
      channel.join();
      listeners(dispatch);
      // channel.push('request:chat_history', {}).receive('ok', payload => {
      //   dispatch(orderChatFetched({ messages: payload.result.messages }));
      // });
    }
  },
  leaveChat: () => {
    if (channel) {
      channel.leave();
      channel = null;
    }
  },
  sendMessage: message => {
    if (channel) {
      channel.push('send:message', {
        message
      });
    }
  }
};
