import got from "got";

export default async function instagramdl(url) {
    const BASE_URL = "https://instasupersave.com/"
    try {
        const resp = await got(BASE_URL);
        const cookie = resp.headers["set-cookie"];
        const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "")
        const config = {
            headers: { 
                'origin': 'https://instasupersave.com', 
                'referer': 'https://instasupersave.com/pt/', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-origin', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 
                'x-xsrf-token': session, 
                'Content-Type': 'application/json', 
                'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
            },
            json : {
                url: url
            }
        };
        const response = await got.post(`${BASE_URL}api/convert`, config)
        let ig = []
        const parsed = JSON.parse(response.body)
        if(Array.isArray(parsed)){
            parsed.forEach(post => { ig.push(post.url[0].url)})
        } else {
            ig.push(parsed.url[0].url)    
        }
        return  {
            results_number : ig.length,
            url_list: ig
        }
    } catch (e) {
        return e.message
    }
}