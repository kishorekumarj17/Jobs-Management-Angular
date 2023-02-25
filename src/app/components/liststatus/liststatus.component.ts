import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-liststatus',
  templateUrl: './liststatus.component.html',
  styleUrls: ['./liststatus.component.scss']
})
export class ListstatusComponent implements OnInit {
  displayedColumns: string[] = ['jobId','status','assignedTo','details'];
  dataSource = [];
  loaddata:boolean=false;
  search:any;
  constructor(private globalservice:GlobalService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.globalservice.getJobList().subscribe((res:any)=>{
      this.route.params.subscribe((param:any)=>{
        let status=param.status
        if(param.status!="TOTAL")
        {
          this.dataSource=res.data.filter((obj:any)=>obj.status==status)
        }
        else
        {
          this.dataSource=res.data
        }
        this.loaddata=true
      })
      
    })
  }

  navigateTo(id:any)
  {
    this.router.navigate(['details',id])
  }

}

