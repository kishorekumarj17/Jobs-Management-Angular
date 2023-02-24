import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  getJobList()
  {
    return this.http.get('../../../assets/mylistdata.json').pipe(map(res=>res))
  }

  getJobListCategory()
  {
    return this.http.get('../../../assets/mylistcategory.json').pipe(map(res=>res))
  }
}
