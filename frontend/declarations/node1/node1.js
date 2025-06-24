export const canisterId = "owyeu-jiaaa-aaaam-qdvwq-cai";
import { IDL } from '@dfinity/candid';

export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    hello_world: IDL.Func([], [IDL.Text], ['query']),
  });
};
