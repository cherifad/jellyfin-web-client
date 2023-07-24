import People from "@/models/people";
import JellyfinApi from "@/api";

enum ItemType {
    Movie = "Movie",
    Series = "Series",
    Mixed = "Mixed"
}

function getLatest(parentId : String, itemType: ItemType, limit?: Number) {
    var userId = JellyfinApi.getInstance().userId;

    var query = "/Users/" + userId + "/Items/Latest?Recursive=true&ParentId=" + parentId + "&SortBy=DateCreated&SortOrder=Descending&fields=Overview,Tagline,Genres&enableImageTypes=Primary,Backdrop,Thumb";

    if (limit) {
        query += "&Limit=" + limit;
    }

    if (itemType == ItemType.Mixed) {
        query += "&IncludeItemTypes=Movie,Series";
    } else {
        query += "&IncludeItemTypes=" + itemType;
    }

    return JellyfinApi.getInstance().api.get(query);
}

function getResume(parentId : String, limit?: Number) {
    var userId = JellyfinApi.getInstance().userId;

    var query = "/Users/" + userId + "/Items/Resume?Recursive=true&IncludeItemTypes=Movie?ParentId=" + parentId + "&SortBy=DateCreated&SortOrder=Descending&fields=Overview,Tagline,Genres&enableImageTypes=Primary,Backdrop,Thumb";

    if (limit) {
        query += "&Limit=" + limit;
    }

    return JellyfinApi.getInstance().api.get(query);
}

function getStudio(parentId : String, limit?: Number, nameStartsWithOrGreater?: String) {
    var query = "/Studios?ParentId=" + parentId;

    if (limit) {
        query += "&Limit=" + limit;
    } else {
        query += "&Limit=10";
    }

    if (nameStartsWithOrGreater) {
        query += "&NameStartsWithOrGreater=" + nameStartsWithOrGreater;
    } else {
        // random string of 3 characters
        query += "&NameStartsWithOrGreater=" + Math.random().toString(36).substring(2, 5);
    }

    return JellyfinApi.getInstance().api.get(query);
}

function getItemDetails(itemId: String) {
    var userId = JellyfinApi.getInstance().userId;

    var query = "/Users/" + userId + "/Items/" + itemId + "?fields=Overview,Tagline,Genres&enableImageTypes=Primary,Backdrop,Thumb";

    return JellyfinApi.getInstance().api.get(query);
}

function getRecommendations(itemId: String, limit?: Number) {
    var userId = JellyfinApi.getInstance().userId;
    
    var query = "/Items/" + itemId + "/Similar?fields=Overview,Tagline,Genres&enableImageTypes=Primary,Backdrop,Thumb";

    if (userId) {
        query += "&UserId=" + userId;
    }

    if (limit) {
        query += "&Limit=" + limit;
    } else {
        query += "&Limit=10";
    }

    return JellyfinApi.getInstance().api.get(query);
}

function getPeopleMedia(personId: String) {
    var userId = JellyfinApi.getInstance().userId;

    var query = "/Users/" + userId + "/Items?SortOrder=Ascending&IncludeItemTypes=Movie&Recursive=true&Fields=Genres,AudioInfo,ParentId,PrimaryImageAspectRatio,BasicSyncInfo,AudioInfo,ParentId,PrimaryImageAspectRatio,BasicSyncInfo&Limit=10&StartIndex=0&CollapseBoxSetItems=false&SortBy=SortName&PersonIds=" + personId;

    return JellyfinApi.getInstance().api.get(query);
}

async function getPeopleDetails(personId: String) : Promise<People | null> {
    var userId = JellyfinApi.getInstance().userId;

    var query = "/Users/" + userId + "/Items/" + personId;

    const res: any = await JellyfinApi.getInstance().api.get(query);

    if (res.data) {
        return new People(res.data.Id, res.data.Name, res.data.ImageTags.Primary, res.data.Overview, new Date(res.data.PremiereDate), res.data.ProductionLocations[0], res.data.ProviderIds);
    }

    return null;
}

export { getLatest, getResume, getStudio, ItemType, getItemDetails, getRecommendations, getPeopleDetails, getPeopleMedia };