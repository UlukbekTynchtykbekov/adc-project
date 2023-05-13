import {request} from "../utils/axios-utils";
import {useMutation, useQuery, useQueryClient} from "react-query";

const fetchCompany = () => {
    return request({url: `/api/company`, method: 'GET'});
}
export const useCompanyData = () => {
    return useQuery("companies", fetchCompany);
}

const fetchSingleCompany = ({queryKey}) => {
    const companyId = queryKey[1]
    return request({url: `/api/company/${companyId}`, method: 'GET'});
}
export const useSingleCompanyData = (companyId) => {
    return useQuery( ["company", companyId], fetchSingleCompany, {
        enabled: !!companyId
    });
}

const fetchUpdateCompany = (company) => {
    const updatedCompany = {...company};
    delete company.companyId
    return request({url: `/api/company/${updatedCompany.companyId}`, method: 'PUT', data: company})
}

export const useUpdateCompany = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateCompany, {
        onSuccess: () => {
            queryClient.invalidateQueries("companies");
            onSuccess('Компания успешно обновлена')
        },
        onError: () => {
            onError('Не удалось обновить обновление')
        }
    });
}