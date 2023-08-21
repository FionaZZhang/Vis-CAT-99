<template>
  <div :class="$style.ipadPro111">
    <div :class="$style.navigation" />
    <div :class="$style.iconSettings">
      <div :class="$style.settingsIconText">Settings</div>
      <div :class="$style.buttonSettings" />
      <img :class="$style.settingsIcon" alt="" src="../assets/settings-icon1@2x.png" />
    </div>
    <div :class="$style.iconUser">
      <div :class="$style.buttonSettings" />
      <img :class="$style.userIcon" alt="" src="../assets/user-icon@2x.png" />
    </div>
    <div :class="$style.iconHome" @click="navigateToLobby">
      <div :class="$style.homeIconText">Home</div>
      <div :class="$style.buttonHome" />
      <img :class="$style.homeIcon" alt="" src="../assets/home-icon1@2x.png" />
    </div>
    <img :class="$style.settingsboardIcon" alt="" src="../assets/settingsboard.svg" />
    <div :class="$style.buttonon0">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.en">EN</div>
    </div>
    <div :class="$style.buttonon">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.on">ON</div>
    </div>
    <div :class="$style.buttonon1">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.on">ON</div>
    </div>
    <div :class="$style.buttonon2">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.on">ON</div>
    </div>
    <div :class="$style.buttonon3">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.on">ON</div>
    </div>
    <div :class="$style.buttonon4">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.on">ON</div>
    </div>
    <img :class="$style.settingsIcon1" alt="" src="../assets/settings-icon2@2x.png" />
    <div :class="$style.buttonoff0">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.ch">CH</div>
    </div>
    <div :class="$style.buttonoff">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.off">OFF</div>
    </div>
    <div :class="$style.buttonoff1">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.off">OFF</div>
    </div>
    <div :class="$style.buttonoff2">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.off">OFF</div>
    </div>
    <div :class="$style.buttonoff3">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage.svg"
      />
      <div :class="$style.off">OFF</div>
    </div>
    <div :class="$style.language">Language</div>
    <div :class="$style.voiceInstructions">Voice Instructions</div>
    <div :class="$style.displayResults">Display Results</div>
    <div :class="$style.sendResults">Send Results</div>
    <div :class="$style.sendResults">Send Results</div>
    <div :class="$style.partialMode">Partial Mode</div>
    <div :class="$style.bgm">BGM</div>
    <div :class="$style.buttonoff4">
      <img
        :class="$style.buttonlanguageIcon1"
        alt=""
        src="../assets/buttonlanguage1.svg"
      />
      <div :class="$style.off">OFF</div>
    </div>
    <div :class="$style.iconViscat">
      <div :class="$style.viscatIcon" />
      <div :class="$style.viscatLogo">Vis-CAT</div>
    </div>
    <img :class="$style.brownCatIcon" alt="" src="../assets/brown-cat@2x.png" />
    <div :class="$style.welcomeText">
      <span>Turn on </span>
      <span :class="$style.partialMode1">Partial Mode</span>
      <span> if you only want to play the first level.</span>
    </div>
    <img :class="$style.ipadPro111Child" alt="" src="../assets/line-3.svg" />
    <img :class="$style.ipadPro111Item" alt="" src="../assets/line-2.svg" />
    <img :class="$style.ipadPro111Inner" alt="" src="../assets/line-2.svg" />
    <img :class="$style.lineIcon" alt="" src="../assets/line-2.svg" />
    <img :class="$style.ipadPro111Child1" alt="" src="../assets/line-2.svg" />
    <img :class="$style.ipadPro111Child2" alt="" src="../assets/line-2.svg" />
    <img :class="$style.ipadPro111Child3" alt="" src="../assets/line-2.svg" />
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppSettings",
    methods: {
      navigateToLobby() {
        this.$router.push("/Lobby");
      }
    }
  });
