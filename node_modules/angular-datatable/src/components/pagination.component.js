import { Component, Inject, forwardRef } from '@angular/core';
import { DataTable } from './table.component';
import { PAGINATION_TEMPLATE } from './pagination.template';
import { PAGINATION_STYLE } from "./pagination.style";
export var DataTablePagination = (function () {
    function DataTablePagination(dataTable) {
        this.dataTable = dataTable;
    }
    DataTablePagination.prototype.pageBack = function () {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    };
    DataTablePagination.prototype.pageForward = function () {
        this.dataTable.offset += this.dataTable.limit;
    };
    DataTablePagination.prototype.pageFirst = function () {
        this.dataTable.offset = 0;
    };
    DataTablePagination.prototype.pageLast = function () {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    };
    Object.defineProperty(DataTablePagination.prototype, "maxPage", {
        get: function () {
            return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "limit", {
        get: function () {
            return this.dataTable.limit;
        },
        set: function (value) {
            this.dataTable.limit = Number(value); // TODO better way to handle that value of number <input> is string?
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "page", {
        get: function () {
            return this.dataTable.page;
        },
        set: function (value) {
            this.dataTable.page = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagination.decorators = [
        { type: Component, args: [{
                    selector: 'data-table-pagination',
                    template: PAGINATION_TEMPLATE,
                    styles: [PAGINATION_STYLE]
                },] },
    ];
    /** @nocollapse */
    DataTablePagination.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef(function () { return DataTable; }),] },] },
    ]; };
    return DataTablePagination;
}());
//# sourceMappingURL=pagination.component.js.map