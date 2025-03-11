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

declare class Parser {
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

export { Parser };
