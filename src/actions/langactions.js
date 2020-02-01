export const LangSelected = (lang) => {
  return {
    type: 'Lang_Changed',
    lang: lang,
  };
};
export const LangSetup = (lang, type) => {
  return {
    type: 'Lang_Setup',
    lang: lang,
    type: type,
  };
};
export const token = (token, type) => {
  return {
    type: 'Add_Token',
    payload: token,
    type: type,
  };
};

export const register = (name, number, image64) => {
  return {
    type: 'Add_name',
    name: name,
    number: number,
    image64: image64,
  };
};
export const addProfile = (name, token) => {
  return {
    type: 'Add_profile',
    name: name,
    token: token,
  };
};
