export default class People {
    id: string;
    name: string;
    primaryImageTag: string;
    resume: string;
    birthDate: Date;
    deathDate: Date | undefined;
    birthPlace: string;
    providerIds: Object;

    constructor(id: string, name: string, primaryImageTag: string, resume: string, birthDate: Date, birthPlace: string, providerIds: Object, deathDate?: Date) {
        this.id = id;
        this.name = name;
        this.primaryImageTag = primaryImageTag;
        this.resume = resume;
        this.birthDate = birthDate;
        this.birthPlace = birthPlace;
        this.providerIds = providerIds;
        this.deathDate = deathDate;
    }
}