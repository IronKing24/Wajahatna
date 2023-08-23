import { Pipe, PipeTransform } from '@angular/core';
import { Feature, GeoJsonProperties, Point } from 'geojson';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: Feature<Point, GeoJsonProperties> [], type: string, value: any): Feature<Point, GeoJsonProperties> [] {
    const x = values.filter((d:Feature) => d.properties?.[type] === value);
    console.log(x.length);
    
    return x;
  }
}
