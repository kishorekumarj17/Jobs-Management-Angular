import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-liststatus',
  templateUrl: './liststatus.component.html',
  styleUrls: ['./liststatus.component.scss']
})
export class ListstatusComponent implements OnInit {
  displayedColumns: string[] = ['jobId','status','assignedTo'];
  dataSource = [];
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
      })
      
    })
  }

  navigateTo(id:any)
  {
    this.router.navigate(['details',id])
  }

}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];