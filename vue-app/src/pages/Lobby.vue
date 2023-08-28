<template>
  <div :class="$style.ipadPro111">
    <img :class="$style.mapIcon" alt="" src="../assets/map.svg" />

    <nav>
      <div :class="$style.iconViscat">
        <div :class="$style.viscatIcon" />
        <div :class="$style.viscatLogo">Vis-CAT</div>
      </div>
    </nav>

    <main>
      <img :class="$style.brownCatIcon" alt="" src="../assets/brown-cat@2x.png" />
      <img :class="$style.yellowCatIcon" alt="" src="../assets/yellow-cat@2x.png" />
      <div :class="$style.welcomeText">
        <p :class="$style.welcome">Welcome!</p>
        <p :class="$style.welcome">Click ‘Start’ to take the test!</p>
      </div>
      <img :class="$style.ipadPro111Child" alt="" src="../assets/line-1.svg" />
      <div :class="$style.buttonStart" @click="navigateToInstruction" >
        <img :class="$style.buttonStartIcon" alt="" src="../assets/button-start.svg" />
        <div :class="$style.startButtonText">Start</div>
        <img :class="$style.playIcon" alt="" src="../assets/play-icon@2x.png"/>
      </div>
      <div :class="$style.buttonPlayground" @click="navigateToPlayground">
        <img
          :class="$style.buttonPlaygroundIcon"
          alt=""
          src="../assets/button-playground.svg"
        />
        <div :class="$style.playgroundButtonText">Playground</div>
        <img
          :class="$style.playgroundPlayButtonIcon"
          alt=""
          src="../assets/playground-play-button@2x.png"
        />
      </div>
    </main>

    <footer>
      <div :class="$style.navigation" />
      <div :class="$style.iconSettings" @click="navigateToSettings">
        <div :class="$style.buttonSettings" />
        <img :class="$style.settingsIcon" alt="" src="../assets/settings-icon@2x.png" />
      </div>
      <div :class="$style.iconUser" @click="navigateToAccount">
        <div :class="$style.buttonSettings" />
        <img :class="$style.userIcon" alt="" src="../assets/user-icon@2x.png" />
      </div>
      <div :class="$style.iconHome">
        <div :class="$style.homeIconText">Home</div>
        <div :class="$style.buttonHome" />
        <img :class="$style.homeIcon" alt="" src="../assets/home-icon@2x.png" />
      </div>
    </footer>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppLobby",
    mounted() {
      document.addEventListener('touchmove', this.preventScroll, { passive: false });
      // window.addEventListener('orientationchange', this.preventRotation);
    },
    beforeUnmount() {
      document.removeEventListener('touchmove', this.preventScroll);
      // window.removeEventListener('orientationchange', this.preventRotation);
    },
    methods: {
      preventScroll(e) {
        e.preventDefault();
      },
      // preventRotation(e) {
      //   e.preventDefault();
      // },
      navigateToSettings() {
        this.$router.push("/Settings");
      },
      navigateToPlayground() {
        this.$router.push("/Playground");
      },
      navigateToInstruction(){	
        this.$router.push("/Instruction");	
      },
      navigateToAccount(){
        this.$router.push("/Account");
      },
      navigateToFinish(){
        this.$router.push("/Finish");
      },
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
  .mapIcon {
    position: absolute;
    top: 0rem;
    right: 0rem;
    width: 47.55rem;
    height: 53.31rem;
    /* width: 50%;
    height: 100%; */
  }
  .brownCatIcon {
    position: absolute;
    top: 22rem;
    left: 4rem;
    /* top: 42%;
    left: 4%; */
    width: 11.81rem;
    height: 11.19rem;
    object-fit: cover;
  }
  .yellowCatIcon {
    position: absolute;
    top: 22.5rem;
    right: 24rem;
    /* top: 42%;
    right: 25%; */
    width: 11.88rem;
    height: 11.06rem;
    object-fit: cover;
  }
  .welcome {
    margin: 0;
  }
  .welcomeText {
    position: absolute;
    top: 14rem;
    left: 16rem;
    /* top: 28%;
    left: 17%; */
    font-size: 2.25rem;
    display: inline-block;
    width: 17.13rem;
  }
  .ipadPro111Child {
    position: absolute;
    top: 23rem;
    left: 15rem;
    /* top: 46.5%;
    left: 16.7%; */
    width: 3.57rem;
    height: 4.12rem;
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
    bottom: 4rem;
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
    bottom: 4rem;
    left: 21.25rem;
    width: 7.5rem;
    height: 7.5rem;
  }
  .homeIconText {
    position: absolute;
    top: 8.88rem;
    left: 1.63rem;
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
    bottom: 6rem;
    left: 13.06rem;
    width: 8.75rem;
    height: 8.75rem;
  }
  .viscatIcon {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: 20px;
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
    font-size: 6rem;
    /* top: 2%;
    left: 2%;
    width: 27%;
    height: 15%;
    font-size: 5rem; */
    color: #a478b8;
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
    top: 27.35%;
    left: 42.94%;
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
    top: 24.81rem;
    right: 36rem;
    /* top: 47%;
    right: 37%; */
    width: 16.59rem;
    height: 7.31rem;
    font-family: var(--font-inder);
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
    left: 30.73%;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-text-stroke: 1px #000;
  }
  .playgroundPlayButtonIcon {
    position: absolute;
    height: 69.49%;
    width: 22.67%;
    top: 11.86%;
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
    top: 10.81rem;
    right: 20rem;
    /* top: 20%;
    right: 22%; */
    width: 24.81rem;
    height: 7.38rem;
    font-family: var(--font-inder);
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
  .buttonHome:hover,
  .buttonStart:hover,
  .buttonPlayground:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .iconSettings:hover .settingsIcon,
  .iconUser:hover .userIcon,
  .iconHome:hover .homeIcon,
  .buttonStart:hover .playIcon,
  .buttonPlayground:hover .playgroundPlayButtonIcon {
    transform: scale(1.1);
    transition: transform 0.3s;
  }


  nav {
    padding: 0px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 20%;
  }
  footer {
    display: flex;
    flex-direction: row;
  }
  

  @media only screen and (max-width:768px) {
    .mapIcon {
      position: absolute;
      top: 0rem;
      right: 0rem;
      width: 23.75rem;
      height: 26.65rem;
    }
    .iconViscat {
      position: absolute;
      top: 2%;
      left: 2%;
      width: 28%;
      height: 17%;
      font-size: 3rem;
      color: #a478b8;
    }
    .navigation {
      position: absolute;
      bottom: 3rem;
      left: 4.44rem;
      border-radius: var(--br-21xl);
      background-color: var(--color-white);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 13.5rem;
      height: 5rem;
    }
    .iconSettings {
      position: absolute;
      bottom: 4rem;
      left: 5.19rem;
      width: 3.75rem;
      height: 3.75rem;
    }
    .iconHome {
      position: absolute;
      bottom: 6rem;
      left: 8.94rem;
      width: 4.375rem;
      height: 4.375rem;
    }
    .homeIconText {
      position: absolute;
      top: 5rem;
      left: 0.6rem;
      font-size: 24px;
    }
    .iconUser {
      position: absolute;
      left: 13.315rem;
      bottom: 4rem;
      width: 3.75rem;
      height: 3.75rem;
    }
    .brownCatIcon {
      position: absolute;
      top: 42%;
      left: 4%;
      width: 5.9rem;
      height: 5.6rem;
      object-fit: cover;
    }
    .yellowCatIcon {
      position: absolute;
      top: 42%;
      right: 25%;
      width: 5.9rem;
      height: 5.53rem;
      object-fit: cover;
    }
    .buttonPlayground {
      position: absolute;
      top: 23%;
      right: 22%;
      width: 12.4rem;
      height: 3.69rem;
      font-family: var(--font-inder);
      font-size: 20px;
    }
    .buttonStart {
      position: absolute;
      top: 47%;
      right: 37%;
      width: 8.3rem;
      height: 3.65rem;
      font-family: var(--font-inder);
      font-size: 20px;
    }
    .ipadPro111Child {
      position: absolute;
      top: 46.5%;
      left: 16.7%;
      width: 1.8rem;
      height: 2.06rem;
    }
    .welcomeText {
      position: absolute;
      top: 28%;
      left: 17%;
      font-size: 1.1rem;
      display: inline-block;
      width: 8.56rem;
    }
    
  }
</style>