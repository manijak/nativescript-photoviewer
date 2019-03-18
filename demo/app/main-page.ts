
import * as imageSource from "tns-core-modules/image-source/image-source";
import { EventData, Color } from "tns-core-modules/ui/page/page";
import { PhotoViewer, PhotoViewerOptions, PaletteType, NYTPhotoItem } from "nativescript-photoviewer";
var photoViewer: PhotoViewer; 


export function pageLoaded(args: EventData) {	
	photoViewer = new PhotoViewer();
}

export function showRemoteImages(args: EventData){

	let image1 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/01.jpg";
	let image2 = "https://media.fkzeljeznicar.ba/2019/03/IMG_0473-1.jpg";
	let image3 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/03.jpg";
	let image4 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/04.jpg";

	/* let image5 = "~/res/01.jpg";
	let image6 = "~/res/02.jpg";
	let image7 = "~/res/03.jpg";
	let image8 = "~/res/04.jpg"; */

	let myImages = [image1, image2, image3, image4 /* , image5, image6, image7, image8 */ ];

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

	//let photoViewer = new PhotoViewer();
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
        console.log("Gallery closed");
    });
};

export function showLocalImages(args: EventData){

	let photoviewerOptions: PhotoViewerOptions = {
		startIndex: 1,
		ios: {
			completionCallback: galleryLoaded,
			titleFontSize: 25
		}
	};

	var testImage1: NYTPhotoItem = {
		imageURL: "res://01.jpg",
		title: "Image 1 via resource path"
	};
	var testImage2: NYTPhotoItem = {
		imageURL: "~/res/02.jpg",
		title: "Image 2 via resource path"
	};
	var testImage3: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/03.jpg").ios,
		title: "Image 3 via imageSource"
	};
	var testImage4: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/04.jpg").ios,
		title: "Image 4 via imageSource"
	};

	var myImages = [testImage1, testImage2, testImage3, testImage4];

	
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
        console.log("Gallery closed");
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
		//imageURL: "~/res/01.jpg",
		title: "Image 1 title",
		summary: "Image 1 summary",
		credit: "Image 1 credits"
	};
	var testImage2: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/02.jpg").ios,
		//imageURL: "~/res/02.jpg",
		title: "Image 2 title",
		summary: "Image 2 summary",
		credit: "Image 2 credits"
	};
	var testImage3: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/03.jpg").ios,
		//imageURL: "~/res/03.jpg",
		title: "Image 3 title",
		summary: "Image 3 summary",
		credit: "Image 3 credits"
	};
	var testImage4: NYTPhotoItem = {
		image: imageSource.fromFile("~/res/04.jpg").ios,
		//imageURL: "~/res/04.jpg",
		title: "Image 4 title",
		summary: "Image 4 summary",
		credit: "Image 4 credits"
	};

	var myImages = [testImage1, testImage2, testImage3, testImage4];

	//let photoViewer = new PhotoViewer();
	photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
        console.log("Gallery closed");
    });
};

function galleryLoaded(){
	console.log("gallery loaded...");
}