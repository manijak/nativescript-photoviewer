
 export enum PaletteType {
    'Vibrant' = 'vibrant',
    'LightVibrant' = 'light_vibrant',
    'DarkVibrant' = 'dark_vibrant',
    'Muted' = 'muted',
    'LightMuted' = 'light_muted',
    'DarkMuted' = 'dark_muted'
}


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
        titleColor?: UIColor;

        /**
         * Summary font color
         * Default light gray
         */
        summaryColor?: UIColor;

        /**
         * Credits font color
         * Default gray
         */
        creditColor?: UIColor;

        /**
         * Show share button
         * Default true  
         */
        showShareButton?: boolean;

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

/**
 * (iOS only) - Custom NYTPhoto object to add photo & metadata (title, summary, credits...)
 */
export interface NYTPhotoItem {
    /**
     * Raw UIImage for main photo
     */
    image?: UIImage;

    /**
     * Raw UIImage for placeholder image
     */
    placeholderImage?: UIImage;

    /**
     * Image URL for main photo
     */
    imageURL?: string;

    /**
     * Image title (first row)
     */
    title?: string;

    /**
     * Image summary (second row)
     */
    summary?: string;

    /**
     * Image credits (third row)
     */
    credit?: string;
}

export class PhotoViewer {
    public showGallery(imagesArray: Array<string | NYTPhotoItem>, options?: PhotoViewerOptions): Promise<void>;
}