import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { TransactionService } from "../../services/transaction.service";
import { HttpClientModule } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, DialogComponent, BrowserAnimationsModule],
      providers: [
        TransactionService,
        MessageService,
        ConfirmationService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
