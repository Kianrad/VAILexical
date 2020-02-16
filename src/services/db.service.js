const wordModel = require("../models/word.model");
const nonLexicalWordDump = require("../config/nonLexicalWordDump");

module.exports = class DBService {
  constructor() {}
  /**
   * Get list of non-lexical words
   */
  async list() {
    return wordModel.find({}, "word");
  }

  /**
   * dump non lexical words to db
   */
  async init() {
    return wordModel.insertMany(nonLexicalWordDump);
  }

  /**
   * Add word non lexical word
   * @params {newWord}
   */
  async add(newWord) {
    let word = new wordModel();
    word.word = newWord;
    return await word.save();
  }

  /**
   * Get non lexical word by _id
   * @params {wordId}
   */
  async getById(wordId) {
    return await wordModel.findById(wordId);
  }

  /**
   * remove non lexical word
   * @params {wordId}
   */
  async delete(wordId) {
    return await wordModel.remove({
      _id: wordId
    });
  }
};
