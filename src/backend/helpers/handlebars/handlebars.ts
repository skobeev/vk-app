export const getHandlebarsHelpers = () => {
  return {
    if_eq: function (a: any, b: any) {
      return a == b;
    },
  };
};
