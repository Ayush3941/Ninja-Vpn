import Node3 "canister:node3";

actor Node2 {
  public func forward(encodedUrl: Text): async Text {
    let result = await Node3.fetchFinal(encodedUrl);
    return result;
  }
}
