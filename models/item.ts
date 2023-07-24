import People from "@/models/people";
import Genre from "@/models/genre";
import Studio from "@/models/studio";

export default class Item {
    id: string; // e.g. "8a8b9c10d11e12f13g14h15i16j17k18l19m20"
    name: string; // e.g. "The Matrix"
    originalName: string; // e.g. "The Matrix"
    primaryImageTag: string; // e.g. "8a8b9c10d11e12f13g14h15i16j17k18l19m20"
    resume: string; // e.g. "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    premierDate: Date; // e.g. "1999-03-31T00:00:00Z"
    criticRating: number; // e.g. 87
    productionLocations: Array<string>; // e.g. ["Australia", "USA"]
    officialRating: string; // e.g. "R"
    tagLines: Array<string>; // e.g. ["Welcome to the Real World", "Free your mind"]
    genres: Array<Genre>; // e.g. ["Action", "Adventure", "Sci-Fi"]
    communityRating: number; // e.g. 8.7
    runningTimeTicks: number; // e.g. 81732000000
    parentId: string; // e.g. "8a8b9c10d11e12f13g14h15i16j17k18l19m20"
    type: string; // e.g. "Movie"
    peoples: Array<People>; // e.g. [People, People, People]
    tags : Array<string>; // e.g. ["Action", "Adventure", "Sci-Fi"]
    studios: Array<Studio>; // e.g. [Studio, Studio, Studio]
    imageTags: Object;
    backdropImageTags: Array<string>; // e.g. ["8a8b9c10d11e12f13g14h15i16j17k18l19m20", "8a8b9c10d11e12f13g14h15i16j17k18l19m20"]

    constructor(id: string, name: string, originalName: string, primaryImageTag: string, resume: string, premierDate: Date, criticRating: number, productionLocations: Array<string>, officialRating: string, tagLines: Array<string>, genres: Array<Genre>, communityRating: number, runningTimeTicks: number, parentId: string, type: string, peoples: Array<People>, tags: Array<string>, studios: Array<Studio>, imageTags: Object, backdropImageTags: Array<string>) {
        this.id = id;
        this.name = name;
        this.originalName = originalName;
        this.primaryImageTag = primaryImageTag;
        this.resume = resume;
        this.premierDate = premierDate;
        this.criticRating = criticRating;
        this.productionLocations = productionLocations;
        this.officialRating = officialRating;
        this.tagLines = tagLines;
        this.genres = genres;
        this.communityRating = communityRating;
        this.runningTimeTicks = runningTimeTicks;
        this.parentId = parentId;
        this.type = type;
        this.peoples = peoples;
        this.tags = tags;
        this.studios = studios;
        this.imageTags = imageTags;
        this.backdropImageTags = backdropImageTags;
    }
}