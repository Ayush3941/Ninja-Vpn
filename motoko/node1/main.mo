import Text "mo:base/Text";
import { Base64 = Base64Engine; V2 } "mo:base64";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Node2 "canister:node2";
import Types "mo:ic";

actor Node1 {

  // Helper to create a standard HTTP response with correct header format


  func makeResponse(status: Nat, bodyText: Text, contentType: Text) : Types.HttpRequestResult {
    {
      status = status;
      headers = [{name = "Content-Type"; value = contentType}];
      body = Text.encodeUtf8(bodyText);
    }
  };

  // Removed 'query' modifier to allow inter-canister calls
  // Added proper async return type as required by shared functions


  public func http_request(req: Types.HttpRequestArgs) : async Types.HttpRequestResult {

    let parts = Iter.toArray(Text.split(req.url, #char '?'));

    if (parts.size() < 2) {
      return makeResponse(400, "Missing URL query", "text/plain");
    };

    let queryString : Text = parts[1];

    let pairs : [Text] = Iter.toArray(Text.split(queryString, #char '&'));

  
    let match : ?Text = Array.find<Text>(pairs, func(p : Text) : Bool {
      Text.startsWith(p, #text "url=")
    });

    switch (match) {
      case null {
        return makeResponse(400, "Missing 'url' param", "text/plain");
      };
      case (?kv) {
        let splitKv : [Text] = Iter.toArray(Text.split(kv, #char '='));
        let encoded : Text = if (splitKv.size() > 1) { splitKv[1] } else { "" };

        // Now can use 'await' since this is not a query function
        let responseText : Text = await Node2.forward(encoded);

        return {
          status = 200;
          headers = [{name = "Content-Type"; value = "text/html"}];
          body = Text.encodeUtf8(responseText);
        };
      };
    };
  }
}
