import { PhotoViewerOptions, NYTPhotoItem, PhotoViewer as PhotoViewerBase } from ".";
import { Color } from "tns-core-modules/color";
import { isFileOrResourcePath } from "tns-core-modules/utils/utils";
import * as imageSource from "tns-core-modules/image-source/image-source";
import * as frame from "tns-core-modules/ui/frame";

import { PaletteType } from "./photoviewer.common";
export * from './photoviewer.common';

declare const NSAttributedString: any;

let titleForPhotoAtIndexTotalPhotoCount: any;

export class PhotoViewer implements PhotoViewerBase {

    private _dataSource: NYTPhotoViewerArrayDataSource;
    private _delegate: PhotoViewerDelegateImpl;
    private photosViewController: NYTPhotosViewController; 

    constructor() { }

    public showGallery(imagesArray: Array<string | NYTPhotoItem>, options?: PhotoViewerOptions) {

        if(!options)
            options = {};
        if(!options.ios)
            options.ios = {};
        if(!options.android)
            options.android = {};

        let photosArray = NSMutableArray.alloc<NYTPhoto>().init();
        let startIndex: number = options.startIndex || 0;
        let iosCompletionCallback = options.ios.completionCallback || null;
        titleForPhotoAtIndexTotalPhotoCount = options.ios.titleForPhotoAtIndexTotalPhotoCountCallback || null; 
    
        imagesArray.forEach((imageItem: string | NYTPhotoItem) => {
    
            let imageToAdd = NYTImage.alloc().init();
    
            let fontFamily = options.ios.fontFamily || "HelveticaNeue";
            let titleFontSize = options.ios.titleFontSize || 16;
            let summaryFontSize = options.ios.summaryFontSize || 14;
            let creditFontSize = options.ios.creditFontSize || 14;
            
            let titleColor = options.ios.titleColor || new Color("white").ios;
            let summaryColor = options.ios.summaryColor || new Color("lightgray").ios;
            let creditColor = options.ios.creditColor || new Color("gray").ios;
    
            if(isNYTPhotoItem(imageItem)){
                console.log("received photoItem", imageItem);
    
                if(imageItem.imageURL)
                    imageToAdd.image = getUIImage(imageItem.imageURL); /** string URL to UIImage */
                else
                    imageToAdd.image = imageItem.image; /** UIImage */
                
                imageToAdd.placeholderImage = imageItem.placeholderImage;
                imageToAdd.attributedCaptionTitle = this.attributedString(imageItem.title, titleColor, fontFamily, titleFontSize);
                imageToAdd.attributedCaptionSummary = this.attributedString(imageItem.summary, summaryColor, fontFamily, summaryFontSize);
                imageToAdd.attributedCaptionCredit = this.attributedString(imageItem.credit, creditColor, fontFamily, creditFontSize);
            }
            else if(typeof imageItem === 'string'){
                console.log("received image url:", imageItem);
                let img = getUIImage(imageItem);
                imageToAdd.image = img;
            }
            else{
                console.log("ERROR: Passed object is not a image path/url or NYTPhotoItem object!", imageItem);
            }

            photosArray.addObject(imageToAdd);
        });

        this._dataSource = NYTPhotoViewerArrayDataSource.dataSourceWithPhotos(photosArray);
        this.photosViewController = NYTPhotosViewController.alloc().initWithDataSourceInitialPhotoIndexDelegate(this._dataSource, startIndex, null);
        if(options.ios.showShareButton == false){
            this.photosViewController.rightBarButtonItem = null;
        }

        frame.topmost().ios.controller.presentViewControllerAnimatedCompletion(this.photosViewController, true, iosCompletionCallback);

        return new Promise<void>((resolve) => {
            this._delegate = PhotoViewerDelegateImpl.initWithResolve(resolve);
            this.photosViewController.delegate = this._delegate;
        });
    }

    private attributedString(text: string, color: UIColor, fontFamily: string, fontSize: number): NSAttributedString {
        var attributeOptions = {
            [NSForegroundColorAttributeName]: color,
            [NSFontAttributeName]: UIFont.fontWithNameSize(fontFamily, fontSize)
        };
    
        return NSAttributedString.alloc().initWithStringAttributes(text || "", attributeOptions);
    }

    public updatePhotoAtIndex(index: number){
        this.photosViewController.updatePhotoAtIndex(index);
    }
}


function getImageData(imageURL: string): NSData {
    let nsURL = NSURL.URLWithString(imageURL);
    return NSData.dataWithContentsOfURL(nsURL);
}

function getUIImage(imageURL: string): UIImage {
    if(isFileOrResourcePath(imageURL)){
        console.log("image is file or resource path: ", imageURL);
        return imageSource.fromFileOrResource(imageURL).ios;
    }
    else{
        console.log("URL: ", imageURL);
        let nsURL = NSURL.URLWithString(imageURL);
        let imageData = NSData.dataWithContentsOfURL(nsURL);
        return UIImage.imageWithData(imageData);
    }
}

function isNYTPhotoItem(item: any): item is NYTPhotoItem {
    return typeof item.image === 'object' || typeof item.imageURL === 'string';
}

const NYTImage = (NSObject as any).extend({
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
/* 
@ObjC(NYTPhoto)
class NYTImage extends NSObject implements NYTPhoto {

    static new(): NYTImage {
        return <NYTImage>super.new();
    }
    
    attributedCaptionCredit: NSAttributedString;
    attributedCaptionSummary: NSAttributedString;
    attributedCaptionTitle: NSAttributedString;
    image: UIImage;
    imageData: NSData;
    placeholderImage: UIImage;
}  */

@ObjC(NYTPhotosViewControllerDelegate)
class PhotoViewerDelegateImpl extends NSObject implements NYTPhotosViewControllerDelegate {
    private _resolve: () => void;

    public static initWithResolve(resolve: () => void): PhotoViewerDelegateImpl {
        const delegate = PhotoViewerDelegateImpl.new() as PhotoViewerDelegateImpl;
        delegate._resolve = resolve;
        return delegate;
    }

    photosViewControllerTitleForPhotoAtIndexTotalPhotoCount(photosViewController: NYTPhotosViewController, photo: NYTPhoto, photoIndex: number, totalPhotoCount: number): string {
        if(titleForPhotoAtIndexTotalPhotoCount != null)
            return titleForPhotoAtIndexTotalPhotoCount(photoIndex, totalPhotoCount);
        else 
            return (photoIndex+1)+" of "+totalPhotoCount;
    }

    public photosViewControllerDidDismiss(photosViewController: NYTPhotosViewController) {
        this._resolve();
    }
}