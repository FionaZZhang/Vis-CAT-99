<template>
  <div :class="$style.frame">
    <div :class="$style.frameChild" />
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
    <div id="result"></div>
    <div :class="$style.selected" />
    <img
      :class="$style.elephantsHeadIcon"
      alt=""
      src="../assets/elephants-head@2x.png"
    />
    <div :class="$style.monica">
      <img :class="$style.sheepsHeadIcon" alt="" src="../assets/sheeps-head@2x.png" />
      <div :class="$style.monica1">Monica</div>
    </div>
    <div :class="$style.joey">
      <img :class="$style.sheepsHeadIcon" alt="" src="../assets/bears-head@2x.png" />
      <div :class="$style.joey1">Joey</div>
    </div>
    <div :class="$style.chandler">
      <img :class="$style.sheepsHeadIcon" alt="" src="../assets/badgers-head@2x.png" />
      <div :class="$style.chandler1">Chandler</div>
    </div>
    <div :class="$style.rachel">
      <img :class="$style.giraffeHeadIcon" alt="" src="../assets/giraffe-head@2x.png" />
      <div :class="$style.rachel1">Rachel</div>
    </div>
    <div :class="$style.pheobe">
      <img :class="$style.sheepsHeadIcon" alt="" src="../assets/cheetahs-head@2x.png" />
      <div :class="$style.pheobe1">Pheobe</div>
    </div>
    <div :class="$style.selectedSheet">
      <img :class="$style.selectedSheetChild" alt="" src="../assets/rectangle-1.svg" />
      <div :class="$style.grade">Grade: 1</div>
      <div :class="$style.age">Age: 5</div>
      <div :class="$style.name">Ross Geller</div>
      <img :class="$style.selectLine1Icon" alt="" src="../assets/select-line1.svg" />
      <img :class="$style.selectLine2Icon" alt="" src="../assets/select-line2.svg" />
      <img :class="$style.selectLine3Icon" alt="" src="../assets/select-line2.svg" />
    </div>
    <div :class="$style.schoolName">Central Perk Primary School</div>
    <div :class="$style.dotDecor" />
    <img :class="$style.dotLineIcon" alt="" src="../assets/dot-line.svg" />
    <div :class="$style.class">Class 1(3)</div>
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
  // import { jsQR } from './node_modules/jsqr/dist/jsQR.mjs';
    function parseQRCodeData(qrData) {
      const lines = qrData.split('\n');
      const schoolName = lines[0].split(': ')[1];
      const className = lines[1].split(': ')[1];
      const teacherName = lines[2].split(': ')[1];
      const studentsData = lines.slice(3);

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
    }

    // function displayResult(qrData) {
    //   const resultDiv = document.getElementById('result');
    //   resultDiv.innerHTML = `
    //     <p>School Name: ${qrData.schoolName}</p>
    //     <p>Class: ${qrData.className}</p>
    //     <p>Teacher: ${qrData.teacherName}</p>
    //     <p>Students:</p>
    //     <ul>
    //       ${qrData.students.map(student => `<li>${student.name}, Age: ${student.age}</li>`).join('')}
    //     </ul>
    //   `;
    // }
  export default defineComponent({
    name: "AppAccount",
    methods: {
      navigateToSettings() {
        this.$router.push("/Settings");
      },
      navigateToLobby() {
        this.$router.push("/Lobby");
      },
      async openQrScanner() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true});
          const video = document.createElement('video');
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
            // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            // const code = jsQR(imageData.data, imageData.width, imageData.height);
            const code = 0;
            if (code) {
              clearInterval(scanInterval);
              const qrData = parseQRCodeData(code.data);
              this.displayResult(qrData);
              video.srcObject.getTracks().forEach(track => track.stop());
              document.body.removeChild(video);
            }
          }, 100);
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      }
    }
  });
</script>
<style module>
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
  .elephantsHeadIcon {
    position: absolute;
    top: 2.63rem;
    left: 47.94rem;
    width: 15.44rem;
    height: 13.44rem;
    object-fit: cover;
  }
  .sheepsHeadIcon {
    position: absolute;
    top: 0rem;
    left: -0.25rem;
    width: 9.88rem;
    height: 9.88rem;
    object-fit: cover;
  }
  .monica1 {
    position: absolute;
    top: 10.06rem;
    left: 1.25rem;
  }
  .monica {
    position: absolute;
    top: 27.19rem;
    left: 63.13rem;
    width: 9.38rem;
    height: 12.88rem;
  }
  .joey1 {
    position: absolute;
    top: 10.19rem;
    left: 2.25rem;
  }
  .joey {
    position: absolute;
    top: 35.5rem;
    left: 44rem;
    width: 9.38rem;
    height: 13rem;
  }
  .chandler1 {
    position: absolute;
    top: 10.19rem;
    left: 0rem;
  }
  .chandler {
    position: absolute;
    top: 22rem;
    left: 35.44rem;
    width: 9.38rem;
    height: 13rem;
  }
  .giraffeHeadIcon {
    position: absolute;
    top: 0rem;
    left: -0.25rem;
    width: 9.63rem;
    height: 9.88rem;
    object-fit: cover;
  }
  .rachel1 {
    position: absolute;
    top: 9.38rem;
    left: 1.5rem;
  }
  .rachel {
    position: absolute;
    top: 10.25rem;
    left: 65.25rem;
    width: 9.38rem;
    height: 12.19rem;
  }
  .pheobe1 {
    position: absolute;
    top: 9.56rem;
    left: 1.19rem;
  }
  .pheobe {
    position: absolute;
    top: 21.25rem;
    left: 51.38rem;
    width: 9.38rem;
    height: 12.38rem;
  }
  .selectedSheetChild {
    position: absolute;
    top: 0rem;
    left: -0.25rem;
    border-radius: 12px;
    width: 14.19rem;
    height: 12.44rem;
  }
  .grade {
    position: absolute;
    top: 7.94rem;
    left: 2.25rem;
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
    font-size: var(--font-size-xl);
  }
  .schoolName {
    position: absolute;
    top: 25.5rem;
    left: 1.13rem;
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
