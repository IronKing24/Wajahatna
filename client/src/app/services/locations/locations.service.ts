import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'; 
import { Feature, FeatureCollection, Point, GeoJsonProperties, GeoJSON } from "geojson";
import { map } from "rxjs";

@Injectable()
export class LocationsService {
    private locations !: FeatureCollection<Point, GeoJsonProperties>
    
    constructor(private http:HttpClient){}

    getMap()
    {
        return this.http.get<GeoJSON>('./assets/data/Country.json');
    }

    getLocations()//: Feature<Point, GeoJsonProperties>[] 
    {
        return this.http.get<GeoJSON>("./assets/data/points.json");
        //return this.locations.features;
    }

    filter(type: string, value: string)//: Feature<Point, GeoJsonProperties>[] 
    {
        //return this.locations.features.filter((d: Feature<Point>) => d.properties?.[type] === value);
        return this.http.get<FeatureCollection<Point>>("./assets/data/points.json").pipe(
            map((d: FeatureCollection<Point>)=> {return d.features.filter((d: Feature<Point>) => d.properties?.[type] === value);})
        )
    }

    search(name: string | null)
    {
        if(name === null)
        {
            return this.http.get<FeatureCollection<Point>>("./assets/data/points.json")
        }
        else
        {
            //return this.locations.features.filter((d: Feature<Point>) => d.properties?.['name'].toLowerCase().includes(name?.toLowerCase()));
            return this.http.get<FeatureCollection<Point>>("./assets/data/points.json").pipe(
                map((d: FeatureCollection<Point>)=> {return d.features.filter((d: Feature<Point>) => d.properties?.['name'].toLowerCase().includes(name?.toLowerCase()));})
            )
        }
    }
}