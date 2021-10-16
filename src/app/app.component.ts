import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'wmta';

  opened = false;
  IsLogin = false;

  constructor(public translate: TranslateService, private router: Router) {
    // transLate.addLangs(['en', 'th']); 
    // transLate.setDefaultLang('en'); 
    // transLate.use('en');
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') {
          this.IsLogin = false;
        } else {
          this.IsLogin = true;
        }
      }
    });

  }

  ngOnInit(): void {

  }

  switchLang(lang: string) {
    this.translate.use(lang);
    //this.changeLange();
  }

}


