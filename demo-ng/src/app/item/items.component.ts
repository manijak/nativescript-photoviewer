import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivityIndicator, isIOS, Color, EventData, Page, ImageSource } from "@nativescript/core";
import { PhotoViewer, PhotoViewerOptions, PaletteType, NYTPhotoItem } from "nativescript-photoviewer";

let image1 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/01.jpg";
let image2 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/02.jpg";
let image3 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/03.jpg";
let image4 = "https://github.com/manijak/nativescript-photoviewer/raw/master/demo/app/res/04.jpg";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    photoViewer: PhotoViewer;
    indicator: ActivityIndicator;

    myImages = [image1, image2, image3, image4];

    constructor(private _page: Page) {
        this._page.on("loaded", () => {
            
            this.photoViewer = new PhotoViewer();
        
            if(isIOS){
                this.indicator = this._page.getViewById("myspinner"); 
                this.indicator.ios.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.WhiteLarge;
                this.indicator.ios.color = new Color("#415677").ios;
            }
        })
    }

    ngOnInit(): void { }

    showRemoteImages(): void {
        if(isIOS){
            this.indicator.busy = true; /** Show spinner prior to opening the gallery */
        }
            
        let photoviewerOptions: PhotoViewerOptions = {
            startIndex: 0,
            ios: {
                completionCallback: () => {
                    this.galleryLoaded();
                }
            },
            android: {
                paletteType: PaletteType.DarkVibrant,
                showAlbum: false
            }
        };
        
        this.photoViewer.showGallery(this.myImages, photoviewerOptions).then(() => {
            console.log("Gallery closed...");
        });
    }

    showRemoteImagesAlbum(){
        if(isIOS)
            this.indicator.busy = true; /** Show spinner prior to opening the gallery */
    
        let photoviewerOptions: PhotoViewerOptions = {
            startIndex: 0,
            ios: {
                completionCallback: this.galleryLoaded 
            },
            android: {
                paletteType: PaletteType.DarkVibrant,
                showAlbum: true
            }
        };
        
        this.photoViewer.showGallery(this.myImages, photoviewerOptions).then(() => {
            console.log("Gallery closed...");
        });
    }
    
    showLocalImagesWithOptions(args: EventData){
        
        let photoviewerOptions: PhotoViewerOptions = {
            startIndex: 0,
            ios: {
                titleFontSize: 20,
                creditFontSize: 14,
                fontFamily: "Avenir-Roman",
                titleColor: new Color("#fff").ios,
                summaryColor: new Color("#99813c").ios,
                creditColor: new Color("#fed700").ios,
                completionCallback: () => {
                    this.galleryLoaded();
                }
            }
        };
        

        var testImage1: NYTPhotoItem = {
            image: ImageSource.fromFileSync("~/images/01.jpg").ios,
            title: "Image 1 title",
            summary: "Image 1 summary",
            credit: "Image 1 credits"
        };
        var testImage2: NYTPhotoItem = {
            image: ImageSource.fromFileSync("~/images/02.jpg").ios,
            title: "Image 2 title",
            summary: "Image 2 summary",
            credit: "Image 2 credits"
        };
        var testImage3: NYTPhotoItem = {
            image: ImageSource.fromFileSync("~/images/03.jpg").ios,
            title: "Image 3 title",
            summary: "Image 3 summary",
            credit: "Image 3 credits"
        };
        var testImage4: NYTPhotoItem = {
            image: ImageSource.fromFileSync("~/images/04.jpg").ios,
            title: "Image 4 title",
            summary: "Image 4 summary",
            credit: "Image 4 credits"
        };
    
        var myImages = [testImage1, testImage2, testImage3, testImage4];
        this.photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
            console.log("Gallery closed");
        });
    }
    
    showMixedSourceImages(args: EventData){
    
        let photoviewerOptions: PhotoViewerOptions = {
            startIndex: 0,
            ios: {
                titleFontSize: 18,
                creditFontSize: 14,
                fontFamily: "Avenir-Roman",
                titleColor: new Color("#fff").ios,
                summaryColor: new Color("#99813c").ios,
                creditColor: new Color("#fed700").ios,
                completionCallback: () => {
                    this.galleryLoaded();
                }
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
            image: ImageSource.fromFileSync("~/images/03.jpg").ios,
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
    
        this.photoViewer.showGallery(myImages, photoviewerOptions).then(() => {
            console.log("Gallery closed");
        });
    }



    private galleryLoaded(): void{
        console.log("gallery loaded...");

        /** We hide the spinner while the gallery is in focus */
        if(isIOS){
            this.indicator.busy = false;
            console.log("hide spinner");
        }
    }
}
