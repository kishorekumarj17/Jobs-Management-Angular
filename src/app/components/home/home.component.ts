import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  statuslist:any;
  constructor(private globalservice:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    forkJoin([this.globalservice.getJobList(),this.globalservice.getJobListCategory()]).subscribe((res:any[])=>{
      let data=res[0].data
      let obj:any={}
      data.forEach((e:any)=>{
        obj[e['status']]=obj[e['status']]? obj[e['status']]+1 :1;
      })
      this.statuslist=obj;
      this.statuslist['TOTAL']=res[0].data.length
    })
  }

  navigateTo(key:any)
  {
    this.router.navigate(['jobs',key])
  }

}
