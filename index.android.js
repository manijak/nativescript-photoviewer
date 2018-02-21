var frameModule = require("ui/frame");

PhotoViewer.prototype.showViewer = function(imagesArray) {
    var photosArray = new java.util.ArrayList();
    
    imagesArray.forEach(function(imgUrl){         
        photosArray.add(imgUrl);
    });

    var startIndex = this._startIndex || 0;
    var paletteType = this._paletteType || null ;
    var showAlbum = this._showAlbum || false;
    var activity = frameModule.topmost().android.activity;

    if(!showAlbum)
        _android = new android.content.Intent(activity, com.etiennelawlor.imagegallery.library.activities.FullScreenImageGalleryActivity.class);
    else
        _android = new android.content.Intent(activity, com.etiennelawlor.imagegallery.library.activities.ImageGalleryActivity.class);

    _android.putStringArrayListExtra("images", photosArray);
    _android.putExtra("position", startIndex);

    if(paletteType)
        _android.putExtra("palette_color_type", getPaletteType(paletteType));
    
    activity.startActivity(_android);
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

    Object.defineProperty(PhotoViewer.prototype, "android", {
        get: function () {
          return this._android;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PhotoViewer.prototype, "startIndex", {
        get: function () {
          return this._startIndex;
        },
        set: function (value) {
          this._startIndex = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PhotoViewer.prototype, "paletteType", {
        get: function () {
          return this._paletteType;
        },
        set: function (value) {
          this._paletteType = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PhotoViewer.prototype, "showAlbum", {
        get: function () {
          return this._showAlbum;
        },
        set: function (value) {
          this._showAlbum = value;
        },
        enumerable: true,
        configurable: true
    });

    if (!this instanceof PhotoViewer) { 
        return new PhotoViewer();
    }
};
module.exports = PhotoViewer;