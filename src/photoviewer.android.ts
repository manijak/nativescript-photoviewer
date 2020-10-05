import { AndroidActivityResultEventData, Application } from "@nativescript/core";
import { PhotoViewerOptions, PhotoViewer as PhotoViewerBase  } from ".";
import { PaletteType } from "./photoviewer.common";
export * from './photoviewer.common';

declare const com: any;

export class PhotoViewer implements PhotoViewerBase {
    private static readonly CLOSE_PHOTO_REQUEST = 9191;
    private _currentResolve: () => void;
    
    constructor() { }

    public showGallery(imagesArray: Array<string>, options?: PhotoViewerOptions) {
        var photosArray = new java.util.ArrayList();
    
        imagesArray.forEach((imgUrl: string) => {
            photosArray.add(imgUrl);
        });
    
        let startIndex: number = options.startIndex || 0;
        let paletteType: PaletteType = options.android.paletteType || null ;
        let showAlbum: boolean = options.android.showAlbum || false;
        
        let intent: android.content.Intent;
        Application.android.on("activityResult", this.onActivityResult);

        return new Promise<void>((resolve) => {
            this._currentResolve = resolve;

            if(!showAlbum){
                intent = new android.content.Intent(Application.android.foregroundActivity, com.etiennelawlor.imagegallery.library.activities.FullScreenImageGalleryActivity.class);
            }
            else{
                intent = new android.content.Intent(Application.android.foregroundActivity, com.etiennelawlor.imagegallery.library.activities.ImageGalleryActivity.class);
            }
        
            intent.putStringArrayListExtra("images", photosArray);
            intent.putExtra("position", startIndex);
        
            if(paletteType){
                intent.putExtra("palette_color_type", getPaletteType(paletteType));
            }
            
            Application.android.foregroundActivity.startActivityForResult(intent, PhotoViewer.CLOSE_PHOTO_REQUEST);
        });
    }

    private onActivityResult = (args: AndroidActivityResultEventData) => {
        if (args.requestCode === PhotoViewer.CLOSE_PHOTO_REQUEST) {
            this._currentResolve();
            this._currentResolve = undefined;
            Application.android.off("activityResult", this.onActivityResult);
        }
    }
   
}

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