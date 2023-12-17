import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {Transaction} from "../../model/Transaction";
import {TransactionService} from "../../services/transaction.service";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {SpeedDialModule} from "primeng/speeddial";
import FileSaver from 'file-saver';

interface Column {
  field: string;
  header: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    PaginatorModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FileUploadModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    NgIf,
    SpeedDialModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [MessageService, ConfirmationService]
})
export class TableComponent implements OnInit {
  transactions: Transaction[] = [];
  transaction!: Transaction;
  item!: MenuItem[];
  cols: Column[] = [];
  exportColumns!: ExportColumn[];
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  transactionDialog: boolean = false;
  submitted: boolean = false;
  constructor(private transactionService: TransactionService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getAllTransactions();
    this.item = [
      {
        icon: 'pi pi-download',
        target:'_blank',
        command: () => {
          this.exportExcel();
        }
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {
        icon: 'pi pi-upload',
        command: () => {
          this.openNew();
        }
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.getAllTransactions();
        }
      },
    ];
  }

  private getAllTransactions() {
    this.transactionService.getAll().subscribe((response: any) => {
      this.transactions = response;
      this.totalRecords = this.transactions.length;
    });
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'month', header: 'Month' },
      { field: 'town', header: 'Town' },
      { field: 'flatType', header: 'Flat Type' },
      { field: 'block', header: 'Block' },
      { field: 'streetName', header: 'Street Name' },
      { field: 'storeyRange', header: 'Storey Range' },
      { field: 'floorAreaSqm', header: 'Floor Area Sqm' },
      { field: 'flatModel', header: 'Flat Model' },
      { field: 'leaseCommenceDate', header: 'Lease Commence Date' },
      { field: 'resalePrice', header: 'Resale Price' }
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
  }

  openNew() {
    this.transaction = <Transaction>{};
    this.submitted = false;
    this.transactionDialog = true;
  }

  editProduct(transaction: any) {
    this.transaction = { ...transaction };
    console.log('Transaction: ', transaction);
    this.transactionDialog = true;
  }

  deleteProduct(transaction: any) {
    this.transaction = { ...transaction };
    this.transactionService.delete(this.transaction.id).subscribe((response: any) => {
      console.log('Response: ', response);
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    /*
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transaction = { ...transaction };
        console.log('Transaction: ', transaction);
        console.log('Transaction Id: ', this.transaction.id);
        this.transactionService.delete(this.transaction.id).subscribe((response: any) => {
          console.log('Response: ', response);
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });

     */
  }

  hideDialog() {
    this.transactionDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.transaction.month?.trim()) {
      if (this.transaction.id) {
        this.transactionService.update(this.transaction.id, this.transaction).subscribe((response: any) => {
          console.log('Response: ', response);
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Updated', life: 3000 });
      }
      else {
        this.transactionService.create(this.transaction).subscribe((response: any) => {
          console.log('Response: ', response);
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Created', life: 3000 });
      }
      this.transactions = [...this.transactions];
      this.transactionDialog = false;
    }
  }

  private exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.transactions);
        doc.save('products.pdf');
      });
    });
  }

  private exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.transactions);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'transactions');
    });
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
