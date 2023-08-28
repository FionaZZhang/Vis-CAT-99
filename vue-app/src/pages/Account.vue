<template>
  <div :class="$style.frame">
    <div :class="$style.frameChild" >
      <div :class="$style.studentsContainer">
        <div v-for="(student, index) in students" :key="index" :class="$style.student" @click="selectStudent(index)">
          <img :class="$style.animalHeadIcon" alt="" :src="student.iconSrc" ref="selectedRef"/>
          <div :class="$style.studentName">{{ student.studentName }}</div>
        </div>
        <div v-if="selectedStudentIndex !== -1" :class="$style.selectedSheet" :style="selectedSheetPosition">
          <img :class="$style.selectedSheetChild" alt="" src="../assets/rectangle-1.svg" />
          <div :class="$style.age">Age: {{ selectedStudent.studentAge }}</div>
          <div :class="$style.name">{{ selectedStudent.studentName }}</div>
          <img :class="$style.selectLine1Icon" alt="" src="../assets/select-line2.svg" />
          <img :class="$style.selectLine2Icon" alt="" src="../assets/select-line2.svg" />
          <img :class="$style.selectLine3Icon" alt="" src="../assets/select-line2.svg" />
        </div>
      </div>
    </div>
    <div :class="$style.navigation" />
    <div :class="$style.iconSettings" @click="navigateToSettings">
      <div :class="$style.buttonSettings" />
      <img :class="$style.settingsIcon" alt="" src="../assets/settings-icon@2x.png" />
    </div>
    <div :class="$style.iconUser">
      <div :class="$style.buttonSettings" />
      <img :class="$style.userIcon" alt="" src="../assets/user-icon1@2x.png" />
    </div>
    <div :class="$style.homeIconText">Accounts</div>
    <div :class="$style.iconHome" @click="navigateToLobby">
      <div :class="$style.homeIconText1">Home</div>
      <div :class="$style.buttonHome" />
      <img :class="$style.homeIcon" alt="" src="../assets/home-icon1@2x.png" />
    </div>
    <div :class="$style.iconViscat">
      <div :class="$style.viscatIcon" />
      <div :class="$style.viscatLogo">Vis-CAT</div>
    </div>
    <div id="result" :class="$style.results"></div>
    <div id="schoolname" :class="$style.schoolName"></div>
    <div :class="$style.dotDecor" />
    <img :class="$style.dotLineIcon" alt="" src="../assets/dot-line.svg" />
    <div id="classnum" :class="$style.class"></div>
    <div :class="$style.scanButton" @click="openQrScanner">
      <div :class="$style.scanButtonBg" />
      <div :class="$style.scanText">Scan</div>
      <img :class="$style.scanIcon" alt="" src="../assets/scan-icon@2x.png" />
    </div>
    <img :class="$style.houseIcon" alt="" src="../assets/house@2x.png" />
  </div>
</template>

