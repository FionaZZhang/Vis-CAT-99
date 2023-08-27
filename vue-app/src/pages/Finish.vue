<template>
  <div :class="$style.appfinish">
    <img :class="$style.grassIcon" alt="" src="../assets/grass.png" />
    <img :class="$style.yellowCatIcon" alt="" src="../assets/yellow-cat@2x.png" />
    <img :class="$style.appfinishChild" alt="" src="/line-1.svg" />
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
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppFinish",
    methods: {
      navigateToLobby() {
        this.$router.push("/Lobby");
      }
    }
  });
</script>
<style module>
  .grassIcon {
    position: absolute;
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
    position: absolute;
    height: 21.22%;
    width: 15.91%;
    top: 56.47%;
    right: 39.45%;
    bottom: 22.3%;
    left: 44.64%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .appfinishChild {
    position: absolute;
    height: 5.52%;
    width: 6.2%;
    top: 60.73%;
    right: 56.9%;
    bottom: 33.75%;
    left: 36.91%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
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
    font-size: inherit;
    font-weight: 400;
    font-family: inherit;
    display: inline-block;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-text-stroke: 2px #fff;
  }
  .iconViscat {
    position: absolute;
    height: 16.19%;
    width: 32.83%;
    top: 5.04%;
    right: 64.66%;
    bottom: 78.78%;
    left: 2.51%;
    color: var(--color-plum);
  }
  .homeIconText {
    position: absolute;
    top: 142px;
    left: 26px;
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
    height: 16.07%;
    width: 11.22%;
    top: 5.16%;
    right: 50.5%;
    bottom: 78.78%;
    left: 38.27%;
    font-size: var(--font-size-21xl);
  }
  .wellDone {
    position: absolute;
    height: 7.07%;
    width: 18.43%;
    top: 52.52%;
    left: 22.19%;
    font-size: 48px;
    display: inline-block;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -webkit-text-stroke: 1px #000;
  }
  .finishLine1 {
    position: absolute;
    height: 5.96%;
    width: 25.65%;
    top: 68.91%;
    right: 57.85%;
    bottom: 25.14%;
    left: 16.5%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
  }
  .finishLine2 {
    position: absolute;
    height: 6.41%;
    width: 21.01%;
    top: 64.69%;
    right: 16.62%;
    bottom: 28.9%;
    left: 62.36%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
  }
  .flagPole1 {
    position: absolute;
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
    position: absolute;
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
    position: absolute;
    height: 16.91%;
    width: 66.65%;
    top: 30.28%;
    right: 16.59%;
    bottom: 52.82%;
    left: 16.76%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .appfinish {
    position: relative;
    background-color: #b8e3ff;
    width: 100%;
    height: 834px;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-77xl);
    color: var(--color-black);
    font-family: var(--font-jua);
  }

  /* Hover effects for buttons */
  .buttonHome:hover{
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .iconHome:hover .homeIcon {
    transform: scale(1.1);
    transition: transform 0.3s;
  }

</style>

