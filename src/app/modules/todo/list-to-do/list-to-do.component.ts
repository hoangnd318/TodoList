import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Todo } from '../model/to-do';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.scss']
})
export class ListToDoComponent implements OnInit {

  todos: Todo[];
  todosSearch: Todo[];
  todoSelect: Todo = null;

  todosCheck: Todo[] = [];

  searchTodoKey = '';

  constructor(
    private todoService: ToDoService
  ) { }

  ngOnInit(): void {
    this.getTodoData();
  }

  getTodoData() {
    this.todoService.getTodo().then((res: Array<any>) => {
      if (!res) {
        return;
      }
      this.todos = res;
    }).catch(err => {

    });
  }

  btnShowDetailTodoListener(todo): void {
    this.todoSelect = todo;
  }

  btnRemoveTodoListener(todo): void {
    this.todoService.deleteTodo(todo).then(res => {
      if (res) {
        alert('Delete todo successfully');
        this.searchTodoKey = '';
        this.getTodoData();
      }
    }).catch(err => {

    });
  }

  eventCheckTodoListener(event, data) {
    const flag = this.todosCheck.findIndex(e => e.id === data.id);
    if (event.checked) {
      if (flag === -1) {
        this.todosCheck.push(data);
      }
    } else {
      if (flag !== -1) {
        this.todosCheck.splice(flag, 1);
      }
    }
  }

  eventUpdateTodoListener(res): void {
    if (res) {
      this.getTodoData();
      this.searchTodoKey = '';
    }
  }

  btnBulkRemoveListener() {
    this.deleteTodos();
  }

  async deleteTodos() {
    let deleteCount = 0;
    while (deleteCount < this.todosCheck.length) {
      await this.todoService.deleteTodo(this.todosCheck[deleteCount]).then(res => {
        if (res) {
          deleteCount++;
        }
      }).catch(err => {

      });
    }
    this.todosCheck = [];
    alert('Delete selected todos successfully');
    this.getTodoData();
  }

  searchTodoListener() {
    this.todosSearch = this.todos.filter(e => e.title.includes(this.searchTodoKey));
  }
}
