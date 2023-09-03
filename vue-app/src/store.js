// store.js

import { createStore } from 'vuex';


export const store = createStore({
  state: {
    isButtonOn1: true,
    isButtonOn2: true,
    isButtonOn3: true,
    isButtonOn4: false
  }

  // getters: {
  //   getIsButtonOn1: state => {
  //       return state.isButtonOn1;
  //   }
  // }
});
