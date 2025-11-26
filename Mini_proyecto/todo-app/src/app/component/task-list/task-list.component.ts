import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { TaskListService } from '../../service/task-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TaskListComponent implements OnInit {

  tasks: TaskList[] = [];
  newTaskTitle = '';

  constructor(private taskListService: TaskListService) {}

  ngOnInit(): void {
    this.tasks = this.taskListService.getTasks();
  }

  addTask(): void {
    if (this.newTaskTitle.trim().length === 0) return;

    if (this.tasks.some(t => t.title === this.newTaskTitle)) return;

    const newTask: TaskList = {
      id: Date.now(),
      title: this.newTaskTitle,
      completed: false
    };

    this.tasks.push(newTask);
    this.taskListService.saveTasks(this.tasks);
    this.newTaskTitle = '';
  }

  toggleTask(task: TaskList): void {
    task.completed = !task.completed;
    this.taskListService.saveTasks(this.tasks);
  }

  modifyTask(id: number, newTitle: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    task.title = newTitle;
    this.taskListService.saveTasks(this.tasks);
  }

  promptModify(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Ingrese el nuevo título:', task.title);
    if (newTitle !== null && newTitle.trim() !== '') {
      this.modifyTask(id, newTitle);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.taskListService.saveTasks(this.tasks);
  }

  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }
}
