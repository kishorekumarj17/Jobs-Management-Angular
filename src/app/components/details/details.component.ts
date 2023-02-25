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

  dataobj:any={job_id:'',status:'',assigned_to:[]}

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels:['Med','Max','Min'],
    datasets: [
      {
      data: [350, 450, 100],
      borderWidth: 5
      }
    ]
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels:any= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
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
      })
    })
  }

 



}
