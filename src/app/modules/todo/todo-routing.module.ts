import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToDoComponent } from './add-to-do/add-to-do.component';
import { ListToDoComponent } from './list-to-do/list-to-do.component';

const routes: Routes = [
  {
    path: '',
    component: ListToDoComponent
  },
  {
    path: 'add',
    component: AddToDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
