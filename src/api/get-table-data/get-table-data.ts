import { GetTableDataRequestParams } from './dto/get-table-data-request-params';
import { GetTableDataResponse } from './dto/get-table-data-response';
import {
  QueryParamModel,
  createStringWithQueryParams,
} from '../../helpers/createStringWithURLParams';

export const getTableData = async (
  params: GetTableDataRequestParams
): Promise<GetTableDataResponse> => {
  const queryParams: QueryParamModel[] = Object.keys(
    params
  ).map<QueryParamModel>((param) => ({
    name: param,
    //@ts-ignore
    value: params[param],
  }));
  const queryString = createStringWithQueryParams(queryParams);

  return await fetch(`/getTableData?${queryString}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => res);
};
