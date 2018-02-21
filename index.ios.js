var imageSource = require("image-source");
var frameModule = require("ui/frame");
var colorModule = require("color");

PhotoViewer.prototype.showViewer = function(imagesArray) {
    var currentViewController = frameModule.topmost().currentPage;
    var photosArray = NSMutableArray.alloc().init();
    var that = this;

    var startIndex = that._startIndex || 0;
    var completitionCallback = that._completitionCallback || null;

    imagesArray.forEach(function(imageItem) {
        
        var nytImage = NYTImage.alloc().init();
        
        if(typeof imageItem === 'object' && (imageItem instanceof NSObject && imageItem.conformsToProtocol(NYTPhoto))){
            //console.log('imageItem is of type NYTImage: ' + imageItem.conformsToProtocol(NYTPhoto));
            nytImage = imageItem;
        }
        else if(typeof imageItem === 'object'){
            //console.log('imageItem is of type object - title: ' + imageItem.title);
            var fontFamily = that._fontFamily || "HelveticaNeue";
            var titleFontSize = that._titleFontSize || 16;
            var summaryFontSize = that._summaryFontSize || 14;
            var creditFontSize = that._creditFontSize || 14;
            var titleColor = that._titleColor || new colorModule.Color("white").ios;
            var summaryColor = that._summaryColor || new colorModule.Color("lightgray").ios;
            var creditColor = that._creditColor || new colorModule.Color("gray").ios;
	        
            if(imageItem.imageURL)
                nytImage.image = imageFromURL(imageItem.imageURL);
            else
                nytImage.image = imageItem.image;
            
            nytImage.attributedCaptionTitle = attributedString(imageItem.title, titleColor, fontFamily, titleFontSize);
            nytImage.attributedCaptionSummary = attributedString(imageItem.summary, summaryColor, fontFamily, summaryFontSize);
            nytImage.attributedCaptionCredit = attributedString(imageItem.credit, creditColor, fontFamily, creditFontSize);
        }
        else if(typeof imageItem === 'string'){
            //console.log('imageItem is of type string: ' + imageItem);
            nytImage.image = imageFromURL(imageItem);
        }

        photosArray.addObject(nytImage);
    });

    var dataSource = NYTPhotoViewerArrayDataSource.dataSourceWithPhotos(photosArray);
    var self = frameModule.topmost().ios;
    var photosViewController = NYTPhotosViewController.alloc().initWithDataSourceInitialPhotoIndexDelegate(dataSource, startIndex, self);
    UIApplication.sharedApplication.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(photosViewController, true, completitionCallback);
    
    this._ios = photosViewController;
};



function attributedString(text, color, fontFamily, fontSize) {
    var attrString = NSString.stringWithString(text || "");
    var attributeOptions = {
        [NSForegroundColorAttributeName]: color,
        [NSFontAttributeName]: UIFont.fontWithNameSize(fontFamily, fontSize)
    };
    return NSAttributedString.alloc().initWithStringAttributes(attrString, attributeOptions);
};
function imageFromURL(imageURL){
    var nsURL = NSURL.URLWithString(imageURL);
    var imageData = NSData.dataWithContentsOfURL(nsURL);
    var nativeImage = UIImage.imageWithData(imageData);
    return nativeImage;
};

PhotoViewer.prototype.newNYTPhoto = function() {
    var newImage = NYTImage.alloc().init();
    return newImage;
};
var NYTImage = NSObject.extend({
    get image() { return this.super.image; },
    set image(value) { this.super.image = value; },

    get imageData() { return this.super.imageData; },
    set imageData(value) { this.super.imageData = value; },

    get placeholderImage() { return this.super.placeholderImage; },
    set placeholderImage(value) { this.super.placeholderImage = value; },

    get attributedCaptionTitle() { return this.super.attributedCaptionTitle; },
    set attributedCaptionTitle(value) { this.super.attributedCaptionTitle = value; },

    get attributedCaptionSummary() { return this.super.attributedCaptionSummary; },
    set attributedCaptionSummary(value) { this.super.attributedCaptionSummary = value; },

    get attributedCaptionCredit() { return this.super.attributedCaptionCredit; },
    set attributedCaptionCredit(value) { this.super.attributedCaptionCredit = value; }

}, {
    name: "NYTImage",
    protocols: [NYTPhoto]
});


function PhotoViewer() {

    Object.defineProperty(PhotoViewer.prototype, "ios", {
        get: function () {
          return this._ios;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PhotoViewer.prototype, "fontFamily", {
        get: function () {
          return this._fontFamily;
        },
        set: function (value) {
          this._fontFamily = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PhotoViewer.prototype, "titleFontSize", {
        get: function () {
          return this._titleFontSize;
        },
        set: function (value) {
          this._titleFontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoViewer.prototype, "summaryFontSize", {
        get: function () {
          return this._summaryFontSize;
        },
        set: function (value) {
          this._summaryFontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoViewer.prototype, "creditFontSize", {
        get: function () {
          return this._creditFontSize;
        },
        set: function (value) {
          this._creditFontSize = value;
        },
        enumerable: true,
        configurable: true
    });

    
    Object.defineProperty(PhotoViewer.prototype, "titleColor", {
        get: function () {
          return this._titleColor;
        },
        set: function (value) {
          this._titleColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoViewer.prototype, "summaryColor", {
        get: function () {
          return this._summaryColor;
        },
        set: function (value) {
          this._summaryColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoViewer.prototype, "creditColor", {
        get: function () {
          return this._creditColor;
        },
        set: function (value) {
          this._creditColor = value;
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

    Object.defineProperty(PhotoViewer.prototype, "completitionCallback", {
        get: function () {
          return this._completitionCallback;
        },
        set: function (value) {
          this._completitionCallback = value;
        },
        enumerable: true,
        configurable: true
    });


    if (!this instanceof PhotoViewer) { 
        return new PhotoViewer();
    }
};
module.exports = PhotoViewer;