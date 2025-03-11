import {
    BDFFile,
    BDFProperties,
    BDFMetadata,
    BDFCharacter
} from "./types";

function isHexadecimal(input: string): boolean {
    const regex = /^[0-9a-fA-F]+$/;
    return regex.test(input);
}

import BDFCharacterSchema from "./schemas/BDFCharacter.json";
import BDFFileSchema from "./schemas/BDFFile.json";
import BDFMetadataSchema from "./schemas/BDFMetadata.json";
import BDFPropertiesSchema from "./schemas/BDFProperties.json";

export class BDFParser {
    _outputFile: BDFFile = {
        metadata: {},
        properties: {},
        characters: []
    };
    _parseCharMode: boolean = false;
    _parseCharBitmapMode: boolean = false;

    _tmpChar: Partial<BDFCharacter> = { BITMAP: [] };

    constructor() {}

    // Main parse function to convert buffer to BDFFile
    parse = (buffer: ArrayBuffer | Uint8Array): BDFFile => {
        // Convert the buffer to a string
        let text: string;
        if (typeof Buffer !== "undefined" && buffer instanceof Buffer) {
            // Node.js: Convert Buffer to string
            text = buffer.toString("utf-8");
        } else {
            // Browser: Convert ArrayBuffer/Uint8Array to string
            text = new TextDecoder("utf-8").decode(buffer);
        }
        const lines = text.split("\n");
        lines.forEach(this._parseLine.bind(this));
        return this._outputFile;
    };

    // Function to parse each line of the BDF file
    _parseLine = (line: string): void => {
        if (line.startsWith("STARTCHAR")) this._parseCharMode = true;
        if (line.startsWith("ENDCHAR")) {
            this._parseCharMode = false;
            this._parseCharBitmapMode = false;
            this._outputFile.characters.push(this._tmpChar as BDFCharacter);
            this._tmpChar = { BITMAP: [] };
        }

        if (this._parseCharMode) {
            this._parseChar(line);
        } else {
            this._parseValue({ line, target: this._outputFile, schema: BDFFileSchema.properties, ignore: ["STARTPROPERTIES", "ENDPROPERTIES", "ENDFONT"] });
            this._parseValue({ line, target: this._outputFile.metadata, schema: BDFMetadataSchema.properties, ignore: ["COMMENT"] });
            this._parseValue({ line, target: this._outputFile.properties!, schema: BDFPropertiesSchema.properties });
        }
    };

    // Function to parse values based on the schema
    _parseValue = ({
        line,
        target,
        schema,
        ignore
    }: {
        line: string;
        target: BDFProperties | BDFMetadata | BDFCharacter | BDFFile;
        schema: { [key: string]: any };
        ignore?: string[];
    }): void => {
        const [key, ...rest] = line.split(" ");
        if (ignore?.includes(key)) return;

        if (key in schema) {
            let value = rest.join(" "); // Join the rest of the line back together
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);

            if ("minItems" in schema[key] && schema[key].minItems > rest.length) {
                throw new Error(`${key} is supposed to contain at least ${schema[key].minItems} values but has ${rest.length}`);
            }
            if ("maxItems" in schema[key] && schema[key].maxItems < rest.length) {
                throw new Error(`${key} is supposed to contain no more than ${schema[key].maxItems} values but has ${rest.length}`);
            }
            if (schema[key].type === "array") {
                (target as any)[key] = [];
                rest.forEach((entry, i) => {
                    if (schema[key].items[i].type === "number") (target as any)[key].push(parseFloat(entry));
                    if (schema[key].items[i].type === "string") (target as any)[key].push(entry.replace(/["\r]/g, ''));
                });
            } else {
                if (schema[key].type === "number") (target as any)[key] = parseFloat(value);
                if (schema[key].type === "string") (target as any)[key] = value.replace(/["\r]/g, '');
            }
        }
    };

    // Function to parse character data
    _parseChar = (line: string) => {
        if (line.startsWith("BITMAP")) {
            this._parseCharBitmapMode = true;
            return;
        }
        if (this._parseCharBitmapMode) this._tmpChar.BITMAP?.push(line);
        else {
            this._parseValue({ line, target: this._tmpChar, schema: BDFCharacterSchema.properties, ignore: ["BITMAP", "ENDCHAR"] });
        }
    };
}
