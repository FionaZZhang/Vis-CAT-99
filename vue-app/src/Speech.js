import { store } from "@/store";
export let voiceOn = true;
export const voices = ['Anita', 'Feliks', 'Fiona', 'Leo', 'Vincent'];
export let currentVoice = '';

let audio = null;

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
        if (currentVoice === ''){
            currentVoice = voices[0];
        }
        let sound = require('@/assets/audio/' + currentVoice + '/' + file + '.mp3');
        audio = new Audio(sound);
        if (store.state.isMute){
            audio.muted = true;
        }
        else {
            audio.muted = false;
        }
        audio.play();
    }
}

export function muteAudio(){
    try {
        if (audio){
            audio.muted = true;
        }
    } catch (error) {
        console.error('Error muting audio:', error);
    }
}

export function playAudio(){
    try {
        if (audio){
            audio.muted = false;
        }
    } catch (error) {
        console.error('Error muting audio:', error);
    }
}

export function pauseAudio() {
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0; 
    }
}