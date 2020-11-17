import { createWorker, PSM } from 'tesseract.js';
import path from 'path';
import kana from './../_kana';

class CanvasOCR {
  async parseImg(img) {
    if (this.worker.recognize) {
      const data = await this.worker.recognize(img);
      if (process.env.NODE_ENV) {
        console.log(data);
      }
      return data.data.text;
    }
    return false;
  }

  async prepareWorker() {
    let logger = null;
    if (this.worker && this.worker.id) {
      return true;
    }
    if (process.env.NODE_ENV === 'development') {
      logger = (m) => console.log(m);
    }
    this.worker = createWorker({
      langPath: path.join(__dirname, 'lang_data'),
      logger,
    });
    await this.worker.load();
    await this.worker.loadLanguage('jpn');
    await this.worker.initialize('jpn');
    await this.worker.setParameters({
      tessedit_char_whitelist: kana.ocr_whitelist,
      tessedit_pageseg_mode: PSM.SINGLE_CHAR,
    });
    return true;
  }

  async terminateWorker() {
    await this.worker.terminate();
    return true;
  }
}

export default CanvasOCR;
