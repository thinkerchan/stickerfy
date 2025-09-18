// 生成单个情绪贴纸的函数
async function generateStickerForEmotion(image, style, emotion, apiKey) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

  const prompt = getStylePrompt(style, emotion);
  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        { inlineData: { mimeType: image.mimeType, data: image.data } }
      ]
    }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };

  let attempt = 0;
  const maxAttempts = 3;
  const initialDelay = 1000;

  while (attempt < maxAttempts) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `API request failed with status ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || errorMessage;
        } catch (e) {
          if (errorText) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

      if (base64Data) {
        return { emotion, imageUrl: `data:image/png;base64,${base64Data}` };
      } else {
        const safetyError = result?.promptFeedback?.blockReason;
        throw new Error(safetyError ? `Generation blocked: ${safetyError}` : 'No image data in response.');
      }
    } catch (err) {
      console.error(`Attempt ${attempt + 1} for emotion '${emotion}' failed:`, err);
      attempt++;
      if (attempt >= maxAttempts) {
        return { emotion, imageUrl: null, error: err.message };
      }
      await new Promise(res => setTimeout(res, initialDelay * Math.pow(2, attempt)));
    }
  }

  return { emotion, imageUrl: null, error: "Max retries reached." };
}

// 获取样式提示的函数
function getStylePrompt(style, emotion) {
  const profilePicInstruction = "The character should be customized based on the attached profile picture.";
  const forceCharacter = "\n\n**Character** The generated character/person/animal must match the features of the person/character/animal in the uploaded reference image. keep the facial feature, hair style...";
  const forceWhiteBackground = "\n\n**Background:** Plain solid white #FFFFFF background only (no background colors/elements)";
  const skinTonePersistence = "ALWAYS PRESERVE the skin tone / hair style and other distict features of the uploaded character/person.";
  const colorPalletPersistence = "First, describe the distinct features and style of the uploaded image in great detail e.g. hair style name, outfit name, and so on. Also, specify the color of each main element using its hexadecimal (HEX) code.";

  let userPrompt = "";

  switch (style) {
    case 'pop-art':
      userPrompt = `Create a single sticker in the distinct Pop Art style. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The image should feature bold, thick black outlines around all figures, objects, and text. Utilize a limited, flat color palette consisting of vibrant primary and secondary colors, applied in unshaded blocks, but maintain the person skin tone. Incorporate visible Ben-Day dots or halftone patterns to create shading, texture, and depth. The subject should display a dramatic expression. Include stylized text within speech bubbles or dynamic graphic shapes to represent sound effects (onomatopoeia). The overall aesthetic should be clean, graphic, and evoke a mass-produced, commercial art sensibility with a polished finish. The user's face from the uploaded photo must be the main character, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
      break;
    case 'claymation':
      userPrompt = `Create a single sticker in the style of a classic claymation character. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The sticker should feature a claymation character where the picture is made to look like it is made from clay, and an interesting claymation landscape in the background, using the playfulness of claymation to exaggerate certain features depending on the emotion, and with clay-like sculpting of the face visible when expressing different emotions, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
      break;
    case 'cartoon-dino':
      userPrompt = `Create a single sticker of an anthropomorphized cartoon dinosaur. ${profilePicInstruction} The character's face, customized from the attached profile picture, must express the emotion: '${emotion}'. The style should be cute and whimsical with bright, cheerful colors and a simple background suitable for a messaging app, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
      break;
    default:
      userPrompt = `Create a sticker of a person expressing '${emotion}' in a ${style} style, based on the uploaded photo.`;
  }

  let fullPrompt = "";
  switch (style) {
    case "vintage-bollywood":
      fullPrompt = colorPalletPersistence + userPrompt + skinTonePersistence;
      break;
    case "cartoon-dino":
      fullPrompt = colorPalletPersistence + userPrompt + forceWhiteBackground;
      break;
    default:
      fullPrompt = colorPalletPersistence + userPrompt + forceCharacter + forceWhiteBackground + skinTonePersistence;
  }

  return fullPrompt;
}

export default async function handler(req, res) {
  // CORS 配置
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, style, emotion } = req.body;

    // 验证请求数据
    if (!image || !image.data || !image.mimeType) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    if (!style) {
      return res.status(400).json({ error: 'Style is required' });
    }

    if (!emotion) {
      return res.status(400).json({ error: 'Emotion is required' });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const result = await generateStickerForEmotion(image, style, emotion, geminiApiKey);
    return res.json(result);

  } catch (error) {
    console.error('Error generating single sticker:', error);
    return res.status(500).json({ error: 'Failed to generate sticker' });
  }
}
