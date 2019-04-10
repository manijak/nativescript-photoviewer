var photoViewerModule = require("nativescript-photoviewer");
var colorModule = require("tns-core-modules/color/color");
var pageModule = require("tns-core-modules/ui/page/page");
var imageSource = require("tns-core-modules/image-source/image-source");
var photoViewer, mySpinner;

var image1 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/01.jpg";
var image2 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/02.jpg";
var image3 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/03.jpg";
var image4 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/04.jpg";


function onLoaded(args) {
    const page = args.object;
    photoViewer = new photoViewerModule.PhotoViewer();
    mySpinner = page.getViewById("myspinner");

    if (pageModule.isIOS) {
        mySpinner.ios.activityIndicatorViewStyle = 0;
        mySpinner.ios.color = new colorModule.Color("#415677").ios;
    }
}

function showRemoteImages(args) {
    if (pageModule.isIOS)
        mySpinner.busy = true;
        
    var photoviewerOptions = {
        startIndex: 0,
        ios: {
            completionCallback: galleryLoaded
        },
        android: {
            paletteType: photoViewerModule.PaletteType.DarkVibrant,
            showAlbum: false
        }
    };

    var myImages = [image1, image2, image3, image4];

    photoViewer.showGallery(myImages, photoviewerOptions).then(function () {
        console.log("Gallery closed...");
    });
}

function showRemoteImagesAlbum(args) {
    if (pageModule.isIOS)
        mySpinner.busy = true;
    var photoviewerOptions = {
        startIndex: 0,
        ios: {
            completionCallback: galleryLoaded
        },
        android: {
            paletteType: photoViewerModule.PaletteType.DarkVibrant,
            showAlbum: true
        }
    };
    photoViewer.showGallery(myImages, photoviewerOptions).then(function () {
        console.log("Gallery closed...");
    });
}


function showLocalImagesWithOptions(args) {
    var photoviewerOptions = {
        startIndex: 0,
        ios: {
            titleFontSize: 20,
            creditFontSize: 14,
            fontFamily: "Avenir-Roman",
            titleColor: new colorModule.Color("#fff").ios,
            summaryColor: new colorModule.Color("#99813c").ios,
            creditColor: new colorModule.Color("#fed700").ios,
            completionCallback: galleryLoaded
        }
    };

    var testImage1 = {
        image: imageSource.fromFile("~/res/01.jpg").ios,
        title: "Image 1 title",
        summary: "Image 1 summary",
        credit: "Image 1 credits"
    };
    var testImage2 = {
        image: imageSource.fromFile("~/res/02.jpg").ios,
        title: "Image 2 title",
        summary: "Image 2 summary",
        credit: "Image 2 credits"
    };
    var testImage3 = {
        image: imageSource.fromFile("~/res/03.jpg").ios,
        title: "Image 3 title",
        summary: "Image 3 summary",
        credit: "Image 3 credits"
    };
    var testImage4 = {
        image: imageSource.fromFile("~/res/04.jpg").ios,
        title: "Image 4 title",
        summary: "Image 4 summary",
        credit: "Image 4 credits"
    };

    var myImages = [testImage1, testImage2, testImage3, testImage4];

    photoViewer.showGallery(myImages, photoviewerOptions).then(function () {
        console.log("Gallery closed");
    });
}

function showMixedSourceImages(args) {
    var photoviewerOptions = {
        startIndex: 0,
        ios: {
            titleFontSize: 18,
            creditFontSize: 14,
            fontFamily: "Avenir-Roman",
            titleColor: new colorModule.Color("#fff").ios,
            summaryColor: new colorModule.Color("#99813c").ios,
            creditColor: new colorModule.Color("#fed700").ios,
            completionCallback: galleryLoaded
        }
    };

    var testImage1 = image1;
    var testImage2 = {
        imageURL: image2,
        title: "Remote image (URL) with titles",
        summary: "Summary...",
        credit: "Credits..."
    };
    var testImage3 = {
        image: imageSource.fromFile("~/res/03.jpg").ios,
        title: "Local file converted to UIImage",
        summary: "image: imageSource.fromFile('~/images/03.jpg').ios",
        credit: "Credits..."
    };
    var testImage4 = {
        imageURL: "res://04.jpg",
        title: "Local file from resources",
        summary: "imageURL: 'res://04.jpg'",
        credit: "Credits..."
    };

    var myImages = [testImage1, testImage2, testImage3, testImage4];

    photoViewer.showGallery(myImages, photoviewerOptions).then(function () {
        console.log("Gallery closed");
    });
}


function galleryLoaded() {
    console.log("gallery loaded...");
    if (pageModule.isIOS && mySpinner)
        mySpinner.busy = false;
}

exports.showRemoteImages = showRemoteImages;
exports.showLocalImagesWithOptions = showLocalImagesWithOptions;
exports.showRemoteImagesAlbum = showRemoteImagesAlbum;
exports.showMixedSourceImages = showMixedSourceImages;
exports.onLoaded = onLoaded;
