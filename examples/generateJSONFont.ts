import { BDFParser, BDFToBitmap } from "../src"
import fs from "fs";

// const fonts = fs.readdirSync("./assets/fonts").filter(file => file.endsWith(".bdf"))

// fonts.forEach(fontName => {
//     const font = parser.parse(fs.readFileSync(`./assets/fonts/${fontName}`))
//     bdf2bitmap.parse(font).toJSON(fontName)
//     // fs.writeFileSync(`exports/${font}.png`, converted.pngBuffer)
// })


function range(a: number, b: number) {
    const output: number[] = []
    for (let i = a; i <= b; i++)output.push(i)
    return output

}

// const fontName = "04B_03__6pt.bdf"
// const font = parser.parse(fs.readFileSync(`./examples/assets/fonts/${fontName}`))
// const converted = bdf2bitmap
//     .parse({ font, subset: range(33, 125), name: fontName })
//     .generateJSON()
//     .generateXML()
//     converted.json && fs.writeFileSync(`exports/${fontName}.json`, JSON.stringify(converted.json, null, 2))
//     converted.pngBuffer && fs.writeFileSync(`exports/${fontName}.png`, converted.pngBuffer)
//     converted.xml && fs.writeFileSync(`exports/${fontName}.xml`, converted.xml)


fs.readdirSync("./examples/assets/fonts").filter(fontName => fontName.endsWith(".bdf")).forEach(_fontName => {
    const parser = new BDFParser()
    const bdf2bitmap = new BDFToBitmap()

    const fontName = _fontName.split(".")[0]
    const font = parser.parse(fs.readFileSync(`./examples/assets/fonts/${fontName}.bdf`))
    const converted = bdf2bitmap
        .parse({ font, subset: range(33, 125), name: fontName })
        .generateJSON()
        .generateXML()
    converted.json && fs.writeFileSync(`exports/${fontName}.json`, JSON.stringify(converted.json, null, 2))
    converted.pngBuffer && fs.writeFileSync(`exports/${fontName}.png`, converted.pngBuffer)
    converted.xml && fs.writeFileSync(`exports/${fontName}.xml`, converted.xml)
})

