import { PatternAuthor } from "./pattern-author.model";

export interface Pattern {
    pattern_author: PatternAuthor,
    name: string,
    packs: any,
    photos: any,
    sliderImages: any,
    permalink: string,
    difficulty_average: number
}