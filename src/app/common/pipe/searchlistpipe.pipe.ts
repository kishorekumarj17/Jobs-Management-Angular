import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchlistpipe',
  pure:false
})
export class SearchlistpipePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(!value){
      return null
    };
    if(!args[0])
    {
      return value;
    }
    return value.filter((obj:any)=>{
      return JSON.stringify(obj).includes(args[0])
    })
  }

}
