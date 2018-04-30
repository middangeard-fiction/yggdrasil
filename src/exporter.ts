import { Canvas } from "./drawing/canvas";
import { App } from "./app";
import { View } from "./views/view";
import { ViewFactory } from "./views/viewFactory";
import { BlockView } from "./views/blockView";
import { ConnectorView } from "./views/connectorView";
import { RoomView } from "./views/roomView";
import { NoteView } from "./views/noteView";

export class Exporter {
  private canvasElem: HTMLCanvasElement;
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private views: Array<View>;
  private left: number;
  private top: number;
  private width: number;
  private height: number;

  public constructor() {
    this.canvasElem = <HTMLCanvasElement> document.getElementById('export');
    this.ctx = this.canvasElem.getContext('2d')
    this.canvas = new Canvas(this.ctx);

    this.left = 0;
    this.top = 0;
    this.width = 100;
    this.height = 100;
  }

  //
  // Render all views to the export canvas, either with a transparent
  // background (for margin testing) or with a solid background.
  // 
  private render(withBackground: boolean) {
    this.canvasElem.width = this.width;
    this.canvasElem.height = this.height;

    this.canvas.save();

    if(withBackground) {
      this.canvas
        .fillStyle(App.map.settings.grid.background)
        .fillRect(0, 0, this.width, this.height);
    } else {
      this.canvas
      .clearRect(0, 0, this.width, this.height);
    }

    this.canvas.translate(this.left, this.top);      

    // Draw all blocks:
    this.views.forEach(view => {
      if(view instanceof BlockView) {
        view.draw(this.canvas, false);
      }
    });

    // Draw all connectors:
    this.views.forEach(view => {
      if(view instanceof ConnectorView) {
        view.draw(this.canvas, false);
      }
    });

    // Draw all rooms and notes:
    this.views.forEach(view => {
      if(view instanceof RoomView || view instanceof NoteView) {
        view.draw(this.canvas, false);
      }
    });

    this.canvas.restore();
  }

  // 
  // If there is no whitespace at the top, return true.
  // 
  private hasPixelsTop() {
    var myImageData = this.ctx.getImageData(0, 0, this.width, 1);
    for(let i = 0; i < this.width; i++) {
      if(myImageData.data[i * 4 + 3] > 0) return true;
    }
    return false;
  }

  // 
  // If there is no whitespace at the bottom, return true.
  //   
  private hasPixelsBottom() {
    var myImageData = this.ctx.getImageData(0, this.height - 1, this.width, 1);
    for(let i = 0; i < this.width; i++) {
      if(myImageData.data[i * 4 + 3] > 0) return true;
    }
    return false;    
  }

  // 
  // If there is no whitespace on the left, return true.
  //   
  private hasPixelsLeft() {
    var myImageData = this.ctx.getImageData(0, 0, 1, this.height);
    for(let i = 0; i < this.height; i++) {
      if(myImageData.data[i * 4 + 3] > 0) return true;
    }
    return false;        
  }

  // 
  // If there is no whitespace on the right, return true.
  //   
  private hasPixelsRight() {
    var myImageData = this.ctx.getImageData(this.width - 1, 0, 1, this.height);
    for(let i = 0; i < this.height; i++) {
      if(myImageData.data[i * 4 + 3] > 0) return true;
    }
    return false;        
  }  

  // 
  // Export the current map to a PNG file, which is offered
  // for download.
  // 
  public export() {
    // Create views for all models.
    this.views = new Array<View>();
    App.map.elements.forEach((model) => {
      this.views.push(ViewFactory.create(model));
    });

    do {
      this.render(false);
      var hasTop = this.hasPixelsTop();
      var hasBottom = this.hasPixelsBottom();
      var hasRight = this.hasPixelsRight();
      var hasLeft = this.hasPixelsLeft();

      if(hasTop) {
        this.top += 50;
        this.height += 50;
      }
      if(hasBottom) {
        this.height += 50;
      }
      if(hasLeft) {
        this.left += 50;
        this.width += 50;
      }
      if(hasRight) {
        this.width += 50;
      }

    } while(hasTop || hasBottom || hasRight || hasLeft);
    
    // Do a final render with solid background:
    this.render(true);

    // Download result blob:
    this.downloadAsBlob();
  }

  // 
  // Convert the canvas contents to a blob and download it.
  // 
  private downloadAsBlob() {
    // Create blob. The browser takes a callback function for this:
    let blob = this.toBlob((blob) => { this.downloadAsBlobCallback(blob) }, "image/png", 1);
  }

  private downloadAsBlobCallback(blob: Blob) {
    // Create filename based on map title:
    let title = App.map.title;
    if(!title) title = "untitled";
    // IE supports msSaveBlob:
    if(navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, `${title}.png`);
    } 
    // Other browsers create a temporary link with the blob as URL,
    // click it, and then remove it.
    else {
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = `${title}.png`;
      document.body.appendChild(a);
      a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }
  }
  
  //
  // Some browsers have a toBlob method on the Canvas element, but
  // IE does not. This is a low-performance polyfill for browsers
  // that don't support the toBlob method.
  // (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
  // 
  private toBlob(callback: (blob: Blob) => void, type: string, quality: 1) {
    if(this.canvasElem.toBlob) {
      return this.canvasElem.toBlob(callback, type, quality);
    } else {
      let canv = this.canvasElem;
      setTimeout(function() {
        let binStr = atob(canv.toDataURL(type, quality).split(',')[1] );
        let len = binStr.length;
        let arr = new Uint8Array(len);
        for (var i = 0; i < len; i++ ) {
          arr[i] = binStr.charCodeAt(i);
        }
        callback(new Blob( [arr], {type: type || 'image/png'} ));
      });
    }
  }
}