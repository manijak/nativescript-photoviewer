
import * as imageSource from "tns-core-modules/image-source/image-source";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { EventData, Color, Page, isIOS } from "tns-core-modules/ui/page/page";
import { PhotoViewer, PhotoViewerOptions, PaletteType, NYTPhotoItem } from "nativescript-photoviewer";
var photoViewer: PhotoViewer; 
var mySpinner: ActivityIndicator;

let image1 = "https://pixabay.com/get/ed35b3072bfd003ed1584d05fb0938c9bd22ffd41cb412439df8c371a2/house-4028391_1280.jpg";
let image2 = "https://pixabay.com/get/e83cb6062cf0043ed1584d05fb0938c9bd22ffd41cb412439df8c27da3/iceland-1979445_1280.jpg";
let image3 = "https://pixabay.com/get/ea35b00f2cf4063ed1584d05fb0938c9bd22ffd41cb412439df8c57da7/prague-3010407_1280.jpg";
let image4 = "https://pixabay.com/get/ea36b90b2bfc073ed1584d05fb0938c9bd22ffd41cb412439df8c479a2/greece-3384386_1280.jpg";
let myImages = [image1, image2, image3, image4];




export function pageLoaded(args: EventData) {	
	const page = <Page>args.object;
	photoViewer = new PhotoViewer();
	mySpinner = page.getViewById("myspinner");

	if(isIOS){
		mySpinner.ios.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.WhiteLarge;
		mySpinner.ios.color = new Color("#415677").ios;
	}
}

export function showRemoteImages(args: EventData){
	if(isIOS)
		mySpinner.busy = true; /** Show spinner prior to opening the gallery */

	let photoviewerOptions: PhotoViewerOptions = {
		startIndex: 0,
		ios: {
			completionCallback: galleryLoaded 
		},
		android: {
			paletteType: PaletteType.DarkVibrant,
			showAlbum: false
		}
	};
	
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
		console.log("Gallery closed...");
    });
};

export function showRemoteImagesAlbum(args: EventData){
	if(isIOS)
		mySpinner.busy = true; /** Show spinner prior to opening the gallery */

	let photoviewerOptions: PhotoViewerOptions = {
		startIndex: 0,
		ios: {
			completionCallback: galleryLoaded 
		},
		android: {
			paletteType: PaletteType.DarkVibrant,
			showAlbum: true
		}
	};
	
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
		console.log("Gallery closed...");
    });
};

export function showLocalImagesWithOptions(args: EventData){
	
	let photoviewerOptions: PhotoViewerOptions = {
		startIndex: 0,
		ios: {
			titleFontSize: 20,
			creditFontSize: 14,
			fontFamily: "Avenir-Roman",
			titleColor: new Color("#fff").ios,
			summaryColor: new Color("#99813c").ios,
			creditColor: new Color("#fed700").ios,
			completionCallback: galleryLoaded
		}
	};


	var testImage1: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/01.jpg").ios,
		title: "Image 1 title",
		summary: "Image 1 summary",
		credit: "Image 1 credits"
	};
	var testImage2: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/02.jpg").ios,
		title: "Image 2 title",
		summary: "Image 2 summary",
		credit: "Image 2 credits"
	};
	var testImage3: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/03.jpg").ios,
		title: "Image 3 title",
		summary: "Image 3 summary",
		credit: "Image 3 credits"
	};
	var testImage4: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/04.jpg").ios,
		title: "Image 4 title",
		summary: "Image 4 summary",
		credit: "Image 4 credits"
	};

	var myImages = [testImage1, testImage2, testImage3, testImage4];
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
        console.log("Gallery closed");
    });
};

export function showMixedSourceImages(args: EventData){

	let photoviewerOptions: PhotoViewerOptions = {
		startIndex: 0,
		ios: {
			titleFontSize: 18,
			creditFontSize: 14,
			fontFamily: "Avenir-Roman",
			titleColor: new Color("#fff").ios,
			summaryColor: new Color("#99813c").ios,
			creditColor: new Color("#fed700").ios,
			completionCallback: galleryLoaded
		}
	};

	var testImage1 = image1;

	var testImage2: NYTPhotoItem = {
		imageURL: image2,
		title: "Remote image (URL) with titles",
		summary: "Summary...",
		credit: "Credits..."
	};
	var testImage3: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/03.jpg").ios,
		title: "Local file converted to UIImage",
		summary: "image: imageSource.fromFile('~/images/03.jpg').ios",
		credit: "Credits..."
	};
	var testImage4: NYTPhotoItem = {
		imageURL: "res://04.jpg",
		title: "Local file from resources",
		summary: "imageURL: 'res://04.jpg'",
		credit: "Credits..."
	};

	var myImages = [testImage1, testImage2, testImage3, testImage4];

	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
        console.log("Gallery closed");
    });
};

function galleryLoaded(){
	console.log("gallery loaded...");

	/** We hide the spinner while the gallery is in focus */
	if(isIOS && mySpinner) 
		mySpinner.busy = false;
}

