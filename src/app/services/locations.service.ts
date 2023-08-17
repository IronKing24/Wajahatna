import { Injectable } from "@angular/core";
import { Feature, FeatureCollection, Point, GeoJsonProperties } from "geojson";
import JordanPoints from "src/assets/data/points.json" 

@Injectable() 
export class LocationsService {
    private locations: Feature<Point, GeoJsonProperties>[] = [];
    
    constructor(){
        const points : FeatureCollection<Point> =  JordanPoints as FeatureCollection<Point>;
        this.locations = points.features;
    }

    getLocations(): Feature<Point, GeoJsonProperties>[] 
    {
        return this.locations;
    }

    filter(type: string, value: string): Feature<Point, GeoJsonProperties>[] 
    {
        return this.locations.filter((d: Feature<Point>) => d.properties?.[type] === value);
    }

    search(name: string | null)
    {
        if(name === null)
        {
            return this.locations
        }
        else
        {
            return this.locations.filter((d: Feature<Point>) => d.properties?.['name'].toLowerCase().includes(name?.toLowerCase()));
        }
    }
}