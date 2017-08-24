import { Directive, Input, ContentChild } from '@angular/core';
export var DataTableColumn = (function () {
    function DataTableColumn() {
        this.sortable = false;
        this.resizable = false;
        this.visible = true;
        this.styleClassObject = {}; // for [ngClass]
    }
    DataTableColumn.prototype.getCellColor = function (row, index) {
        if (this.cellColors !== undefined) {
            return this.cellColors(row.item, row, this, index);
        }
    };
    DataTableColumn.prototype.ngOnInit = function () {
        this._initCellClass();
    };
    DataTableColumn.prototype._initCellClass = function () {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = (_a = {},
                _a[this.styleClass] = true,
                _a
            );
        }
        var _a;
    };
    DataTableColumn.decorators = [
        { type: Directive, args: [{
                    selector: 'data-table-column'
                },] },
    ];
    /** @nocollapse */
    DataTableColumn.ctorParameters = function () { return []; };
    DataTableColumn.propDecorators = {
        'header': [{ type: Input },],
        'sortable': [{ type: Input },],
        'resizable': [{ type: Input },],
        'property': [{ type: Input },],
        'styleClass': [{ type: Input },],
        'cellColors': [{ type: Input },],
        'customSort': [{ type: Input },],
        'width': [{ type: Input },],
        'visible': [{ type: Input },],
        'cellTemplate': [{ type: ContentChild, args: ['dataTableCell',] },],
        'headerTemplate': [{ type: ContentChild, args: ['dataTableHeader',] },],
    };
    return DataTableColumn;
}());
//# sourceMappingURL=column.component.js.map