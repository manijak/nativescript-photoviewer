# NativeScript PhotoViewer
A simple image-viewer/gallery component for NativeScript. 

iOS | Android
--- | --- 
[NYTPhotoViewer](http://cocoadocs.org/docsets/NYTPhotoViewer/1.1.0/index.html) | [ImageGallery](https://github.com/lawloretienne/ImageGallery/)


Since the plugin is based on two different libraries for two different platforms their features are also somewhat diferent:

"NYTPhotoViewer" (iOS) is a slideshow and image viewer that includes double-tap to zoom, captions, support for multiple images, interactive flick to dismiss, animated zooming presentation, and more.

"ImageGallery" (Android) is a gallery used to host an array of external images (array of urls). It supports multiple images, double-tap to zoom and a gallery view. 

## Installation
Run  `npm i nativescript-photoviewer` in your ROOT directory of your project.

## Limitations
Captions only available on iOS. Android only supports array of string urls as datasource. 

## Usage
The usage is very simple. Require "nativescript-photoviewer" module and create a instance of it. Call the `showViewer(array)` function to present the photoViewer. 
The `showViewer(ARRAY)` function accepts a two parameters on iOS and one on Android. The first one is allways an Array. The Array can contain one, or a mixture, of the following types:
- String URLs that point to external images (iOS & Android)
- Custom defined objects that contain image-data (image/imageURL, title, summary, credit) (iOS only)
- Objects that conform to the `NYTPhoto` protocol (see the cocoapod documentation for more info - very similar to the above option) (iOS only)

When using the second option, properties that one can use are defined below in the second example. The `image` conforms to the UIImage object, while the `imageURL` is a string containing the URL of the image. If `imageURL` is set, then `image` is ignored. 
You can also customize fontFamily, fontSize and color of the caption texts (iOS). FontFamily applies to all captions, size and color are caption-specific.  

**Properties Android (Optional):**
- `startIndex` (number): Optional index to start the gallery from (Fullscreen Image gallery only)
- `showAlbum` (boolean): Set to `true` if you want to show the album first, otherwise `false` if you want to show fullscreen slides directly. 
- `paletteType` (string): Optional string value telling the fullscreen image gallery what type of background color palette to use (`VIBRANT`, `LIGHT_VIBRANT`, `DARK_VIBRANT`, `MUTED`, `LIGHT_MUTED`, `DARK_MUTED`)

**Properties iOS (Optional):**
- `startIndex`: Optional index to start the gallery from (Fullscreen Image gallery only)
- `completitionCallback` Optional function to run after the gallery has done loading images and is showing
- `fontFamily` (string): Font familiy to use for caption and titles
- `titleFontSize` (number): Font-size for title
- `summaryFontSize` (number): Font-size for summary-title
- `creditFontSize` (number): Font-size for credits
- `titleColor` (UIColor): Title color
- `summaryColor` (UIColor): Summary-title color
- `creditColor` (UIColor): Credits color

**Methods:**
- `showViewer(array)`: Method to call when you want to show the gallery. Mandatory param is an array of image urls or a custom image-object (iOS).

```js
// Require the module
var PhotoViewer = require("nativescript-photoviewer");
photoViewer = new PhotoViewer();

// Caption font-style settings (optional - iOS only)
photoViewer.fontFamily = "Avenir-Roman";
photoViewer.titleFontSize = 20;
photoViewer.summaryFontSize = 16;
photoViewer.creditFontSize = 14;
photoViewer.titleColor = new colorModule.Color("#fff").ios;
photoViewer.summaryColor = new colorModule.Color("#99813c").ios;
photoViewer.creditColor = new colorModule.Color("#fed700").ios;

photoViewer.completitionCallback = galleryLoaded; // iOS only
photoViewer.paletteType = "LIGHT_MUTED"; // Android only
photoViewer.showAlbum = false; // Android only (true = shows album first, false = shows fullscreen gallery directly)
photoViewer.startIndex = 0; // start index for the fullscreen gallery

// Image from object (iOS only)
var testImage1 = {
    imageURL: "https://somepage.com/image01.jpg",
    title: "Image 1 title",
    summary: "Image 1 summary",
    credit: "Telerik"
};
var testImage2 = {
    imageURL: "https://somepage.com/image01.jpg",
    title: "Image 2 title",
    summary: "Image 2 summary",
    credit: "Telerik"
};

//Image from URLs (Android & iOS)
var imageFromURL1 = "https://somepage.com/image01.jpg";
var imageFromURL2 = "https://somepage.com/image02.jpg";

// Add to array and pass to showViewer
var myImages = [testImage1, testImage2, imageFromURL1, imageFromURL2];
photoViewer.showViewer(myImages);

function galleryShowing(){
    console.log(`gallery Loaded`);
}
```

## Changelog
**1.4.0**
- Moved param for index to a property: `startIndex`
- (iOS) Added property to set completitionCallback
- (Android) Added option to show album first or go directly to fullscreen slides. More similar to iOS.
- (Android) Added property to set background color palette for fullscreen slides.
- Fixed demo app
- Changed license to MIT

**1.3.0**
- Updated iOS pod to newer version (fixed minor breaking changes)
- Added a second paramter to the `showViewer(ARRAY, INDEX?)` function. Makes the gallery init on that image: `photoViewer.showViewer(myImages,1);`


## Screenshots
![Demo PNG](ns-nytphoto-1.png) ![Demo PNG](ns-nytphoto-2.png)
![Demo PNG](photoview-android-1.png) ![Demo PNG](photoview-android-2.png)

## Help
I will accept pull requests that improve this and assign credit.
