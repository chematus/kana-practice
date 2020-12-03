import express from 'express';
import { transports, createLogger, format } from 'winston';
import { createWorker, PSM } from 'tesseract.js';
import lzstring from 'lz-string';
import kana from '../store/_kana';

import { WRONG_DATA, OCR_FAILED } from '../store/constants';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'ocr' },
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/info.log' }),
  ],
});

const prepareWorker = async (logger) => {
  const worker = createWorker({
    langPath: './src/store/ocr_data/',
    logger,
  });
  await worker.load();
  await worker.loadLanguage('jpn');
  await worker.initialize('jpn');
  await worker.setParameters({
    tessedit_char_whitelist: kana.ocr_whitelist,
    tessedit_pageseg_mode: PSM.SINGLE_CHAR,
  });

  return worker;
};

const parseImg = async (img, worker) => {
  if (worker.recognize) {
    const data = await worker.recognize(img).catch((e) => logger.error(e));
    return data.data.text;
  }
  return false;
};

const ocrController = express.Router();
prepareWorker(logger.info).then((worker) => {
  return ocrController.post('/', async (req, res) => {
    const {
      body: { img: lzImg },
    } = req;
    if (!lzImg) {
      return res.status(400).json({
        status: 400,
        errMsg: WRONG_DATA,
      });
    }
    try {
      const img = lzstring.decompress(lzImg);
      const text = await parseImg(img, worker);
      if (!text) {
        return res.status(200).json({
          text: '',
        });
      }
      logger.info(`${text.trim()} recognized`);
      return res.status(200).json({
        text,
      });
    } catch (e) {
      logger.error(e);
      return res.status(500).json({ status: 500, errMsg: OCR_FAILED });
    }
  });
});

export default ocrController;
