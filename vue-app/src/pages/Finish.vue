<template>
  <div :class="$style.appfinish">
    <img :class="$style.grassIcon" alt="" src="../assets/grass.png" />
    <img :class="$style.yellowCatIcon" alt="" src="../assets/yellow-cat@2x.png" />
    <div :class="$style.iconViscat">
      <div :class="$style.viscatIcon" />
      <h1 :class="$style.viscatLogo">Vis-CAT</h1>
    </div>
    <div :class="$style.iconHome" @click="navigateToLobby">
      <div :class="$style.buttonHome" />
      <img :class="$style.homeIcon" alt="" src="../assets/home-icon@2x.png" />
    </div>
    <div :class="$style.wellDone">Well done!</div>
    <img :class="$style.finishLine1" alt="" src="../assets/finish-line-1.png" />
    <img :class="$style.finishLine2" alt="" src="../assets/finish-line-2.png" />
    <img :class="$style.flagPole1" alt="" src="../assets/flag-pole-1.png" />
    <img :class="$style.flagPole2" alt="" src="../assets/flag-pole-2.png" />
    <img :class="$style.finishFlagIcon" alt="" src="../assets/finish-flag.png" />
    <div :class="$stylesoundButton" @click="changeSound">
      <img :class="$style.soundButtonIcon" alt="" :src="soundButtonSrc" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {store} from "@/store";
import axios from 'axios';
import { speak, muteAudio, playAudio } from "./Speech";
export default defineComponent({
  name: "AppFinish",
  computed: {
    soundButtonSrc(){
      return store.state.isMute
        ? require("../assets/sound_off.png")
        : require("../assets/sound_on.png");
    },
  },
  methods: {
    navigateToLobby() {
      speak("Home_page");
      this.$router.push("/Lobby");
    },
    changeSound(){
      store.state.isMute = !(store.state.isMute);
      if (store.state.isMute){
        muteAudio();
      }
      else {
        playAudio();
      }
    },
  },
  mounted() {
    speak("victory");
    let total = store.state.copy + store.state.lateral + store.state.vertical;
    const csvData = `${store.state.studentId},${total}`;
    console.log(store.state.studentId);
    axios.post('http://viscat.shop:5002/api/auth/score', { studentId: "123", testScore: "B"})
      .then(response => {
        console.log('Data sent successfully backend1:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    axios.post('/api/send-total', { id: store.state.studentId, score: total})
      .then(response => {
        console.log('Data sent successfully our backend:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    axios.post('https://vis-cat-77d80383cce0.herokuapp.com/users/student/mark/all', csvData, {
        headers: {
          'Content-Type': 'text/csv',
        }
      })
      .then(response => {
        console.log('Data sent successfully csv backend:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    store.state.copy = 0;
    store.state.lateral = 0;
    store.state.vertical = 0;
  },
})
</script>

<style module>
.soundButtonIcon {
  position: absolute;
  top: 4.9%;
  right: 50.5%;
  bottom: 78.78%;
  left: 52.27%;
  width: 11.5vw;
  height: 11.5vw;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
}
.grassIcon {
  position: fixed;
  height: 22.36%;
  width: 100%;
  top: 77.64%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.yellowCatIcon {
  position: fixed;
  height: 18.5vw;
  width: 18vw;
  top: 58.91%;
  right: 57.85%;
  bottom: 25.14%;
  left: 44%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
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
  margin: 0;
  position: absolute;
  width: 97.7%;
  top: 8.15%;
  left: 5.1%;
  font-size: 8vw;
  font-weight: 400;
  font-family: inherit;
  display: inline-block;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 2px #fff;
}
.iconViscat {
  position: absolute;
  height: 11vw;
  width: 32.83%;
  top: 5.04%;
  right: 64.66%;
  bottom: 78.78%;
  left: 2.51%;
  color: var(--color-plum);
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
  height: 7.1vw;
  width: 7.8vw;
  top: 2vw;
  right: 20.71%;
  bottom: 28.57%;
  left: 2.1vw;
  max-width: 10vw;
  overflow: hidden;
  max-height: 10vw;
  object-fit: cover;
}
.iconHome {
  position: absolute;
  height: 11vw;
  width: 12vw;
  top: 5.16%;
  right: 50.5%;
  bottom: 78.78%;
  left: 38.27%;
}
.wellDone {
  position: fixed;
  height: 7vw;
  width: 20w;
  top: 60.52%;
  left: 20%;
  font-size: 4.2vw;
  display: inline-block;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
}
.finishLine1 {
  position: fixed;
  height: 6vw;
  width: 25vw;
  top: 68.91%;
  right: 57.85%;
  bottom: 25.14%;
  left: 16.5%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.finishLine2 {
  position: fixed;
  height: 6vw;
  width: 23vw;
  top: 64.69%;
  right: 16.62%;
  bottom: 28.9%;
  left: 62.36%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.flagPole1 {
  position: fixed;
  height: 62.59%;
  width: 3.35%;
  top: 26.92%;
  right: 82.71%;
  bottom: 10.49%;
  left: 13.94%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.flagPole2 {
  position: fixed;
  height: 56.71%;
  width: 3.43%;
  top: 27.04%;
  right: 13.94%;
  bottom: 16.25%;
  left: 82.62%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.finishFlagIcon {
  position: fixed;
  height: 17vw;
  width: 66.2vw;
  top: 30.28%;
  right: 17.38%;
  bottom: 52.82%;
  left: 16.88%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.appfinish {
  position: fixed;
  background-color: #b8e3ff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-77xl);
  color: var(--color-black);
  font-family: var(--font-jua);
}
.buttonHome:hover{
  opacity: 0.7;
  transition: opacity 0.3s;
}
.iconHome:hover .homeIcon {
  transform: scale(1.1);
  transition: transform 0.3s;
}
.iconHome:hover .buttonHome {
  opacity: 0.7;
  transition: opacity 0.3s;
}
.soundButtonIcon:hover {
  opacity: 0.8;
}
</style>

