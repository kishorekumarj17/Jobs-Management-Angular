import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mypathdata:any=[]
  title = 'styleangular';
  constructor(private router:Router) { }
  ngOnInit(): void {
   
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        this.mypathdata=event.url.split('/').filter((i)=>i.length>0).map((i)=>i[0].toUpperCase()+i.substring(1,i.length))
      }
    })
    
  }

  navigateTo(arr:any)
  {
    this.router.navigate(arr)
  }

}