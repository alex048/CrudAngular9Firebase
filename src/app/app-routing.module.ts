import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';


const routes: Routes = [
  { path: '',
  redirectTo: '',
  pathMatch: 'full'},
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/cliente.module').then(module => module.ClienteModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
