import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoading:boolean=false;
  mypathdata:any=[]
  title = 'styleangular';
  sidenavOpen=true
  constructor(private router:Router) { }
  ngOnInit(): void {
   
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        this.mypathdata=event.url.split('/').filter((i)=>i.length>0).map((i)=>i[0].toUpperCase()+i.substring(1,i.length))
      }
    })

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.showLoading = true;
          console.log("Navigation started")
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.showLoading = false;
          console.log("Navigation Ended")
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  navigateTo(arr:any)
  {
    this.router.navigate(arr)
  }

  @HostListener('window:resize', ['$event'])
  public setwidth(event:any) {
    this.sidenavOpen= window.innerWidth <=800 ? false :true;
  }

  public getwidth():any
  {
    return window.innerWidth;
  }

}