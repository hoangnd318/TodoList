import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Todo } from '../model/to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(
    private storage: LocalStorage
  ) { }

  getTodo() {
    return new Promise((resolve, reject) => {
      this.storage.getItem('todo').subscribe(res => {
        resolve(res);
      });
    });
  }

  addTodo(todo) {
    return new Promise((resolve, reject) => {
      this.storage.getItem('todo').subscribe((res: any[]) => {
        if (!res) {
          todo['id'] = 1;
          this.storage.setItem('todo', [todo]).subscribe((resAdd) => {
            resolve(true);
          });
        } else {
          if (res.length <= 0) {
            todo['id'] = 1;
            this.storage.setItem('todo', [todo]).subscribe((resAdd) => {
              resolve(true);
            });
          } else {
            todo['id'] = res[res.length - 1]['id'] + 1;
            res.push(todo);
            this.storage.setItem('todo', res).subscribe((resAdd) => {
              resolve(true);
            });
          }
        }
      });
    });
  }

  updateTodo(todo) {
    return new Promise((resolve, reject) => {
      this.storage.getItem('todo').subscribe((res: any[]) => {
        for (let i = 0; i < res.length; i++) {
          if (todo.id === res[i].id) {
            res[i] = todo;
          }
        }

        this.storage.setItem('todo', res).subscribe((resAdd) => {
          resolve(true);
        });
      });
    });
  }

  deleteTodo(todo) {
    return new Promise((resolve, reject) => {
      this.storage.getItem('todo').subscribe((res: any[]) => {
        const todoSearch = res.findIndex(e => e.id === todo.id);
        res.splice(todoSearch, 1);

        this.storage.setItem('todo', res).subscribe((resAdd) => {
          resolve(true);
        });
      });
    });
  }
}
