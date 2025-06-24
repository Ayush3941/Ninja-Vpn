export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'fetchFinal' : IDL.Func([IDL.Text], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
