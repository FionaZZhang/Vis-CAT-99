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
    students: [],
    selectedStudent: "",
    selectedStudentIndex: -1,
    studentId: "None",
    school: "",
    class: "",
  },

  actions: {
  }
});
