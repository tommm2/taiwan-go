import jsSHA from "jssha";

export function getAuthorizationHeader() {
  //  填入TDX ID、KEY
  let AppID = "xxxxxxxxxxxxxxxxxxxxxxxxxx";
  let AppKey = "xxxxxxxxxxxxxxxxxxxxxxxxxx";

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
