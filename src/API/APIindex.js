class Helper {
    static baseURL(){
        return "https://api.foursquare.com/v2"
    }

    static auth(){
        const keys = {
            client_id: "VJDFLA50R3APBBVQMBZQ4EZKIG5LERLAYZF1EC5CYHK1AZ2P",
            client_secret: "RSLIAHUYURS32RIPTKRR30QSU4F5SYKAYUX042PKYJPSB4U2",
            v: "20181102"
        };
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join("&");
    }
    static urlBuider(urlPrams) {
        tf (!urlPrans) {
            return "";
        }
        return Object.keys(urlPrams)
        .map(key => `${key}=${urlPrams[key]}`)
        .join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    static simpleFetch(endPoint, method, urlPrams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch (
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlPrams
            )}`,
            requestData
        ).then(res => res.json());

    }

} 
export default class SquareAPI {
    static search(urlPrams) {
        return Helper.simpleFetch("/venues/search", "GET", urlPrams);
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET");

    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}