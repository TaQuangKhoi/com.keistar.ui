import {default as axios, getBaseUrl} from "@/lib/axios-instance";

interface Filter {
    [key: string]: string;
}

/**
 *
 * @param businessDataType Business Data Type, Example: com.company.model.Employee
 * @param q Named query to use,
 *          Example: q=searchEmployeeByFirstNameAndLastName
 * @param p index of the page to display,
 *          Example: p=0
 * @param c maximum number of elements to retrieve,
 *          Example: c=10
 * @param filter can filter on attributes with the format f={filter_name}={filter_value}
 *               with the name/value pair as url encoded string.
 *               Example: f=firstName=John
 */
export default async function findsBusinessData(
    // Path parameters
    businessDataType: string,
    // Query parameters
    q: string,
    p: number,
    c: number,
    filter: Filter = {},
    d: string = '',
) {
    let url = getBaseUrl('/API/bdm/businessData/')
        + businessDataType + '?q=' + q + '&p=' + p + '&c=' + c + '&d=' + d;

    if (Object.keys(filter).length > 0) {
        url += '&f='
        const f = Object.keys(filter).map((key) => {
            return key + '=' + filter[key];
        })
        url += f.join('&f=')
    }

    return await axios.get(url, {
        // withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}