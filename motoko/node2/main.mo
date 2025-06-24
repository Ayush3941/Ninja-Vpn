import Node3 "canister:node3";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

actor Node2 {

  // Forward the encoded URL to Node3 for final processing
  public func forward(encodedUrl: Text): async Text {
    Debug.print("Node2 forwarding encoded URL to Node3");

    try {
      let result = await Node3.fetchFinal(encodedUrl);
      Debug.print("Node2 received response from Node3");
      result
    } catch (error) {
      Debug.print("Node2 error: " # Error.message(error));
      "Forwarding error: " # Error.message(error)
    }
  };
}
