import { Component, Inject, forwardRef } from '@angular/core';
import { DataTable } from './table.component';
import { HEADER_TEMPLATE } from './header.template';
import { HEADER_STYLE } from "./header.style";
export var DataTableHeader = (function () {
    function DataTableHeader(dataTable) {
        this.dataTable = dataTable;
        this.columnSelectorOpen = false;
    }
    DataTableHeader.prototype._closeSelector = function () {
        this.columnSelectorOpen = false;
    };
    DataTableHeader.decorators = [
        { type: Component, args: [{
                    selector: 'data-table-header',
                    template: HEADER_TEMPLATE,
                    styles: [HEADER_STYLE],
                    host: {
                        '(document:click)': '_closeSelector()'
                    }
                },] },
    ];
    /** @nocollapse */
    DataTableHeader.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef(function () { return DataTable; }),] },] },
    ]; };
    return DataTableHeader;
}());
//# sourceMappingURL=header.component.js.map