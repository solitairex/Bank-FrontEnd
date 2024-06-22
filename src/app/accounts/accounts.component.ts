import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountsService } from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import { AccountDetails } from "../model/account.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFormGroup!: FormGroup;
  errorMessage!:string;

  constructor(private fb: FormBuilder, private accountservice: AccountsService, public authService:AuthService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      accountDestination: this.fb.control(''),
      operationType: this.fb.control('DEBIT'),  // Set a default operation type
      amount: this.fb.control(0),
      description: this.fb.control('')
    });
  }


  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountservice.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.error.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let AccountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let accountDestination: string = this.operationFormGroup.value.accountDestination;

    console.log('Form Values:', {
      AccountId, operationType, amount, description, accountDestination
    });

    if (operationType === 'DEBIT') {
      this.accountservice.debit(AccountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Debit");
          this.handleSearchAccount();
        },
        error: err => {
          console.log(err);
        }
      });
    } else if (operationType === 'CREDIT') {
      this.accountservice.credit(AccountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Credit");
        },
        error: err => {
          console.log(err);
        }
      });
    } else if (operationType === 'TRANSFER') {
      this.accountservice.transfer(AccountId, accountDestination, amount, description).subscribe({
        next: (data) => {
          alert("Success Transfer!");
          this.handleSearchAccount();
        },
        error: err => {
          console.log(err);
        }
      });
    }
    this.operationFormGroup.reset();
  }

}
