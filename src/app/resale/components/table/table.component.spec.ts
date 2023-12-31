import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TableModule} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableModule], // Add HttpClientTestingModule to the imports array
      providers: [MessageService, ConfirmationService], // Provide the ConfirmationService
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
