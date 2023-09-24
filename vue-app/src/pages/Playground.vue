<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_home.png" alt="Button Home" id="buttonHome" @click="navigateToLobby">
        <img src="../assets/button_restart.png" alt="Button Restart" id="buttonRestart" @click="clearPattern">
        <img :src="soundButtonSrc" alt="Button Sound" id="buttonSound" @click="changeSound">
      </div>
      <img src="../assets/pink-cat@2x.png" alt="Cat Icon" id="catPink">
    </nav>
    <main>
      <header>
        <img src="../assets/text_goal.png" alt="Goal Text" id="textGoal">
      </header>
      <section id = "graphArea">
        <div class="grid-wrapper">
          <svg class="connector"></svg>
          <div class="grid"
            @mousedown="startDrawing"
            @mouseup="endDrawing"
            @touchstart="startDrawing"
            @touchmove="handleTouchMove">
            <div
              v-for="n in 16"
              :key="n"
              class="cell"
              :data-id="n"
              @mouseover="handleMouseOver"
              @touchend="endDrawing">
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <button @click="revertPattern" v-if="pattern.length > 0" id="buttonReverse"><span id="textReverse"> Reverse </span></button>
    </footer>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import { store } from "@/store";
import { muteAudio, playAudio } from "./Speech.js";

import "@/assets/gamepage.css"
export default defineComponent({
  name: "AppPlayground",
  data() {
    return {
      isDrawing: false,
      pattern: [],
      svg: null,
    };
  },
  mounted() {
    this.svg = this.$el.querySelector('.connector');
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
    navigateToLobby() {
      this.$router.push("/Lobby");
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },
    preventScroll() {
      document.getElementById('InsPage').addEventListener('touchmove', function(event) {
      event.preventDefault();}, { passive: false });
    },
    startDrawing(event) {
      const cell = event.target;
      var lastId = -1;
      if (this.pattern.length != 0){
        lastId = this.pattern[this.pattern.length-1];
      }

      if (this.pattern.length == 0 || lastId == cell.dataset.id){
        this.isDrawing = true;
        const id = cell.dataset.id;
        if (!this.pattern.includes(id) && id >= 1 && id <= 16) {
          this.pattern.push(id);
          cell.classList.add('active');
        }
      }
    },
    handleMouseOver(event) {
      const cell = event.target;
      const id = cell.dataset.id;
      if (this.isDrawing && !this.pattern.includes(id)) {
        this.pattern.push(id);
        cell.classList.add('active');
        if (this.pattern.length > 1) {
          const prevCell = this.$el.querySelector(
            `.cell[data-id="${this.pattern[this.pattern.length - 2]}"]`
          );
          this.drawLine(prevCell, cell);
        }
      }
    },
    handleTouchMove(event) {
      const touch = event.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('cell')) {
        const id = element.dataset.id;
        if (this.isDrawing && !this.pattern.includes(id)) {
          this.pattern.push(id);
          element.classList.add('active');
          if (this.pattern.length > 1) {
            const prevCell = this.$el.querySelector(
              `.cell[data-id="${this.pattern[this.pattern.length - 2]}"]`
            );
            this.drawLine(prevCell, element);
          }
        }
      }
    },
    drawLine(cell1, cell2) {
      const rect1 = cell1.getBoundingClientRect();
      const rect2 = cell2.getBoundingClientRect();
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', rect1.left + rect1.width / 2);
      line.setAttribute('y1', rect1.top + rect1.height / 2);
      line.setAttribute('x2', rect2.left + rect2.width / 2);
      line.setAttribute('y2', rect2.top + rect2.height / 2);
      line.setAttribute('stroke', '#3498db');
      line.setAttribute('stroke-width', store.state.strokeWidth);
      this.svg.appendChild(line);
    },
    endDrawing() {
      this.isDrawing = false;
    },
    clearPattern() {
      this.pattern = [];
      const cells = this.$el.querySelectorAll('.cell.active');
      cells.forEach(cell => {
        cell.classList.remove('active');
      });
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },
    revertPattern() {
      if (this.pattern.length === 0) return;
      // Remove the last item from the pattern arrays
      const lastId = this.pattern.pop();
      // Revert the UI change for the last cell
      const lastCell = this.$el.querySelector(`.cell[data-id="${lastId}"]`);
      lastCell.classList.remove('active');
      // Remove the last SVG line
      if (this.svg.firstChild) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },
  },
});
</script>

<style scoped>
#InsPage {
  background-color: #ffe6f8;
  position: fixed;
  width: 100vw;
  height: 100vh;
}


section {
  display: flex;
  flex-direction: row;
  padding-left: 15%;
  padding-right: 15%;
  justify-content: center;
}

</style>