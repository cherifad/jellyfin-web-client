import JellyfinApi from "../";
import { useAuthStore } from "@/stores/useAuth";

const apiInstance = JellyfinApi.getInstance().api;

function search(
    searchTerm: String, 
    limit?: Number, 
    includeItemTypes?: Array<String>, 
    excludeItemTypes?: Array<String>, 
    isMovie?: Boolean, 
    isSeries?: Boolean,
    isKids?: Boolean,
    includePeople?: Boolean,
    includeGenres?: Boolean,
    includeStudios?: Boolean,
    includeArtists?: Boolean) 
    {
        const authStore = useAuthStore();
    var query = "/Users/" + authStore.userIdValue + "/Items?SearchTerm=" + searchTerm + "&Recursive=true&IncludeItemTypes=Movie";

    if (limit) {
        query += "&Limit=" + limit;
    }
    if (includeItemTypes) {
        for (var i = 0; i < includeItemTypes.length; i++) {
            query += "&IncludeItemTypes=" + includeItemTypes[i];
        }
    }
    if (excludeItemTypes) {
        for (var i = 0; i < excludeItemTypes.length; i++) {
            query += "&ExcludeItemTypes=" + excludeItemTypes[i];
        }
    }
    if (isMovie) {
        query += "&IsMovie=" + isMovie;
    }
    if (isSeries) {
        query += "&IsSeries=" + isSeries;
    }
    if (isKids) {
        query += "&IsKids=" + isKids;
    }
    if (includePeople) {
        query += "&IncludePeople=" + includePeople;
    }
    if (includeGenres) {
        query += "&IncludeGenres=" + includeGenres;
    }
    if (includeStudios) {
        query += "&IncludeStudios=" + includeStudios;
    }
    if (includeArtists) {
        query += "&IncludeArtists=" + includeArtists;
    }

    return apiInstance.get(query);
}

export { search };