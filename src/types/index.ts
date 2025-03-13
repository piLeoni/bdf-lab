export interface BDFMetadata {
    STARTFONT?: string;           // Version of the BDF file format
    FONT?: string;                // Font name in X logical font description format
    SIZE?: [number, number, number]; // Font size and resolution: [point size, x-dpi, y-dpi]
    FONTBOUNDINGBOX?: [number, number, number, number]; // Font bounding box: [width, height, x-offset, y-offset]
    METRICSET?: 0 | 1 | 2;        // Writing direction: 0 (LTR), 1 (RTL), 2 (both directions)
    CONTENTVERSION?: number;      // Font content version (for newer BDF specifications)
    CHARSET_REGISTRY?: string;    // Charset registry for font encoding
    CHARSET_ENCODING?: string;    // Charset encoding for font
    COMMENT?: string;             // Optional comment or metadata about the font
    FONTNAME_REGISTRY?: string;   // Registry identifier for the font name
    CHARSET_COLLECTIONS?: string; // Collection of character sets used in the font
    [key: string]: any; // Allows any string key

}

export type BDFMetadataKeys =
    "STARTFONT" |
    "FONT" |
    "SIZE" |
    "FONTBOUNDINGBOX" |
    "METRICSET" |
    "CONTENTVERSION" |
    "CHARSET_REGISTRY" |
    "CHARSET_ENCODING" |
    "COMMENT" |
    "FONTNAME_REGISTRY" |
    "CHARSET_COLLECTIONS"

export interface BDFProperties {
    CAP_HEIGHT?: number;         // Height above the baseline of capital letters
    COPYRIGHT?: string;          // Copyright information for the font
    DEFAULT_CHAR?: number;       // Default character code to display when a glyph is missing
    FACE_NAME?: string;          // Face name of the font
    FONT_ASCENT?: number;        // Font ascent: height above the baseline
    FONT_DESCENT?: number;       // Font descent: height below the baseline
    FONT_VERSION?: string;       // Font version string
    FOUNDRY?: string;            // Foundry that created the font
    FAMILY_NAME?: string;        // Font family name
    NOTICE?: string;             // General comments about the font
    POINT_SIZE?: number;         // Font size in points
    RESOLUTION_X?: number;       // X-axis resolution in DPI
    RESOLUTION_Y?: number;       // Y-axis resolution in DPI
    SLANT?: string;              // Font slant type (e.g., "R" for Roman, "I" for Italic)
    WEIGHT_NAME?: string;        // Weight name (e.g., "Bold", "Medium", "Normal")
    X_HEIGHT?: number;           // Height of lowercase "x" above the baseline
    SETWIDTH_NAME?: string;      // Name of the width for a font
    ADD_STYLE_NAME?: string;     // Optional additional style name
    PIXEL_SIZE?: number;         // Pixel size for font rendering
    SPACING?: string;            // Spacing type for the font
    AVERAGE_WIDTH?: number;      // Average width of the characters in the font
    _OTF_FONTFILE?: string;      // Optional OpenType Font file path or reference
    _OTF_PSNAME?: string;        // OpenType Font PostScript name
    FONT_NAME?: string;          // Another representation of the font’s name
    UNDERLINE_POSITION?: number; // Y-position where the underline should be drawn
    UNDERLINE_THICKNESS?: number;// Thickness of the underline
    RAW_ASCENT?: number;         // Alternative raw ascent value
    RAW_DESCENT?: number;        // Alternative raw descent value
    NORM_SPACE?: number;         // Normal inter-character spacing
    RELATIVE_WEIGHT?: number;    // Relative weight of the font
    RELATIVE_SETWIDTH?: number;  // Relative width setting
    SUPERSCRIPT_X?: number;      // X-position of superscript characters
    SUPERSCRIPT_Y?: number;      // Y-position of superscript characters
    SUPERSCRIPT_SIZE?: number;   // Suggested size scaling for superscripts
    SUBSCRIPT_X?: number;        // X-position of subscript characters
    SUBSCRIPT_Y?: number;        // Y-position of subscript characters
    SUBSCRIPT_SIZE?: number;     // Suggested size scaling for subscripts
    FIGURE_WIDTH?: number;       // Width of numerical figures in the font
    AVG_LOWERCASE_WIDTH?: number;// Average width of lowercase letters
    AVG_UPPERCASE_WIDTH?: number;// Average width of uppercase letters
    [key: string]: any; // Allows any string key

}

