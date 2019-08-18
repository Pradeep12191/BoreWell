import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'nullFilter'
})
export class NullFilterPipe implements PipeTransform {
    transform(data: any[]) {
        if(data && data.length){
            return data.filter(data => data)
        }
        return []
        
    }
}