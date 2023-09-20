<template>
  <div class="appAccounts">
    <div class="iconViscat">
      <div class="viscatIcon" />
      <div class="viscatLogo">Vis-CAT</div>
    </div>
    <div>
      <div class="navigationBar">
        <div class="iconSettings" @click="navigateToSettings">
          <div class="buttonYellow" />
          <img class="settingsIcon" alt="" src="../assets/settings-icon@2x.png" />
        </div>
        <div class="iconHome" @click="navigateToLobby">
          <div class="buttonHome" />
          <img class="homeIcon" alt="" src="../assets/home-icon1@2x.png" />
        </div>
        <div class="iconUser">
          <div class="accountsIconText">Accounts</div>
          <div class="buttonYellow" />
          <img class="userIcon" alt="" src="../assets/user-icon1@2x.png" />
        </div>
      </div>
    </div>

    <div class="frameChild">
      <div class="studentsContainer">
        <div v-for="(student, index) in students" :key="index" class="student">
          <img
            class="animalHeadIcon"
            alt=""
            :src="student.icon"
            :class="{ selected: selectedStudentIndex === index }"
            ref="selectedRef"
            @load="onImageLoad()"
            @click="selectStudent(index)"
          />
          <div v-if="selectedStudentIndex !== index" class="studentName">{{ student.studentName }}</div>
        </div>
      </div>
    </div>
    <div v-if="selectedStudentIndex !== -1" class="selectedSheet">
      <img class="selectedSheetChild" alt="" src="../assets/rectangle-1.svg" />
      <div class="age">ID: {{ selectedStudent.studentId }}</div>
      <div class="name">{{ selectedStudent.studentName }}</div>
      <button
          class="selectButton"
          :class="{'button-selected': buttonText === 'Selected' }"
          @click="selectStudentConfirm">
        {{buttonText}}
      </button>
      <img class="selectLine1Icon" alt="" src="../assets/select-line2.svg" />
      <img class="selectLine2Icon" alt="" src="../assets/select-line2.svg" />

    </div>

    <div v-if="showQR" class="QRContainer">
      <div class="QRText">
        Scan QR code
      </div>
      <video
        id="qrVideo"
        class="QRVideo"
        autoplay
      ></video>
    </div>

    <div class="container">
      <!-- <div id="result" class="results"></div> -->
      <div id="schoolname" class="schoolName"></div>

      <img class="dotLineIcon" alt="" src="../assets/dot-line.svg" />
      <div class="dotLineIcon">
        <div class="dotDecor" />
      </div>
      <div id="classnum" class="class"></div>
      <div class="scanButton" @click="openQrScanner">
        <div class="scanText">Scan</div>
        <img class="scanIcon" alt="" src="../assets/scan-icon@2x.png" />
      </div>
      <img class="houseIcon" alt="" src="../assets/house@2x.png" />
    </div>
  </div>
  <div :class="soundButton" @click="changeSound">
    <img class="soundButtonIcon" alt="" :src="soundButtonSrc" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import jsQR from 'jsqr';
import {store} from "@/store";
import { speak, playAudio, muteAudio } from "./Speech.js";

