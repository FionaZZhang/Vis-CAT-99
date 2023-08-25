<template>
  <div :class="$style.ipadPro111">
    <img :class="$style.catIcon" alt="" src="../assets/cat@2x.png" />
    <img :class="$style.gridRightIcon" alt="" src="../assets/grid-right.svg" />
    <img :class="$style.patternLeftIcon" alt="" src="../assets/pattern-left.svg" />
    <div :class="$style.buttonConfirm">
      <img :class="$style.rectangle2Icon" alt="" src="../assets/rectangle2.svg" />
      <div :class="$style.textConfirm">DONE</div>
    </div>
    <div :class="$style.textGoal">
      <img :class="$style.rectangle1Icon" alt="" src="../assets/rectangle1.svg" />
      <div :class="$style.text">Copy the Pattern</div>
    </div>
    <div :class="$style.buttonHome" @click="navigateToLobby">
      <div :class="$style.rectangle4" />
      <img :class="$style.buttonHomeIcon" alt="" src="../assets/button-home@2x.png" />
    </div>
    <img :class="$style.buttonStopIcon" alt="" src="../assets/button-stop.svg" />
  </div>

</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppStart",
    methods: {
      navigateToLobby() {
        this.$router.push("/Lobby");
      }
    }
  });
</script>
<style module>
  .catIcon {
    position: absolute;
    top: 0px;
    left: 980px;
    width: 136px;
    height: 130px;
    object-fit: cover;
  }
  .gridRightIcon {
    position: absolute;
    top: 286px;
    left: 691px;
    width: 278px;
    height: 272px;
  }
  .patternLeftIcon {
    position: absolute;
    top: 286px;
    left: 146px;
    width: 278px;
    height: 272.55px;
  }
  .rectangle2Icon {
    position: absolute;
    top: 0px;
    left: -4px;
    border-radius: var(--br-11xl);
    width: 235px;
    height: 120px;
  }
  .textConfirm {
    position: absolute;
    top: calc(50% - 35px);
    left: calc(50% - 95.5px);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 191px;
    height: 75px;
  }
  .buttonConfirm {
    position: absolute;
    top: 706px;
    left: 847px;
    width: 227px;
    height: 112px;
  }
  .rectangle1Icon {
    position: absolute;
    top: 31px;
    left: -4px;
    align-items: center;
    border-radius: var(--br-11xl);
    width: 619px;
    height: 113px;
  }
  .text {
    position: absolute;
    top: 0px;
    left: 76px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 469px;
    height: 164px;
  }
  .textGoal {
    position: absolute;
    top: 85px;
    left: 252px;
    width: 611px;
    height: 164px;
  }
  .rectangle4 {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-11xl);
    background-color: #f1c5ae;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 90px;
    height: 90px;
  }
  .buttonHomeIcon {
    position: absolute;
    top: 16px;
    left: 19px;
    width: 52px;
    height: 48px;
    object-fit: cover;
  }
  .buttonHome {
    position: absolute;
    top: 15px;
    left: 16px;
    width: 90px;
    height: 90px;
  }

  .buttonStopIcon {
    position: absolute;
    top: 15px;
    left: 117px;
    width: 98px;
    height: 98px;
  }

  .ipadPro111 {
    position: relative;
    background-color: #fff0e6;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    text-align: center;
    font-size: var(--font-size-29xl);
    color: var(--color-black);
    font-family: var(--font-inter);
  }

  .buttonHome:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .buttonHome:hover .ButtonHomeIcon {
    transform: scale(1.1);
    transition: transform 0.3s;
  }

</style>
