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
        <div v-for="(student, index) in students" :key="index" class="student" @click="selectStudent(index)">
          <img class="animalHeadIcon" alt="" :src="student.iconSrc" ref="selectedRef" />
          <div class="studentName">{{ student.studentName }}</div>
        </div>
        <div v-if="selectedStudentIndex !== -1" class="selectedSheet" :style="selectedSheetPosition">
          <img class="selectedSheetChild" alt="" src="../assets/rectangle-1.svg" />
          <div class="age">Age: {{ selectedStudent.studentAge }}</div>
          <div class="name">{{ selectedStudent.studentName }}</div>
          <img class="selectLine1Icon" alt="" src="../assets/select-line2.svg" />
          <img class="selectLine2Icon" alt="" src="../assets/select-line2.svg" />
          <img class="selectLine3Icon" alt="" src="../assets/select-line2.svg" />
        </div>
      </div>
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
</template>

<script>
import { defineComponent } from "vue";
import jsQR from 'jsqr';

export default defineComponent({
  name: "AppAccount",
  data() {
    return {
      school: "",
      class: "",
      teacher: "",
      students: [], // Initialize students array
      selectedStudent: [],
      selectedStudentIndex: -1,
      showQR: false,
    };
  },
  beforeUnmount() {
    this.stopVideo();
  },
  methods: {
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
      this.$router.push("/Settings");
    },
    navigateToLobby() {
      this.$router.push("/Lobby");
    },
    async openQrScanner() {
      try {
        this.selectedStudentIndex = -1;
        this.students = [];
        this.selectedStudent = [];
        this.school = "";
        this.class = "";

        // Set showQR to true to display the video and text
        this.showQR = true;

        const schoolNameDiv = document.getElementById('schoolname');
        schoolNameDiv.textContent = this.school;
        const classDiv = document.getElementById('classnum');
        classDiv.textContent = this.class;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('qrVideo'); // Access the video element by ID

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
      const schoolName = lines[0].split(': ')[1];
      const className = lines[1].split(': ')[1];
      const teacherName = lines[2].split(': ')[1];
      const studentsData = lines.slice(4);
      this.school = schoolName;
      this.class = className;
      this.teacher = teacherName;

      const students = [];
      for (const studentData of studentsData) {
        const [name, age] = studentData.split(', ');
        students.push({ name, age: parseInt(age) });
      }

      return {
        schoolName,
        className,
        teacherName,
        students,
      };
    },
    displayResult(qrData) {
      const schoolNameDiv = document.getElementById('schoolname');
      schoolNameDiv.textContent = this.school;
      const classDiv = document.getElementById('classnum');
      classDiv.textContent = this.class;

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
          iconSrc,
          studentName: student.name,
          studentAge: student.age,
        };
      });
    },
    selectStudent(index) {
      if (this.selectedStudentIndex === index) {
        this.selectedStudentIndex = -1;
      } else {
        this.selectedStudentIndex = index;
        this.selectedStudent = this.students[index];
      }
    }
  },
  computed: {
    selectedSheetPosition() {
      if (this.selectedStudentIndex !== -1) {
        const selectedStudentIcon = this.$refs.selectedRef[this.selectedStudentIndex];
        if (selectedStudentIcon) {
          const iconPosition = selectedStudentIcon.offsetTop;
          const sheetLeftPosition = selectedStudentIcon.offsetLeft - 230; // Adjust the value as needed
          console.log(selectedStudentIcon)
          return {
            top: `${iconPosition}px`,
            left: `${sheetLeftPosition}px`,
          };
        }
      }
      return {};
    },
  },
});
</script>
<style scoped>

.QRContainer {
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
  margin-top: 1vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Adjust as needed */
  max-width: 90%;
  /* Ensure the containers fit within the available space */
  padding: 2vw;
  /* Adjust padding as needed */
  box-sizing: border-box;
  /* Include padding and border in the element's total width and height */
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

/* .results {
    position: absolute;
    top: -0.56rem;
    left: 32.5rem;
  } */
.frameChild {
  position: fixed;
  display: block;
  top: 0%;
  right: 0%;
  bottom: 0%;
  border-radius: 76px;
  background-color: #90cf8e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 55vw;
  height: 100vh;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
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

.homeIconText1 {
  position: absolute;
  top: 8.88rem;
  left: 1.63rem;
  display: none;
}

.selected {
  position: absolute;
  top: 1.38rem;
  left: 47.94rem;
  border-radius: 50%;
  background-color: var(--color-palegoldenrod);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 15rem;
  height: 15rem;
}

.selectedSheetChild {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0rem;
  left: -0.25rem;
  border-radius: 12px;
  width: 14.19rem;
  height: 12.44rem;
  z-index: 9999;
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
  width: 9.07rem;
  height: 0.13rem;
}

.selectLine2Icon {
  position: absolute;
  top: 6.38rem;
  left: 1.5rem;
  width: 9.07rem;
  height: 0.13rem;
}

.selectLine3Icon {
  position: absolute;
  top: 9.44rem;
  left: 1.5rem;
  width: 9.07rem;
  height: 0.13rem;
}

.selectedSheet {
  position: absolute;
  top: 3.63rem;
  left: 33.75rem;
  width: 14.19rem;
  height: 11.94rem;
  z-index: 9999;
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
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-17xl);
  color: var(--color-black);
  font-family: var(--font-jua);
}</style>
