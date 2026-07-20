import { Component, OnInit,signal } from '@angular/core';
import { Transaction } from '../models/transaction';
import { NgClass } from "../../../node_modules/@angular/common/types/_common_module-chunk";
import {CommonModule} from "@angular/common";
import { TransactionService } from '../services/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {
constructor(private transactionService: TransactionService,private router:Router) {}
 transactions = signal<Transaction[]>([]);
 loading = signal(true);
  error = signal('');

ngOnInit(): void {
 //this.loadTransactions(); 
 this.loadProducts();
 
}
/*
 loadTransactions(): void {
  this.transactionService.getAll().subscribe((data) => this.transactions = data);
  console.log(this.transactions);
  } 
  */

  loadProducts(): void {
    this.transactionService.getAll().subscribe({
      next: (data) => {
       this.transactions.set(data);
    //   console.log("Response: " + JSON.stringify(this.transactions));     
      // console.log("Transactions: " + this.transactions[0].amount); 
    
      },
      error: (err) => {
        console.error("Error:",err);
       // alert(this.error(ere));
        this.error.set('Failed to load transactions');
        this.loading.set(false);
      }
    });
  }

  getTotalIncome(): number {
    return this.transactions().filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  }
  
  getTotalExpense(): number {
    return this.transactions().filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  }

  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  editTransaction(transaction:Transaction){
    console.log(transaction.id);
    if(transaction.id){
      console.log('in nav')
      this.router.navigate(['/edit',transaction.id])
    }
  }

}
