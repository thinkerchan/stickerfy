const emotions = [
  { key: 'Happy', en: 'Happy', ja: 'ハッピー', zh: '开心' },
  { key: 'Sad', en: 'Sad', ja: '悲しい', zh: '伤心' },
  { key: 'Angry', en: 'Angry', ja: '怒り', zh: '生气' },
  { key: 'Surprised', en: 'Surprised', ja: '驚き', zh: '惊喜' },
  { key: 'Laughing', en: 'Laughing', ja: '笑い', zh: '大笑' },
  { key: 'Love', en: 'Love', ja: '愛', zh: '爱心' },
  { key: 'Winking', en: 'Winking', ja: 'ウインク', zh: '眨眼' },
  { key: 'Confused', en: 'Confused', ja: '混乱', zh: '困惑' }
];

module.exports = async (req, res) => {
  // CORS 配置
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.json(emotions);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};