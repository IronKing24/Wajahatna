import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'; 
import { Feature, FeatureCollection, Point, GeoJsonProperties, GeoJSON } from "geojson";
import { Observable, map } from "rxjs";

@Injectable()
export class LocationsService {
    private locations !: FeatureCollection<Point, GeoJsonProperties>
    
    constructor(private http:HttpClient){}

    getWorldMap(level: number) : Observable<GeoJSON>
    {
        return this.http.get<GeoJSON>(`https://www.geoboundaries.org/api/current/gbOpen/${level}/`);
    }

    getCountryMap(iso_name: string, level: number) : Observable<GeoJSON>
    {
        return this.http.get<GeoJSON>(`https://www.geoboundaries.org/api/current/gbOpen/${iso_name}/${level}/`);
    }

    getReserves(): Observable<GeoJSON>
    {
        return this.http.get<GeoJSON>("./assets/data/points.json");
        
    }

    getHeritage(): Observable<GeoJSON>
    {
        return this.http.get<GeoJSON>("./assets/data/points.json");
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