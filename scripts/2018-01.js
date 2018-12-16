import D from "distraught";
import _ from "lodash";
import fs from "fs";
import util from "util";
import { lookup } from "dns";

let outcomeArr = [];
let outCome = 0;
export async function run() {
  const readFile = util.promisify(fs.readFile);

  const data = (await readFile(
    "./server/files/2018-1-1-input.txt",
    "utf-8"
  )).split("\n");

  let start = 0;

  let found = false;
  let i = 0;
  while (found === false) {
    found = look(data, found);
    console.log("==> loop:", i, found, outCome);
    i++;
  }

  console.log("==> outCome part 1: ", outCome);
}

function look(data, found) {
  let success = false;
  // let outCome = found.outCome;
  // let outcomeArr = found.outcomeArr;
  for (var i = 0; i < data.length; i++) {
    outCome = outCome + Number(data[i]);
    if (outcomeArr.some(v => v === outCome)) {
      success = true;
      console.log("==> match", outCome);
      break;
    }
    //console.log("==> ", outCome);
    outcomeArr.push(outCome);
  }
  // data.forEach(value => {
  //   outCome = outCome + Number(value);
  //   if (outcomeArr.some(v => v === outCome)) {
  //     success = true;
  //     console.log("==> match", outCome);
  //   }
  //   //console.log("==> ", outCome);
  //   outcomeArr.push(outCome);
  // });
  return success;
}

// run()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     D.logErr(err);
//     process.exit(0);
//   });
