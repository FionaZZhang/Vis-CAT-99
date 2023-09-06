<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_home.png" alt="Button Home" id="buttonHome" @click="navigateToLobby">
        <img src="../assets/button_restart.png" alt="Button Restart" id="buttonRestart" @click="clearPattern">

      </div>
      <img src="../assets/pink-cat@2x.png" alt="Cat Icon" id="catPink" @click="loadPatternAndConnect(this.originalPattern)">
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
      <button @click="navigateToStart"  id="buttonConfirm"><span id="textConfirm"> OK</span></button>
    </footer>
    <div id="modal" v-if="showModal" class="modal-container">
      <div class="custom-modal">
        <div class="custom-modal-content">
          <div class="custom-modal-header">
            <h3>Have another go?</h3>
          </div>
          <div class="custom-modal-buttons">
            <button class="cute-button" @click="YesRetry">Yes, please!</button>
            <button class="cute-button" @click="NoGiveup">No, thanks</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="interPage" class="modal-container">
      <div class="interPage-modal">
        <div class="inter_page_content">
          <img class="next_level" src="../assets/next_level.png">
          <img class="button_next_level" src="../assets/button_next_level.png" @click="navigateToPage3">
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import * as checker from ".//Checker.js";
export default defineComponent({
  name: "AppInstruction2",
  data() {
    return {
      isDrawing: false,
      pattern: [],
      svg: null,
      showModal: false,
      secondTry: true,
      interPage: false,
      originalPattern: [1, 2, 3, 4, 7, 10 ,13],
    };
  },
  mounted() {
    this.svg = this.$el.querySelector('.connector');
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    // this.loadPatternAndConnect(this.originalPattern);
  },
  beforeUnmount() {
    document.removeEventListener('touchmove', this.preventScroll);
  },
  methods: {
    navigateToStart() {
      if (checker.checkCorrectness(this.originalPattern, "lateral", this.pattern)) {
        this.interPage = true;
      }
      else {
        if (this.secondTry) {
          this.showModal = true;
          this.secondTry = false;
        } else {
          this.$router.push("/Finish");
        }
      }
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
        console.log(this.svg.childElementCount);
        this.svg.removeChild(this.svg.lastChild);
      }
    },
    navigateToPage3() {
      this.$router.push("/instruction3");
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
      line.setAttribute('stroke-width', '5');
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
        line.setAttribute('stroke-width', '5');
        svg.appendChild(line);

        if (i === patternDots.length - 2) {
          // Calculate the angle of the line segment and reverse it
          const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI;
          // Rest of the code remains the same
          const arrowSize = 40; // Adjust the size of the arrowhead
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
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.custom-modal {
  background-color: #b8e3ff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  align-items: center;
}

.custom-modal-header {
  margin-bottom: 10px;
}

.custom-modal-buttons button {
  margin: 5px;
}

.retry-modal-header img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.retry-modal-header h3 {
  font-size: 24px;
}

.interPage-modal {
  position: fixed;
  left: 23.2vw;
  top: 25vh;
  background-color: #fff0e6;
  border-radius: 10px;
  padding: 20px;
  width: 50vw;
  height: 50vh;
  text-align: center;
  align-items: center;
}

.next_level {
  position: absolute;
  left: 10%;
  top: 10%;
  width: 42vw;
  height: 11vw;
}

.button_next_level {
  position: absolute;
  left: 38.5%;
  bottom: 12%;
  width: 12vw;
  height: 12vw;
}

p {
  font-size: 18px;
}

.cute-button {
  background-color: #dcebea; /* Cute pink color */
  color: #000000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cute-button:hover {
  background-color: #bebdbd; /* Slightly darker pink on hover */
}

#InsPage {
  background-color: #fff0e6;
  width: 100vw;
  height: 100vh;
}

nav {
  padding: 0px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 13%;
}

#catPink {
  position: relative;
  right: 3%;
  top: 3%;
  height: 100%;
}

.Icon {
  display: flex;
  position: relative;
  flex-direction: row;
  left: 3%;
  top: 3%;
  width: 20%;
  height: 100%;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10%;
  height: 70%;
}

#instruction {
  display: flex;
  height: 100%;
}

.grid-wrapper {
  display: flex;
  width: 35%;
  height: 270%;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;

}

#textGoal {
  position: relative;
  width: 40%;
  height: 100%;
}

section {
  display: flex;
  flex-direction: row;
  padding-left: 15%;
  padding-right: 15%;
  justify-content: space-between;
}

#buttonReverse {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 65%;
  height: 70%;
  width: 15%;
  border-radius: 20px;
  border-width: 0px;
  box-shadow: 1px 2px 3px #bebdbd;
}

#buttonConfirm {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: #dcebea;
  height: 10%;
  width: 15%;
  right: 4%;
  border-radius: 20px;
  border-width: 0px;
  box-shadow: 1px 2px 3px #bebdbd;
}

#textReverse {
  font-weight: bold;
  font-size: 2em;
  font-family: sans-serif;
  display: flex;
}

#textConfirm{
  font-weight: bold;
  font-size: 2em;
  font-family: sans-serif;
  display: flex;
}

footer {
  display: flex;
  height: 15%;
  align-items: flex-end;
}

.connector {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.grid {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 21%;
}

.cell {
  width: 2vw;
  height: 2vw;
  background-color: black;
  border-radius: 50%;
  transition: background-color 0.2s;
  position: relative;
}

.cell.active {
  background-color: #3498db;
}

.dot {
  width: 2vw;
  height: 2vw;
  background-color: black;
  border-radius: 50%;
  transition: background-color 0.2s;
  position: relative;
}

.dot.active {
  background-color: black;
}

#buttonHome:hover,
#buttonRestart:hover {
  opacity: 0.7;
}
</style>