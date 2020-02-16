const longString = require("./longString");
const manyWords = require("./manyWords");
const NLWords = require("../config/nonLexicalWordDump");
const LexicalDensityService = require("../services/lexical.service");
const lexicalDensityService = new LexicalDensityService();

test("check sample text", async () => {
  expect(
    await lexicalDensityService.calculateLexicalDensity(
      "Kim loves going to the cinema",
      NLWords
    )
  ).toEqual({ overall_ld: 0.67 });
});

test("Input more than 1000 character", async () => {
  await expect(
    lexicalDensityService.calculateLexicalDensity(longString, NLWords)
  ).rejects.toBe("Invalid Input");
});

test("Input more than 100 words", async () => {
  await expect(
    lexicalDensityService.calculateLexicalDensity(manyWords, NLWords)
  ).rejects.toBe("more than 100 words");
});

test("empty string check", async () => {
  await expect(
    lexicalDensityService.calculateLexicalDensity("", NLWords)
  ).rejects.toBe("Invalid Input");
});

test("empty nl words check", async () => {
  await expect(
    lexicalDensityService.calculateLexicalDensity(
      "Kim loves going to the cinema",
      []
    )
  ).rejects.toBe("Invalid Input");
});
