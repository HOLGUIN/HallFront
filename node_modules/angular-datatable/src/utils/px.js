import { Pipe } from '@angular/core';
export var PixelConverter = (function () {
    function PixelConverter() {
    }
    PixelConverter.prototype.transform = function (value, args) {
        if (value === undefined) {
            return;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value + 'px';
        }
    };
    PixelConverter.decorators = [
        { type: Pipe, args: [{
                    name: 'px'
                },] },
    ];
    /** @nocollapse */
    PixelConverter.ctorParameters = function () { return []; };
    return PixelConverter;
}());
//# sourceMappingURL=px.js.map