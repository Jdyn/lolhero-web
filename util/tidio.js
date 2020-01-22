/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/camelcase */

export const setVisitorData = user => {
  try {
    tidioChatApi.setVisitorData({
      distinct_id: user.id,
      email: user.email,
      name: user.username
    });
  } catch (e) {}
};
