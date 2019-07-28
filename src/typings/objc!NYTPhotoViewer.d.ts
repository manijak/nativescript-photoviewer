
interface NYTPhoto extends NSObjectProtocol {

	attributedCaptionCredit: NSAttributedString;

	attributedCaptionSummary: NSAttributedString;

	attributedCaptionTitle: NSAttributedString;

	image: UIImage;

	imageData: NSData;

	placeholderImage: UIImage;
}
declare var NYTPhoto: {

	prototype: NYTPhoto;
};

declare class NYTPhotoCaptionView extends UIView implements NYTPhotoCaptionViewLayoutWidthHinting {

	static alloc(): NYTPhotoCaptionView; // inherited from NSObject

	static appearance(): NYTPhotoCaptionView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): NYTPhotoCaptionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NYTPhotoCaptionView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTPhotoCaptionView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NYTPhotoCaptionView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTPhotoCaptionView; // inherited from UIAppearance

	static new(): NYTPhotoCaptionView; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	preferredMaxLayoutWidth: number; // inherited from NYTPhotoCaptionViewLayoutWidthHinting

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { attributedTitle: NSAttributedString; attributedSummary: NSAttributedString; attributedCredit: NSAttributedString; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithAttributedTitleAttributedSummaryAttributedCredit(attributedTitle: NSAttributedString, attributedSummary: NSAttributedString, attributedCredit: NSAttributedString): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface NYTPhotoCaptionViewLayoutWidthHinting extends NSObjectProtocol {

	preferredMaxLayoutWidth: number;
}
declare var NYTPhotoCaptionViewLayoutWidthHinting: {

	prototype: NYTPhotoCaptionViewLayoutWidthHinting;
};

interface NYTPhotoContainer extends NSObjectProtocol {

	photo: NYTPhoto;
}
declare var NYTPhotoContainer: {

	prototype: NYTPhotoContainer;
};

declare class NYTPhotoDismissalInteractionController extends NSObject implements UIViewControllerInteractiveTransitioning {

	static alloc(): NYTPhotoDismissalInteractionController; // inherited from NSObject

	static new(): NYTPhotoDismissalInteractionController; // inherited from NSObject

	animator: UIViewControllerAnimatedTransitioning;

	shouldAnimateUsingAnimator: boolean;

	viewToHideWhenBeginningTransition: UIView;

	readonly completionCurve: UIViewAnimationCurve; // inherited from UIViewControllerInteractiveTransitioning

	readonly completionSpeed: number; // inherited from UIViewControllerInteractiveTransitioning

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly wantsInteractiveStart: boolean; // inherited from UIViewControllerInteractiveTransitioning

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	didPanWithPanGestureRecognizerViewToPanAnchorPoint(panGestureRecognizer: UIPanGestureRecognizer, viewToPan: UIView, anchorPoint: CGPoint): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	startInteractiveTransition(transitionContext: UIViewControllerContextTransitioning): void;
}

declare class NYTPhotoTransitionAnimator extends NSObject implements UIViewControllerAnimatedTransitioning {

	static alloc(): NYTPhotoTransitionAnimator; // inherited from NSObject

	static new(): NYTPhotoTransitionAnimator; // inherited from NSObject

	static newAnimationViewFromView(view: UIView): UIView;

	animationDurationEndingViewFadeInRatio: number;

	animationDurationFadeRatio: number;

	animationDurationStartingViewFadeOutRatio: number;

	animationDurationWithZooming: number;

	animationDurationWithoutZooming: number;

	dismissing: boolean;

	endingView: UIView;

	endingViewForAnimation: UIView;

	startingView: UIView;

	startingViewForAnimation: UIView;

	zoomingAnimationSpringDamping: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare class NYTPhotoTransitionController extends NSObject implements UIViewControllerTransitioningDelegate {

	static alloc(): NYTPhotoTransitionController; // inherited from NSObject

	static new(): NYTPhotoTransitionController; // inherited from NSObject

	endingView: UIView;

	forcesNonInteractiveDismissal: boolean;

	startingView: UIView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	didPanWithPanGestureRecognizerViewToPanAnchorPoint(panGestureRecognizer: UIPanGestureRecognizer, viewToPan: UIView, anchorPoint: CGPoint): void;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class NYTPhotoViewController extends UIViewController implements NYTPhotoContainer {

	static alloc(): NYTPhotoViewController; // inherited from NSObject

	static new(): NYTPhotoViewController; // inherited from NSObject

	delegate: NYTPhotoViewControllerDelegate;

	readonly doubleTapGestureRecognizer: UITapGestureRecognizer;

	readonly loadingView: UIView;

	readonly scalingImageView: NYTScalingImageView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly photo: NYTPhoto; // inherited from NYTPhotoContainer

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { photo: NYTPhoto; loadingView: UIView; notificationCenter: NSNotificationCenter; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithPhotoLoadingViewNotificationCenter(photo: NYTPhoto, loadingView: UIView, notificationCenter: NSNotificationCenter): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface NYTPhotoViewControllerDelegate extends NSObjectProtocol {

	photoViewControllerDidLongPressWithGestureRecognizer?(photoViewController: NYTPhotoViewController, longPressGestureRecognizer: UILongPressGestureRecognizer): void;
}
declare var NYTPhotoViewControllerDelegate: {

	prototype: NYTPhotoViewControllerDelegate;
};

declare var NYTPhotoViewControllerPhotoImageUpdatedNotification: string;

declare class NYTPhotoViewerArrayDataSource extends NSObject implements NSFastEnumeration, NYTPhotoViewerDataSource {

	static alloc(): NYTPhotoViewerArrayDataSource; // inherited from NSObject

	static dataSourceWithPhotos(photos: NSArray<NYTPhoto> | NYTPhoto[]): NYTPhotoViewerArrayDataSource;

	static new(): NYTPhotoViewerArrayDataSource; // inherited from NSObject

	readonly photos: NSArray<NYTPhoto>;

	readonly numberOfPhotos: number; // inherited from NYTPhotoViewerDataSource
	[index: number]: NYTPhoto;
	[Symbol.iterator](): Iterator<any>;

	constructor(o: { photos: NSArray<NYTPhoto> | NYTPhoto[]; });

	indexOfPhoto(photo: NYTPhoto): number;

	initWithPhotos(photos: NSArray<NYTPhoto> | NYTPhoto[]): this;

	objectAtIndexedSubscript(idx: number): NYTPhoto;

	photoAtIndex(photoIndex: number): NYTPhoto;
}

declare var NYTPhotoViewerCoreVersionNumber: number;

declare var NYTPhotoViewerCoreVersionString: interop.Reference<number>;

interface NYTPhotoViewerDataSource {

	numberOfPhotos: number;

	indexOfPhoto(photo: NYTPhoto): number;

	photoAtIndex(photoIndex: number): NYTPhoto;
}
declare var NYTPhotoViewerDataSource: {

	prototype: NYTPhotoViewerDataSource;
};

declare class NYTPhotoViewerSinglePhotoDataSource extends NSObject implements NYTPhotoViewerDataSource {

	static alloc(): NYTPhotoViewerSinglePhotoDataSource; // inherited from NSObject

	static dataSourceWithPhoto(photo: NYTPhoto): NYTPhotoViewerSinglePhotoDataSource;

	static new(): NYTPhotoViewerSinglePhotoDataSource; // inherited from NSObject

	readonly photo: NYTPhoto;

	readonly numberOfPhotos: number; // inherited from NYTPhotoViewerDataSource

	constructor(o: { photo: NYTPhoto; });

	indexOfPhoto(photo: NYTPhoto): number;

	initWithPhoto(photo: NYTPhoto): this;

	photoAtIndex(photoIndex: number): NYTPhoto;
}

declare var NYTPhotoViewerVersionNumber: number;

declare var NYTPhotoViewerVersionNumberVar: number;

declare var NYTPhotoViewerVersionString: interop.Reference<number>;

declare var NYTPhotoViewerVersionStringVar: interop.Reference<number>;

declare class NYTPhotosOverlayView extends UIView {

	static alloc(): NYTPhotosOverlayView; // inherited from NSObject

	static appearance(): NYTPhotosOverlayView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): NYTPhotosOverlayView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NYTPhotosOverlayView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTPhotosOverlayView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NYTPhotosOverlayView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTPhotosOverlayView; // inherited from UIAppearance

	static new(): NYTPhotosOverlayView; // inherited from NSObject

	captionView: UIView;

	captionViewRespectsSafeArea: boolean;

	leftBarButtonItem: UIBarButtonItem;

	leftBarButtonItems: NSArray<UIBarButtonItem>;

	readonly navigationBar: UINavigationBar;

	rightBarButtonItem: UIBarButtonItem;

	rightBarButtonItems: NSArray<UIBarButtonItem>;

	title: string;

	titleTextAttributes: NSDictionary<string, any>;
}

declare class NYTPhotosViewController extends UIViewController {

	static alloc(): NYTPhotosViewController; // inherited from NSObject

	static new(): NYTPhotosViewController; // inherited from NSObject

	readonly currentlyDisplayedPhoto: NYTPhoto;

	dataSource: NYTPhotoViewerDataSource;

	delegate: NYTPhotosViewControllerDelegate;

	leftBarButtonItem: UIBarButtonItem;

	leftBarButtonItems: NSArray<UIBarButtonItem>;

	readonly overlayView: NYTPhotosOverlayView;

	readonly pageViewController: UIPageViewController;

	readonly panGestureRecognizer: UIPanGestureRecognizer;

	rightBarButtonItem: UIBarButtonItem;

	rightBarButtonItems: NSArray<UIBarButtonItem>;

	readonly singleTapGestureRecognizer: UITapGestureRecognizer;

	constructor(o: { dataSource: NYTPhotoViewerDataSource; });

	constructor(o: { dataSource: NYTPhotoViewerDataSource; initialPhoto: NYTPhoto; delegate: NYTPhotosViewControllerDelegate; });

	constructor(o: { dataSource: NYTPhotoViewerDataSource; initialPhotoIndex: number; delegate: NYTPhotosViewControllerDelegate; });

	displayPhotoAnimated(photo: NYTPhoto, animated: boolean): void;

	initWithDataSource(dataSource: NYTPhotoViewerDataSource): this;

	initWithDataSourceInitialPhotoDelegate(dataSource: NYTPhotoViewerDataSource, initialPhoto: NYTPhoto, delegate: NYTPhotosViewControllerDelegate): this;

	initWithDataSourceInitialPhotoIndexDelegate(dataSource: NYTPhotoViewerDataSource, initialPhotoIndex: number, delegate: NYTPhotosViewControllerDelegate): this;

	reloadPhotosAnimated(animated: boolean): void;

	updatePhoto(photo: NYTPhoto): void;

	updatePhotoAtIndex(photoIndex: number): void;
}

interface NYTPhotosViewControllerDelegate extends NSObjectProtocol {

	photosViewControllerActionCompletedWithActivityType?(photosViewController: NYTPhotosViewController, activityType: string): void;

	photosViewControllerCaptionViewForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): UIView;

	photosViewControllerCaptionViewRespectsSafeAreaForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): boolean;

	photosViewControllerDidDismiss?(photosViewController: NYTPhotosViewController): void;

	photosViewControllerDidNavigateToPhotoAtIndex?(photosViewController: NYTPhotosViewController, photo: NYTPhoto, photoIndex: number): void;

	photosViewControllerHandleActionButtonTappedForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): boolean;

	photosViewControllerHandleLongPressForPhotoWithGestureRecognizer?(photosViewController: NYTPhotosViewController, photo: NYTPhoto, longPressGestureRecognizer: UILongPressGestureRecognizer): boolean;

	photosViewControllerLoadingViewForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): UIView;

	photosViewControllerMaximumZoomScaleForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): number;

	photosViewControllerReferenceViewForPhoto?(photosViewController: NYTPhotosViewController, photo: NYTPhoto): UIView;

	photosViewControllerTitleForPhotoAtIndexTotalPhotoCount?(photosViewController: NYTPhotosViewController, photo: NYTPhoto, photoIndex: number, totalPhotoCount: number): string;

	photosViewControllerWillDismiss?(photosViewController: NYTPhotosViewController): void;
}
declare var NYTPhotosViewControllerDelegate: {

	prototype: NYTPhotosViewControllerDelegate;
};

declare var NYTPhotosViewControllerDidDismissNotification: string;

declare var NYTPhotosViewControllerDidNavigateToPhotoNotification: string;

declare var NYTPhotosViewControllerWillDismissNotification: string;

declare class NYTScalingImageView extends UIScrollView {

	static alloc(): NYTScalingImageView; // inherited from NSObject

	static appearance(): NYTScalingImageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): NYTScalingImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NYTScalingImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTScalingImageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NYTScalingImageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): NYTScalingImageView; // inherited from UIAppearance

	static new(): NYTScalingImageView; // inherited from NSObject

	readonly imageView: FLAnimatedImageView;

	constructor(o: { imageData: NSData; frame: CGRect; });

	constructor(o: { image: UIImage; frame: CGRect; });

	centerScrollViewContents(): void;

	initWithImageDataFrame(imageData: NSData, frame: CGRect): this;

	initWithImageFrame(image: UIImage, frame: CGRect): this;

	updateImage(image: UIImage): void;

	updateImageData(imageData: NSData): void;
}
