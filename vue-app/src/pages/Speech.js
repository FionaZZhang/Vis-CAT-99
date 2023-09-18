import { store } from "@/store";

export let voiceOn = true;

export const voices = ['Anita'];
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
    if (voiceOn){
        // If no voice selected, set first one as default 
        if (currentVoice === ''){
            currentVoice = voices[0];
        }
        let sound = require('@/assets/audio/' + currentVoice + '/' + file + '.mp3');
        audio = new Audio(sound);
        if (store.state.isMute){
            audio.volume = 0;
        }
        else {
            audio.volume = 1;
        }
        audio.play();
    }
}

export function muteAudio(){
    if (audio){
        audio.volume = 0;
    }
}

export function playAudio(){
    if (audio){
        audio.volume = 1;
    }
}