interface BDFMetadata {
    STARTFONT?: string;
    FONT?: string;
    SIZE?: [number, number, number];
    FONTBOUNDINGBOX?: [number, number, number, number];
    METRICSET?: 0 | 1 | 2;
    CONTENTVERSION?: number;
    CHARSET_REGISTRY?: string;
    CHARSET_ENCODING?: string;
    COMMENT?: string;
    FONTNAME_REGISTRY?: string;
    CHARSET_COLLECTIONS?: string;
    [key: string]: any;
}
type BDFMetadataKeys = "STARTFONT" | "FONT" | "SIZE" | "FONTBOUNDINGBOX" | "METRICSET" | "CONTENTVERSION" | "CHARSET_REGISTRY" | "CHARSET_ENCODING" | "COMMENT" | "FONTNAME_REGISTRY" | "CHARSET_COLLECTIONS";
interface BDFProperties {
    CAP_HEIGHT?: number;
    COPYRIGHT?: string;
    DEFAULT_CHAR?: number;
    FACE_NAME?: string;
    FONT_ASCENT?: number;
    FONT_DESCENT?: number;
    FONT_VERSION?: string;
    FOUNDRY?: string;
    FAMILY_NAME?: string;
    NOTICE?: string;
    POINT_SIZE?: number;
    RESOLUTION_X?: number;
    RESOLUTION_Y?: number;
    SLANT?: string;
    WEIGHT_NAME?: string;
    X_HEIGHT?: number;
    SETWIDTH_NAME?: string;
    ADD_STYLE_NAME?: string;
    PIXEL_SIZE?: number;
    SPACING?: string;
    AVERAGE_WIDTH?: number;
    _OTF_FONTFILE?: string;
    _OTF_PSNAME?: string;
    FONT_NAME?: string;
    UNDERLINE_POSITION?: number;
    UNDERLINE_THICKNESS?: number;
    RAW_ASCENT?: number;
    RAW_DESCENT?: number;
    NORM_SPACE?: number;
    RELATIVE_WEIGHT?: number;
    RELATIVE_SETWIDTH?: number;
    SUPERSCRIPT_X?: number;
    SUPERSCRIPT_Y?: number;
    SUPERSCRIPT_SIZE?: number;
    SUBSCRIPT_X?: number;
    SUBSCRIPT_Y?: number;
    SUBSCRIPT_SIZE?: number;
    FIGURE_WIDTH?: number;
    AVG_LOWERCASE_WIDTH?: number;
    AVG_UPPERCASE_WIDTH?: number;
    [key: string]: any;
}
type BDFPropertiesKeys = "CAP_HEIGHT" | "COPYRIGHT" | "DEFAULT_CHAR" | "FACE_NAME" | "FONT_ASCENT" | "FONT_DESCENT" | "FONT_VERSION" | "FOUNDRY" | "FAMILY_NAME" | "NOTICE" | "POINT_SIZE" | "RESOLUTION_X" | "RESOLUTION_Y" | "SLANT" | "WEIGHT_NAME" | "X_HEIGHT" | "SETWIDTH_NAME" | "ADD_STYLE_NAME" | "PIXEL_SIZE" | "SPACING" | "AVERAGE_WIDTH" | "_OTF_FONTFILE" | "_OTF_PSNAME" | "FONT_NAME" | "UNDERLINE_POSITION" | "UNDERLINE_THICKNESS" | "RAW_ASCENT" | "RAW_DESCENT" | "NORM_SPACE" | "RELATIVE_WEIGHT" | "RELATIVE_SETWIDTH" | "SUPERSCRIPT_X" | "SUPERSCRIPT_Y" | "SUPERSCRIPT_SIZE" | "SUBSCRIPT_X" | "SUBSCRIPT_Y" | "SUBSCRIPT_SIZE" | "FIGURE_WIDTH" | "AVG_LOWERCASE_WIDTH" | "AVG_UPPERCASE_WIDTH";
interface BDFCharacter {
    STARTCHAR: string;
    ENCODING: number;
    SWIDTH?: [number, number];
    DWIDTH?: [number, number];
    SWIDTH1?: [number, number];
    DWIDTH1?: [number, number];
    BBX: [number, number, number, number];
    VVECTOR?: [number, number];
    BITMAP: string[];
    ENDCHAR?: string;
    [key: string]: any;
}
type BDFCharacterKeys = "STARTCHAR" | "ENCODING" | "SWIDTH" | "DWIDTH" | "SWIDTH1" | "DWIDTH1" | "BBX" | "VVECTOR" | "BITMAP" | "ENDCHAR";
interface BDFFile {
    metadata: BDFMetadata;
    properties?: BDFProperties;
    characters: BDFCharacter[];
    CHARS?: number;
    ENDFONT?: string;
    STARTPROPERTIES?: string;
    ENDPROPERTIES?: string;
    [key: string]: any;
}
type BDFFileKeys = "metadata" | "properties" | "characters" | "CHARS" | "ENDFONT" | "STARTPROPERTIES" | "ENDPROPERTIES";

declare class BDFParser {
    _outputFile: BDFFile;
    _parseCharMode: boolean;
    _parseCharBitmapMode: boolean;
    _tmpChar: Partial<BDFCharacter>;
    constructor();
    parse: (buffer: ArrayBuffer | Uint8Array) => BDFFile;
    _parseLine: (line: string) => void;
    _parseValue: ({ line, target, schema, ignore }: {
        line: string;
        target: BDFProperties | BDFMetadata | BDFCharacter | BDFFile;
        schema: {
            [key: string]: any;
        };
        ignore?: string[];
    }) => void;
    _parseChar: (line: string) => void;
}

export { type BDFCharacter, type BDFCharacterKeys, type BDFFile, type BDFFileKeys, type BDFMetadata, type BDFMetadataKeys, BDFParser, type BDFProperties, type BDFPropertiesKeys };
