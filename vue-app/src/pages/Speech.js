let speech = new SpeechSynthesisUtterance();
export const voices = window.speechSynthesis.getVoices();
export let currentVoice = voices[0];

export function speak(readText, selectedVoice){
    // If no voice selected, use first one by default 
    if (selectedVoice != ""){
        currentVoice = selectedVoice;
    }
    speech.text = readText;
    speech.voice = currentVoice;
    window.speechSynthesis.speak(speech);
}

export function setVoice(selectedVoice){
    currentVoice = selectedVoice;
}