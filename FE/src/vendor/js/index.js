export function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export function formatPhoneNumber(phoneNumber) {
    const regionNumber = "+84";
    const formatedPhoneNumber =
        regionNumber + phoneNumber.toString().slice(1, 11);
    return formatedPhoneNumber;
}
export function reverseFormatPhoneNumber(phoneNumber) {
    const regionNumber = "0";
    const reverseFormatedPhoneNumber =
        regionNumber + phoneNumber.toString().slice(3, 13);
    return reverseFormatedPhoneNumber;
}
