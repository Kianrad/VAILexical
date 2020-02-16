const LexicalDensityService = require("../services/lexical.service");
const CacheService = require("../services/cache.service");
const DBService = require("../services/db.service");
const cache = new CacheService(); // Create a new cache service instance
const lexicalDensityService = new LexicalDensityService();
const dbService = new DBService();

module.exports = class ApiController {
  constructor() {}

  getNLWords = async () => {
    return cache.get("words", async () => {
      return (await dbService.list()).map(item => {
        return item.word;
      });
    });
  };

  calculate = async (req, res) => {
    if (req.query.mode === "verbose") {
      this.calculateVerbose(req, res);
    } else {
      this.calculateSingle(req, res);
    }
  };

  calculateSingle = async (req, res) => {
    const inputText = req.body.inputText;
    lexicalDensityService
      .calculateLexicalDensity(inputText, await this.getNLWords())
      .then(overall_ld => {
        res.json({
          data: overall_ld
        });
      })
      .catch(err => {
        res.json({
          error: err
        });
      });
  };

  calculateVerbose = async (req, res) => {
    const inputText = req.body.inputText;
    lexicalDensityService
      .calculateLexicalDensityVerbose(inputText, await this.getNLWords())
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        res.json({
          error: err
        });
      });
  };
};
