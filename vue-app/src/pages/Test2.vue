<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_restart.png" alt="Button Replay" id="buttonReplay" @click="StartInstruction">
        <img :src="soundButtonSrc" alt="Button Sound" id="buttonSound" @click="changeSound">
      </div>
      <h3>Time used: {{ minutes }}:{{ secondsFormatted }}</h3>
      <img src="../assets/pink-cat@2x.png" alt="Cat Icon" id="catPink">
    </nav>
    <main>
      <header>
        <img src="../assets/text_goal2.png" alt="Goal Text" id="textGoal">
      </header>
      <section id = "graphArea">
        <div class="grid-wrapper">
          <svg class="connector"></svg>
          <div class="grid">
            <div
              v-for="n in 16"
              :key="n"
              class="dot"
              :data-id="n">
            </div>
          </div>
        </div>
        <div class="grid-wrapper">
          <svg class="connector"></svg>
          <div class="grid" id = "noScrollArea"
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
      <button @click="navigateToStart(); stopTimer()"  id="buttonConfirm"><span id="textConfirm"> OK</span></button>
    </footer>
    <div id="modal" v-if="showModal" class="modal-container">
      <div class="custom-modal">
        <div class="custom-modal-content">
          <div class="custom-modal-header">
            <h3>Do you think your pattern looks like it's been flipped correctly?</h3>
          </div>
          <div class="custom-modal-buttons">
            <button class="cute-button" @click="YesRetry(); restartTimer()">No, try again</button>
            <button class="cute-button" @click="NoGiveup">Yes, submit</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="interPage" class="modal-container">
      <div class="interPage-modal">
        <div class="inter_page_content">
          <img class="next_level" src="../assets/next_level.png">
          <img class="button_next_level" id="buttonNextLevel" src="../assets/button_next_level.png" @click="navigateToPage3">
        </div>
      </div>
    </div>
    <div v-if="instructionPopUp" class="modal-container">
      <div class="instructionPopUp-modal">
        <div class="inter_page_content">
          <img class="instructionGIF" src="../assets/lateral_flip.gif" alt="instructionGIF">
          <img class="instructionConfirm" id="buttonInstructionConfirm" src="../assets/button_confirm.png" @click="CloseInstruction(); loadPatternAndConnect(this.originalPattern); startTimer()">
        </div>   
      </div>
    </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import * as checker from "../Checker.js";
import "@/assets/gamepage.css"
import {store} from "@/store";
import { speak, playAudio, muteAudio} from "../Speech.js";
export default defineComponent({
  name: "AppTest2",
  data() {
    return {
      isDrawing: false,
      pattern: [],
      svg: null,
      showModal: false,
      secondTry: true,
      interPage: false,
      instructionPopUp: false,
      originalPattern: [1, 2, 3, 4, 8, 7, 10, 11, 5, 9, 13, 14, 15, 16],
      timer: null,
      elapsedTime: 0,
      timerStarted: false,
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
    minutes() {
      return Math.floor(this.elapsedTime / 60);
    },
    secondsFormatted() {
      return (this.elapsedTime % 60).toString().padStart(2, '0');
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
    navigateToPage3() {
      this.$router.push("/Test3");
    },
    StartInstruction(){
      this.instructionPopUp = true;
      speak("Lateral_1");
    },
    CloseInstruction(){
      this.instructionPopUp = false;
      speak("Lateral_2");
    },
    navigateToStart() {
      if (checker.checkCorrectness(this.originalPattern, "lateral", this.pattern)) {
        if (store.state.isButtonOn4){
          if (this.secondTry) {
            store.state.copy = 2;
          } else {
            store.state.copy = 1;
          }
          this.$router.push("/Finish");
        }
        else{
          if (this.secondTry) {
            store.state.copy = 2;
          } else {
            store.state.copy = 1;
          }
          this.interPage = true;
        }
      }
      else {
        if (this.secondTry) {
          this.showModal = true;
          this.secondTry = false;
          speak("Lateral_3");
        } else {
          this.$router.push("/Finish");
        }
      }
    },
    startTimer() {
      if (!this.timerStarted) {
        this.timerStarted = true; 
        this.timer = setInterval(() => { this.elapsedTime += 1; }, 1000);         
      }
    },
    stopTimer() {
      if (this.timerStarted) {
        clearInterval(this.timer); 
        this.timerStarted = false; 
      }
      if (store.state.time2_1 == 0) {
        store.state.time2_1 = this.elapsedTime;
      }
      else {
        store.state.time2_2 = this.elapsedTime;
      }
    },
    restartTimer() {
      this.elapsedTime = 0;
      this.startTimer();
    },
    YesRetry() {
      this.clearPattern();
      this.showModal = false;
    },
    NoGiveup() {
      this.showModal = false;
      this.$router.push("/Finish");
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
    loadPatternAndConnect(patternDots) {
      const dots = document.querySelectorAll('.dot');
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
        const dot1 = document.querySelector(`.dot[data-id="${dotId1}"]`);
        const dot2 = document.querySelector(`.dot[data-id="${dotId2}"]`);
        const x1 = dot1.offsetLeft + dot1.offsetWidth / 2;
        const y1 = dot1.offsetTop + dot1.offsetHeight / 2;
        const x2 = dot2.offsetLeft + dot2.offsetWidth / 2;
        const y2 = dot2.offsetTop + dot2.offsetHeight / 2;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', store.state.strokeWidth);
        svg.appendChild(line);
        if (i === patternDots.length - 2) {
          const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI;
          const arrowSize = store.state.arrowSize; 
          const arrowX = x2 - arrowSize * Math.cos(angle);
          const arrowY = y2 - arrowSize * Math.sin(angle);
          const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          arrow.setAttribute('points', `${arrowX},${arrowY} ${(arrowX + arrowSize * Math.cos(angle - Math.PI / 6))},${(arrowY + arrowSize * Math.sin(angle - Math.PI / 6))} ${(arrowX + arrowSize * Math.cos(angle + Math.PI / 6))},${(arrowY + arrowSize * Math.sin(angle + Math.PI / 6))}`);
          arrow.setAttribute('fill', 'black'); 
          svg.appendChild(arrow);
        }
      }
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
    },
    ReallignCells() {
      if (this.pattern.length == 0){
        this.loadPatternAndConnect(this.originalPattern);
      }
      while (this.svg.childElementCount > 0) {
        this.svg.removeChild(this.svg.lastChild);
      }
      this.loadPatternAndConnect(this.originalPattern);
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
    },
  },
});
</script>

<style scoped>
</style>