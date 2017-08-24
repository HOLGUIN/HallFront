import { Directive, ElementRef, Renderer } from '@angular/core';
function isBlank(obj) {
    return obj === undefined || obj === null;
}
export var Hide = (function () {
    function Hide(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._prevCondition = false;
    }
    Object.defineProperty(Hide.prototype, "hide", {
        set: function (newCondition) {
            this.initDisplayStyle();
            if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
                this._prevCondition = true;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', 'none');
            }
            else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
                this._prevCondition = false;
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'display', this._displayStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Hide.prototype.initDisplayStyle = function () {
        if (this._displayStyle === undefined) {
            var displayStyle = this._elementRef.nativeElement.style.display;
            if (displayStyle && displayStyle !== 'none') {
                this._displayStyle = displayStyle;
            }
        }
    };
    Hide.decorators = [
        { type: Directive, args: [{ selector: '[hide]', inputs: ['hide'] },] },
    ];
    /** @nocollapse */
    Hide.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    return Hide;
}());
//# sourceMappingURL=hide.js.map