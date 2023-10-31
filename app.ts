// import fs module
import { readdir, readFile, writeFile } from "fs/promises";
import { existsSync, unlink } from "fs";

// Directory Path
const DIRECTORY_PATH = "./payload";

// import path module
import * as path from "path";

function logger(
  message: string,
  type: "start" | "end" | "success" | "info" | "error",
  optionMessage?: string
) {
  switch (type) {
    case "start":
      console.log(`📢 START : [${message.toUpperCase()}]`);
      console.log(`ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ`);
      break;
    case "end":
      console.log(`ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ`);
      console.log(
        `📢 END : [${message.toUpperCase()}]${
          optionMessage ? ` | ${optionMessage}` : ""
        }`
      );
      break;
    case "success":
      console.log(
        `✅ Success [${message.toUpperCase()}]${
          optionMessage ? ` | ${optionMessage}` : ""
        }`
      );
      break;
    case "info":
      console.log(`☑️  INFO : [${message.toUpperCase()}]`);
      break;
    case "error":
      console.log(`[⚠️  ERROR : ${message.toUpperCase()}]`);
      break;
  }
}

async function readFileAndSaveData(): Promise<object> {
  const objReturn: { [key: string]: object } = {};

  try {
    let files: string[] = await readdir(DIRECTORY_PATH);

    files = files.filter(
      (file) =>
        file.split(".")[1] === "json" &&
        file !== "tsconfig.json" &&
        file !== "package.json"
    );

    for (const file of files) {
      const filePath = path.join(DIRECTORY_PATH, file);

      try {
        const data = await readFile(filePath, "utf8");
        objReturn[file.split(".")[0]] = JSON.parse(data);
      } catch (err) {
        console.error(`Error reading file ${file}:`, err);
        return {};
      }
    }

    logger("file reading", "success");
    return objReturn;
  } catch (err) {
    console.error("Error reading directory:", err);
    return {};
  }
}

function makePayloadStructure(objParam: { [key: string]: object }) {
  const declaration: string = "export const "; // 변수 선언부
  const fileKey: string[] = Object.keys(objParam);

  let sReturn: string = "";

  fileKey.forEach((key: string) => {
    sReturn += `${declaration}${key} = ${JSON.stringify(objParam[key])};`;
  });

  logger("make structure", "success");
  return sReturn;
}

async function writePayloadTs(fileData: string) {
  const filePath = path.join(DIRECTORY_PATH, "payload.ts");

  try {
    await writeFile(filePath, fileData, "utf8");

    logger("created", "success", `[📁 : ${filePath}]`);

    return true;
  } catch (err) {
    logger("writing file", "error");

    return false;
  }
}

function fileExistCheck() {
  if (existsSync(`${DIRECTORY_PATH}/payload.ts`)) {
    logger("File Exists", "info");
    unlink(`${DIRECTORY_PATH}/payload.ts`, (err) => {
      if (err) {
        throw err;
      }
    });
    logger("Delete an existing file", "success");
  }
}

(async () => {
  logger("make file", "start");

  const readFileData: any = await readFileAndSaveData();
  const newFileData: string = makePayloadStructure(readFileData);

  fileExistCheck();

  const success = await writePayloadTs(newFileData);

  if (success) {
    logger("make file", "end");
  } else {
    logger("make file", "error");
  }
})();
