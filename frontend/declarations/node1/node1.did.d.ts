import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpRequestArgs {
  'url' : string,
  'method' : { 'get' : null } |
    { 'head' : null } |
    { 'post' : null },
  'max_response_bytes' : [] | [bigint],
  'body' : [] | [Uint8Array | number[]],
  'transform' : [] | [
    { 'function' : [Principal, string], 'context' : Uint8Array | number[] }
  ],
  'headers' : Array<HttpHeader>,
}
export interface HttpRequestResult {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface _SERVICE {
  'hello_world' : ActorMethod<[], string>,
  'http_request' : ActorMethod<[HttpRequestArgs], HttpRequestResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
