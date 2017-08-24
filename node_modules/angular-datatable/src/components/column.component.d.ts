import { OnInit } from '@angular/core';
import { DataTableRow } from './row.component';
import { CellCallback, DataTableSortCallback } from './types';
export declare class DataTableColumn implements OnInit {
    header: string;
    sortable: boolean;
    resizable: boolean;
    property: string;
    styleClass: string;
    cellColors: CellCallback;
    customSort: DataTableSortCallback;
    width: number | string;
    visible: boolean;
    cellTemplate: any;
    headerTemplate: any;
    getCellColor(row: DataTableRow, index: number): string;
    private styleClassObject;
    ngOnInit(): void;
    private _initCellClass();
}
