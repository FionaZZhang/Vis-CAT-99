<template>
  <div class="appSettings">

    <div class="iconViscat">
      <div class="viscatIcon" />
      <div class="viscatLogo">Vis-CAT</div>
    </div>

    <div>
      <div class="navigationBar">
        <div class="iconSettings">
          <div class="settingsIconText">Settings</div>
          <div class="buttonYellow" />
          <img class="settingsIcon" alt="" src="../assets/settings-icon1@2x.png" />
        </div>
        <div class="iconUser" @click="navigateToAccount">
          <div class="buttonYellow" />
          <img class="userIcon" alt="" src="../assets/user-icon@2x.png" />
        </div>
        <div class="iconHome" @click="navigateToLobby">
          <div class="buttonHome" />
          <img class="homeIcon" alt="" src="../assets/home-icon1@2x.png" />
        </div>
      </div>
    </div>

    
    <div class="welcomeText">
      <div class="cat">
        <img class="brownCatIcon" alt="" src="../assets/brown-cat@2x.png" />
      </div>
      <img class="line" alt="" src="../assets/line-3.svg" />
      <span>Turn on </span>
      <span class="partialMode1">Partial Mode</span>
      <span> if you only want to play the first level.</span>
    </div>
    
    <img class="settingsboard" alt="" src="../assets/settingsboard.png" />
    <div class="settingsboard">
      
      <img class="settingsIcon1" alt="" src="../assets/settings-icon2@2x.png" />

      <div class="line1">
        <img alt="" src="../assets/line-2.png" />
        <div class="settingText">Voice Instructions</div>
        <div class="buttonon1" @click="switch1('buttonon1')">
          <img class="buttonlanguageIcon1" alt="" :src="buttononSrc1" />
          <div class="on">ON</div>
        </div>
        <div class="buttonoff1" @click="switch1('buttonoff1')">
          <img class="buttonlanguageIcon1" alt="" :src="buttonoffSrc1" />
          <div class="off">OFF</div>
        </div>
      </div>

      <div class="line2">
        <img alt="" src="../assets/line-2.png" />
        <div class="settingText">Display Results</div>
        <div class="buttonon2" @click="switch2('buttonon2')">
          <img class="buttonlanguageIcon1" alt="" :src="buttononSrc2" />
          <div class="on">ON</div>
        </div>
        <div class="buttonoff2" @click="switch2('buttonoff2')">
          <img class="buttonlanguageIcon1" alt="" :src="buttonoffSrc2" />
          <div class="off">OFF</div>
        </div>
      </div>

      <div class="line3">
        <img alt="" src="../assets/line-2.png" />
        <div class="settingText">Send Results</div>
        <div class="buttonon3" @click="switch3('buttonon3')">
          <img class="buttonlanguageIcon1" alt="" :src="buttononSrc3" />
          <div class="on">ON</div>
        </div>
        <div class="buttonoff3" @click="switch3('buttonoff3')">
          <img class="buttonlanguageIcon1" alt="" :src="buttonoffSrc3" />
          <div class="off">OFF</div>
        </div>
      </div>

      <div class="line4">
        <img alt="" src="../assets/line-2.png" />
        <div class="settingText">Partial Mode</div>
        <div class="buttonon4" @click="switch4('buttonon4')">
          <img class="buttonlanguageIcon1" alt="" :src="buttononSrc4" />
          <div class="on">ON</div>
        </div>
        <div class="buttonoff4" @click="switch4('buttonoff4')">
          <img class="buttonlanguageIcon1" alt="" :src="buttonoffSrc4" />
          <div class="off">OFF</div>
        </div>
      </div>

      <div class="line5">
        <img alt="" src="../assets/line-2.png" />
        <div class="settingText">Voice Selection</div>
        <div class="dropdown" @click="loadVoices">
          <select v-model="selectedVoice" class="custom-dropdown">
            <option v-for="voice in voices" :key="voice.name" :value="voice">{{ voice.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import { store } from "@/store";
  import { speak } from "./Speech.js";
  export default defineComponent({
    name: "AppSettings",
    data() {
      return {
        selectedVoice: "",
        voices: window.speechSynthesis.getVoices(),
      };
    },
    computed: {
      buttononSrc1() {
        return store.state.isButtonOn1
          ? require("../assets/Chosen.svg")
          : require("../assets/Unchosen.svg");
      },
      buttonoffSrc1() {
        return store.state.isButtonOn1
          ? require("../assets/Unchosen.svg")
          : require("../assets/Chosen.svg");
      },
      buttononSrc2() {
        return store.state.isButtonOn2
          ? require("../assets/Chosen.svg")
          : require("../assets/Unchosen.svg");
      },
      buttonoffSrc2() {
        return store.state.isButtonOn2
          ? require("../assets/Unchosen.svg")
          : require("../assets/Chosen.svg");
      },
      buttononSrc3() {
        return store.state.isButtonOn3
          ? require("../assets/Chosen.svg")
          : require("../assets/Unchosen.svg");
      },
      buttonoffSrc3() {
        return store.state.isButtonOn3
          ? require("../assets/Unchosen.svg")
          : require("../assets/Chosen.svg");
      },
      buttononSrc4() {
        return store.state.isButtonOn4
          ? require("../assets/Chosen.svg")
          : require("../assets/Unchosen.svg");
      },
      buttonoffSrc4() {
        return store.state.isButtonOn4
          ? require("../assets/Unchosen.svg")
          : require("../assets/Chosen.svg");
      },
    },

    methods: {
      loadVoices(){
        this.voices = window.speechSynthesis.getVoices();
      },
      textToSpeech(text){
        if (store.state.isButtonOn1){
          speak(text, this.selectedVoice);
        }
      },
      navigateToLobby() {
        this.$router.push("/Lobby");
      },
      navigateToAccount() {
        this.$router.push("/Account");
      },
      switch1(button) {
        if (button === "buttonon1") {
          store.state.isButtonOn1 = true;
          this.textToSpeech("Voice instructions activated");
        } else {
          store.state.isButtonOn1 = false;
        }
      },
      switch2(button) {
        if (button === "buttonon2") {
          store.state.isButtonOn2 = true;
          if (store.state.isButtonOn1){
            this.textToSpeech("Display results activated");
          }
        } else {
          store.state.isButtonOn2 = false;
        }
      },
      switch3(button) {
        if (button === "buttonon3") {
          store.state.isButtonOn3 = true;
          if (store.state.isButtonOn1){
            this.textToSpeech("Send results activated");
          }
        } else {
          store.state.isButtonOn3 = false;
        }
      },
      switch4(button) {
        if (button === "buttonon4") {
          store.state.isButtonOn4 = true;
          if (store.state.isButtonOn1){
            this.textToSpeech("Partial mode activated");
          }
        } else {
          store.state.isButtonOn4 = false;
        }
      },

    }
  });
</script>
<style scoped>
  @font-face {
    font-family: 'Jua';
    src: url(../assets/Jua-Regular.ttf) format('truetype');
  }
  .custom-dropdown{
    font-family:'Jua', sans-serif; 
    font-size: 2.5vw; 
    text-align: center;
  }
  .line5 {
    position: absolute;
    top: 77%;
    left: 4%;
    width: 32vw;
    height: 0.5vw;
  }
  select {
    position: absolute;
    top: -500%;
    right: -35%;
    width: 22vw;
    height: 4.5vw;
    border: 0;
    outline: 0;
    appearance: none;
    background-image: url(../assets/Dropdown.png);
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    text-overflow: ellipsis;
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
    bottom: 30%;
    left: 3%;
    width: 9vw;
    height: 9vw;
  }
  .settingsboard {
    position: fixed;
    top: 0%;
    bottom: 0%;
    right: 0%;
    left: 49.8%;
    width: 50vw;
    height: 100vh;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
  }
  .buttonlanguageIcon1 {
    position: absolute;
    height: 119.05%;
    width: 109.88%;
    top: 0%;
    right: -4.94%;
    bottom: -19.05%;
    left: -4.94%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
  }
  .on {
    position: relative;
    top: 3%;
    left: 14%;
    font-size: 3vw;
    cursor: pointer;
  }
  .buttonon {
    position: relative;
    top: -1200%;
    right: -90%;
    width: 6vw;
    height: 3vw;
  }
  .settingsIcon1 {
    position: absolute;
    height: 12vw;
    width: 12vw;
    top: 6%;
    left: 38%;
    bottom: 76.73%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .off {
    position: relative;
    top: 3%;
    left: 14%;
    font-size: 3vw;
    cursor: pointer;
  }
  .buttonoff {
    position: relative;
    top: -1800%;
    right: -110%;
    width: 6vw;
    height: 3vw;
  }
  .settingText {
    position: relative;
    top: -1150%;
    left: 2%;
    font-size: 2.5vw;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .brownCatIcon {
    position: absolute;
    top: 100%;
    right: 5%;
    width: 12vw;
    height: 12vw;
    object-fit: cover;
  }
  .partialMode1 {
    color: var(--color-plum);
  }
  .welcomeText {
    position: fixed;
    top: 30%;
    left: 5%;
    bottom: 30%;
    right: 60%;
    font-size: 3vw;
    display: inline-block;
    width: 32vw;
    height: 9vw;
  }
  .line {
    position: absolute;
    top: 140%;
    right: 44%;
    width: 5vw;
    height: 2.7vw;
  }
  .line1 {
    position: absolute;
    top: 33%;
    left: 4%;
    width: 32vw;
    height: 0.5vw;
  }
  .line2 {
    position: absolute;
    top: 44%;
    left: 4%;
    width: 32vw;
    height: 0.5vw;
  }
  .line3 {
    position: absolute;
    top: 55%;
    left: 4%;
    width: 32vw;
    height: 0.5vw;
  }
  .line4 {
    position: absolute;
    top: 66%;
    left: 4%;
    width: 32vw;
    height: 0.5vw;
  }
  .settingsIconText {
    position: absolute;
    bottom: -38%;
    left: 0%;
    font-size: 2.5vw;
  }
  .appSettings {
    position: fixed;
    background-color: #b8e3ff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-21xl);
    color: var(--color-black);
    font-family: var(--font-jua);
  }

  .buttonon1 {
    position: relative;
    top: -1200%;
    right: -90%;
    width: 6vw;
    height: 3vw;
  }

  .buttonoff1 {
    position: relative;
    top: -1800%;
    right: -110%;
    width: 6vw;
    height: 3vw;
  }
  .buttonon2 {
    position: relative;
    top: -1200%;
    right: -90%;
    width: 6vw;
    height: 3vw;
  }

  .buttonoff2 {
    position: relative;
    top: -1800%;
    right: -110%;
    width: 6vw;
    height: 3vw;
  }
  .buttonon3 {
    position: relative;
    top: -1200%;
    right: -90%;
    width: 6vw;
    height: 3vw;
  }

  .buttonoff3 {
    position: relative;
    top: -1800%;
    right: -110%;
    width: 6vw;
    height: 3vw;
  }
  .buttonon4 {
    position: relative;
    top: -1200%;
    right: -90%;
    width: 6vw;
    height: 3vw;
  }

  .buttonoff4 {
    position: relative;
    top: -1800%;
    right: -110%;
    width: 6vw;
    height: 3vw;
  }



    /* Hover effects for buttons */

  .iconSettings:hover .settingsIcon,
  .buttonon1:hover,
  .buttonoff1:hover,
  .buttonon2:hover,
  .buttonoff2:hover,
  .buttonon3:hover,
  .buttonoff3:hover,
  .buttonon4:hover,
  .buttonoff4:hover {
    transform: scale(1.25);
    transition: transform 0.3s ease;
  }
</style>
