import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  statuslist:any={};
  displayedColumns=['user','location','status']
  onmywaylist:any;
  startedlist:any;
  loaddata:boolean=false;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
      data: [],
      borderWidth: 5
      }
    ]
  };
  public chartOptions:ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  constructor(private globalservice:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    forkJoin([this.globalservice.getJobList(),this.globalservice.getJobListCategory()]).subscribe((res:any[])=>{
      let data=res[0].data
      let obj:any={}
      let arr:any=[]
      let arr2:any=[]
      data.forEach((e:any)=>{
        obj[e['status']]=obj[e['status']]? obj[e['status']]+1 :1;
        e['status']=='ON_MY_WAY' ? arr.push(...e['assigned_to']):true;
        e['status']=='STARTED' ? arr2.push(...e['assigned_to']):true;
      })
      this.onmywaylist=[...new Set(arr)].filter((i:any,ind:any)=>ind<=4)
      this.startedlist=[...new Set(arr2)].filter((i:any,ind:any)=>ind<=4).map((i:any)=>i[0].toUpperCase()+i.substring(1,i.length))
      this.statuslist=obj;
      this.statuslist['TOTAL']=res[0].data.length
      this.doughnutChartData.labels=Object.keys(this.statuslist)
      this.doughnutChartData.datasets=[{'data':Object.values(this.statuslist),}]
      this.loaddata=true
    })
  }

  navigateTo(key:any)
  {
    this.router.navigate(['jobs',key])
  }

}
