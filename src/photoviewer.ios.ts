import { PhotoViewerOptions, NYTPhotoItem, PhotoViewer as PhotoViewerBase } from ".";
import { Color, Frame, Utils, ImageSource } from "@nativescript/core";

import { PaletteType } from "./photoviewer.common";
export * from './photoviewer.common';

declare const NSAttributedString: any;
var _dataSource: NYTPhotoViewerArrayDataSource;
const background_queue = dispatch_get_global_queue(qos_class_t.QOS_CLASS_DEFAULT, 0);
const main_queue = dispatch_get_current_queue();
export class PhotoViewer implements PhotoViewerBase {

    public nativeView;
    private _delegate: PhotoViewerDelegateImpl;
    private _finishedLoading: boolean = false;
    private _didReload: boolean = false;
    constructor() {
        let photosArray = [];
        _dataSource = NYTPhotoViewerArrayDataSource.alloc().initWithPhotos(photosArray);
     }

    get ios(): any {
        return this.nativeView;
    }

    public showGallery(imagesArray: Array<string | NYTPhotoItem>, options?: PhotoViewerOptions) {

        if(!options)
            options = {};
        if(!options.ios)
            options.ios = {};
        if(!options.android)
            options.android = {};

        let photosArray = [];
        let startIndex: number = options.startIndex || 0;
        let iosCompletionCallback = options.ios.completionCallback || null;
    
        imagesArray.forEach((imageItem: string | NYTPhotoItem, index) => {
    
            let imageToAdd = NYTImage.alloc().init() as NYTImage;
    
            let fontFamily = options.ios.fontFamily || "HelveticaNeue";
            let titleFontSize = options.ios.titleFontSize || 16;
            let summaryFontSize = options.ios.summaryFontSize || 14;
            let creditFontSize = options.ios.creditFontSize || 14;
            
            let titleColor = options.ios.titleColor || new Color("white").ios;
            let summaryColor = options.ios.summaryColor || new Color("lightgray").ios;
            let creditColor = options.ios.creditColor || new Color("gray").ios;
    
            if(isNYTPhotoItem(imageItem)){
                //console.log("received photoItem", imageItem);    
                if(imageItem.imageURL)
                    dispatch_async(background_queue, ()=>{
                        imageToAdd.image = getUIImage(imageItem.imageURL); /** string URL to UIImage */
                        if(index == imagesArray.length - 1){
                            dispatch_async(main_queue, ()=>{
                                this._finishedLoading = true;
                                if(this.nativeView){
                                    this.nativeView.reloadPhotosAnimated(false);
                                    this._didReload = true;
                                }
                            })
                        }
                    });
                else
                    imageToAdd.image = imageItem.image; /** UIImage */
                
                imageToAdd.placeholderImage = imageItem.placeholderImage;
                imageToAdd.attributedCaptionTitle = this.attributedString(imageItem.title, titleColor, fontFamily, titleFontSize);
                imageToAdd.attributedCaptionSummary = this.attributedString(imageItem.summary, summaryColor, fontFamily, summaryFontSize);
                imageToAdd.attributedCaptionCredit = this.attributedString(imageItem.credit, creditColor, fontFamily, creditFontSize);
            }
            else if(typeof imageItem === 'string'){
                dispatch_async(background_queue, ()=>{
                    let img = getUIImage(imageItem);
                    imageToAdd.image = img;
                    if(index == imagesArray.length - 1){
                        dispatch_async(main_queue, ()=>{
                            this._finishedLoading = true;
                            if(this.nativeView){
                                this.nativeView.reloadPhotosAnimated(false);
                                this._didReload = true;
                            }
                        })
                    }
                });
            }
            else{
                console.log("ERROR: Passed object is not a image path/url or NYTPhotoItem object!", imageItem);
            }

            photosArray.push(imageToAdd);
        });

        _dataSource = NYTPhotoViewerArrayDataSource.alloc().initWithPhotos(photosArray);
        this.nativeView = NYTPhotosViewController.alloc().initWithDataSourceInitialPhotoIndexDelegate(_dataSource, startIndex, null);
        // gonna trigger reload just in case if for some the images finished loading early
        if(!this._didReload && this._finishedLoading){
            if(!NSThread.isMainThread){
                dispatch_async(main_queue, ()=>{
                    this.nativeView.reloadPhotosAnimated(false);
                    this._didReload = true;
                })
            }else {
                this.nativeView.reloadPhotosAnimated(false);
                this._didReload = true;
            }
        }
        if(options.ios.showShareButton == false){
            this.nativeView.rightBarButtonItem = null;
        }
        
        this.topViewController.presentViewControllerAnimatedCompletion(this.nativeView, true, iosCompletionCallback);

        return new Promise<void>((resolve) => {
            this._delegate = PhotoViewerDelegateImpl.initWithResolve(resolve);
            this.nativeView.delegate = this._delegate;
        });
    }

