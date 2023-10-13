<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_home.png" alt="Button Home" id="buttonHome" @click="navigateToLobby">
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
      <button @click="clearPattern" v-if="pattern.length > 0" id="buttonClear"><span id="textClear"> Clear </span></button>
    </footer>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import { store } from "@/store";
import { speak, muteAudio, playAudio } from "../Speech.js";
import "@/assets/gamepage.css";
export default defineComponent({
  name: "AppPlayground",
  data() {
    return {
      isDrawing: false,
      pattern: [],
      svg: null,
      showModal: false,
      originalPattern: [1, 2, 3, 4, 8, 7, 10, 11, 5, 9, 13, 14, 15, 16],
    };
  },
  mounted() {
    this.svg = this.$el.querySelector('.connector');
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    window.addEventListener('scroll', this.ReallignCells);
    window.addEventListener('resize', this.ReallignCells);
    this.StartInstruction();
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.clearPattern;
    document.removeEventListener('touchmove', this.preventScroll);
    window.removeEventListener('scroll', this.ReallignCells);
    window.removeEventListener('resize', this.ReallignCells);
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
    navigateToPage2() {
      this.$router.push("/instruction2");
    },  
    StartInstruction(){
      this.instructionPopUp = true;
      speak("Playground_instruction");
    },
    CloseInstruction(){
      this.instructionPopUp = false;
      speak("Copy_2");
    },
    startTimer() {
      if (!this.timerStarted) {
        this.timerStarted = true; 
        this.timer = setInterval(() => { this.elapsedTime += 1; }, 1000);         
      }
    },
    navigateToLobby() {
      speak("Home_page");
      this.$router.push("/Lobby");
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },   
    preventScroll() {
      document.getElementById('graphArea').addEventListener('touchmove', function(event) {
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
      if (this.pattern.length > 0){
        this.ReallignCells();
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
      if (this.pattern.length > 0){
        this.ReallignCells();
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
    RedrawPatternWhenScroll(patternDots) {
      const dots = document.querySelectorAll('.cell');
      const svg = document.querySelector('.connector');
      for (const dot of dots) {
        const dotId = parseInt(dot.dataset.id);
        if (patternDots.includes(dotId)) {
          dot.classList.add('active');
        }
      }
      for (let i = 0; i < patternDots.length - 1; i++) {
        const dotId1 = patternDots[i];
        const dotId2 = patternDots[i + 1];
        const dot1 = document.querySelector(`.cell[data-id="${dotId1}"]`);
        const dot2 = document.querySelector(`.cell[data-id="${dotId2}"]`);
        const x1 = dot1.offsetLeft + dot1.offsetWidth / 2;
        const y1 = dot1.offsetTop + dot1.offsetHeight / 2;
        const x2 = dot2.offsetLeft + dot2.offsetWidth / 2;
        const y2 = dot2.offsetTop + dot2.offsetHeight / 2;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#3498db');
        line.setAttribute('stroke-width', store.state.strokeWidth);
        svg.appendChild(line);
      }
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
      while (this.svg.childElementCount > this.originalPattern.length) {
        this.svg.removeChild(this.svg.lastChild);
      }
      this.ReallignCells();
    },
    ReallignCells() {
      while (this.svg.childElementCount > 0) {
        this.svg.removeChild(this.svg.lastChild);
      }
      if (this.pattern.length > 0){
        this.RedrawPatternWhenScroll(this.pattern);
      }
    },
    revertPattern() {
      if (this.pattern.length === 0) return;
      const lastId = this.pattern.pop();
      const lastCell = this.$el.querySelector(`.cell[data-id="${lastId}"]`);
      lastCell.classList.remove('active');
      if (this.svg.childElementCount > this.originalPattern.length) {
        this.svg.removeChild(this.svg.lastChild);
      }
      this.ReallignCells();
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
#buttonReverse {
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 65%;
  height: 10%;
  width: 15%;
  bottom: 3%;
  border-radius: 20px;
  border-width: 0px;
  box-shadow: 1px 2px 3px #bebdbd;
}
#buttonClear {
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 15%;
  right: 4%;
  bottom: 3%;
  border-radius: 20px;
  border-width: 0px;
  box-shadow: 1px 2px 3px #bebdbd;
}
</style>
