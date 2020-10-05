
import { 
	ActivityIndicator,
	EventData,
	Color,
	Page,
	isIOS,
	ImageSource
} from "@nativescript/core";
import { PhotoViewer, PhotoViewerOptions, NYTPhotoItem, PaletteType } from "nativescript-photoviewer";
var photoViewer: PhotoViewer; 
var mySpinner: ActivityIndicator;

let image1 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/01.jpg";
let image2 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/02.jpg";
let image3 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/03.jpg";
let image4 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/04.jpg";
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
		image: ImageSource.fromFileSync("~/res/01.jpg").ios,
		title: "Image 1 title",
		summary: "Image 1 summary",
		credit: "Image 1 credits"
	};
	var testImage2: NYTPhotoItem = {
		image: ImageSource.fromFileSync("~/res/02.jpg").ios,
		title: "Image 2 title",
		summary: "Image 2 summary",
		credit: "Image 2 credits"
	};
	var testImage3: NYTPhotoItem = {
		image: ImageSource.fromFileSync("~/res/03.jpg").ios,
		title: "Image 3 title",
		summary: "Image 3 summary",
		credit: "Image 3 credits"
	};
	var testImage4: NYTPhotoItem = {
		image: ImageSource.fromFileSync("~/res/04.jpg").ios,
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
		image: ImageSource.fromFileSync("~/res/03.jpg").ios,
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

