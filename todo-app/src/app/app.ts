import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  task: string = '';
  time: string = '';

  tasks: { task: string; time: string }[] = [];

  editIndex: number | null = null;

  addTask() {
    if (this.task.trim() === '' || this.time.trim() === '') return;

    if (this.editIndex === null) {
      this.tasks.push({ task: this.task, time: this.time });
    } else {
      this.tasks[this.editIndex] = {
        task: this.task,
        time: this.time
      };
      this.editIndex = null;
    }

    this.task = '';
    this.time = '';
  }

  editTask(index: number) {
    this.task = this.tasks[index].task;
    this.time = this.tasks[index].time;
    this.editIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}