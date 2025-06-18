import Text "mo:base/Text";
import { Base64 = Base64Engine; V2 } "mo:base64";
import Blob "mo:base/Blob";
import IC "mo:ic";
import Cycles "mo:base/ExperimentalCycles";

actor Node3 {

  public func fetchFinal(encodedUrl: Text): async Text {
    let base64 = Base64Engine(#v V2, ?false);
    if (not base64.isValid(encodedUrl)) {
      return "Invalid Base64";
    };
    let decoded = Blob.fromArray(base64.decode(encodedUrl));
    let url = switch (Text.decodeUtf8(decoded)) {
        case null return "Decode error";
        case (?v) v;
    };
    let request: IC.HttpRequestArgs = {
      url = url;
      method = #get;
      headers = [];
      body = null;
      max_response_bytes = ?10000;
      transform = null;
    };


    Cycles.add<system>(200_000_000);

    let response = await IC.ic.http_request(request);

    switch (Text.decodeUtf8(response.body)) {
      case null return "Invalid UTF8";
      case (?v) return v;
    };
  }
}
