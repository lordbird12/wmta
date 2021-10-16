import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dynamicScriptLoader : DynamicScriptLoaderService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.startScript();
  }

  
  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }
}
