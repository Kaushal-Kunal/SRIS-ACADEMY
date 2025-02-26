import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Router,NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackBtnService {

  private previousUrl: string = "";
  private currentUrl: string = "";

  constructor(
    private router:Router,
    private platform : Platform,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  back() {
    this.platform.ready().then(() => {
      App.addListener('backButton', () => {
        let urlObject = new URL(window.location.href);
        let pathname = urlObject.pathname;
        let trimmedPathname = pathname.startsWith('/') ? pathname.substr(1) : pathname;
        if (trimmedPathname == "studenthome" || trimmedPathname == "institutehome" || trimmedPathname == '') {
          this.showExitConfirmation()
        }else{
          window.location.replace(this.previousUrl)
          window.location.href = this.previousUrl;
        }

      })
    })
  }




  showExitConfirmation() {
    const confirmed = window.confirm('Do you want to close the app?');
    if (confirmed) {
      App.exitApp();
    }
  }

}