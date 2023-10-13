<template>
  <div class="appLobby">
    <img class="mapIcon" alt="" src="../assets/map.png" />
    <div class="iconViscat">
      <div class="viscatIcon" />
      <div class="viscatLogo">Vis-CAT</div>
    </div>
    <div class="main">
      <img class="pinkCatIcon" alt="" src="../assets/pink-cat@2x.png" >
      <img class="yellowCatIcon" alt="" src="../assets/yellow-cat@2x.png" >
      <img class="greyCatIcon" alt="" src="../assets/grey_cat@2x.png" >    
      <div class="buttonStart" @click="navigateToTest">
        <img class="buttonStartIcon" alt="" src="../assets/button-start.svg" />
        <div class="startButtonText">Start</div>
        <img class="playIcon" alt="" src="../assets/play-icon@2x.png"/>
      </div>
      <div class="buttonPlayground" @click="navigateToPlayground">
        <img class="buttonPlaygroundIcon" alt="" src="../assets/button-playground.svg"/>
        <div class="playgroundButtonText">Playground</div>
        <img class="playgroundPlayButtonIcon" alt="" src="../assets/playground-play-button@2x.png"/>
      </div>
      <div class="buttonChallenge" @click="displayDialogue">
        <img class="buttonChallengeIcon" alt="" src="../assets/button-challenge.svg"/>
        <div class="challengeButtonText">Challenge</div>
        <img class="challengePlayButtonIcon" alt="" src="../assets/challenge-play-button@2x.svg"/>
      </div>
      <div class="welcomeText" @click="playLobbyInstructions">
        <img class="brownCatIcon" alt="" src="../assets/brown-cat@2x.png"/>
        <p class="welcome">Welcome!</p>
        <p class="welcome">Click 'Start' to take the test!</p>
        <img class="line" alt="" src="../assets/line-1.svg" />
      </div>
    </div>
    <div>
      <div class="navigationBar">
        <div class="iconSettings" @click="navigateToSettings">
          <div class="buttonYellow" />
          <img class="settingsIcon" alt="" src="../assets/settings-icon@2x.png" />
        </div>
        <div class="iconUser" @click="navigateToAccount">
          <div class="buttonYellow" />
          <img class="userIcon" alt="" src="../assets/user-icon@2x.png" />
        </div>
        <div class="iconHome">
          <div class="homeIconText">Home</div>
          <div class="buttonHome" />
          <img class="homeIcon" alt="" src="../assets/home-icon@2x.png" />
        </div>
      </div>
    </div>
  </div>
  <div class="soundButton" @click="changeSound">
    <img class="soundButtonIcon" alt="" :src="soundButtonSrc" />
  </div>
  <div id="modal" v-if="showModal" class="modal-container">
      <div class="custom-modal">
        <div class="custom-modal-content">
          <div class="custom-modal-header">
            <h3>Are you ready to challenge yourself?</h3>
          </div>
          <div class="custom-modal-buttons">
            <button class="cute-button" @click="navigateToChallenge">Yes, let's start</button>
            <button class="cute-button" @click="cancelDialogue">No, give up</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { speak, muteAudio, playAudio, pauseAudio } from "./Speech.js";
import { store } from "@/store";
import "@/assets/gamepage.css";
export default defineComponent({
  name: "AppLobby",
  data() {
    return {
      showModal: false
    }
  },
  mounted() {
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
  },
  beforeUnmount() {
    document.removeEventListener('touchmove', this.preventScroll);
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
    navigateToSettings() {
      speak("Settings_page");
      this.$router.push("/Settings");
    },
    navigateToPlayground() {
      this.$router.push("/Playground");
    },
    displayDialogue() {
      this.showModal = true;
      speak("Challenge_reminder");
    },
    cancelDialogue() {
      this.showModal = false;
      pauseAudio();
    },
    navigateToChallenge() {
      this.$router.push("/Challenge1");
    },
    navigateToTest(){
      this.$router.push("/Test1");
    },
    navigateToAccount(){
      speak("Accounts_page");
      this.$router.push("/Account");
    },
    playLobbyInstructions(){
      speak("Lobby_welcome");
    }
  }
});
</script>

