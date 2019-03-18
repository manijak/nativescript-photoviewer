import { PhotoViewerOptions, PaletteType } from ".";
import { topmost } from 'tns-core-modules/ui/frame';

declare const com: any;

function getPaletteType(paletteType: PaletteType){
    switch (paletteType) {
        case PaletteType.Vibrant:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.VIBRANT;
        case PaletteType.LightVibrant:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_VIBRANT;
        case PaletteType.DarkVibrant:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.DARK_VIBRANT;
        case PaletteType.Muted:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.MUTED;
        case PaletteType.LightMuted:
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_MUTED;
        case PaletteType.DarkMuted:
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
