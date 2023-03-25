import fetch from 'node-fetch'

export default async function instagramGetUrl(url_media) {
  const BASE_URL = 'https://instasupersave.com/';

  try {
    // Fetch the page to get the cookie
    const resp = await fetch(BASE_URL);
    const cookie = resp.headers.get('set-cookie');
    const session = cookie
      .split(';')[0]
      .replace('XSRF-TOKEN=', '')
      .replace('%3D', '');

    // Set up the request
    const options = {
      method: 'post',
      headers: {
        origin: 'https://instasupersave.com',
        referer: 'https://instasupersave.com/pt/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
        'x-xsrf-token': session,
        'Content-Type': 'application/json',
        Cookie: `XSRF-TOKEN=${session}; instasupersave_session=${session}`,
      },
      body: JSON.stringify({ url: url_media }),
    };

    // Make the request
    const response = await fetch(`${BASE_URL}api/convert`, options);
    const data = await response.json();

    // Extract the URLs from the response
    const url_list = [];
    if (Array.isArray(data)) {
      data.forEach((post) => {
        url_list.push(post.sd === undefined ? post.thumb : post.sd.url);
      });
    } else {
      url_list.push(data.url[0].url);
    }

    return {
      results_number: url_list.length,
      url_list,
    };
  } catch (e) {
    throw e.message;
  }
}