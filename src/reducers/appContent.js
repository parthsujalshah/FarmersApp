const INITIAL_STATE = {
  lang: 'en',
  name: '',
  pan_no: '',
  token: '',
  number: '',
  image64: '',
  type: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'Lang_Changed':
      return {...INITIAL_STATE, lang: action.lang};
    case 'Lang_Setup':
      return {...INITIAL_STATE, lang: action.lang, type: action.type};
    case 'Add_Token':
      return {...INITIAL_STATE, token: action.token, type: action.type};
    case 'Add_name':
      return {
        ...INITIAL_STATE,
        name: action.name,
        number: action.number,
        image64: action.image64,
      };
    case 'Add_profile':
      return {...INITIAL_STATE, name: action.name, token: action.token};
    default:
      return state;
  }
};
