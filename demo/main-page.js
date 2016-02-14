var NYTPhotoViewer = require("nativescript-nytphotoviewer");
var frameModule = require("ui/frame");
var imageModule = require("ui/image");
var photoViewer;

function pageLoaded(args) {
}

exports.galleryOpen = function(args){

	var image1 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/05.jpg";
	var image2 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/06.jpg";
	var image3 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/07.jpg";
    var image4 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/08.jpg";
	var myImages = [image1, image2, image3, image4];

	if(!photoViewer)
		photoViewer = new NYTPhotoViewer();

	photoViewer.showViewer(myImages);
};

exports.galleryOpen2 = function(args){

	if(!photoViewer)
		photoViewer = new NYTPhotoViewer();

	var testImage1 = photoViewer.newNYTPhoto();
	var testImage2 = photoViewer.newNYTPhoto();
	var testImage3 = photoViewer.newNYTPhoto();
    var testImage4 = photoViewer.newNYTPhoto();

	var image1 = new imageModule.Image();
	image1.src = "~/res/01.jpg";
	var image2 = new imageModule.Image();
	image2.src = "~/res/02.jpg";
	var image3 = new imageModule.Image();
	image3.src = "~/res/03.jpg";
    var image4 = new imageModule.Image();
	image4.src = "~/res/04.jpg";

	testImage1.image = image1.ios.image;
	testImage2.image = image2.ios.image;
	testImage3.image = image3.ios.image;
    testImage4.image = image4.ios.image;
	
	var myImages = [testImage1, testImage2, testImage3, testImage4];
	photoViewer.showViewer(myImages);
};

exports.galleryOpen3 = function(args){
	
	if(!photoViewer)
		photoViewer = new NYTPhotoViewer();
	
	photoViewer.titleFontSize = 20;
	photoViewer.creditFontSize = 14;
	photoViewer.fontFamily = "Avenir-Roman";
	photoViewer.titleColor = UIColor.whiteColor();
	photoViewer.summaryColor = UIColor.brownColor();
	photoViewer.creditColor = UIColor.orangeColor();

	var image1 = new imageModule.Image();
	image1.src = "~/res/01.jpg";
	var image2 = new imageModule.Image();
	image2.src = "~/res/02.jpg";
	var image3 = new imageModule.Image();
	image3.src = "~/res/03.jpg";
    var image4 = new imageModule.Image();
	image4.src = "~/res/04.jpg";

	var testImage1 = {
		image: image1.ios.image,
		title: "Image 1 title",
		summary: "Image 1 summary",
		credit: "Telerik"
	};
	var testImage2 = {
		image: image2.ios.image,
		title: "Image 2 title",
		summary: "Image 2 summary",
		credit: "Telerik"
	};
	var testImage3 = {
		image: image3.ios.image,
		title: "Image 3 title",
		summary: "Image 3 summary",
		credit: "Telerik"
	};
    var testImage4 = {
		image: image3.ios.image,
		title: "Image 4 title",
		summary: "Image 4 summary",
		credit: "Telerik"
	};
	
	var myImages = [testImage1, testImage2, testImage3, testImage4];
	photoViewer.showViewer(myImages);
};

exports.pageLoaded = pageLoaded;
