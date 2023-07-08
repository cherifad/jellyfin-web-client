import JellyfinApi from "..";

const apiInstance = JellyfinApi.getInstance().api;

enum ImageType {
    Primary = "Primary",
    Art = "Art",
    Backdrop = "Backdrop",
    Banner = "Banner",
    Logo = "Logo",
    Thumb = "Thumb",
    Disc = "Disc",
    Box = "Box",
    Screenshot = "Screenshot",
    Menu = "Menu",
    Chapter = "Chapter",
    BoxRear = "BoxRear",
    Profile = "Profile"
}

function getImages(itemId: String, imageType: ImageType, imageTag: String, maxWidth?: Number, maxHeight?: Number) {
    var query = "Items/" + itemId + "/Images/" + imageType;

    if (maxWidth) {
        query += "?maxWidth=" + maxWidth;
    }
    if (maxHeight) {
        query += "?maxHeight=" + maxHeight;
    }

    return apiInstance.get(query);
}

export { getImages, ImageType };