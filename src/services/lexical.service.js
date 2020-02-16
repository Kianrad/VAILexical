module.exports = class LexicalDensityService {
  constructor() {}
  /**
   * Calculate lexical density
   * @param  {string} text
   * @param  {[]} NLWordsArr
   */
  async calculateLexicalDensity(text, NLWordsArr) {
    const checked_text = this.prepare(text, NLWordsArr);
    const len = checked_text.length;
    let result = checked_text.filter(word => !NLWordsArr.includes(word));
    let overall_ld = Number((result.length / len).toFixed(2));
    return { overall_ld };
  }

  /**
   * Calculate lexical density verbose
   * @param  {string} text
   * @param  {[]} NLWordsArr
   */
  async calculateLexicalDensityVerbose(text, NLWordsArr) {
    let splitInput = text.match(/[^\.!\?]+[\.!\?]+/g);
    let overall_ld;
    let sentence_ld = [];

    await splitInput.forEach(async sentence => {
      const res = (await this.calculateLexicalDensity(sentence, NLWordsArr))
        .overall_ld;
      sentence_ld.push(res);
    });

    //Caclulate overall
    overall_ld = sentence_ld.reduce((a, b) => a + b, 0) / sentence_ld.length;
    const result = {
      sentence_ld,
      overall_ld
    };
    return result;
  }

  /**
   * Check text
   * @param  {string} text
   * @param  {[]} NLWordsArr
   */
  prepare(text, NLWordsArr) {
    if (
      text === undefined ||
      text === "" ||
      NLWordsArr.length === 0 ||
      text.length > 1000 ||
      typeof text !== "string" ||
      !NLWordsArr ||
      text.length < 1
    ) {
      throw "Invalid Input";
    }

    const inputText = text
      .toLowerCase()
      .trim()
      .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
      .split(" ")
      .filter(item => item !== "");

    if (inputText.length > 100) {
      throw "more than 100 words";
    }

    return inputText;
  }
};
