<template>
  <InstructionTemplate>
    <template v-slot:text_goal>
      <img src="../assets/text_goal1.png" alt="Goal Text" id="textGoal">
    </template>

    <template v-slot:instructionGif>
      <img class="instructionGIF" src="../assets/copyPattern.gif" alt="instructionGIF">
    </template>

    <!-- <template v-slot:checkCorrectness>
      <button @click="navigateToStart"  id="buttonConfirm"><span id="textConfirm"> OK</span></button>
    </template> -->
    
    <template v-slot:navigateToNextLevel>
      <img class="button_next_level" id="buttonNextLevel" src="../assets/button_next_level.png" @click="navigateToPage2">
    </template>
    
  </InstructionTemplate>
</template>

<script>
  import InstructionTemplate from './InstructionTemplate.vue';
  import "@/assets/gamepage.css"

  export default {
    name: "InstructionCopy",
    components: {
      InstructionTemplate
    },

    methods:{
      navigateToPage2() {
        this.$router.push("/instructionLateral");
      },

      // OKButtonHandler(){
      //   this.$emit("HandleOKButtonClick");
      // },

      printSomrthing(){
        console.log("executed");
      }
    }
  }

</script>