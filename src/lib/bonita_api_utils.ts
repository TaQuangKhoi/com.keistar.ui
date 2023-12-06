export async function getSession() {
    let url = 'http://localhost:28071/bonita/API/system/session/unusedId'
    let result = null
    let status = null

    await fetch(url,
        {
            credentials: "include",
            mode: 'cors',
        }
    ).then(response => {
        status = response.status
        return response.json();
    }).then(
        data => {
            result = data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
    return [result, status];
}