<template>
  <div :class="$style.appSettings">

    <div class="iconViscat">
      <div class="viscatIcon" />
      <div class="viscatLogo">Vis-CAT</div>
    </div>

    <div>
      <div class="navigationBar">
        <div :class="$style.iconSettings">
          <div :class="$style.settingsIconText">Settings</div>
          <div class="buttonYellow" />
          <img :class="$style.settingsIcon" alt="" src="../assets/settings-icon1@2x.png" />
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

    
    <div :class="$style.welcomeText">
      <img :class="$style.brownCatIcon" alt="" src="../assets/brown-cat@2x.png" />
      <img :class="$style.line" alt="" src="../assets/line-3.svg" />
      <span>Turn on </span>
      <span :class="$style.partialMode1">Partial Mode</span>
      <span> if you only want to play the first level.</span>
    </div>
    
    <img :class="$style.settingsboard" alt="" src="../assets/settingsboard.svg" />
    <div :class="$style.settingsboard">
      
      <img :class="$style.settingsIcon1" alt="" src="../assets/settings-icon2@2x.png" />

      <div :class="$style.line1">
        <img alt="" src="../assets/line-2.svg" />
        <div :class="$style.settingText">Voice Instructions</div>
      </div>

      <div :class="$style.line2">
        <img alt="" src="../assets/line-2.svg" />
        <div :class="$style.settingText">Display Results</div>
      </div>

      <div :class="$style.line3">
        <img alt="" src="../assets/line-2.svg" />
        <div :class="$style.settingText">Send Results</div>
      </div>

      <div :class="$style.line4">
        <img alt="" src="../assets/line-2.svg" />
        <div :class="$style.settingText">Partial Mode</div>
      </div>

      <div :class="$style.buttonon">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage.svg"/>
        <div :class="$style.on">ON</div>
      </div>
      <div :class="$style.buttonon1">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage.svg"/>
        <div :class="$style.on">ON</div>
      </div>
      <div :class="$style.buttonon2">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage.svg"/>
        <div :class="$style.on">ON</div>
      </div>
      <div :class="$style.buttonon3">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage1.svg" />
        <div :class="$style.on">ON</div>
      </div>

      <div :class="$style.buttonoff">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage1.svg"/>
        <div :class="$style.off">OFF</div>
      </div>
      <div :class="$style.buttonoff1">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage1.svg"/>
        <div :class="$style.off">OFF</div>
      </div>
      <div :class="$style.buttonoff2">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage1.svg"/>
        <div :class="$style.off">OFF</div>
      </div>
      <div :class="$style.buttonoff3">
        <img :class="$style.buttonlanguageIcon1" alt="" src="../assets/buttonlanguage.svg"/>
        <div :class="$style.off">OFF</div>
      </div>

    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppSettings",
    methods: {
      navigateToLobby() {
        this.$router.push("/Lobby");
      },
      navigateToAccount() {
        this.$router.push("/Account");
      }
    }
  });
</script>
<style module>
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
    position: absolute;
    top: 0%;
    bottom: 0%;
    right: 0%;
    left: 56.3%;
    width: 50vw;
    height: 55vw;
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
    position: absolute;
    top: 7%;
    left: 15%;
  }
  .buttonon {
    position: absolute;
    top: 30%;
    /* left: 70rem; */
    right: 25%;
    width: 5.06rem;
    height: 2.63rem;
  }

  .buttonon1 {
    position: absolute;
    top: 40%;
    /* left: 70rem; */
    right: 25%;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon2 {
    position: absolute;
    top: 50%;
    /* left: 70rem; */
    right: 25%;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon3 {
    position: absolute;
    top: 60%;
    /* left: 70rem; */
    right: 25%;
    width: 5.06rem;
    height: 2.63rem;
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
    position: absolute;
    top: 7%;
    left: 15%;
  }
  .buttonoff {
    position: absolute;
    top: 30%;
    /* left: 77.5rem; */
    right: 8%;
    width: 5.06rem;
    height: 2.63rem;
  }

  .buttonoff1 {
    position: absolute;
    top: 40%;
    /* left: 77.5rem; */
    right: 8%;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff2 {
    position: absolute;
    top: 50%;
    /* left: 77.5rem; */
    right: 8%;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff3 {
    position: absolute;
    top: 60%;
    /* left: 77.5rem; */
    right: 8%;
    width: 5.06rem;
    height: 2.63rem;
  }

  .settingText {
    position: absolute;
    top: -150%;
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
    /* left: 48rem; */
    left: 15%;
    width: 34vw;
    height: 0.5vw;
    max-width: 100%;
    max-height: 100%;
  }
  .line2 {
    position: absolute;
    top: 44%;
    /* left: 48rem; */
    left: 15%;
    width: 34vw;
    height: 0.5vw;
  }
  .line3 {
    position: absolute;
    top: 55%;
    /* left: 48rem; */
    left: 15%;
    width: 34vw;
    height: 0.5vw;
  }
  .line4 {
    position: absolute;
    top: 66%;
    /* left: 48rem; */
    left: 15%;
    width: 34vw;
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


    /* Hover effects for buttons */

  .iconSettings:hover .settingsIcon,
  .buttonon:hover,
  .buttonoff:hover,
  .buttonon1:hover,
  .buttonon2:hover,
  .buttonon3:hover,
  .buttonoff1:hover,
  .buttonoff2:hover,
  .buttonoff3:hover {
    transform: scale(1.25);
    transition: transform 0.3s ease;
  }
</style>
