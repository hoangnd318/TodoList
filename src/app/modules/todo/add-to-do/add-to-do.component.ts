import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Piority } from '../../../core/constants';
import * as moment from 'moment';
import { Todo } from '../model/to-do';
import { ToDoService } from '../services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit, OnChanges {

  @Input() todo;
  @Output() updateEvent = new EventEmitter<boolean>();

  piorityList = Piority;

  isUpdateForm = false;

  placeholderTitle = 'Add new task';
  placeholderDescription = 'Type description';
  minDateDuedate = moment(new Date()).format('YYYY-MM-DD');

  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: ToDoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.isUpdateForm) {
      this.initFormAdd();
    }
  }

  ngOnChanges(changes): void {
    this.isUpdateForm = true;
    this.placeholderTitle = 'Update title';
    this.placeholderDescription = 'Update description';
    this.initFormUpdate();
  }


  initFormAdd() {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [moment(new Date()).format('YYYY-MM-DD')],
      piority: ['Normal'],
    });
  }

  initFormUpdate() {
    this.todoForm = this.formBuilder.group({
      title: [this.todo.title, [Validators.required]],
      description: [this.todo.description],
      dueDate: [this.todo.dueDate],
      piority: [this.todo.piority],
    });
  }

  submitFormListener() {
    if (this.todoForm.valid) {
      const todoData: Todo = {
        description: this.getFormControl('description').value,
        dueDate: this.getFormControl('dueDate').value,
        piority: this.getFormControl('piority').value,
        title: this.getFormControl('title').value
      };
      if (this.isUpdateForm) {
        todoData.id = this.todo.id;
        this.todoService.updateTodo(todoData).then(res => {
          if (res) {
            alert('Update todo successfully');
            this.updateEvent.emit(true);
          }
        }).catch(err => {

        });
      } else {
        this.todoService.addTodo(todoData).then(res => {
          if (res) {
            alert('Add todo successfully');
            this.router.navigate(['/todo']);
          }
        }).catch(err => {

        });
      }
    }
  }

  getFormControl(name) {
    return this.todoForm.get(name);
  }
}
