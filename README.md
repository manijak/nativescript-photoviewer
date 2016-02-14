# NativeScript PhotoViewer
A simple, iOS, Image/Photo-viewer component for NativeScript based on the NYTPhotoViewer pod: http://cocoadocs.org/docsets/NYTPhotoViewer/1.1.0/index.html

NYTPhotoViewer is a slideshow and image viewer that includes double-tap to zoom, captions, support for multiple images, interactive flick to dismiss, animated zooming presentation, and more.

## Installation
Run  ```npm i nativescript-photoviewer``` in your ROOT directory of your project.

## Limitations
Currently no Android support, only iOS. If anyone is interested creating a Android version, feel free to do so.

## Usage
The usage is very simple. Require "nativescript-photoviewer" module and create a instance of it. Call the ```showViewer(array)``` function to present the photoViewer. 
The ```showViewer()``` function accept a singe parameter, an array. The array can contain one, or a mixture, of the following types:
- String URLs that point to external images
- Custom defined objects that contain image-data (image/imageURL, title, summary, credit)
- Objects that conform to the ```NYTPhoto``` protocol (see the cocoapod documentation for more info - very similar to the above option)

When using the second option, properties that one can use are defined below in the second example. The ```image``` conforms to the UIImage object, while the ```imageURL``` is a string containing the URL of the image.
If ```imageURL``` is set, then ```image``` is ignored. You can also customize fontFamily, fontSize and color of the caption texts. FontFamily applies to all captions, size and color are caption-specific.  

```js
// Require the module
var PhotoViewer = require("nativescript-photoviewer");

// Caption font-style settings (optional)
photoViewer = new PhotoViewer();
photoViewer.fontFamily = "Avenir-Roman";
photoViewer.titleFontSize = 20;
photoViewer.summaryFontSize = 16;
photoViewer.creditFontSize = 14;
photoViewer.titleColor = UIColor.whiteColor();
photoViewer.summaryColor = UIColor.brownColor();
photoViewer.creditColor = UIColor.orangeColor();

// Image from object
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

//Image from URLs
var imageFromURL1 = "https://somepage.com/image01.jpg";
var imageFromURL2 = "https://somepage.com/image02.jpg";

// Add to array and pass to showViewer
var myImages = [testImage1, testImage2, imageFromURL1, imageFromURL2];
photoViewer.showViewer(myImages);
```

## Screenshots
![Demo PNG](ns-nytphoto-1.png) ![Demo PNG](ns-nytphoto-2.png)

## Authors
Nedim Erkocevic

## Help
I will accept pull requests that improve this and assign credit. All code needs to be Apache 2.0 licensed.