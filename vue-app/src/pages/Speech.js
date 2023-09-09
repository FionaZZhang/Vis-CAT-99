let speech = new SpeechSynthesisUtterance();
export const voices = window.speechSynthesis.getVoices();

export function speak(readText, selectedVoice){
    // If no voice selected, use first one by default 
    if (selectedVoice === ""){
        selectedVoice = voices[0];
    }
    speech.text = readText;
    speech.voice = selectedVoice;
    window.speechSynthesis.speak(speech);
}
