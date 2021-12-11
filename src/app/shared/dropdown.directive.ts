import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Renderer2,
} from "@angular/core";

@Directive({ selector: "[appDropdown]" })
export class DropdownDirective {
  @HostBinding("class.show") isOpen = false;
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
    let span = this.el.nativeElement.querySelector(".dropdown-menu");
    this.isOpen
      ? this.renderer.addClass(span, "show")
      : this.renderer.removeClass(span, "show");
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
