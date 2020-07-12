import { Normal } from './normal';
import { Beta } from './beta';
import { pdfchart } from './pdf';

window['continuous'] = {
  Normal, Beta
};

window['distribution'] = function(cls) {
  pdfchart(cls);
};
