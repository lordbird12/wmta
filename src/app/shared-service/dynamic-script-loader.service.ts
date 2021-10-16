import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'custom', src: 'assets/js/custom.js' },
  { name: 'custom.min', src: 'assets/js/min/custom.min.js' },
  { name: 'admin', src: 'assets/js/admin.js' },
  { name: 'respond.min', src: 'assets/js/respond.min.js' },
  { name: 'jquery.swipebox', src: 'assets/js/jquery.swipebox.min.js' },
  { name: 'jquery.velocity', src: 'assets/js/jquery.velocity.min.js' },
  { name: 'jquery.validate.min', src: 'assets/js/jquery.validate.min.js' },
  { name: 'jquery.ui.datepicker.min', src: 'assets/js/jquery.ui.datepicker.min.js' },
  { name: 'jquery.ui.core.min', src: 'assets/js/jquery.ui.core.min.js' },
  { name: 'jquery.meanmenu.min', src: 'assets/js/jquery.meanmenu.min.js' },
  { name: 'jquery.jplayer.min', src: 'assets/js/jquery.jplayer.min.js' },
  { name: 'jquery.isotope.min', src: 'assets/js/jquery.isotope.min.js' },
  { name: 'jquery.form', src: 'assets/js/jquery.form.js' },
  { name: 'jquery.flexslider-min', src: 'assets/js/jquery.flexslider-min.js' },
  { name: 'jquery.autosize.min', src: 'assets/js/jquery.autosize.min.js' },
  { name: 'jquery.appear', src: 'assets/js/jquery.appear.js' },
  { name: 'jquery-migrate-1.2.1.min', src: 'assets/js/jquery-migrate-1.2.1.min.js' },
  { name: 'jquery-twitterFetcher', src: 'assets/js/jquery-twitterFetcher.js' },
  { name: 'jquery-2.2.3.min', src: 'assets/js/jquery-2.2.3.min.js' },
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {

      if (!this.scripts[name].loaded) {

        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
