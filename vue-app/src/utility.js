import {store} from "@/store";

export function handleLineThicknessBasedOnScreenSize(){
    var width = window.innerWidth;
      if (width > 768) {
        store.state.strokeWidth = 20;
      } else {
        store.state.strokeWidth = 5;
      }
}