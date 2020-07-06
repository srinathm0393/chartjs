import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task2';

constructor(private router: Router){}

ngOnInit(){
}
navigate(url: string): void {
  this.router.navigateByUrl(url);
}
}
