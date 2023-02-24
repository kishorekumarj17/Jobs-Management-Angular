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
    this.globalservice.getJobListCategory().subscribe((res:any)=>{
      this.statuslist=res['count_by_status']
      console.log(this.statuslist)
    })
    forkJoin([this.globalservice.getJobList(),this.globalservice.getJobListCategory()]).subscribe((res:any[])=>{
      this.statuslist=res[1]['count_by_status']
      this.statuslist['TOTAL']=res[0].data.length
    })
  }

  navigateTo(key:any)
  {
    this.router.navigate(['jobs',key])
  }

}
