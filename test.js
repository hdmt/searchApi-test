const axios = require('axios');

// API設定
const API_URL = 'https://www.searchapi.io/api/v1/search';
const API_KEY = 'APIキー';

// キーワードとドメイン
const keyword = 'サンプルキーワード'; // 検索したいキーワード
const domain = 'example.com'; // 順位を確認したいドメイン

// 検索順位を取得する関数
async function getRank(keyword, domain) {
  try {
    // APIリクエスト
    const response = await axios.get(API_URL, {
      params: {
        engine: 'google',
        q: keyword,
        api_key: API_KEY,
        num: 100,
      },
    });

    const results = response.data.organic_results || [];

    // 順位をチェック
    for (const result of results) {
      //   console.log(result.link);
      if (result.domain === domain) {
        return {
          position: result.position, // 順位
          url: result.link, // 該当するURL
        };
      }
    }

    return null; // 圏外の場合
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// 実行
getRank(keyword, domain).then((rankInfo) => {
  if (rankInfo) {
    console.log(
      `キーワード「${keyword}」でドメイン「${domain}」は ${rankInfo.position} 位です。`
    );
    console.log(`ランクインしているURL: ${rankInfo.url}`);
  } else {
    console.log(`キーワード「${keyword}」でドメイン「${domain}」は圏外です。`);
  }
});
