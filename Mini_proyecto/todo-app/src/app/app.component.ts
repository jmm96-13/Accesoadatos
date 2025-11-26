import { Component } from '@angular/core';
import { TaskListComponent } from './component/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,  //standalone
  imports: [TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   
})
export class AppComponent {
  title = 'mini-proyecto';
}
