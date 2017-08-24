import { Component, Input, Output, EventEmitter, ContentChildren, ContentChild, ViewChildren } from '@angular/core';
import { DataTableColumn } from './column.component';
import { DataTableRow } from './row.component';
import { defaultTranslations } from './types';
import { drag } from '../utils/drag';
import { TABLE_TEMPLATE } from './table.template';
import { TABLE_STYLE } from "./table.style";
export var DataTable = (function () {
    function DataTable() {
        this._items = [];
        this.header = true;
        this.pagination = true;
        this.indexColumn = true;
        this.indexColumnHeader = '';
        this.selectColumn = false;
        this.multiSelect = true;
        this.substituteRows = true;
        this.expandableRows = false;
        this.translations = defaultTranslations;
        this.selectOnRowClick = false;
        this.autoReload = true;
        this.showReloading = false;
        this.showDownloadButton = false;
        this._sortAsc = true;
        this._offset = 0;
        this._limit = 10;
        // Reloading:
        this._reloading = false;
        this.reload = new EventEmitter();
        this._displayParams = {}; // params of the last finished reload
        this._scheduledReload = null;
        // Download
        this.download = new EventEmitter();
        // event handlers:
        this.rowClick = new EventEmitter();
        this.rowDoubleClick = new EventEmitter();
        this.headerClick = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.rowExpandChange = new EventEmitter();
        this.selectedRows = [];
        this._selectAllCheckbox = false;
        // column resizing:
        this._resizeInProgress = false;
        this.resizeLimit = 30;
    }
    Object.defineProperty(DataTable.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items;
            this._onReloadFinished();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (value) {
            this._sortBy = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortAsc", {
        get: function () {
            return this._sortAsc;
        },
        set: function (value) {
            this._sortAsc = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "customSort", {
        get: function () {
            return this._customSort;
        },
        set: function (value) {
            this._customSort = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (value) {
            this._limit = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "page", {
        // calculated property:
        get: function () {
            return Math.floor(this.offset / this.limit) + 1;
        },
        set: function (value) {
            this.offset = (value - 1) * this.limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "lastPage", {
        get: function () {
            return Math.ceil(this.itemCount / this.limit);
        },
        enumerable: true,
        configurable: true
    });
    // setting multiple observable properties simultaneously
    DataTable.prototype.sort = function (sortBy, asc, customSort) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
        this.customSort = customSort;
    };
    // init
    DataTable.prototype.ngOnInit = function () {
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    };
    DataTable.prototype._initDefaultValues = function () {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    };
    DataTable.prototype._initDefaultClickEvents = function () {
        var _this = this;
        this.headerClick.subscribe(function (tableEvent) { return _this.sortColumn(tableEvent.column); });
        if (this.selectOnRowClick) {
            this.rowClick.subscribe(function (tableEvent) { return tableEvent.row.selected = !tableEvent.row.selected; });
        }
    };
    Object.defineProperty(DataTable.prototype, "reloading", {
        get: function () {
            return this._reloading;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.reloadItems = function () {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    };
    DataTable.prototype._onReloadFinished = function () {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    };
    Object.defineProperty(DataTable.prototype, "displayParams", {
        get: function () {
            return this._displayParams;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._updateDisplayParams = function () {
        this._displayParams = {
            sortBy: this.sortBy,
            customSort: this.customSort,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    };
    // for avoiding cascading reloads if multiple params are set at once:
    DataTable.prototype._triggerReload = function () {
        var _this = this;
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout(function () {
            _this.reloadItems();
        });
    };
    DataTable.prototype.downloadItems = function () {
        this.download.emit(this._getRemoteParameters());
    };
    DataTable.prototype.rowClicked = function (row, event) {
        this.rowClick.emit({ row: row, event: event });
    };
    DataTable.prototype.rowDoubleClicked = function (row, event) {
        this.rowDoubleClick.emit({ row: row, event: event });
    };
    DataTable.prototype.headerClicked = function (column, event) {
        if (!this._resizeInProgress) {
            this.headerClick.emit({ column: column, event: event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    };
    DataTable.prototype.cellClicked = function (column, row, event) {
        this.cellClick.emit({ row: row, column: column, event: event });
    };
    // functions:
    DataTable.prototype._getRemoteParameters = function () {
        var params = {};
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.customSort = this.customSort;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    };
    DataTable.prototype.sortColumn = function (column) {
        if (column.sortable) {
            var ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending, column.customSort);
        }
    };
    Object.defineProperty(DataTable.prototype, "columnCount", {
        get: function () {
            var count = 0;
            count += this.indexColumnVisible ? 1 : 0;
            count += this.selectColumnVisible ? 1 : 0;
            count += this.expandColumnVisible ? 1 : 0;
            this.columns.toArray().forEach(function (column) {
                count += column.visible ? 1 : 0;
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.getRowColor = function (item, index, row) {
        if (this.rowColors !== undefined) {
            return this.rowColors(item, row, index);
        }
    };
    Object.defineProperty(DataTable.prototype, "selectAllCheckbox", {
        get: function () {
            return this._selectAllCheckbox;
        },
        set: function (value) {
            this._selectAllCheckbox = value;
            this._onSelectAllChanged(value);
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype._onSelectAllChanged = function (value) {
        this.rows.toArray().forEach(function (row) { return row.selected = value; });
    };
    DataTable.prototype.onRowSelectChanged = function (row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            var index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            }
            else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        }
        else {
            if (row.selected) {
                this.selectedRow = row;
            }
            else if (this.selectedRow === row) {
                this.selectedRow = row;
            }
        }
        // unselect all other rows:
        if (row.selected && !this.multiSelect) {
            this.rows.toArray().filter(function (row_) { return row_.selected; }).forEach(function (row_) {
                if (row_ !== row) {
                    row_.selected = false;
                }
            });
        }
    };
    DataTable.prototype.onRowExpandChanged = function (row) {
        this.rowExpandChange.emit(row);
    };
    Object.defineProperty(DataTable.prototype, "substituteItems", {
        // other:
        get: function () {
            return Array.from({ length: this.displayParams.limit - this.items.length });
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.resizeColumnStart = function (event, column, columnElement) {
        var _this = this;
        this._resizeInProgress = true;
        drag(event, {
            move: function (moveEvent, dx) {
                if (_this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            },
        });
    };
    DataTable.prototype._isResizeInLimit = function (columnElement, dx) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) || !columnElement.nextElementSibling ||
            (dx >= 0 && (columnElement.nextElementSibling.offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    };
    DataTable.decorators = [
        { type: Component, args: [{
                    selector: 'data-table',
                    template: TABLE_TEMPLATE,
                    styles: [TABLE_STYLE]
                },] },
    ];
    /** @nocollapse */
    DataTable.ctorParameters = function () { return []; };
    DataTable.propDecorators = {
        'items': [{ type: Input },],
        'itemCount': [{ type: Input },],
        'columns': [{ type: ContentChildren, args: [DataTableColumn,] },],
        'rows': [{ type: ViewChildren, args: [DataTableRow,] },],
        'expandTemplate': [{ type: ContentChild, args: ['dataTableExpand',] },],
        'headerTitle': [{ type: Input },],
        'header': [{ type: Input },],
        'pagination': [{ type: Input },],
        'indexColumn': [{ type: Input },],
        'indexColumnHeader': [{ type: Input },],
        'rowColors': [{ type: Input },],
        'rowTooltip': [{ type: Input },],
        'selectColumn': [{ type: Input },],
        'multiSelect': [{ type: Input },],
        'substituteRows': [{ type: Input },],
        'expandableRows': [{ type: Input },],
        'translations': [{ type: Input },],
        'selectOnRowClick': [{ type: Input },],
        'autoReload': [{ type: Input },],
        'showReloading': [{ type: Input },],
        'showDownloadButton': [{ type: Input },],
        'sortBy': [{ type: Input },],
        'sortAsc': [{ type: Input },],
        'customSort': [{ type: Input },],
        'offset': [{ type: Input },],
        'limit': [{ type: Input },],
        'page': [{ type: Input },],
        'reload': [{ type: Output },],
        'download': [{ type: Output },],
        'rowClick': [{ type: Output },],
        'rowDoubleClick': [{ type: Output },],
        'headerClick': [{ type: Output },],
        'cellClick': [{ type: Output },],
        'rowExpandChange': [{ type: Output },],
    };
    return DataTable;
}());
//# sourceMappingURL=table.component.js.map