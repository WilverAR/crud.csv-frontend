import {Component, Input, OnInit, Output} from '@angular/core';
import {SpeedDialModule} from "primeng/speeddial";
import {ToastModule} from "primeng/toast";
import {MenuItem, MessageService} from "primeng/api";
import {Transaction} from "../../model/transaction";
import FileSaver from "file-saver";


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
  ],
  templateUrl: './speed-dial.component.html',
  styleUrl: './speed-dial.component.css'
})
export class SpeedDialComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  @Input() columns: Column[] = [];

  @Output() transactionDialog: boolean = false;
  @Output() submitted: boolean = false;

  item!: MenuItem[];
  exportColumns!: ExportColumn[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.item = [];
    this.exportColumns = this.columns.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  exportExcel() {
    this.messageService.add({severity:'success', summary: 'Loading', detail: 'Exporting transactions...'});
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
