import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTable } from './components/table.component';
import { DataTableColumn } from './components/column.component';
import { DataTableRow } from './components/row.component';
import { DataTablePagination } from './components/pagination.component';
import { DataTableHeader } from './components/header.component';
import { PixelConverter } from './utils/px';
import { Hide } from './utils/hide';
import { MinPipe } from './utils/min';
export var DataTableModule = (function () {
    function DataTableModule() {
    }
    DataTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        DataTable,
                        DataTableColumn,
                        DataTableRow,
                        DataTablePagination,
                        DataTableHeader,
                        PixelConverter,
                        Hide,
                        MinPipe
                    ],
                    exports: [
                        DataTable,
                        DataTableColumn,
                        DataTableRow,
                        DataTablePagination,
                        DataTableHeader,
                        PixelConverter,
                        Hide,
                        MinPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    DataTableModule.ctorParameters = function () { return []; };
    return DataTableModule;
}());
//# sourceMappingURL=data-table.module.js.map