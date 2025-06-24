export const idlFactory = ({ IDL }) => {
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpRequestResult = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const HttpRequestArgs = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Variant({
      'get' : IDL.Null,
      'head' : IDL.Null,
      'post' : IDL.Null,
    }),
    'max_response_bytes' : IDL.Opt(IDL.Nat64),
    'body' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'transform' : IDL.Opt(
      IDL.Record({
        'function' : IDL.Func(
            [
              IDL.Record({
                'context' : IDL.Vec(IDL.Nat8),
                'response' : HttpRequestResult,
              }),
            ],
            [HttpRequestResult],
            ['query'],
          ),
        'context' : IDL.Vec(IDL.Nat8),
      })
    ),
    'headers' : IDL.Vec(HttpHeader),
  });
  return IDL.Service({
    'hello_world' : IDL.Func([], [IDL.Text], ['query']),
    'http_request' : IDL.Func([HttpRequestArgs], [HttpRequestResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
