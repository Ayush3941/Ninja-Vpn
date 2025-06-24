import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import { Base64 = Base64Engine; V2 } "mo:base64";
import Blob "mo:base/Blob";
import Node2 "canister:node2";
import Types "mo:ic";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

actor Node1 {
  private func makeResponse(
    status: Nat,
    bodyText: Text,
    contentType: Text
  ) : Types.HttpRequestResult {
    {
      status = status;
      headers = [{ name = "Content-Type"; value = contentType }];
      body = Text.encodeUtf8(bodyText);
    }
  };

   public query func hello_world() : async Text {
    return "Hello, world from Node1- not 2!";
  };



  // Updated to an update method
  public func http_request(
    req: Types.HttpRequestArgs
  ) : async Types.HttpRequestResult {
    Debug.print("HTTP request received: " # req.url);

    let parts = Iter.toArray(Text.split(req.url, #char '?'));
    if (parts.size() != 2) {
      return makeResponse(400, "Missing query", "text/plain");
    };

    let pairs = Iter.toArray(Text.split(parts[1], #char '&'));
    let maybeParam = Array.find<Text>(pairs, func(p) {
      Text.startsWith(p, #text "url=")
    });

    switch (maybeParam) {
      case null {
        return makeResponse(400, "Missing url param", "text/plain");
      };
      case (?kv) {
        let kvParts = Iter.toArray(Text.split(kv, #char '='));
        if (kvParts.size() < 2) {
          return makeResponse(400, "Invalid url format", "text/plain");
        };
        let encoded = kvParts[1];

        let base64 = Base64Engine(#v V2, ?false);
        if (not base64.isValid(encoded)) {
          return makeResponse(400, "Invalid Base64", "text/plain");
        };

        try {
          // Allowed in an update method
          let result = await Node2.forward(encoded);
          return {
            status = 200;
            headers = [
              { name = "Content-Type"; value = "text/html" },
              { name = "Cache-Control"; value = "no-cache" }
            ];
            body = Text.encodeUtf8(result);
          };
        } catch (err) {
          Debug.print("Forward error: " # Error.message(err));
          return makeResponse(500, "Internal error", "text/plain");
        };
      };
    };
  };
}
