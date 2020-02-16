const NLWord = require("../models/word.model");
const DBService = require("../services/db.service");
const NLWordList = require("../config/nonLexicalWordDump");
const CacheService = require("../services/cache.service");
const cache = new CacheService(); // Create a new cache service instance
const dbService = new DBService();

module.exports = class DBController {
  constructor() {}
  /**
   * Get list of non lexical words
   */
  list = async (req, res) => {
    dbService
      .list()
      .then(async words => {
        res.json({
          data: words
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * add dump data to DB
   */
  init = (req, res) => {
    let errorcount = 0;
    NLWordList.forEach(item => {
      let word = new NLWord();
      word.word = item;
      word.save(err => {
        if (err) {
          errorcount = errorcount + 1;
        } else {
          cache.del("words");
        }
      });
    });

    if (errorcount === 0) {
      res.json({
        message: `Dump data added to db`
      });
    } else {
      res.json({
        err: `Error ${errorcount}`
      });
    }
  };

  /**
   * Add word non lexical word
   */
  new = (req, res) => {
    let word = new NLWord();
    word.word = req.body.term;
    word.save(err => {
      if (err) {
        res.json(err);
      } else {
        cache.del("words");
        res.json({
          message: `New Word Added to DB`
        });
      }
    });
  };

  /**
   * Get non lexical word by _id
   * @params {_id}
   */
  get = (req, res) => {
    dbService
      .getById(req.params._id)
      .then(word => {
        res.json({
          message: `Viewing one word by Id`
        });
      })
      .catch(err => {
        res.json(err);
      });
  };

  /**
   * remove non lexical word
   * @params {_id}
   */
  delete = (req, res) => {
    dbService
      .delete(req.body._id)
      .then(() => {
        cache.del("words");
        res.json({
          message: "success"
        });
      })
      .catch(err => {
        res.json(err);
      });
  };
};
