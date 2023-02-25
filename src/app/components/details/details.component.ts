import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  relateduserlist:any=[]
  displayedColumns:any=['jobid','status','assignedto']
  dataobj:any={job_id:'',status:'',assigned_to:[]}
  loadedData:boolean=false;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels:[],
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
  
  constructor(private globalservice:GlobalService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.globalservice.getJobList().subscribe((res:any)=>{
      this.route.params.subscribe((param:any)=>{
        let jobid=param.jobid
        this.dataobj=res.data.filter((obj:any)=>obj.job_id==jobid)[0]
        let obj:any={}
        let arr:any=[]
        res.data.forEach((e:any)=>{
          obj[e['status']]=obj[e['status']]? obj[e['status']]+1 :1;
          for(let i=0;i<this.dataobj.assigned_to.length;i++)
          {
            if((e['job_id']!=this.dataobj['job_id']) && e['assigned_to'].join(' ').includes(this.dataobj.assigned_to[i]))
            {
              arr.push(e);
              break;
            }
          }
        })
        this.relateduserlist=arr
        this.doughnutChartData.datasets=[{data:Object.values(obj)}]
        this.doughnutChartData.labels=Object.keys(obj)
        this.loadedData=true;
      })
    })
  }

 



}
