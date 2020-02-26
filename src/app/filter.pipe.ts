import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name:'filterResult'  
})

export class Filter implements PipeTransform{

    transform(value:any,queryString:any){
        
        if(queryString == ''){
            return value;
        }
        else{   
            const resultArray = [];
            for(let item of value)
            {
                if(item['name'] === queryString)
                {
                    resultArray.push(item);
                }
                else if(item['instanceType'] === queryString)
                {
                    resultArray.push(item);
                }
                else if(item['provider'] === queryString)
                {
                    resultArray.push(item);
                }
                else if(item['status'] === queryString)
                {
                    resultArray.push(item);
                }
            }
            return resultArray;
        }
    }
}