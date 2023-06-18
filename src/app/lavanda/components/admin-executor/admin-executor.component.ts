import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilebotExecutor, FilebotExecutorAction, FilebotExecutorCategory } from '../../api/filebot-executor.model';
import { FilebotExecutorService } from '../../service/filebot-executor.service';
import { Qbittorrent } from '../../api/qbittorrent.model';

interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './admin-executor.component.html',
    providers: [MessageService]
})
export class AdminExecutorComponent implements OnInit {

    executorDialog: boolean = false;

    executors: FilebotExecutor[] = [];

    deleteExecutorDialog: boolean = false;

    deleteExecutorsDialog: boolean = false;

    selectedExecutors: FilebotExecutor[] = [];

    submitted: boolean = false;
    executor: FilebotExecutor = {};

    cols: any[] = [];
    page = 0;

    pageSize: number = 20;
    statuses: any[] = [];
    expandedRows: expandedRows = {};

    totalElements: number = 0;

    rowsPerPageOptions = [10, 20, 30]

    redoEnabled: boolean = false;
    isCreatingNew: boolean = false;
    executorActions = Object.values(FilebotExecutorAction);
    executorCategorys = Object.values(FilebotExecutorCategory);
    allFiles: string[] = [];


    constructor(private messageService: MessageService,
        private readonly executorService: FilebotExecutorService) { }

    ngOnInit() {
        this.fillExecutors(this.page, this.pageSize);
        this.executorService.getAllFilebotExecutor().pipe(take(1)).subscribe(
            (files) => {
                this.allFiles = files;
            }
        );
        this.executorService.getAllByPageable(1, 20).subscribe(data => {
            this.executors = data.content;
            data.content.forEach((element: { path: string; }) => {
                element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
                // console.log(element.path);
            });
        }
        );
    }


    onPageChange(event: any) {
        this.page = event.page;
        this.pageSize = event.rows;
        this.fillExecutors(event.page, event.rows);
    }

    fillExecutors(page: number, pageSize: number) {
        this.executorService.getAllByPageable(page, pageSize).subscribe(data => {
            console.log("data: ", data);
            this.executors = data.content;
            data.content.forEach((element: { path: string; }) => {
                element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
                // console.log(element.path);
            });
            this.totalElements = data.totalElements;
        });
    }


    createNew() {
        this.executor = {};
        this.submitted = false;
        this.executorDialog = true;
        this.isCreatingNew = true;
        console.log("isCreatingNew", this.isCreatingNew);
    }

    reload() {
        this.fillExecutors(this.page, this.pageSize);
    }

    executeManually() {
        this.executorService
            .manualExecution()
            .subscribe(
                (data) => {
                    this.messageService.add({ severity: 'success', detail: 'Manual Execution started', life: 3000 });
                });
    }


    deleteSelectedExecutors() {
        this.deleteExecutorsDialog = true;
    }

    editExecutor(executor: FilebotExecutor) {
        this.executor = { ...executor };
        this.executorDialog = true;
        this.isCreatingNew = false;
    }

    deleteExecutor(executor: FilebotExecutor) {
        this.deleteExecutorDialog = true;


        this.executor = { ...executor };
    }

    confirmDeleteSelected() {
        this.deleteExecutorsDialog = false;
        this.executors = this.executors.filter(val => !this.selectedExecutors.includes(val));
        this.selectedExecutors = [];
    }

    confirmDelete() {
        this.deleteExecutorDialog = false;
        this.executors = this.executors.filter(val => val.id !== this.executor.id);
        this.executorService.delete(this.executor.id!).subscribe(
            (data) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Executor Deleted', life: 3000 });
            });
        this.executor = {};
    }

    hideDialog() {
        this.executorDialog = false;
        this.submitted = false;
    }

    saveExecutor() {

        // const filebotExecutor = {
        //     path: this.qbittorrentFormGroup.get('file')?.value,
        //     category: this.qbittorrentFormGroup.get('category')?.value,
        //     command: this.qbittorrentFormGroup.get('command')?.value,
        //     status: this.data.status,
        //     action: this.qbittorrentFormGroup.get('action')?.value.toUpperCase(),
        // }
        if (!this.redoEnabled) {
            this.executor.command = null;
        }
        if (this.isCreatingNew) {
            let qbittorrent: Qbittorrent = {
                id: this.createId(),
                category: this.executor.category!,
                name: this.executor.path!,
                action: this.executor.action!
            };
            this.executorService.createQbittorrent(qbittorrent).pipe(take(1)).subscribe((res) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Executor Created', life: 3000 });
            });
        } else {
            this.executorService.editFilebotExecutor(this.executor.id!, this.executor).pipe(take(1)).subscribe((res) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Executor Updated', life: 3000 });
            }
            );
        }
        this.submitted = true;
        this.isCreatingNew = false;
        this.executors = [...this.executors];
        this.executorDialog = false;
        this.executor = {};

    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.executors.length; i++) {
            if (this.executors[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