export type BDFPropertiesKeys =
    "CAP_HEIGHT" |
    "COPYRIGHT" |
    "DEFAULT_CHAR" |
    "FACE_NAME" |
    "FONT_ASCENT" |
    "FONT_DESCENT" |
    "FONT_VERSION" |
    "FOUNDRY" |
    "FAMILY_NAME" |
    "NOTICE" |
    "POINT_SIZE" |
    "RESOLUTION_X" |
    "RESOLUTION_Y" |
    "SLANT" |
    "WEIGHT_NAME" |
    "X_HEIGHT" |
    "SETWIDTH_NAME" |
    "ADD_STYLE_NAME" |
    "PIXEL_SIZE" |
    "SPACING" |
    "AVERAGE_WIDTH" |
    "_OTF_FONTFILE" |
    "_OTF_PSNAME" |
    "FONT_NAME" |
    "UNDERLINE_POSITION" |
    "UNDERLINE_THICKNESS" |
    "RAW_ASCENT" |
    "RAW_DESCENT" |
    "NORM_SPACE" |
    "RELATIVE_WEIGHT" |
    "RELATIVE_SETWIDTH" |
    "SUPERSCRIPT_X" |
    "SUPERSCRIPT_Y" |
    "SUPERSCRIPT_SIZE" |
    "SUBSCRIPT_X" |
    "SUBSCRIPT_Y" |
    "SUBSCRIPT_SIZE" |
    "FIGURE_WIDTH" |
    "AVG_LOWERCASE_WIDTH" |
    "AVG_UPPERCASE_WIDTH"

export interface BDFCharacter {
    STARTCHAR: string;          // Start of character definition (glyph name)
    ENCODING: number;           // Unicode encoding of the character
    SWIDTH?: [number, number];  // Scalable width: [x, y] (used for high-resolution output)
    DWIDTH?: [number, number];  // Device width: [x, y] (used for screen display)
    SWIDTH1?: [number, number]; // Scalable width for writing direction 1 (if applicable)
    DWIDTH1?: [number, number]; // Device width for writing direction 1 (if applicable)
    BBX: [number, number, number, number]; // Character bounding box: [width, height, x-offset, y-offset]
    VVECTOR?: [number, number]; // Vertical vector offset for bi-directional fonts
    BITMAP: string[];           // Hexadecimal bitmap representation of the glyph
    ENDCHAR?: string;           // End of the character definition
    [key: string]: any; // Allows any string key

}

export type BDFCharacterKeys =
    "STARTCHAR" |
    "ENCODING" |
    "SWIDTH" |
    "DWIDTH" |
    "SWIDTH1" |
    "DWIDTH1" |
    "BBX" |
    "VVECTOR" |
    "BITMAP" |
    "ENDCHAR"


export interface BDFFile {
    metadata: BDFMetadata;       // Metadata describing the font
    properties?: BDFProperties;  // Optional font properties
    characters: BDFCharacter[];  // List of characters (glyphs) in the font
    CHARS?: number;              // Number of characters in the font
    ENDFONT?: string;            // End of the font definition
    STARTPROPERTIES?: string;    // Optional properties section for the font
    ENDPROPERTIES?: string;      // End of the properties section
    [key: string]: any; // Allows any string key
}


export type BDFFileKeys =
    "metadata" |
    "properties" |
    "characters" |
    "CHARS" |
    "ENDFONT" |
    "STARTPROPERTIES" |
    "ENDPROPERTIES" 

    export type SchemaDefinition<T> = {
        [K in keyof T]: {
            type: "string" | "number" | "array";
            minItems?: number;
            maxItems?: number;
            items?: { type: "string" | "number" }[]; // Only relevant for arrays
        };
    };
        

    /////////////////////


    export interface BMFontJSONInfo {
        face: string;
        size: number;
        bold?: number;
        italic?: number;
        charset?: string;
        unicode?: string;
        stretchH?: number;
        smooth?: number;
        aa?: number;
        padding?: string;
        spacing?: string;
        outline?: number;
      }
      
      export interface BMFontJSONCommon {
        lineHeight: number;
        base: number;
        scaleW?: number;
        scaleH?: number;
        pages?: number;
        packed?: number;
      }
      
      export interface BMFontJSONPage {
        id: number;
        file: string;
      }
      
      export interface BMFontJSONChar {
        id: number;
        x: number;
        y: number;
        width: number;
        height: number;
        xoffset: number;
        yoffset: number;
        xadvance: number;
        page?: number;
        chnl?: number;
      }
      
      export interface BMFontJSONChars {
        count: number;
        char: BMFontJSONChar[];
      }
      
      export interface BMFontJSON {
        info: BMFontJSONInfo;
        common: BMFontJSONCommon;
        pages: BMFontJSONPage[];
        chars: BMFontJSONChars;
      }
      