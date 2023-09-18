interface QueryParamModel {
  name: string;
  value: string;
}

export const createStringWithQueryParams = (params: QueryParamModel[]) => {
  const queryParamsArray = params.reduce<string[]>(
    (acc, currentValue) => [
      ...acc,
      `${currentValue.name}=${currentValue.value}`,
    ],
    []
  );

  return queryParamsArray.join('&');
};