<script>
  import { defineComponent} from "vue";
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
      };
    },
    methods: {
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

          const schoolNameDiv = document.getElementById('schoolname');
          schoolNameDiv.textContent = this.school;
          const classDiv = document.getElementById('classnum');
          classDiv.textContent = this.class;

          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const video = document.createElement('video');

          video.style.position = 'fixed';
          video.style.top = '50%';
          video.style.left = '60%';
          video.style.width = '30%';
          video.style.height = 'auto';
          video.style.transform = 'translate(-50%, -50%)';
          video.style.border = '4px solid pink';
          video.style.borderRadius = '10px';
          document.body.appendChild(video);
          video.srcObject = stream;
          await video.play();

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
                document.body.removeChild(video);
              } catch (error) {
                console.error('QR code not in correct format', error);
                video.srcObject.getTracks().forEach(track => track.stop());
                document.body.removeChild(video);
              }
            }
          }, 100);
        } catch (error) {
          console.error('Error accessing camera:', error);
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
<style module>

  .studentsContainer {
    margin-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Adjust as needed */
    max-width: 90%; /* Ensure the containers fit within the available space */
    padding: 2rem; /* Adjust padding as needed */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }

  .student {
    flex: 0 0 calc(33.33% - 2rem); /* Adjust the width and margin as needed */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }

  .animalHeadIcon {
    max-width: 100%; /* Ensure the image fits within the container */
    height: auto; /* Auto-adjust the height to maintain aspect ratio */
    margin-bottom: 0.5rem;
  }

  .studentName {
    font-size: 16px;
    font-weight: bold;
  }

  .results {
    position: absolute;
    top: -0.56rem;
    left: 32.5rem;
  }
  .frameChild {
    position: absolute;
    top: -0.56rem;
    left: 32.5rem;
    border-radius: 76px;
    background-color: #90cf8e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 47.69rem;
    height: 53.06rem;
  }
  .navigation {
    position: absolute;
    top: 41.06rem;
    left: 4.75rem;
    border-radius: 40px;
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 26rem;
    height: 9.94rem;
  }
  .buttonSettings {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: var(--br-11xl);
    background-color: var(--color-palegoldenrod);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .settingsIcon {
    position: absolute;
    height: 79.17%;
    width: 75%;
    top: 8.33%;
    right: 12.5%;
    bottom: 12.5%;
    left: 12.5%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .iconSettings {
    position: absolute;
    top: 42.31rem;
    left: 6.19rem;
    width: 7.5rem;
    height: 7.5rem;
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
    top: 39.31rem;
    left: 21.81rem;
    width: 8.75rem;
    height: 8.75rem;
  }
  .homeIconText {
    position: absolute;
    top: 48.06rem;
    left: 22.69rem;
    font-size: 1.88rem;
  }
  .homeIconText1 {
    position: absolute;
    top: 8.88rem;
    left: 1.63rem;
    display: none;
  }
  .buttonHome {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: var(--br-11xl);
    background-color: var(--color-peachpuff);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .homeIcon {
    position: absolute;
    height: 52.86%;
    width: 57.86%;
    top: 18.57%;
    right: 20.71%;
    bottom: 28.57%;
    left: 21.43%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .iconHome {
    position: absolute;
    top: 42.31rem;
    left: 14rem;
    width: 7.5rem;
    height: 7.5rem;
    font-size: var(--font-size-21xl);
  }
  .viscatIcon {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: var(--br-xl);
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .viscatLogo {
    position: absolute;
    width: 97.7%;
    top: 8.15%;
    left: 5.1%;
    display: inline-block;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-text-stroke: 2px #fff;
  }
  .iconViscat {
    position: absolute;
    top: 2.63rem;
    left: 1.88rem;
    width: 24.5rem;
    height: 8.44rem;
    font-size: var(--font-size-77xl);
    color: var(--color-plum);
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
    top: 25.5rem;
    left: 9.94rem;
  }
  .dotDecor {
    position: absolute;
    top: 21.56rem;
    left: 21.94rem;
    border-radius: 50%;
    background-color: #6a9a68;
    width: 0.94rem;
    height: 0.94rem;
  }
  .dotLineIcon {
    position: absolute;
    top: 21.91rem;
    left: 23.91rem;
    width: 8.69rem;
    height: 0.19rem;
  }
  .class {
    position: absolute;
    top: 28.75rem;
    left: 9.94rem;
    text-decoration: underline;
    color: var(--color-plum);
  }
  .scanButtonBg {
    position: absolute;
    top: 0.25rem;
    left: 0rem;
    border-radius: 34px;
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 13.88rem;
    height: 6.13rem;
  }
  .scanText {
    position: absolute;
    top: 1.56rem;
    left: 6.94rem;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-text-stroke: 1px #000;
  }
  .scanIcon {
    position: absolute;
    top: 0rem;
    left: 1.44rem;
    width: 4.25rem;
    height: 6.38rem;
    object-fit: cover;
  }
  .scanButton {
    position: absolute;
    top: 32.31rem;
    left: 8.13rem;
    width: 13.88rem;
    height: 6.38rem;
    font-size: var(--font-size-21xl);
    font-family: var(--font-inder);
  }
  .houseIcon {
    position: absolute;
    top: 14.81rem;
    left: 9.81rem;
    width: 10.75rem;
    height: 10.19rem;
    object-fit: cover;
  }
  .frame {
    position: relative;
    background-color: #b8e3ff;
    width: 74.63rem;
    height: 52.13rem;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-17xl);
    color: var(--color-black);
    font-family: var(--font-jua);
  }
</style>
