export const idlFactory = ({ IDL }) => {
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpRequestResult = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  return IDL.Service({
    'fetchFinal' : IDL.Func([IDL.Text], [IDL.Text], []),
    'transform' : IDL.Func(
        [
          IDL.Record({
            'context' : IDL.Vec(IDL.Nat8),
            'response' : HttpRequestResult,
          }),
        ],
        [HttpRequestResult],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
