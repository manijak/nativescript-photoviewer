# NativeScript NYTPhotoViewer
A simple, iOS, Image/Photo-viewer component for NativeScript based on the NYTPhotoViewer cocoapod: http://cocoadocs.org/docsets/NYTPhotoViewer/1.1.0/index.html

NYTPhotoViewer is a slideshow and image viewer that includes double-tap to zoom, captions, support for multiple images, interactive flick to dismiss, animated zooming presentation, and more.

## Installation
Run ```tns plugin add nativescript-nytphotoviewer``` in your ROOT directory of your project.

## Limitations
Currently no Android support, only iOS. If anyone is interested creating a Android version, feel free to do so.

## Usage

```js
// Simple usage with array of image-urls. See the Demo app for more advanced examples where you can add title and summary. 
var NYTPhotoViewer = require("nativescript-nytphotoviewer");
var image1 = "https://somepage.com/image01.jpg";
var image2 = "https://somepage.com/image02.jpg";
var image3 = "https://somepage.com/image03.jpg";
var myImages = [image1, image2, image3];

if(!photoViewer)
    photoViewer = new NYTPhotoViewer();
photoViewer.showViewer(myImages);
```

## Screenshots
![Demo PNG](ns-nytphoto-1.png) ![Demo PNG](ns-nytphoto-2.png)

## Authors
Nedim Erkocevic

## Help
I will accept pull requests that improve this and assign credit. All code needs to be Apache 2.0 licensed.