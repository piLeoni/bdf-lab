import { BDFParser } from "."
import { BDFCharacter, BDFFile, BMFontJSON } from "./types"
import { create } from 'xmlbuilder2';

import * as fs from "fs"
import { createCanvas } from "canvas"

interface CharData {
    character: BDFCharacter
    position: { x: number, y: number }
}

interface FontExport {
    pngBuffer: Buffer,
    positions: CharData[]

}


export class BDFToBitmap {
    #font: BDFFile | null = null
    #pngBuffer: Buffer | null = null
    #atlas: CharData[] | null = null
    #json: BMFontJSON | null = null
    #xml: string | null = null
    #name: string = "unknown"
    error: any | null = null


    constructor() {

    }

    public parse = ({ font, subset, name }: { font: BDFFile, subset?: number[], name: string }): BDFToBitmap => {
        this.#font = font;
        this.#name = name || "unknown"

        try {
            if (subset && subset.length) this.#font.characters = this.#font.characters.filter((c: BDFCharacter) => {
                return subset.includes(c.ENCODING)
            })

            let { characters } = this.#font;
            if (!characters.length) throw new Error("No characters resulted from the subset.")
            const gridSize = Math.ceil(Math.sqrt(characters.length || 0))

            const cellW = characters.reduce((a: number, char: any) => { return Math.max(a, char.BBX[0]) }, 0)
            const cellH = characters.reduce((a: number, char: any) => { return Math.max(a, char.BBX[1]) }, 0)

            const canvas = createCanvas(gridSize * cellW, gridSize * cellH);
            const ctx = canvas.getContext('2d');

            let cursor = { x: 0, y: 0 };
            let localHeight = 0
            const positions: CharData[] = []

            characters.forEach((character, index) => {

                character.BITMAP.forEach((row, y) => {
                    const binaryRow = parseInt(row, 16).toString(2).padStart(row.length * 4, "0");
                    for (let x = 0; x < character.BBX[0]; x++) {
                        if (binaryRow[x] === "1") {
                            ctx.fillStyle = "black";
                            ctx.fillRect(x + cursor.x, y + cursor.y, 1, 1);
                            localHeight = Math.max(localHeight, character.BBX[1])
                        }
                    }
                });
                positions.push({ character, position: { x: cursor.x, y: cursor.y } })
                cursor.x += character.BBX[0];
                if (cursor.x > (gridSize - 1) * cellW) {
                    cursor.x = 0
                    cursor.y += localHeight
                    localHeight = 0
                }
            });
            const outputCanvas = createCanvas((gridSize * cellW), Math.max(cursor.y, cellH));
            const outputCtx = outputCanvas.getContext('2d');
    
            outputCtx.drawImage(canvas, 0, 0)
            this.#pngBuffer = outputCanvas.toBuffer("image/png")
            this.#atlas = positions
        }
        catch (e: any) {
            this.error = e;
            console.error(e)
        }

        return this;

    }

    generateJSON(): BDFToBitmap {
        if (this.#pngBuffer && this.#atlas && this.#font) {
            this.#json = {
                info: {
                    face: this.#name || this.#font.metadata.FONT || "unknown",
                    size: this.#font.metadata.SIZE ? this.#font.metadata.SIZE[0] : 12,
                    charset: this.#font.metadata.CHARSET_REGISTRY || "",
                },
                common: {
                    lineHeight: (this.#font.properties?.FONT_ASCENT || 0) + (this.#font.properties?.FONT_DESCENT || 0),
                    base: this.#font.properties?.FONT_ASCENT || 0,
                },
                pages: [{
                    id: 0,
                    file: `${this.#name}.png`
                }], // BDF doesn't specify texture pages, might need to infer
                chars: {
                    count: this.#atlas.length,
                    char: this.#atlas.map((char) => ({
                        id: char.character.ENCODING,
                        x: char.position.x,
                        y: char.position.y,
                        width: char.character.BBX[0],
                        height: char.character.BBX[1],
                        xoffset: char.character.BBX[2],
                        yoffset: char.character.BBX[3],
                        xadvance: char.character.DWIDTH ? char.character.DWIDTH[0] : char.character.BBX[0],
                        page: 0,
                        chnl: 0,
                    })),
                },
            };
        }
        return this
    }
    generateXML(): BDFToBitmap {
        if (this.#pngBuffer && this.#atlas && this.#font) {
            const xmlObj = {
                font: {
                    info: {
                        '@face': this.#name,
                        '@size': this.#font.metadata.SIZE ? this.#font.metadata.SIZE[0] : 12,
                        '@bold': 0, // BDF typically doesn't specify bold
                        '@italic': 0, // BDF typically doesn't specify italic
                        '@charset': this.#font.metadata.CHARSET_REGISTRY || "", // Not available in BDF
                        '@unicode': 0, // Assume not Unicode unless known
                        '@stretchH': 100, // Standard value for stretch
                        '@smooth': 1, // Assume smoothing enabled
                        '@aa': 1, // Assume anti-aliasing enabled
                        '@padding': "0,0,0,0", // Default padding
                        '@spacing': "1,1" // Default spacing
                    },
                    common: {
                        '@lineHeight': (this.#font.properties?.FONT_ASCENT || 0) + (this.#font.properties?.FONT_DESCENT || 0),
                        '@base': this.#font.properties?.FONT_ASCENT || 0,
                        '@scaleW': 512, // Placeholder value, should be dynamically set
                        '@scaleH': 512, // Placeholder value, should be dynamically set
                        '@pages': 1, // BDF doesn't support multiple pages natively
                        '@packed': 0 // No packing
                    },
                    pages: {
                        page: {
                            '@id': 0,
                            '@file': `${this.#name}.png`
                        }
                    },
                    chars: {
                        '@count': this.#atlas.length,
                        char: this.#atlas.map((char) => ({
                            '@id': char.character.ENCODING,
                            '@x': char.position.x,
                            '@y': char.position.y,
                            '@width': char.character.BBX[0],
                            '@height': char.character.BBX[1],
                            '@xoffset': char.character.BBX[2],
                            '@yoffset': char.character.BBX[3],
                            '@xadvance': char.character.DWIDTH ? char.character.DWIDTH[0] : char.character.BBX[0],
                            '@page': 0,
                            '@chnl': 0,
                            '@letter': String.fromCharCode(char.character.ENCODING)
                        }))
                    }
                }
            };
            this.#xml = create(xmlObj).end({ prettyPrint: true })
        };
        return this
    }

    public get pngBuffer(): Buffer | null {
        return this.#pngBuffer
    }
    public get json(): BMFontJSON | null {
        return this.#json
    }
    public get xml(): string | null {
        return this.#xml
    }

}