    private attributedString(text: string, color: UIColor, fontFamily: string, fontSize: number): NSAttributedString {
        var attributeOptions = {
            [NSForegroundColorAttributeName]: color,
            [NSFontAttributeName]: UIFont.fontWithNameSize(fontFamily, fontSize)
        };
    
        return NSAttributedString.alloc().initWithStringAttributes(text || "", attributeOptions);
    }

    
      private static get rootViewController(): UIViewController | undefined {
        const keyWindow = UIApplication.sharedApplication.keyWindow;
        return keyWindow != null ? keyWindow.rootViewController : undefined;
      }
    
      private get topViewController(): UIViewController | undefined {
        const root = PhotoViewer.rootViewController;
        if (root == null) {
          return undefined;
        }
        return this.findTopViewController(root);
      }
    
      private findTopViewController(
        root: UIViewController
      ): UIViewController | undefined {
        const presented = root.presentedViewController;
        if (presented != null) {
          return this.findTopViewController(presented);
        }
        if (root instanceof UISplitViewController) {
          const last = root.viewControllers.lastObject;
          if (last == null) {
            return root;
          }
          return this.findTopViewController(last);
        } else if (root instanceof UINavigationController) {
          const top = root.topViewController;
          if (top == null) {
            return root;
          }
          return this.findTopViewController(top);
        } else if (root instanceof UITabBarController) {
          const selected = root.selectedViewController;
          if (selected == null) {
            return root;
          }
          return this.findTopViewController(selected);
        } else {
          return root;
        }
      }
}


function getImageData(imageURL: string): NSData {
    let nsURL = NSURL.URLWithString(imageURL);
    return NSData.dataWithContentsOfURL(nsURL);
}

function getUIImage(imageURL: string): UIImage {
    if(Utils.isFileOrResourcePath(imageURL)){
        return ImageSource.fromFileOrResourceSync(imageURL).ios;
    }
    else{
        //console.log("URL: ", imageURL);
        let nsURL = NSURL.URLWithString(imageURL);
        let imageData = NSData.dataWithContentsOfURL(nsURL);
        return UIImage.imageWithData(imageData);
    }
}

function isNYTPhotoItem(item: any): item is NYTPhotoItem {
    return typeof item.image === 'object' || typeof item.imageURL === 'string';
}

@NativeClass()
class NYTImage extends NSObject implements NYTPhoto {
    public static ObjCProtocols = [NYTPhoto];
    private _image;
    private _imageData;
    private _placeholderImage;
    private _attributedCaptionTitle;
    private _attributedCaptionSummary;
    private _attributedCaptionCredit;
    get image() { return this._image; }
    set image(value) { this._image = value; }

    get imageData() { return this._imageData; }
    set imageData(value) { this._imageData = value; }

    get placeholderImage() { return this._placeholderImage; }
    set placeholderImage(value) { this._placeholderImage = value; }

    get attributedCaptionTitle() { return this._attributedCaptionTitle; }
    set attributedCaptionTitle(value) { this._attributedCaptionTitle = value; }

    get attributedCaptionSummary() { return this._attributedCaptionSummary; }
    set attributedCaptionSummary(value) { this._attributedCaptionSummary = value; }

    get attributedCaptionCredit() { return this._attributedCaptionCredit; }
    set attributedCaptionCredit(value) { this._attributedCaptionCredit = value; }
}


@NativeClass()
class PhotoViewerDelegateImpl extends NSObject implements NYTPhotosViewControllerDelegate {
    public static ObjCProtocols = [NYTPhotosViewControllerDelegate];
    private _resolve: () => void;

    public static initWithResolve(resolve: () => void): PhotoViewerDelegateImpl {
        const delegate = PhotoViewerDelegateImpl.new() as PhotoViewerDelegateImpl;
        delegate._resolve = resolve;
        return delegate;
    }
    

    public photosViewControllerDidDismiss(photosViewController: NYTPhotosViewController) {
        this._resolve();
    }
}