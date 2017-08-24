import { Pipe } from '@angular/core';
export var MinPipe = (function () {
    function MinPipe() {
    }
    MinPipe.prototype.transform = function (value, args) {
        return Math.min.apply(null, value);
    };
    MinPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'min'
                },] },
    ];
    /** @nocollapse */
    MinPipe.ctorParameters = function () { return []; };
    return MinPipe;
}());
//# sourceMappingURL=min.js.map