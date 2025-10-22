import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
  
    @Input()
    title: string = "";
    @Input()
    imageWidth: number = 250;
    @Input()
    croppedImage:any ;
    @Input()
    fileName:string ="";

    @Output() 
    resultImage: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    isShowDeleteButton:boolean = false;

    @Output() 
    viewImage: EventEmitter<any> = new EventEmitter<any>();

    @Output() 
    onRemoveImage: EventEmitter<any> = new EventEmitter<any>();

    constructor(){}
    ngOnInit(): void {

      
    }
    imageChangedEvent: any = '';
    //croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        let selectedFiles = (event.target as HTMLInputElement);
        if(selectedFiles!=undefined && selectedFiles.files.length>0){
            debugger;
            const file = (event.target as HTMLInputElement).files[0];
            this.fileName = file.name;
        }
    }

    imageCropped(event: ImageCroppedEvent | any) {
        this.croppedImage = event.base64;
        this.resultImage.next({data:this.croppedImage, fileName: this.fileName});
        // console.log(event, base64ToFile(event.base64));
    }

    viewImageUrl(){
        this.viewImage.next(this.croppedImage);
    }

    imageLoaded() {
        this.showCropper = true;
        // console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        // console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        // console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        // this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }


    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    removeImage() {
        this.croppedImage = "";
        this.onRemoveImage.next(this.croppedImage)
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }
}
