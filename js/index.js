import { Normal } from './normal';
import { pdfchart } from './pdf';

window['continuous'] = {
  Normal
};

window['distribution'] = function(cls) {
  let dist = new cls();
  pdfchart(dist);
};
