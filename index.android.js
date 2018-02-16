var frameModule = require("ui/frame");

PhotoViewer.prototype.showViewer = function(imagesArray, startIndex, completitionCallback, paletteType) {
    var photosArray = new java.util.ArrayList();
    
    imagesArray.forEach(function(imgUrl){         
        photosArray.add(imgUrl);
    });

    startIndex = startIndex ? startIndex : 0;
    var activity = frameModule.topmost().android.activity;
    var intent = new android.content.Intent(activity, com.etiennelawlor.imagegallery.library.activities.FullScreenImageGalleryActivity.class);
    intent.putStringArrayListExtra("images", photosArray);
    intent.putExtra("position", startIndex);

    if(paletteType)
        intent.putExtra("palette_color_type", getPaletteType(paletteType));
    
    activity.startActivity(intent);
};

function getPaletteType(paletteType){
    switch (paletteType) {
        case 'VIBRANT':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.VIBRANT;
            break;
        case 'LIGHT_VIBRANT':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_VIBRANT;
            break;
        case 'DARK_VIBRANT':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.DARK_VIBRANT;
            break;
        case 'MUTED':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.MUTED;
            break;
        case 'LIGHT_MUTED':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.LIGHT_MUTED;
            break;
        case 'DARK_MUTED':
            return com.etiennelawlor.imagegallery.library.enums.PaletteColorType.DARK_MUTED;
            break;
        default:
            return null;
            break;
    }
}

function PhotoViewer() {
    if (!this instanceof PhotoViewer) { 
        return new PhotoViewer();
    }
};
module.exports = PhotoViewer;