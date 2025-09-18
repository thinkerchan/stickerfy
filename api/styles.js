const styleOptions = [
  {
    id: 'pop-art',
    en: 'Pop Art',
    ja: 'ポップアート',
    zh: '波普艺术',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pop_art_love.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pop_art_love_out.png'
  },
  {
    id: 'japanese-matchbox',
    en: 'Retro Japanese Matchbox',
    ja: 'レトロマッチ箱',
    zh: '日本复古火柴盒',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/matchbox.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/matchbox_out.png'
  },
  {
    id: 'cartoon-dino',
    en: 'Cartoon Dino',
    ja: '恐竜漫画',
    zh: '卡通恐龙',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/dragon.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/dragon_out.png'
  },
  {
    id: 'pixel-art',
    en: 'Pixel Art',
    ja: 'ピクセルアート',
    zh: '像素艺术',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pixel.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pixel_out.png'
  },
  {
    id: 'royal',
    en: 'Royal',
    ja: '王室',
    zh: '皇室风格',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/royal.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/royal_out.png'
  },
  {
    id: 'football-sticker',
    en: 'Football Sticker',
    ja: 'サッカーシール',
    zh: '足球贴纸',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/football.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/football_out.png'
  },
  {
    id: 'claymation',
    en: 'Claymation',
    ja: 'クレイアニメ',
    zh: '黏土动画',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/claymation.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/claymation_out.png'
  },
  {
    id: 'vintage-bollywood',
    en: 'Vintage Bollywood',
    ja: 'ボリウッド',
    zh: '复古宝莱坞',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bolly.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bolly_out.png'
  },
  {
    id: 'sticker-bomb',
    en: 'Sticker Bomb',
    ja: 'ステッカーボム',
    zh: '贴纸炸弹',
    imgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bomb.png',
    selectedImgUrl:
      'https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bomb_out.png'
  },
  {
    id: 'initial-d',
    en: 'Initial D Style',
    ja: '头文字D漫画风格',
    zh: '头文字D风格',
    imgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBM2jKbchAfueLeEO3lJioGRR4kb9fAAJGGgACpKdYVi9HKvFmvBP6NgQ.png',
    selectedImgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBM2jKbchAfueLeEO3lJioGRR4kb9fAAJGGgACpKdYVi9HKvFmvBP6NgQ.png',
    hidden: true
  },
  {
    id: 'slam-dunk',
    en: 'Slam Dunk Style',
    ja: '灌篮高手漫画风格',
    zh: '灌篮高手风格',
    imgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNGjKbgoaeBoNv4NqcQPu4-iiVYQtAAJHGgACpKdYVgqmTKcNGtjaNgQ.png',
    selectedImgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNGjKbgoaeBoNv4NqcQPu4-iiVYQtAAJHGgACpKdYVgqmTKcNGtjaNgQ.png',
    hidden: true
  },
  {
    id: 'doraemon',
    en: 'Doraemon Style',
    ja: '哆啦A梦漫画风格',
    zh: '哆啦A梦风格',
    imgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNWjKbm-mtIW8X2ahnCsJETATlI5rAAJJGgACpKdYViC6IU-a--EUNgQ.png',
    selectedImgUrl:
      'https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNWjKbm-mtIW8X2ahnCsJETATlI5rAAJJGgACpKdYViC6IU-a--EUNgQ.png',
    hidden: true
  }
]

export default async function handler(req, res) {
  // CORS 配置
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    return res.json(styleOptions)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