</script>
<style module>
  .navigation {
    position: absolute;
    bottom: 3rem;
    left: 4.44rem;
    border-radius: var(--br-21xl);
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
    bottom: 6rem;
    left: 5.13rem;
    width: 8.75rem;
    height: 8.75rem;
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
    bottom: 4rem;
    left: 21.75rem;
    width: 7.5rem;
    height: 7.5rem;
  }
  .homeIconText {
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
    bottom: 4rem;
    left: 14.06rem;
    width: 7.5rem;
    height: 7.5rem;
    font-size: var(--font-size-21xl);
  }
  .settingsboardIcon {
    position: absolute;
    top: 3.19rem;
    left: 45rem;
    width: 41.19rem;
    height: 61rem;
  }
  .en {
    position: absolute;
    top: 0rem;
    left: 1rem;
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
    top: 18.63rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon0 {
    position: absolute;
    top: 13.5rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon1 {
    position: absolute;
    top: 24.25rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon2 {
    position: absolute;
    top: 30.5rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon3 {
    position: absolute;
    top: 36.13rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonon4 {
    position: absolute;
    top: 41.69rem;
    left: 70rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .settingsIcon1 {
    position: absolute;
    height: 13.19%;
    width: 8.67%;
    top: 10.07%;
    right: 23%;
    bottom: 76.73%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .ch {
    position: absolute;
    top: 0rem;
    left: 1rem;
  }
  .off {
    position: absolute;
    top: 7%;
    left: 15%;
  }
  .buttonoff {
    position: absolute;
    top: 18.63rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff0 {
    position: absolute;
    top: 13.5rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff1 {
    position: absolute;
    top: 24.25rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff2 {
    position: absolute;
    top: 30.5rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .buttonoff3 {
    position: absolute;
    top: 36.13rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
  }
  .language {
    position: absolute;
    top: 13.69rem;
    left: 48rem;
  }
  .voiceInstructions {
    position: absolute;
    top: 19rem;
    left: 48rem;
  }
  .displayResults {
    position: absolute;
    top: 24.63rem;
    left: 48rem;
  }
  .sendResults {
    position: absolute;
    top: 30.88rem;
    left: 48rem;
  }
  .partialMode {
    position: absolute;
    top: 36.5rem;
    left: 48rem;
  }
  .bgm {
    position: absolute;
    top: 42.31rem;
    left: 48rem;
  }
  .buttonoff4 {
    position: absolute;
    top: 41.63rem;
    left: 77.5rem;
    width: 5.06rem;
    height: 2.63rem;
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
    top: 2.44rem;
    left: 3.5rem;
    width: 24.5rem;
    height: 8.44rem;
    font-size: var(--font-size-77xl);
    color: var(--color-plum);
  }
  .brownCatIcon {
    position: absolute;
    top: 27.25rem;
    left: 17.81rem;
    width: 11.81rem;
    height: 11.19rem;
    object-fit: cover;
  }
  .partialMode1 {
    color: var(--color-plum);
  }
  .welcomeText {
    position: absolute;
    top: 15.69rem;
    left: 2.44rem;
    font-size: 2.25rem;
    display: inline-block;
    width: 23.06rem;
    height: 7.06rem;
  }
  .ipadPro111Child {
    position: absolute;
    top: 27.69rem;
    left: 12.17rem;
    width: 4.63rem;
    height: 2.88rem;
  }
  .ipadPro111Item {
    position: absolute;
    top: 16.94rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .ipadPro111Inner {
    position: absolute;
    top: 22.56rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .lineIcon {
    position: absolute;
    top: 28.44rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .ipadPro111Child1 {
    position: absolute;
    top: 34.56rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .ipadPro111Child2 {
    position: absolute;
    top: 40.31rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .ipadPro111Child3 {
    position: absolute;
    top: 46.06rem;
    left: 48rem;
    width: 33.13rem;
    height: 0.25rem;
  }
  .settingsIconText {
    position: absolute;
    top: 8.88rem;
    left: 1rem;
    font-size: 2rem;
  }
  .ipadPro111 {
    position: relative;
    background-color: #b8e3ff;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-21xl);
    color: var(--color-black);
    font-family: var(--font-jua);
  }


    /* Hover effects for buttons */
  .buttonSettings:hover,
  .buttonHome:hover
  {
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .iconSettings:hover .settingsIcon,
  .iconUser:hover .userIcon,
  .iconHome:hover .homeIcon
  {
    transform: scale(1.1);
    transition: transform 0.3s;
  }

  .buttonon0:hover,
  .buttonoff0:hover,
  .buttonon:hover,
  .buttonoff:hover,
  .buttonon1:hover,
  .buttonon2:hover,
  .buttonon3:hover,
  .buttonon4:hover,
  .buttonoff1:hover,
  .buttonoff2:hover,
  .buttonoff3:hover,
  .buttonoff4:hover {
    transform: scale(1.25);
    transition: transform 0.3s ease;
  }


</style>
