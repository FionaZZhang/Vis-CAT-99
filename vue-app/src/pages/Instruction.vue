<template>
    <body id="InsPage">
        <nav>
            <p class="Icon">
                <img src="../assets/button_home.png" alt="Button Home" id="buttonHome">
                <img src="../assets/button_restart.png" alt="Button Restart" id="buttonRestart">
            </p>

            <img src="../assets/cat@2x.png" alt="Cat Icon" id="catPink">
        </nav>
        <main>
            <header>
                <img src="../assets/text_goal.png" alt="Goal Text" id="textGoal">
            </header>
            <section>
                <div><img src="../assets/left_pattern.png" alt="Instruction Pattern"></div>
                <div>
                    <div class="grid-wrapper">
                        <svg class="connector"></svg>
                        <div class="grid" @mousedown="startDrawing" @mouseup="endDrawing" @touchstart="startDrawing"
                            @touchmove="handleTouchMove">
                            <div v-for="n in 16" :key="n" class="cell" :data-id="n" @mouseover="handleMouseOver"
                                @touchend="endDrawing"></div>
                        </div>
                        <div class="larger-font">Pattern: {{ pattern.join(' -> ') }}</div>
                        <div class="larger-font">Path: {{ path.join(' -> ') }}</div>
                    </div>
                    <button @click="clearPattern">Clear Pattern</button>
                    <button @click="revertPattern" v-if="pattern.length > 0">Revert Last Dot</button>

                </div>
            </section>
        </main>
        <footer>
            <img src="../assets/button_confirm.png" alt="Confirm Button">
        </footer>
    </body>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "AppInstruction",
    data() {
        return {
            isDrawing: false,
            pattern: [],
            path: [],
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
    methods: {
        preventScroll(e) {
            e.preventDefault();
        },
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
        //     this.pattern = [];
        //     this.path = [];
        //     const cells = this.$el.querySelectorAll('.cell.active');
        //     cells.forEach(cell => {
        //       cell.classList.remove('active');
        //     });
        //     while (this.svg.firstChild) {
        //       this.svg.removeChild(this.svg.lastChild);
        //     }
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
#InsPage {
    background-color: #fff0e6;
}

nav {
    padding: 0px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

#catPink {
    position: relative;
    right: 3%;
    top: 3%;
    width: 100px;
    height: 100px;
}

.Icon {
    display: flex;
    position: relative;
    flex-direction: row;
    left: 3%;
    top: 3%;
    width: 100px;
    height: 100px;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 20%;
}

#textGoal {
    position: relative;

}

section {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.grid-wrapper {
    position: relative;
}

.connector {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 50px);
    gap: 50px;
}

.cell {
    width: 35px;
    height: 35px;
    background-color: black;
    border-radius: 50%;
    transition: background-color 0.2s;
    position: relative;
    z-index: 1;
}

.cell.active {
    background-color: #3498db;
}

.larger-font {
    font-size: 40px;
}</style>