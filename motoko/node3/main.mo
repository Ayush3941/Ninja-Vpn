import Text "mo:base/Text";
import { Base64 = Base64Engine; V2 } "mo:base64";
import Blob "mo:base/Blob";
import IC "mo:ic";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

actor Node3 {

  // Transform function for HTTP outcalls to ensure consensus
  public query func transform(args: {
    context: Blob;
    response: IC.HttpRequestResult;
  }) : async IC.HttpRequestResult {
    {
      status = args.response.status;
      body = args.response.body;
      headers = []; // Remove headers to avoid consensus issues
    }
  };

  // Fetch content from the decoded URL using HTTP outcalls
  public func fetchFinal(encodedUrl: Text): async Text {
    Debug.print("Node3 processing encoded URL");

    // Validate URL format (basic check)
    let proxyUrl = "https://proxy-hdqykq.fly.dev/?url=" # encodedUrl;
    // Prepare HTTP request
    let httpRequest: IC.HttpRequestArgs = {
      url = proxyUrl;
      method = #get;
      headers = [
        { name = "User-Agent"; value = "IC-HTTP-Proxy/1.0" }
      ];
      body = null;
      max_response_bytes = ?2000000; // ✅ Max allowed by IC
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    // Add cycles for HTTP outcall
    Cycles.add<system>(21_000_000_000); // ~21B cycles

    try {

      let httpResponse = await IC.ic.http_request(httpRequest);

      Debug.print("HTTP response status: " # debug_show(httpResponse.status));

      // Handle different status codes
      if (httpResponse.status >= 400) {
        return "HTTP Error " # debug_show(httpResponse.status);
      };

      // Decode response body
      switch (Text.decodeUtf8(httpResponse.body)) {
        case null {
          Debug.print("Failed to decode response body as UTF-8");
          return "Error: Response contains invalid UTF-8";
        };
        case (?responseText) {
          Debug.print("Successfully fetched content (" # debug_show(responseText.size()) # " characters)");
          responseText
        };
      };
    } catch (error) {
      Debug.print("HTTP outcall failed: " # Error.message(error));
      "Error: HTTP request failed - " # Error.message(error)
    };
  };
}
