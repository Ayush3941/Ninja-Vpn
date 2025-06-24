export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'forward' : IDL.Func([IDL.Text], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
