import fetch from 'node-fetch'

export default async function tiktokdl(url) {
  let results;
  const Now = Date.now();
  const valid = await getAwemeId(url);
  if (valid) {
    const data = await fetch(API_URL(valid), {
        headers: {
          "Accept-Encoding": "deflate",
          "User-Agent": "okhttp/3.14.9",
        },
      });
    const body = await data.json();
    if (body && body.aweme_list) {
      const obj = body.aweme_list.find((o) => o.aweme_id === valid);
      results = {
        status: true,
        process_time: Now - Date.now(),
        aweme_id: obj.aweme_id,
        region: obj.region,
        desc: obj.desc,
        create_time: obj.create_time,
        author: {
          uid: obj.author.uid,
          unique_id: obj.author.unique_id,
          nickname: obj.author.nickname,
          birthday: obj.author.birthday,
        },
        duration: obj.music.duration,
        download: {
          nowm: obj.video.play_addr.url_list[0],
          wm: obj.video.download_addr.url_list[0],
          music: obj.music.play_url.url_list[0],
          music_info: {
            id: obj.music.id,
            title: obj.music.title,
            author: obj.music.author,
            is_original: obj.music.is_original,
            cover_hd: obj.music.cover_hd.url_list[0],
            cover_large: obj.music.cover_large.url_list[0],
            cover_medium: obj.music.cover_medium.url_list[0],
          },
        },
      };
    } else {
      results = { status: false };
    }
  } else {
    results = { status: false };
  }
  return results;
}

const getAwemeId = async (url) => {
  // any :/
  let result;
  const Konto1 = /video\/([\d|\+]+)?\/?/;
  const valid = url.match(Konto1);
  if (valid) {
    return valid[1];
  } else {
    try {
      const data = await fetch(url, {
          headers: {
            "Accept-Encoding": "deflate",
          },
          redirect: 'manual',
        });
      if (data) {
        const _url = data.headers.get('location');
        const _valid = _url.match(Konto1);
        if (_valid) {
          result = _valid[1];
        } else {
          result = false;
        }
      } else {
        result = false;
      }
    } catch (error) {
      // console.log(error)
      result = false;
    }
  }
  return result;
};

const API_URL = (aweme) => {
  return `https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${aweme}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=TikMate%20Downloader&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`;
};