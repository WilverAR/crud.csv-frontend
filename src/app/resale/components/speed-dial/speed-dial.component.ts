import {Component, Input, OnInit, Output} from '@angular/core';
import {SpeedDialModule} from "primeng/speeddial";
import {ToastModule} from "primeng/toast";
import {MenuItem, MessageService} from "primeng/api";
import {Transaction} from "../../model/transaction";
import FileSaver from "file-saver";
import {TransactionService} from "../../services/transaction.service";
import {DialogComponent} from "../dialog/dialog.component";


interface Column {
  field: string;
  header: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  imports: [
    SpeedDialModule,
    ToastModule,
    DialogComponent
  ],
  templateUrl: './speed-dial.component.html',
  styleUrl: './speed-dial.component.css'
})
export class SpeedDialComponent implements OnInit {
  item!: MenuItem[];
  exportColumns!: ExportColumn[];
  @Input() columns: Column[] = [];
  @Input() transactions: Transaction[] = [];

  @Output() transactionDialog: boolean = false;
  @Output() submitted: boolean = false;

  constructor(private transactionService: TransactionService, private messageService: MessageService) {}
  ngOnInit() {
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
          this.importFileCSV();
        }
      },
      {
        icon: 'pi pi-spin pi-refresh',
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
        }
      },
    ];
    this.exportColumns = this.columns.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  private importFileCSV() {
    //this.submitted = false;
    //this.transactionDialog = true;
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
