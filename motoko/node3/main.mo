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

    // Initialize Base64 decoder
    let base64 = Base64Engine(#v V2, ?false);

    // Validate Base64 format
    if (not base64.isValid(encodedUrl)) {
      Debug.print("Invalid Base64 format");
      return "Error: Invalid Base64 encoding";
    };

    // Decode Base64 to get the actual URL
    let decodedBytes = base64.decode(encodedUrl);
    let decodedBlob = Blob.fromArray(decodedBytes);

    let url = switch (Text.decodeUtf8(decodedBlob)) {
      case null {
        Debug.print("Failed to decode UTF-8");
        return "Error: Invalid UTF-8 in decoded URL";
      };
      case (?decodedUrl) {
        Debug.print("Decoded URL: " # decodedUrl);
        decodedUrl
      };
    };

    // Validate URL format (basic check)
    if (not Text.startsWith(url, #text "https://")) {
      return "Error: Only HTTPS URLs are supported";
    };

    // Prepare HTTP request
    let httpRequest: IC.HttpRequestArgs = {
      url = url;
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
      Debug.print("Making HTTP outcall to: " # url);
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
