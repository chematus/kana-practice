import { createWorker, PSM } from 'tesseract.js';
import path from 'path';
import kana from './../_kana';

class CanvasOCR {
  async parseImg(img) {
    if (this.worker.recognize) {
      const {
        data: { text },
      } = await this.worker.recognize(img);
      return text;
    }
    return false;
  }

  async prepareWorker() {
    this.worker = createWorker({
      langPath: path.join(__dirname, 'lang_data'),
      logger: (m) => console.log(m),
    });
    await this.worker.load();
    await this.worker.loadLanguage('jpn');
    await this.worker.initialize('jpn');
    await this.worker.setParameters({
      tessedit_char_whitelist: kana.ocr_whitelist,
      tessedit_pageseg_mode: PSM.SINGLE_CHAR,
    });
    return this.worker;
  }

  async terminateWorker() {
    await this.worker.terminate();
    return true;
  }
}

export default CanvasOCR;
