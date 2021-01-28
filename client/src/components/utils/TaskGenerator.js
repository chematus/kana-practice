import kana from './_kana';

export const getCanvasTask = (current) => {
  const keys = Object.keys(kana);
  const abc = keys[Math.round(Math.random())];
  const charList = [...kana[abc]].filter(
    (char) => char[1] !== current && kana.ocr_whitelist.indexOf(char[1]) >= 0,
  );
  const lit = charList[Math.floor(Math.random() * charList.length)];
  const result = { task: lit[0], abc: abc, answer: lit[1] };

  if (process.env.NODE_ENV === 'development') {
    console.log(result);
  }

  return result;
};

export const getPickerTask = (current, optionsAmount = 5) => {
  const keys = Object.keys(kana);
  const abc = keys[Math.round(Math.random())];
  const charList = [...kana[abc]].filter(
    (char) => char[1] !== current && char[0] !== current,
  );
  const task = charList[Math.floor(Math.random() * charList.length)];
  let options = [];
  do {
    const option = charList[Math.floor(Math.random() * charList.length)];
    if (!options.includes(option) && option !== task) {
      options.push(option);
    }
  } while (options.length < optionsAmount);
  options.push(task);
  const reverse = !Math.round(Math.random());
  const result = {};
  result.task = reverse ? task[0] : task[1];
  result.answer = reverse ? task[1] : task[0];
  result.options = options.map((item) => (reverse ? item[1] : item[0])).sort();

  if (process.env.NODE_ENV === 'development') {
    console.log(result);
  }

  return result;
};

export const getMatcherTask = (pairsAmount = 5) => {
  const keys = Object.keys(kana);
  const abc = keys[Math.round(Math.random())];
  let result = [];
  let list = [...kana[abc]];
  do {
    const pair = list.splice(Math.floor(Math.random() * list.length), 1);
    result = [...result, ...pair];
  } while (result.length < pairsAmount);

  if (process.env.NODE_ENV === 'development') {
    console.log(result);
  }

  return result;
};

export const getKana = (a, b) => {
  return [...kana.hiragana, ...kana.katakana].some((item) => item[1] === a)
    ? a
    : b;
};
