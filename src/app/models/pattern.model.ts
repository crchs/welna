import { Designer } from "./designer.model";
import { Photo } from "./photo.model";

export interface Pattern {
    designer: Designer,
    first_photo: Photo,		
    id: number,	
    name: string,		
    permalink: string
}