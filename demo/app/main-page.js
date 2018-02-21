var PhotoViewer = require("nativescript-photoviewer");
var frameModule = require("ui/frame");
var imageSourceModule = require("image-source");
var colorModule = require("color");
var photoViewer;

function pageLoaded(args) {
}
function galleryLoaded(){
	console.log("gallery loaded...");
}

exports.galleryOpen = function(args){

	var image1 = "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/01.jpg";
	var image2 = "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/02.jpg";
	var image3 = "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/03.jpg";
    var image4 = "https://raw.githubusercontent.com/manijak/nativescript-photoviewer/master/demo/res/04.jpg";
	var myImages = [image1, image2, image3, image4];

	if(!photoViewer)
		photoViewer = new PhotoViewer();

	photoViewer.completitionCallback = galleryLoaded; // iOS only
	photoViewer.paletteType = "LIGHT_MUTED"; // Android only
	photoViewer.showAlbum = false; // Android only (true = shows album first, false = shows fullscreen gallery directly)
	photoViewer.startIndex = 0; // start index for the fullscreen gallery

	photoViewer.showViewer(myImages);
};

exports.galleryOpen2 = function(args){

	if(!photoViewer)
		photoViewer = new PhotoViewer();

	photoViewer.completitionCallback = galleryLoaded;
	photoViewer.startIndex = 1; // start index for the fullscreen gallery

	var testImage1 = photoViewer.newNYTPhoto();
	var testImage2 = photoViewer.newNYTPhoto();
	var testImage3 = photoViewer.newNYTPhoto();
    var testImage4 = photoViewer.newNYTPhoto();

	var image1 = imageSourceModule.fromFile("~/res/01.jpg");
	var image2 = imageSourceModule.fromFile("~/res/02.jpg");
	var image3 = imageSourceModule.fromFile("~/res/03.jpg");
	var image4 = imageSourceModule.fromFile("~/res/04.jpg");

	testImage1.image = image1.ios;
	testImage2.image = image2.ios;
	testImage3.image = image3.ios;
    testImage4.image = image4.ios;
	
	var myImages = [testImage1, testImage2, testImage3, testImage4];
	photoViewer.showViewer(myImages);
};

exports.galleryOpen3 = function(args){
	
	if(!photoViewer)
		photoViewer = new PhotoViewer();
	
	photoViewer.titleFontSize = 20;
	photoViewer.creditFontSize = 14;
	photoViewer.fontFamily = "Avenir-Roman";
	photoViewer.titleColor = new colorModule.Color("#fff").ios;
	photoViewer.summaryColor = new colorModule.Color("#99813c").ios;
	photoViewer.creditColor = new colorModule.Color("#fed700").ios;

	photoViewer.completitionCallback = galleryLoaded;
	photoViewer.startIndex = 0; // start index for the fullscreen gallery

	var image1 = imageSourceModule.fromFile("~/res/01.jpg");
	var image2 = imageSourceModule.fromFile("~/res/02.jpg");
	var image3 = imageSourceModule.fromFile("~/res/03.jpg");
	var image4 = imageSourceModule.fromFile("~/res/04.jpg");

	var testImage1 = {
		image: image1.ios,
		title: "Image 1 title",
		summary: "Image 1 summary",
		credit: "NativeScript"
	};
	var testImage2 = {
		image: image2.ios,
		title: "Image 2 title",
		summary: "Image 2 summary",
		credit: "NativeScript"
	};
	var testImage3 = {
		image: image3.ios,
		title: "Image 3 title",
		summary: "Image 3 summary",
		credit: "NativeScript"
	};
    var testImage4 = {
		image: image3.ios,
		title: "Image 4 title",
		summary: "Image 4 summary",
		credit: "NativeScript"
	};
	
	var myImages = [testImage1, testImage2, testImage3, testImage4];
	photoViewer.showViewer(myImages);
};

exports.pageLoaded = pageLoaded;
