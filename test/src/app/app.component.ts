import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoader = false;
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loaderService.status.subscribe((val: boolean) => {
        setTimeout(() => {
          this.showLoader = val;
        })
      });
    })
  }
}
