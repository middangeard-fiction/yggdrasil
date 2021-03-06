//
// This is a base class for custom HTML elements. To instantiate,
// you pass in either an HTML element, or a selector string. 
// With a selector string, you can also provide a base element
// that querySelector will run on.
// 
export class Control {
  protected elem: HTMLElement;

  constructor(elem: HTMLElement|string, base?: HTMLElement) {
    if(elem instanceof HTMLElement) {
      this.elem = elem;
    } else {
      if(!base){
        this.elem = document.querySelector(elem)
      } else {
        this.elem = base.querySelector(elem);
      }      
    }
    if(!this.elem) {
      throw(`Failed to instantiate control: element or selector ${elem} not found in DOM.`);
    }  
  }

  public show = () => {
    this.elem.style.display = 'block';
  }

  public hide = () => {
    this.elem.style.display = 'none';
  }

  public setVisible = (visible:boolean) => {
    if(visible) {
      this.show();
    } else {
      this.hide();
    }
  }
}