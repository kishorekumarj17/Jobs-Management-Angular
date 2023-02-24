import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  dataobj:any={job_id:'',status:'',assigned_to:[]}
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
