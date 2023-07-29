function distanceToBar(currentLocation, barCoords) {
    const lat1 = currentLocation.latitude;
    const lon1 = currentLocation.longitude;
    const lat2 = barCoords[1];
    const lon2 = barCoords[0];

    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        let radlat1 = (Math.PI * lat1) / 180;
        let radlat2 = (Math.PI * lat2) / 180;
        let theta = lon1 - lon2;
        let radtheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }
}
function roundToTwoDigits(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}
function createLinkToGoogleMaps(destinationPoint, location) {
    const toPoint = `${destinationPoint[1]},${destinationPoint[0]}`;
    const fromPoint = `${location.latitude},${location.longitude}`;
    const url = `https://www.google.com/maps/dir/${fromPoint}/${toPoint}`;
    return url;
}

export { distanceToBar, roundToTwoDigits, createLinkToGoogleMaps };
