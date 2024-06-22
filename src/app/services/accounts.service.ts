import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {addCommandModuleToYargs} from "@angular/cli/src/command-builder/utilities/command";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }
  public getAccount(accountid:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountid+"/pageoperations?page="+page+"&size="+size)
  }

  public debit(accountid:string,amount:number,description:string){
    let data={accountId:accountid,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/debit",data)
  }
  public credit(accountid: string, amount: number, description: string){
    let data={accountId:accountid,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/credit",data)
  }
  public transfer(accountSource: string, amount: string, accountDestination: number, description: string){
    let data={accountDestination,accountSource,amount,description}
    return this.http.post(environment.backendHost+"/accounts/transfer",data)
  }
}
