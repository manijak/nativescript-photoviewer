[![npm](https://img.shields.io/npm/v/nativescript-photoviewer.svg)](https://www.npmjs.com/package/nativescript-photoviewer)
[![npm](https://img.shields.io/npm/dt/nativescript-photoviewer.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-photoviewer)

# NativeScript PhotoViewer
A simple photo-viewer/gallery component for NativeScript.

**BREAKING CHANGES AS OF VERSION 2.0.0** - Read below for the new instructions

## Limitations
 
Since the plugin is based on two different libraries for two different platforms their features are also somewhat diferent:

Platform | Remote images (url) | Local images (resource) | Titles/Credits | Album View | Color Palette
--- | --- | --- | --- | --- | --- |
iOS | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x:
Android | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_check_mark: | :heavy_check_mark: 

*If anyone has tips on a better android library that has same or similar features to the iOS, let us know.*

## Installation
Run  `tns plugin add nativescript-photoviewer` in your root directory of your project.

## Usage
It's best to take a look at the included demo app(s) for advanced usages. Below is just a simple example on how to get the plugin running with minimal effort using vanilla nativescript (ts). For Angular, see `demo-ng`.

```typescript
// Include the module
import { PhotoViewer, PhotoViewerOptions, PaletteType, NYTPhotoItem } from "nativescript-photoviewer";
var photoViewer: PhotoViewer; 

// Create a new instace of PhotoViewer in the onLoaded event. Very important to do the init here! 
export function pageLoaded(args: EventData) {	
    photoViewer = new PhotoViewer();
}

// Show gallery
export function openGallery(args: EventData){

    let image1 = "https://blabla/image1.jpg";
    let image2 = "https://blabla/image2.jpg";
    let image3 = "https://blabla/image3.jpg";
    let image4 = "https://blabla/image4.jpg";
    let myImages = [image1, image2, image3, image4];

    // Example on how to use the options class (optional)
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
	
    photoViewer.showGallery(myImages, photoviewerOptions);
}
```

## Changelog

**2.1.5**
- Fix for iOS datasource issue (premature garbage collect) - caused images to dissapear when using gallery.

**2.1.1**
- Forgot to inlcude the photoviewer.d.ts file in the npm package. Add a reference to it in your `references.d.ts`.
- Added a vanilla js demo app `demo-js`.

**2.1.0**
- Fixed Android & iOS promise handling, will resolve properly now when gallery is closed (both in vanilla tns and Angular).
- Added Angular demo app `demo-ng`. 
- Known issue 1: Gallery does not work when opened from another modal.
- Known issue 2: When using Android Pie (9), for some reason, images don't appear untill you zoom (on simulator, not tested on real device).

**2.0.2**
- Code refactor to TypeScript, added typings.
- Renamed `showViewer()` to `showGallery()` that now has 1 mandatory param and 1 optional param.
- Fixed the issue where the image `datasource` would be GC'ed on iOS (important to init the plugin in the `onLoaded` event)
- Updated demo app to reflect the changes, added album demo for Android.
- Known issue: Gallery does not work when opened from another modal.

**1.5.0**
- Photo Viewer now works inside Modal Views, typo fix for 'completionCallback'. Big thanks to @Eonfuzz
- Fixed the iOS datasource to be more strong referenced & the _android ref. Big thanks to @miex0r
- Known issue: [iOS]If loading high-res images via urls, the images are being loaded **before** the gallery is shown. So the UI might freeze. A workaround for this could be to use the `completionCallback` and show a spinner when opening the gallery. 


**1.4.0**
- Moved param for index to a property: `startIndex`
- (iOS) Added property to set completionCallback
- (Android) Added option to show album first or go directly to fullscreen slides. More similar to iOS.
- (Android) Added property to set background color palette for fullscreen slides.
- Fixed demo app
- Changed license to MIT

**1.3.0**
- Updated iOS pod to newer version (fixed minor breaking changes)
- Added a second paramter to the `showViewer(ARRAY, INDEX?)` function. Makes the gallery init on that image: `photoViewer.showViewer(myImages,1);`


## Screenshots
![Demo PNG](/screenshots/ns-nytphoto-1.png) ![Demo PNG](/screenshots/ns-nytphoto-2.png)
![Demo PNG](/screenshots/photoview-android-1.png) ![Demo PNG](/screenshots/photoview-android-2.png)

## Contribution
I'll review & accept pull requests that improve the plugin and assign credit.


## Credits

The plugin is based on the following libraries:

iOS | Android
--- | --- 
[NYTPhotoViewer](https://github.com/NYTimes/NYTPhotoViewer) | [ImageGallery](https://github.com/lawloretienne/ImageGallery/)
