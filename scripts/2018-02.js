import D from "distraught";
import _ from "lodash";
import fs from "fs";
import util from "util";
import { lookup } from "dns";

let outcomeArr = [];
let outCome = 0;
const pattern = /(.)\1+/gi;
export async function run() {
  const readFile = util.promisify(fs.readFile);

  const data = (await readFile(
    "./server/files/2018-2-1-input.txt",
    "utf-8"
  )).split("\n");

  let start = 0;
  let i = 0;
  const table = [];

  //const t = ["abcd", "abdd", "abcd"];
  // const result = levenshteinDistance("abcd", "abcd");
  // console.log("==> result", result);
  data.forEach(original => {
    //console.log("==> element", element);
    data.forEach(check => {
      //console.log("==> check", check);
      const result = lookPlacement(original, check);
      //console.log("==> result", result);
      table.push({ original, check, result });
    });
  });

  const matchingRows = table.filter(x => {
    return x.result === 25;
  });
  console.log("==> matchingRows", matchingRows);

  const letters = [];
  const total = matchingRows[0].original.length;
  matchingRows.forEach(elm => {
    const str = elm.original.split("");
    for (let index = 0; index < str.length; index++) {
      letters.push({ index, letter: str[index] });
    }
  });
  //console.log("==> matchingRows", matchingRows);
  for (let index = 0; index < total; index++) {
    let l = _.first(
      letters.filter(x => {
        return x.index === index;
      })
    ).letter;
    const f = l;

    let match = false;
    letters.forEach(elm => {
      //console.log("==> elm", elm.letter);
      if (l === elm.letter) {
        match = true;
        //console.log("==> l", f, index, l);
      }
    });
    // console.log("==> test", index, f, l);
    if (match) {
      // console.log("==> l", f, l);
    }
  }

  // const first = letters.filter(x => {
  //   return x.index === 1;
  // });
  // console.log("==> first", first);
  //console.log("==> letters", letters.filter(x => {}));
  //console.log("==> table", _.orderBy(matchingRows, ["result"], ["desc"]));
  //console.log("==> outCome part 1: ", doubles, triples, doubles * triples);
}

function step1(data) {
  let doubles = 0;
  let triples = 0;

  data.forEach(element => {
    const chars = element
      .split("")
      .sort()
      .join("")
      .match(/(.)\1+/gi);
    if (chars) {
      const result2 = chars.filter(e => {
        return e.length == 2;
      });
      console.log("==> result2", result2);
      doubles = doubles + (result2.length ? 1 : 0);
      const result3 = chars.filter(e => {
        return e.length == 3;
      });
      console.log("==> result3", result3);
      triples = triples + (result3.length ? 1 : 0);
    }
  });

  console.log("==> outCome part 1: ", doubles, triples, doubles * triples);
}

function lookPlacement(s, t) {
  if (s.length && t.length) {
    let matches = 0;
    const arrayS = s.split("");
    const arrayT = t.split("");
    for (let index = 0; index < arrayS.length; index++) {
      if (arrayS[index] === arrayT[index]) {
        matches++;
      }
    }
    return matches;
  }
  return 0;
}

function levenshteinDistance(s, t) {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  return (
    Math.min(
      levenshteinDistance(s.substr(1), t) + 1,
      levenshteinDistance(t.substr(1), s) + 1,
      levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
    ) + 1
  );
}

// run()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     D.logErr(err);
//     process.exit(0);
//   });
