import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { TransactionList } from './transaction-list/transaction-list';
import { TransactionForm } from './transaction-from/transaction-from';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
         component: Login
    },    
    {
        path: 'signup',
         component: Signup
    },
    {
        path:'transactions',
        component: TransactionList,
        canActivate: [authGuard]
    },
    {
        path:'add', 
        component: TransactionForm,
        canActivate:[authGuard]
    },
    {
        path:'edit/:id', 
        component: TransactionForm,
        canActivate:[authGuard]
    },
    /*
    {
        path: '', 
        redirectTo: '/transactions',
        pathMatch: 'full' ,
        canActivate:[authGuard]
    },
    */
    {path: '**', 
        redirectTo: '/transactions' 
    }
]
    