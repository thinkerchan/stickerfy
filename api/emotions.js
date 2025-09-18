const emotions = [
  { key: 'Happy', en: 'Happy', ja: 'ハッピー', zh: '开心' },
  { key: 'Sad', en: 'Sad', ja: '悲しい', zh: '伤心' },
  { key: 'Angry', en: 'Angry', ja: '怒り', zh: '生气' },
  { key: 'Surprised', en: 'Surprised', ja: '驚き', zh: '惊喜' },
  { key: 'Laughing', en: 'Laughing', ja: '笑い', zh: '大笑' },
  { key: 'Love', en: 'Love', ja: '愛', zh: '爱心' },
  { key: 'Winking', en: 'Winking', ja: 'ウインク', zh: '眨眼' },
  { key: 'Confused', en: 'Confused', ja: '混乱', zh: '困惑' },
  { key: 'Sleepy', en: 'Sleepy', ja: '眠い', zh: '困倦' },
  { key: 'Crying', en: 'Crying', ja: '泣く', zh: '哭泣' },
  { key: 'Shy', en: 'Shy', ja: '恥ずかしい', zh: '害羞' },
  { key: 'Sick', en: 'Sick', ja: '病気', zh: '生病' },
  { key: 'Hungry', en: 'Hungry', ja: '餓い', zh: '饥饿' },
  { key: 'Thirsty', en: 'Thirsty', ja: '渇い', zh: '口渴' },
  { key: 'Bored', en: 'Bored', ja: '退屈', zh: '无聊' },
  { key: 'Stressed', en: 'Stressed', ja: 'ストレス', zh: '压力' },
  { key: 'Excited', en: 'Excited', ja: '興奮', zh: '兴奋' },
  { key: 'Relaxed', en: 'Relaxed', ja: 'リラックス', zh: '放松' }
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