<style scoped>
.mapIcon {
  position: fixed;
  display: block;
  top: 0%;
  right: 0;
  bottom: 0%;
  width: auto;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.pinkCatIcon{
  position: absolute;
  top: 0%;
  left: 75%;
  bottom: 80%;
  right: 15%;
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.brownCatIcon {
  position: absolute;
  top: 65%;
  left: -55%;
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.yellowCatIcon {
  position: absolute;
  width: 12vw;
  height: 12vw;
  top: 40%;
  right: 25%;
  bottom: 30.14%;
  left: 65%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}
.greyCatIcon{
  position: absolute;
  top: 85%;
  left: 73%;
  bottom: 80%;
  right: 15%;
  width: 12vw;
  height: 12vw;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.welcome {
  margin: 0;
}
.welcomeText {
  position: absolute;
  top: 18%;
  left: 15%;
  font-size: 3vw;
  width: 24vw;
  display: inline-block;
  cursor: pointer;
}
.line {
  position: absolute;
  top: 100%;
  left: 0%;
  width: 3.5vw;
  height: 4vw;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.homeIconText {
  position: absolute;
  bottom: -38%;
  left: 14%;
  font-size: 3vw;
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
  background-color: #f1c5ae;
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
  bottom: 30%;
  left: 34%;
  width: 9vw;
  height: 9vw;
}
.buttonStartIcon {
  position: absolute;
  height: 106.84%;
  width: 99.37%;
  top: 0%;
  right: 1.38%;
  bottom: -6.84%;
  left: -0.75%;
  border-radius: var(--br-21xl);
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.startButtonText {
  position: absolute;
  top: 25.35%;
  left: 42.94%;
  font-size: 3.5vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
}
.playIcon {
  position: absolute;
  height: 65.81%;
  width: 44.44%;
  top: 17.09%;
  right: 55.56%;
  bottom: 17.09%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}
.buttonStart {
  position: absolute;
  top: 44%;
  right: 35.4%;
  width: 20vw;
  height: 10vw;
  font-family: var(--font-inder);
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.buttonPlaygroundIcon {
  position: absolute;
  height: 106.78%;
  width: 100%;
  top: 0%;
  right: 1.01%;
  bottom: -6.78%;
  left: -1.01%;
  border-radius: var(--br-21xl);
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.playgroundButtonText {
  position: absolute;
  top: 25.42%;
  left: 29%;
  font-size: 3.5vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
}
.playgroundPlayButtonIcon {
  position: absolute;
  height: 60.49%;
  width: 22%;
  top: 17.86%;
  right: 72.54%;
  bottom: 18.64%;
  left: 4.79%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}
.buttonPlayground {
  position: absolute;
  top: 0%;
  right: 25%;
  width: 30vw;
  height: 10vw;
  font-family: var(--font-inder);
}
.buttonChallengeIcon {
  position: absolute;
  height: 106.78%;
  width: 100%;
  top: 0%;
  right: 1.01%;
  bottom: -6.78%;
  left: -1.01%;
  border-radius: var(--br-21xl);
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.challengeButtonText {
  position: absolute;
  top: 25.42%;
  left: 30%;
  font-size: 3.5vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke: 1px #000;
}
.challengePlayButtonIcon {
  position: absolute;
  height: 66%;
  width: 24%;
  top: 18.86%;
  right: 72.54%;
  bottom: 18.64%;
  left: 4.79%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}
.buttonChallenge {
  position: absolute;
  top: 90%;
  right: 27%;
  width: 27vw;
  height: 9vw;
  font-family: var(--font-inder);
}
.appLobby {
  position: fixed;
  display: flex;
  background-color: #b8e3ff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-21xl);
  color: var(--color-black);
  font-family: var(--font-jua);
}
.buttonHome:hover,
.buttonStart:hover,
.buttonPlayground:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}
.buttonChallenge:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}
.iconHome:hover .homeIcon,
.buttonStart:hover .playIcon,
.buttonPlayground:hover .playgroundPlayButtonIcon {
  transform: scale(1.1);
  transition: transform 0.3s;
}
.main {
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 0%;
  right: 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20%;
}
.custom-modal {
  background-color: #f3d09a;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  align-items: center;
}
</style>