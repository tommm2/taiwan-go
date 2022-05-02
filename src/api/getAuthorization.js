import jsSHA from "jssha";

export function getAuthorizationHeader() {
  //  填入TDX ID、KEY
  let AppID = "37ee7f0864de4f919e901787379f20d5";
  let AppKey = "2cHPotJCjlcNsKWNqvyozqEBD1Y";

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);

  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
