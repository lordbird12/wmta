import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';

@Component({
  selector: 'app-personal-assistant',
  templateUrl: './personal-assistant.component.html',
  styleUrls: ['./personal-assistant.component.css']
})
export class PersonalAssistantComponent implements OnInit {

  constructor(private dynamicScriptLoader : DynamicScriptLoaderService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.startScript();
  }

  
  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'jquery.flexslider-min', 'jquery.swipebox','jquery.meanmenu.min','jquery-2.2.3.min','').then(data => {
    }).catch(error => console.log(error));
  }

}
