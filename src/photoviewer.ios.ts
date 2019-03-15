/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./platforms/ios/typings/NYTPhotoViewer.d.ts" />

import { PhotoViewerOptions } from "./photoviewer.common";
import { Color } from "tns-core-modules/color";
import { topmost } from 'tns-core-modules/ui/frame';

export function showGallery(imagesArray: Array<string | NYTPhotoItem>, options?: PhotoViewerOptions){

    let photosArray = NSMutableArray.alloc<NYTPhoto>().init();

    let startIndex: number = options.startIndex || 0;
    let iosCompletionCallback = options.ios.completionCallback || null;

    imagesArray.forEach((imageItem: string | NYTPhotoItem) => {

        let imageToAdd: NYTImage = new NYTImage();

        if(imageItem instanceof NYTPhotoItem){

            var fontFamily = options.ios.fontFamily || "HelveticaNeue";

            var titleFontSize = options.ios.titleFontSize || 16;
            var summaryFontSize = options.ios.summaryFontSize || 14;
            var creditFontSize = options.ios.creditFontSize || 14;
            
            var titleColor = options.ios.titleColor.ios || new Color("white").ios;
            var summaryColor = options.ios.summaryColor.ios || new Color("lightgray").ios;
            var creditColor = options.ios.creditColor.ios || new Color("gray").ios;

            if(imageItem.imageURL)
                imageToAdd.image = imageFromURL(imageItem.imageURL);
            else
                imageToAdd.image = imageItem.image;

            imageToAdd.attributedCaptionTitle = attributedString(imageItem.title, titleColor, fontFamily, titleFontSize);
            imageToAdd.attributedCaptionSummary = attributedString(imageItem.summary, summaryColor, fontFamily, summaryFontSize);
            imageToAdd.attributedCaptionCredit = attributedString(imageItem.credit, creditColor, fontFamily, creditFontSize);
        }
        else if(typeof imageItem === 'string'){
            imageToAdd.image = imageFromURL(imageItem);
        }

        photosArray.addObject(imageToAdd);
    });

    this._iosDatasource = NYTPhotoViewerArrayDataSource.dataSourceWithPhotos(photosArray);

    let self: any = topmost().ios;
    let photosViewController = NYTPhotosViewController.alloc().initWithDataSourceInitialPhotoIndexDelegate(this._iosDatasource, startIndex, self);
    topmost().viewController.presentViewControllerAnimatedCompletion(photosViewController, true, iosCompletionCallback);

    this._ios = photosViewController;
}

declare const NSAttributedString: any;
function attributedString(text: string, color: UIColor, fontFamily: string, fontSize: number): NSAttributedString {
    var attributeOptions = {
        [NSForegroundColorAttributeName]: color,
        [NSFontAttributeName]: UIFont.fontWithNameSize(fontFamily, fontSize)
    };

    return NSAttributedString.alloc().initWithStringAttributes(text || "", attributeOptions);
};
function imageFromURL(imageURL: string): UIImage{
    var nsURL = NSURL.URLWithString(imageURL);
    var imageData = NSData.dataWithContentsOfURL(nsURL);
    var nativeImage = UIImage.imageWithData(imageData);
    return nativeImage;
};


class NYTImage extends NSObject implements NYTPhoto {
    attributedCaptionCredit: NSAttributedString;
    attributedCaptionSummary: NSAttributedString;
    attributedCaptionTitle: NSAttributedString;
    image: UIImage;
    imageData: NSData;
    placeholderImage: UIImage;
}

/**
 * (iOS only) - Custom NYTPhoto object to add photo & metadata (title, summary, credits...)
 */
export class NYTPhotoItem {
    /**
     * Raw UIImage for main photo
     */
    image?: UIImage;

    /**
     * Raw UIImage for placeholder image
     */
    placeholderImage: UIImage;

    /**
     * Image URL for main photo
     */
    imageURL?: string;

    /**
     * Image title (first row)
     */
    title?: string;

    /**
     * Image summary (second row)
     */
    summary?: string;

    /**
     * Image credits (third row)
     */
    credit?: string;
}