import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-transaction-from',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-from.html',
  styleUrls: ['./transaction-from.css'],
})
export class TransactionForm implements OnInit {

 
  datePipe = new DatePipe('en-US');
  transactionForm: FormGroup;
  incomeCategories = ['Salary', 'Freelance', 'Investment'];
  expenseCategories = ['Food', 'Rent', 'Utilities', 'Entertainment'];

  availableCategories: string[] = [];

  editMode = false;
  transactionId?: number;


  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService) {
    const date: Date = new Date();
    const formattedDate: string = date.toLocaleDateString('en-CA');
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      createdAt: [formattedDate, Validators.required]

    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  ngOnInit(): void {
   // this.updateAvailableCategories();

    const id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("in trannsaction-Form:" + id)
    if (id) {
      this.editMode = true;
      this.transactionId = +id;
      console.log("transactionId:" + id);
      this.loadTransaction(this.transactionId)
    }
  }
  onSubmit() {
     console.log("In Transaction-Form onSubmit()")
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;
  console.log("In Transaction-Form onSubmit(2)")
      if (this.editMode && this.transactionId) {
        console.log("In Transaction-Form onSubmit(3)")
        this.transactionService.update(this.transactionId, transaction).subscribe({
next: () => {
            this.router.navigate(['/transactions']);
          }
        })
      } else {
        console.log(transaction);
        this.transactionService.create(transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          }

        });

      }

    }

  }




  onTypeChange() {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);
  }

  updateAvailableCategories(type:string) {
  
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({ category: null });
  }

  cancel() {
    this.router.navigate(['/tranactions'])
  }

  loadTransaction(id: number): void {
    this.transactionService.getById(id).subscribe({
      next: (transaction) => {
        console.log("transaction createAt: "+ transaction.createdAt);
        console.log("transaction.category: "+ transaction.category)
        this.updateAvailableCategories(transaction.type);
        this.transactionForm.patchValue({
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          createdAt: this.datePipe.transform(transaction.createdAt,'yyyy-MM-dd')
        });
        console.log("in loadTransaction:" + id);
        this.updateAvailableCategories(transaction.type);
      },
      error: (error) => {
        console.log('Error - ', error);
      }
    });
  }
}
