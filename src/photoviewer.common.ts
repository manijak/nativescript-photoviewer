import { Color } from "tns-core-modules/color/color";

export interface PhotoViewerOptions {

    /**
     * Optional index to start the gallery from (Fullscreen Image gallery only)
     */
    startIndex?: number;
    
    ios?: {
        /**
         * Font familiy to use for caption and titles
         * Default "HelveticaNeue"
         */
        fontFamily?: string;

        /**
         * Font-size for title
         * Default 16
         */
        titleFontSize?: number;

        /**
         * Font-size for summary
         * Default 14
         */
        summaryFontSize?: number;

        /**
         * Font-size for credits
         * Default 14
         */
        creditFontSize?: number;

        /**
         * Title font color
         * Default white
         */
        titleColor?: Color;

        /**
         * Summary font color
         * Default light gray
         */
        summaryColor?: Color;

        /**
         * Credits font color
         * Default gray
         */
        creditColor?: Color;

        /**
         * Optional function to run after the gallery has finished loading images and is visible
         */
        completionCallback?: () => void;
    }

    android?: {
        /**
         * Optional string value telling the fullscreen image gallery what type of background color palette to use:
         * (VIBRANT, LIGHT_VIBRANT, DARK_VIBRANT, MUTED, LIGHT_MUTED, DARK_MUTED)
         */
        paletteType?: PaletteType;

        /**
         * Set to true if you want to show the album first, otherwise false if you want to show fullscreen slides directly.
         */
        showAlbum?: boolean;
    }
}

export enum PaletteType {
    VIBRANT,
    LIGHT_VIBRANT,
    DARK_VIBRANT,
    MUTED,
    LIGHT_MUTED,
    DARK_MUTED
  }
