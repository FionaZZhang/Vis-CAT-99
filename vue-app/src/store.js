// store.js

import { createStore } from 'vuex';

export const store = createStore({
  state: {
    isButtonOn1: true,
    isButtonOn2: true,
    isButtonOn3: true,
    isButtonOn4: false,
    isMute: false,
    copy: 0,
    lateral: 0,
    vertical: 0,
    rotate180: 0,
    diagonal: 0,
    students: [],
    selectedStudent: false,
    selectedStudentIndex: -1,
    studentId: false,
    school: "",
    class: "",
    arrowSize: 60,
    strokeWidth: 20,
  },

  actions: {
  }
});
