<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_home.png" alt="Button Home" id="buttonHome" @click="navigateToLobby">
        <img src="../assets/button_restart.png" alt="Button Replay" id="buttonReplay" @click="StartInstruction">
      </div>
      <h3>Time used: {{ elapsedTime }}</h3>
      <img src="../assets/pink-cat@2x.png" alt="Cat Icon" id="catPink">
    </nav>
    <main>
      <header>
        <img src="../assets/text_goal3.png" alt="Goal Text" id="textGoal">
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
            <h3>Have another go?</h3>
          </div>
          <div class="custom-modal-buttons">
            <button class="cute-button" @click="YesRetry(); restartTimer()">Yes, please!</button>
            <button class="cute-button" @click="NoGiveup">No, thanks</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="instructionPopUp" class="modal-container">
      <div class="instructionPopUp-modal">
        <div class="inter_page_content">
          <img class="instructionGIF" src="../assets/verticalFlip.gif" alt="instructionGIF">
          <img class="instructionConfirm" id="buttonInstructionConfirm" src="../assets/button_confirm.png" @click="CloseInstruction(); loadPatternAndConnect(this.originalPattern); startTimer()">
        </div>   
      </div>
    </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import * as checker from ".//Checker.js";
import "@/assets/gamepage.css"
import {store} from "@/store";
import { speak } from "./Speech.js";
export default defineComponent({
  name: "AppInstruction3",
  data() {
    return {
      isDrawing: false,
      pattern: [],
      svg: null,
      showModal: false,
      secondTry: true,
      instructionPopUp: false,
      // originalPattern: [1, 2, 3, 4, 7, 10 ,13],
      originalPattern: [1, 2, 3, 4, 8, 7, 10, 11, 5, 9, 13, 14, 15, 16],
      timer: null,
      elapsedTime: 0,
      timerStarted: false,
    };
  },
  mounted() {
    this.StartInstruction();
    this.svg = this.$el.querySelector('.connector');
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    // this.loadPatternAndConnect(this.originalPattern);
  },
  beforeUnmount() {
    document.removeEventListener('touchmove', this.preventScroll);
    clearInterval(this.timer);
  },
  methods: {
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
    },
    restartTimer() {
      this.elapsedTime = 0;
      this.startTimer();
    },
    navigateToStart() {
      if (checker.checkCorrectness(this.originalPattern, "vertical", this.pattern)) {
        if (this.secondTry) {
          store.state.vertical = 2;
        } else {
          store.state.vertical = 1;
        }
        this.$router.push("/Finish");
      }
      else {
        if (this.secondTry) {
          this.showModal = true;
          this.secondTry = false;
          speak("Lateral_Vertical_3")
        } else {
          this.$router.push("/Finish");
        }
      }
    },

    StartInstruction(){
      this.instructionPopUp = true;
      speak("Lateral_Vertical_1");
    },

    CloseInstruction(){
      this.instructionPopUp = false;
      speak("Lateral_Vertical_2");
    },

    YesRetry() {
      this.clearPattern();
      this.showModal = false;
    },
    NoGiveup() {
      this.showModal = false;
      this.$router.push("/Finish");
    },
    navigateToLobby() {
      this.$router.push("/Lobby");
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },
    preventScroll() {
      document.getElementById('noScrollArea').addEventListener('touchmove', function(event) {
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
          // Calculate the angle of the line segment and reverse it
          const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI;
          // Rest of the code remains the same
          const arrowSize = store.state.arrowSize; // Adjust the size of the arrowhead
          const arrowX = x2 - arrowSize * Math.cos(angle);
          const arrowY = y2 - arrowSize * Math.sin(angle);
          const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          arrow.setAttribute('points', `${arrowX},${arrowY} ${(arrowX + arrowSize * Math.cos(angle - Math.PI / 6))},${(arrowY + arrowSize * Math.sin(angle - Math.PI / 6))} ${(arrowX + arrowSize * Math.cos(angle + Math.PI / 6))},${(arrowY + arrowSize * Math.sin(angle + Math.PI / 6))}`);
          arrow.setAttribute('fill', 'black'); // Arrowhead color
          svg.appendChild(arrow);
        }
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
    revertPattern() {
      if (this.pattern.length === 0) return;
      // Remove the last item from the pattern arrays
      const lastId = this.pattern.pop();
      // Revert the UI change for the last cell
      const lastCell = this.$el.querySelector(`.cell[data-id="${lastId}"]`);
      lastCell.classList.remove('active');
      // Remove the last SVG line
      if (this.svg.childElementCount > this.originalPattern.length) {
        this.svg.removeChild(this.svg.lastChild);
      }
    },
  },
});
</script>

<style scoped>

</style>