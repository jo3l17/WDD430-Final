import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
    selector: '[clickEdit]'
})
export class ClickEditDirective {

    @Input() canEdit: boolean = true;  // Whether the text should be editable or not.
    @Input() multiline: boolean = false; // Whether pressing enter should create a newline.
    @Input() contentId: number | undefined;    //  Need to reference the identifier of the change.
    @Input() contentLabel: string | undefined; // Use this input to indicate what field is being changed.
    @Input() contentClass: string = 'editing'   // Use this to add new classes during editing.

    @Output() onContentChange: EventEmitter<any> = new EventEmitter();

    @HostListener('click', [('$event')]) onClicked() {
        if (this.canEdit) {
            this.makeEditable();
        }
    }

    @HostListener('blur') onBlurred() {
        this.compareContents();
    }

    @HostListener('keydown', [('$event')]) onKeyPressed(ev:any) {
        if (ev.keyCode === 13 && !this.multiline) {    // Enter key
            ev.preventDefault();
            this.compareContents();
        }
    }

    private originalContent: string | undefined;

    constructor(
        private _elementRef: ElementRef,    // Reference of the target element.
        private _renderer2: Renderer2   // Used to update the element without accessing the DOM directly.
    ) {}

    private makeEditable(): void {
        this._renderer2.addClass(this._elementRef.nativeElement, this.contentClass);
        this._renderer2.setAttribute(this._elementRef.nativeElement, 'contentEditable', 'true');
        this._elementRef.nativeElement.focus();
        this.originalContent = this._elementRef.nativeElement.innerText;
    }

    private compareContents(): void {
        const MODIFIED_CONTENT: any = this._elementRef.nativeElement.innerText;

        if(MODIFIED_CONTENT !== this.originalContent) {
            const EDIT: any = {
                contentId: this.contentId,
                contentLabel: this.contentLabel,
                oldValue: this.originalContent,
                newValue: MODIFIED_CONTENT
            }

            this.onContentChange.emit(EDIT);
        }

        this.resetEditable();
    }

    private resetEditable(): void {
        this._renderer2.removeClass(this._elementRef.nativeElement, this.contentClass);
        this._renderer2.setAttribute(this._elementRef.nativeElement, 'contentEditable', 'false');
    }
}