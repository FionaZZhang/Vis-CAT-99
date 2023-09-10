let speech = new SpeechSynthesisUtterance();
export const voices = window.speechSynthesis.getVoices();
export let currentVoice = voices[0];
export let voiceOn = true;

export function speak(readText){
    speech.text = readText;
    speech.voice = currentVoice;
    if (voiceOn){
        window.speechSynthesis.speak(speech);
    }
}

export function setVoice(selectedVoice){
    currentVoice = selectedVoice;
}

export function setVoiceFlag(value){
    voiceOn = value;
}