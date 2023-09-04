<template>
  <body id="InsPage">
    <nav>
      <div class="Icon">
        <img src="../assets/button_home.png" alt="Button Home" id="buttonHome" @click="navigateToLobby">
        <img src="../assets/button_restart.png" alt="Button Restart" id="buttonRestart" @click="clearPattern">

      </div>
      <img src="../assets/pink-cat@2x.png" alt="Cat Icon" id="catPink">
    </nav>
    <main>
      <header>
        <img src="../assets/text_goal2.png" alt="Goal Text" id="textGoal">
      </header>
      <section>
        <div><img src="../assets/left_pattern.png" alt="Instruction Pattern" id="instruction"></div>
        <div id="drawArea">
          <div class="grid-wrapper">
            <svg class="connector"></svg>
            <div class="grid" @mousedown="startDrawing" @mouseup="endDrawing" @touchstart="startDrawing"
              @touchmove="handleTouchMove">

              <div v-for="n in 16" :key="n" class="cell" :data-id="n" @mouseover="handleMouseOver" @touchend="endDrawing">
              </div>
            </div>
            <!-- <div class="larger-font">Pattern: </div>
            <div class="larger-font">Path: </div> -->
          </div>
          <!-- <button @click="clearPattern">Clear Pattern</button> -->


        </div>
      </section>
    </main>
    <footer>
      <button @click="revertPattern" v-if="pattern.length > 0" id="buttonReverse"><span id="textReverse"> Reverse
        </span></button>

      <img src="../assets/button_confirm.png" alt="Confirm Button" @click="navigateToStart" id="buttonConfirm">
    </footer>

    <!-- Retry pop up -->
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
      path: [],
      svg: null,
      showModal: false,
      secondTry: true,
    };
  },
  mounted() {
    this.svg = this.$el.querySelector('.connector');
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
  },
  beforeUnmount() {
    document.removeEventListener('touchmove', this.preventScroll);
  },
  methods: {
    navigateToStart() {
      if (checker.checkCorrectness([[1,1],[1,2],[1,3],[1,4],[2,3],[3,2],[4,1]], "lateral", this.path)) {
        this.$router.push("/instruction3");
      }
      else {
        if (this.secondTry) {
          this.showModal = true;
          this.secondTry = false;
        } else {
          this.$router.push("/instruction3");
        }
      }
    },
    YesRetry() {
      this.clearPattern();
      this.showModal = false;
    },
    NoGiveup() {
      this.showModal = false;
      this.$router.push("/instruction3");
    },
    navigateToLobby() {
      this.$router.push("/Lobby");
    },
    // preventScroll(e) {
    //   e.preventDefault();
    // },
    startDrawing(event) {
      this.isDrawing = true;
      const cell = event.target;
      const id = cell.dataset.id;
      if (!this.pattern.includes(id)) {
        this.pattern.push(id);
        this.path.push([Math.ceil(id / 4), (id % 4 == 0 ? 4 : id % 4)]);
        cell.classList.add('active');
      }
    },
    handleMouseOver(event) {
      const cell = event.target;
      const id = cell.dataset.id;
      if (this.isDrawing && !this.pattern.includes(id)) {
        this.pattern.push(id);
        this.path.push([Math.ceil(id / 4), (id % 4 == 0 ? 4 : id % 4)]);
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
          this.path.push([Math.ceil(id / 4), (id % 4 === 0 ? 4 : id % 4)]);
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

    // getCellPosition(cell) {
    //   var rect = cell.getBoundingClientRect();
    //     return {
    //         x: window.scrollX + rect.left + rect.width / 2,
    //         y: window.scrollY + rect.top + rect.height / 2
    //     };
    // },

    // drawLineBetweenCells(cell1,cell2) {
    //   var pos1 = getCellPosition(cell1);
    //   var pos2 = getCellPosition(cell2);
    //   var svg = document.getElementById('svgRoot');
    //   svg.innerHTML = '<line x1="' + pos1.x + '" y1="' + pos1.y + '" x2="' + pos2.x + '" y2="' + pos2.y + '" style="stroke:black;stroke-width:2" />';
    //   svg.style.width = window.innerWidth + 'px';
    //   svg.style.height = window.innerHeight + 'px';
    // },

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
    // endDrawing() {
    //   this.isDrawing = false;
    //   setTimeout(() => {
    //   this.pattern = [];
    //   this.path = [];
    //   const cells = this.$el.querySelectorAll('.cell.active');
    //   cells.forEach(cell => {
    //     cell.classList.remove('active');
    //   });
    //   while (this.svg.firstChild) {
    //     this.svg.removeChild(this.svg.lastChild);
    //   }
    //   }, 1000);
    // },
    endDrawing() {
      this.isDrawing = false;
    },
    clearPattern() {
      this.pattern = [];
      this.path = [];
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

      // Remove the last item from the pattern and path arrays
      const lastId = this.pattern.pop();
      this.path.pop();

      // Revert the UI change for the last cell
      const lastCell = this.$el.querySelector(`.cell[data-id="${lastId}"]`);
      lastCell.classList.remove('active');

      // Remove the last SVG line
      if (this.svg.lastChild) {
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
  width: 100%;
}

#drawArea {
  display: flex;
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
  justify-content: space-evenly;
  padding-left: 15%;
  padding-right: 15%;
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
  flex-direction: row;
  margin-left: auto;
  padding-right: 3%;
  height: 75%;
}

#textReverse {
  font-weight: bold;
  font-size: 2em;
  font-family: sans-serif;
  display: flex;

}

footer {
  display: flex;
  height: 15%;

}

.grid-wrapper {
  position: relative;
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
  grid-template-columns: repeat(4, 4vw);
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

.larger-font {
  font-size: 40px;
}

#buttonHome:hover,
#buttonRestart:hover {
  opacity: 0.7;
}
</style>