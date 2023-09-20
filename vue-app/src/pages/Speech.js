export let voiceOn = true;

export const voices = ['anita'];
export let currentVoice = '';

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
    if (voiceOn){
        // If no voice selected, set first one as default 
        if (currentVoice === ''){
            currentVoice = voices[0];
        }
        let sound = require('@/assets/audio/' + currentVoice + '/' + file + '.mp3');
        let audio = new Audio(sound);
        audio.play();
    }
}