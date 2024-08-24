import { FileChild } from "@file/file-child";
import { IParagraphOptions, ParagraphProperties } from "@file/paragraph";
import { uniqueId } from "@util/convenience-functions";
import { PictElement } from "./pict-element/pict-element";
import { Shape, ShapeStyle } from "./shape/shape";

export interface ITextboxOptions {
    readonly options: IParagraphOptions;
    readonly style?: {
        readonly shapeStyle?: ShapeStyle;
    };
}

export class Textbox extends FileChild {
    private readonly properties: ParagraphProperties;

    public constructor({ options, style }: ITextboxOptions) {
        super("w:p");
        this.properties = new ParagraphProperties(options);
        this.root.push(this.properties);
        const shape = new Shape({
            children: options.children,
            id: uniqueId(),
            style: style?.shapeStyle,
        });
        this.root.push(
            new PictElement({
                shape,
            }),
        );
    }
}
