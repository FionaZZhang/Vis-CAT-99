// store.js

import { createStore } from 'vuex';

export const store = createStore({
  state: {
    isButtonOn1: true,
    isButtonOn2: true,
    isButtonOn3: true,
    isButtonOn4: false,
    copy: 0,
    lateral: 0,
    vertical: 0,
    studentId: "0",
  },

  actions: {
    // You can define other actions here if needed
  }
});