export default defineComponent({
  name: "AppAccount",
  data() {
    return {
      students: store.state.students,
      selectedStudent: store.state.selectedStudent,
      selectedStudentIndex: store.state.selectedStudentIndex,
      selectedStudentConfirm: store.state.selectedStudent,
      selectedStudentIndexConfirm: store.state.selectedStudentIndex,
      showQR: false,
      buttonText: store.state.studentId ? 'Selected' : 'Select',
      selectedRef: [],
      containerScrollTop: 0,
    };
  },
  beforeUnmount() {
    this.stopVideo();
  },
  computed: {
    soundButtonSrc(){
      return store.state.isMute
        ? require("../assets/sound_off.png")
        : require("../assets/sound_on.png");
    },
  },
  methods: {
    changeSound(){
      store.state.isMute = !(store.state.isMute);
      if (store.state.isMute){
        muteAudio();
      }
      else {
        playAudio();
      }
    },
    handleContainerScroll(event) {
      this.containerScrollTop = event.target.scrollTop;
    },
    onImageLoad() {
      console.log("onload");
      this.selectedRef = this.$refs.selectedRef;
    },
    stopVideo() {
      const video = document.getElementById('qrVideo'); // Access the video element by ID
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.removeAttribute('src');
        video.load();
      }

      this.showQR = false;
    },
    navigateToSettings() {
      speak("Settings_page");
      this.$router.push("/Settings");
    },
    navigateToLobby() {
      speak("Home_page");
      this.$router.push("/Lobby");
    },
    async openQrScanner() {
      try {
        this.selectedStudentIndex = -1;
        this.students = [];
        this.selectedStudent = [];
        this.showQR = true;

        const schoolNameDiv = document.getElementById('schoolname');
        schoolNameDiv.textContent = this.school;
        const classDiv = document.getElementById('classnum');
        classDiv.textContent = this.class;

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const video = document.getElementById('qrVideo');

        // Check if the video element exists
        if (video) {
          video.srcObject = stream;
          await video.play();
        } else {
          console.error('Video element not found.');
          this.showQR = false;
          return;
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const scanInterval = setInterval(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            clearInterval(scanInterval);
            try {
              const qrData = this.parseQRCodeData(code.data);
              this.displayResult(qrData);
              store.state.students = this.students;
              video.srcObject.getTracks().forEach(track => track.stop());
              this.showQR = false;
            } catch (error) {
              console.error('QR code not in correct format', error);
              video.srcObject.getTracks().forEach(track => track.stop());
              this.showQR = false;
            }
          }
        }, 100);
      } catch (error) {
        console.error('Error accessing camera:', error);
        this.showQR = false;
      }
    },

    parseQRCodeData(qrData) {
      const lines = qrData.split('\n');

      // Extract student data
      const studentsData = lines;

      // Process student data into an array of objects
      const students = studentsData.map(studentInfo => {
        const [name, id] = studentInfo.split(',').map(part => part.trim());
        return {
          name,
          id,
        };
      });

      return {
        students,
      };
    },



    displayResult(qrData) {

      const animalHeadIcons = [
        'elephant.png',
        'sheep.png',
        'bear.png',
        'badger.png',
        'giraffe.png',
        'cheetah.png',
      ];

      let iconIndex = 0;

      this.students = qrData.students.map((student) => {
        const iconSrc = require(`@/assets/animals/${animalHeadIcons[iconIndex]}`);
        iconIndex = (iconIndex + 1) % animalHeadIcons.length;
        return {
          icon: iconSrc,
          studentName: student.name,
          studentId: student.id,
        };
      });
    },
    selectStudent(index) {
      if (this.buttonText === 'Select') {
        this.selectedStudentIndex = index;
        this.selectedStudent = this.students[index];
      }
    },
    selectStudentConfirm() {
      if (store.state.selectedStudentIndex === this.selectedStudentIndex) {
        store.state.selectedStudentIndex = -1;
        store.state.studentId = false;
        this.buttonText = "Select";
      } else {
        store.state.selectedStudentIndex = this.selectedStudentIndex;
        store.state.selectedStudent = store.state.students[this.selectedStudentIndex];
        store.state.studentId = store.state.selectedStudent.studentId;
        this.buttonText = "Selected";
      }
      this.selectedStudentIndexConfirm = this.selectedStudentIndex;
      this.selectedStudentConfirm = this.selectedStudent;
    }
  },
});
</script>
<style scoped>
.soundButtonIcon {
    position: absolute;
    top: 5.6%;
    left: 37.5%;
    bottom: 80%;
    right: 15%;
    width: 10vw;
    height: 10vw;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
.QRContainer {
}

.selectButton {
  position: absolute;
  top: 18vh;
  left: 5vw;
  background-color: #8B4513; /* Change this to your desired button color */
  color: #fff; /* Change this to your desired text color */
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 1; /* Ensure the button is on top of the images */
  border-radius: 15px; /* Round border */
}

.button-selected {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Apply drop shadow when selected */
}

.selectButton:hover {
  background-color: #654321; /* Darker brown on hover */
}

/* Styles for selected icon */
.animalHeadIcon.selected {
  powition: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Lighter background shadow */
  z-index: 99999999; /* Ensure it appears above other elements */
}

.QRText {
  position: absolute;
  top: calc(50% - 20%);
  left: 74%;
  z-index: 99999999;
  color: white;
  font-weight: bold;
  background: #a478b8d9;
  transform: translate(-50%, -50%);
  font-size: 50%;
}

.QRVideo {
  position: absolute;
  top: 50%;
  left: 74%;
  width: 30%;
  height: auto;
  transform: translate(-50%, -50%);
  border: 15px solid #a478b8d9;
  border-radius: 10px;
  z-index: 99999;
}

.container {
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 0%;
  right: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20%;
}

.studentsContainer {
  margin-top: 4vw;
  display: flex;
  justify-content: space-between;
  /* Adjust as needed */
  max-width: 90%;
  /* Ensure the containers fit within the available space */
  padding: 2vw;
  /* Adjust padding as needed */
  box-sizing: border-box;
  /* Include padding and border in the element's total width and height */
  flex-wrap: wrap;
}

.student {
  flex: 0 0 calc(33.33% - 2rem);
  /* Adjust the width and margin as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  box-sizing: border-box;
  /* Include padding and border in the element's total width and height */
}

.animalHeadIcon {
  max-width: 100%;
  /* Ensure the image fits within the container */
  height: auto;
  /* Auto-adjust the height to maintain aspect ratio */
  margin-bottom: 0.5rem;
}

.studentName {
  font-size: 16px;
  font-weight: bold;
}

.frameChild {
  position: fixed;
  display: block;
  overflow-y: scroll; /* Enable vertical scrolling */
  overflow-x: visible; /* Hide horizontal overflow */
  top: 0%;
  right: 0%;
  bottom: 0%;
  border-radius: 76px;
  background-color: #90cf8e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 55vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  z-index: 999;
}

.userIcon {
  position: absolute;
  height: 97.5%;
  width: 75%;
  top: 2.5%;
  right: 12.5%;
  bottom: 0%;
  left: 12.5%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}

.iconUser {
  position: absolute;
  bottom: 30%;
  right: 3%;
  width: 9vw;
  height: 9vw;
}

.accountsIconText {
  position: absolute;
  bottom: -38%;
  left: 0%;
  font-size: 2.5vw;
}


.selected {
  position: absolute;
  border-radius: 50%;
  background-color: var(--color-palegoldenrod);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 20vw;
  height: 20vw;
}

.selectedSheetChild {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0rem;
  left: -0.25rem;
  border-radius: 12px;

  z-index: 99999;
}

.age {
  position: absolute;
  top: 4.56rem;
  left: 2.25rem;
}

.name {
  position: absolute;
  top: 1.19rem;
  left: 2.25rem;
}

.selectLine1Icon {
  position: absolute;
  top: 3.22rem;
  left: 1.5rem;

}

.selectLine2Icon {
  position: absolute;
  top: 6.38rem;
  left: 1.5rem;

}


.selectedSheet {
  position: absolute;
  top: 25vw;
  left: 48vh;
  width: 30vw;
  height: 30vh;
  z-index: 99999;
  font-size: var(--font-size-xl);
}

.schoolName {
  position: absolute;
  top: 52%;
  left: 22%;
  font-size: 1.8vw;
}

.dotDecor {
  position: absolute;
  top: -160%;
  left: -20%;
  border-radius: 50%;
  background-color: #6a9a68;
  width: 1.3vw;
  height: 1.3vw;
}

.dotLineIcon {
  position: absolute;
  top: 25.5%;
  left: 54%;
  width: 11vw;
  height: 0.3vw;
  object-fit: cover;
  max-width: 100%;
  /* overflow: hidden; */
  max-height: 100%;
}

.class {
  position: absolute;
  top: 59%;
  left: 22%;
  font-size: 1.8vw;
  text-decoration: underline;
  color: var(--color-plum);
}

.scanText {
  position: absolute;
  top: 25%;
  left: 50%;
  font-size: 3vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
}

.scanIcon {
  position: absolute;
  top: 5%;
  left: 10%;
  width: 5vw;
  height: 7.2vw;
  object-fit: cover;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.scanButton {
  position: absolute;
  left: 18%;
  bottom: 5%;
  width: 15vw;
  height: 8vw;
  font-size: var(--font-size-21xl);
  font-family: var(--font-inder);
  border-radius: 34px;
  background-color: var(--color-white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.houseIcon {
  position: absolute;
  top: 8%;
  left: 19%;
  width: 14vw;
  height: 13.5vw;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}

.appAccounts {
  position: fixed;
  background-color: #b8e3ff;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: var(--font-size-17xl);
  color: var(--color-black);
  font-family: var(--font-jua);
}</style>
