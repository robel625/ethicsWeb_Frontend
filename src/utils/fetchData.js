import axios from 'axios'

export const postDataAPI = async (url, post) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/${url}`, post, 
        {
            headers: {'Content-Type': 'multipart/form-data',
                "X-Security-Token": process.env.REACT_APP_DjangoXSecurity
            }
    })
    return res;
}