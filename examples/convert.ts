import { BDFParser } from "../src"
import * as fs from "fs"

const parser = new BDFParser()
const buffer = fs.readFileSync("./examples/assets/fonts/Roboto-Medium-6pt.bdf")

const converted = parser.parse(buffer)

console.log(JSON.stringify(converted, null, 2))


