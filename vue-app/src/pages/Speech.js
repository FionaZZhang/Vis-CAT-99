export let voiceOn = true;

export const voices = ['anita'];
export let currentVoice = '';

let audio = null;

// export function speak(readText){
//     speech.text = readText;
//     speech.voice = currentVoice_2;
//     if (voiceOn){
//         window.speechSynthesis.speak(speech);
//     }
// }

export function setVoice(selectedVoice){
    currentVoice = selectedVoice;
}

export function setVoiceFlag(value){
    voiceOn = value;
}

export function getVoices(){
    return voices;
}

export function speak(file){
    pauseAudio();
    if (voiceOn){
        // If no voice selected, set first one as default 
        if (currentVoice === ''){
            currentVoice = voices[0];
        }
        let sound = require('@/assets/audio/' + currentVoice + '/' + file + '.mp3');
        audio = new Audio(sound);
        audio.play();
    }
}

function pauseAudio() {
    // If audio is not undefined and if is playing, pause it
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Rewind track to beginning (is you need this)
    }
}