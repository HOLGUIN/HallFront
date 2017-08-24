import { Component, Input, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { DataTable } from './table.component';
import { ROW_TEMPLATE } from './row.template';
import { ROW_STYLE } from "./row.style";
export var DataTableRow = (function () {
    function DataTableRow(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new EventEmitter();
        this.expandRowChange = new EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    Object.defineProperty(DataTableRow.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.selectedChange.emit(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRow.prototype, "displayIndex", {
        // other:
        get: function () {
            if (this.dataTable.pagination) {
                return this.dataTable.displayParams.offset + this.index + 1;
            }
            else {
                return this.index + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableRow.prototype.getTooltip = function () {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    };
    DataTableRow.prototype.expandRow = function (event) {
        event.stopPropagation();
        this.expanded = !this.expanded;
        this.expandRowChange.emit();
    };
    DataTableRow.prototype.ngOnDestroy = function () {
        this.selected = false;
    };
    DataTableRow.decorators = [
        { type: Component, args: [{
                    selector: '[dataTableRow]',
                    template: ROW_TEMPLATE,
                    styles: [ROW_STYLE]
                },] },
    ];
    /** @nocollapse */
    DataTableRow.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef(function () { return DataTable; }),] },] },
    ]; };
    DataTableRow.propDecorators = {
        'item': [{ type: Input },],
        'index': [{ type: Input },],
        'selectedChange': [{ type: Output },],
        'expandRowChange': [{ type: Output },],
    };
    return DataTableRow;
}());
//# sourceMappingURL=row.component.js.map