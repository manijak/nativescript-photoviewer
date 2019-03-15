/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { topmost } from 'tns-core-modules/ui/frame';
import { PhotoViewerOptions, PaletteType } from "./photoviewer.common";

declare const com: any;

function getPaletteType(paletteType: PaletteType){
    switch (paletteType) {
        case PaletteType.VIBRANT:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.VIBRANT;
        case PaletteType.LIGHT_VIBRANT:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_VIBRANT;
        case PaletteType.DARK_VIBRANT:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.DARK_VIBRANT;
        case PaletteType.MUTED:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.MUTED;
        case PaletteType.LIGHT_MUTED:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_MUTED;
        case PaletteType.DARK_MUTED:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.DARK_MUTED;
        default:
            return null;
    }
}

export function showGallery(imagesArray: Array<string>, options?: PhotoViewerOptions) {
    var photosArray = new java.util.ArrayList();

    imagesArray.forEach((imgUrl: string) => {
        photosArray.add(imgUrl);
    });

    let startIndex: number = options.startIndex || 0;
    let paletteType: PaletteType = options.android.paletteType || null ;
    let showAlbum: boolean = options.android.showAlbum || false;
    let activity: any = topmost().android.activity;

    if(!showAlbum)
        this._android = new android.content.Intent(activity, com.etiennelawlor.imagegallery.library.activities.FullScreenImageGalleryActivity.class);
    else
        this._android = new android.content.Intent(activity, com.etiennelawlor.imagegallery.library.activities.ImageGalleryActivity.class);

    this._android.putStringArrayListExtra("images", photosArray);
    this._android.putExtra("position", startIndex);

    if(paletteType)
        this._android.putExtra("palette_color_type", getPaletteType(paletteType));

    activity.startActivity(this._android);
}
