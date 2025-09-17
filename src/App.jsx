import React, { useState, useCallback, useEffect, useRef } from 'react';

// --- Helper Components & Icons ---

// Icon for Upload
const UploadCloud = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

// Icon for Loading Spinner
const LoaderCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Icon for Error Alert
const AlertTriangle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

// Icon for Camera
const CameraIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

// Icon for Regenerate
const RefreshIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 2v6h6"/>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"/>
        <path d="M21 22v-6h-6"/>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
    </svg>
);

// Icon for Download
const DownloadIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

// Icon for Chevron Left
const ChevronLeft = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>
);

// Icon for Chevron Right
const ChevronRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>
);

// Icon for closing
const XIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Camera Modal Component ---
const CameraModal = ({ show, onClose, onCapture, videoRef, t }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-3xl relative">
        <h3 className="text-xl font-semibold mb-4 text-center">{t('cameraModalTitle')}</h3>
        <video ref={videoRef} autoPlay playsInline className="w-full rounded-md h-auto"></video>
        <div className="flex justify-center mt-6 space-x-4">
          <button onClick={onCapture} className="p-4 bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
             <CameraIcon className="w-8 h-8"/>
          </button>
        </div>
         <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition">
            <XIcon className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

// --- Image Modal Component ---
const ImageModal = ({ show, onClose, imageUrl, t }) => {
  if (!show || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative p-4">
        <img src={imageUrl} alt={t('enlargedStickerAlt')} className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl" />
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute -top-2 -right-2 p-2 bg-white rounded-full text-black hover:bg-gray-200 transition">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// --- API Key Modal Component ---
const ApiKeyModal = ({ show, onClose, onSave, t }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert(t('apiKeyInvalid'));
      return;
    }
    setIsLoading(true);
    onSave(apiKey.trim());
    setIsLoading(false);
  };

  const handleClose = () => {
    setApiKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{t('apiKeyRequired')}</h3>

        <p className="text-gray-600 mb-4 text-sm">{t('apiKeyPrompt')}</p>

        <div className="mb-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={t('apiKeyPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div className="mb-4">
          <a
            href={t('apiKeyHelpLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            {t('apiKeyHelp')} →
          </a>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '...' : t('saveKey')}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sticker Sheet Modal Component ---
const StickerSheetModal = ({ show, onClose, stickers, uploadedImage, isIOS, isAndroid, t }) => {
  const sheetContentRef = useRef(null);
  const [isRenderingSheet, setIsRenderingSheet] = useState(false);
  const [staticSheetUrl, setStaticSheetUrl] = useState(null);

  const isMobile = isIOS || isAndroid;

  const renderStaticSheet = useCallback(async () => {
    if (!isMobile || staticSheetUrl) return;

    setIsRenderingSheet(true);

    const happySticker = stickers.find(s => s.emotion === 'Happy' && s.imageUrl);
    const laughingSticker = stickers.find(s => s.emotion === 'Laughing' && s.imageUrl);
    const surprisedSticker = stickers.find(s => s.emotion === 'Surprised' && s.imageUrl);
    const gridStickers = stickers.filter(s => s.imageUrl).slice(0, 8);

    if (gridStickers.length === 0) {
      setIsRenderingSheet(false);
      return;
    }

    try {
        const sourcesToLoad = [
            uploadedImage,
            happySticker?.imageUrl,
            laughingSticker?.imageUrl,
            surprisedSticker?.imageUrl,
            ...gridStickers.map(s => s.imageUrl)
        ].filter(Boolean);
        const uniqueSources = [...new Set(sourcesToLoad)];

        const loadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = (_err) => reject(new Error(`Failed to load image: ${src.substring(0, 50)}...`));
            img.src = src;
        });

        const loadedImages = await Promise.all(uniqueSources.map(loadImage));
        const imageMap = Object.fromEntries(uniqueSources.map((src, i) => [src, loadedImages[i]]));

        const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            const newWidth = srcWidth * ratio;
            const newHeight = srcHeight * ratio;
            return {
                width: newWidth,
                height: newHeight,
                x: (maxWidth - newWidth) / 2,
                y: (maxHeight - newHeight) / 2,
            };
        };

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const padding = 40 * dpr;
        const stickerSize = 200 * dpr;
        const stickerGap = 20 * dpr;
        const headerHeight = 150 * dpr;
        const footerHeight = 100 * dpr;
        const gridWidth = (stickerSize * 4) + (stickerGap * 3);
        const gridHeight = (stickerSize * 2) + stickerGap;
        const gridFooterGap = 40 * dpr; // Added space between sticker grid and footer

        canvas.width = gridWidth + padding * 2;
        canvas.height = headerHeight + gridHeight + footerHeight + padding * 2 + gridFooterGap;

        ctx.fillStyle = '#E7E0CE';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000000';
        ctx.font = `bold ${48 * dpr}px "Google Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t('gemStickersTitle'), canvas.width / 2, headerHeight / 2);

        const textMetrics = ctx.measureText(t('gemStickersTitle'));
        const borderWidth = 4 * dpr;
        const borderRadius = 10 * dpr;

        const drawRotatedStickerWithBorder = (img, x, y, containerW, containerH, rotationDeg) => {
            ctx.save();
            ctx.translate(x + containerW / 2, y + containerH / 2);
            ctx.rotate(rotationDeg * Math.PI / 180);

            // Draw border with shadow
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 8 * dpr;
            ctx.shadowOffsetX = 2 * dpr;
            ctx.shadowOffsetY = 2 * dpr;

            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(-containerW / 2, -containerH / 2, containerW, containerH, [borderRadius]);
            } else { // Fallback for older browsers
                ctx.rect(-containerW / 2, -containerH / 2, containerW, containerH);
            }
            ctx.fill();

            // Reset shadow and draw the image
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            const imageMaxW = containerW - borderWidth * 2;
            const imageMaxH = containerH - borderWidth * 2;
            const fit = calculateAspectRatioFit(img.naturalWidth, img.naturalHeight, imageMaxW, imageMaxH);

            ctx.drawImage(img, -fit.width / 2, -fit.height / 2, fit.width, fit.height);
            ctx.restore();
        };

        if (uploadedImage && imageMap[uploadedImage]) {
            const containerSize = 120 * dpr;
            const titleStartX = canvas.width / 2 - textMetrics.width / 2;
            const imageX = titleStartX - containerSize - (20 * dpr);
            const imageY = (headerHeight / 2) - (containerSize / 2);
            drawRotatedStickerWithBorder(imageMap[uploadedImage], imageX, imageY, containerSize, containerSize, -15);
        }
        if (happySticker?.imageUrl && imageMap[happySticker.imageUrl]) {
            const containerSize = 70 * dpr;
            const x = canvas.width - padding - (3 * 80 * dpr);
            const y = padding;
            drawRotatedStickerWithBorder(imageMap[happySticker.imageUrl], x, y, containerSize, containerSize, -10);
        }
        if (laughingSticker?.imageUrl && imageMap[laughingSticker.imageUrl]) {
            const containerSize = 70 * dpr;
            const x = canvas.width - padding - (2 * 80 * dpr);
            const y = padding;
            drawRotatedStickerWithBorder(imageMap[laughingSticker.imageUrl], x, y, containerSize, containerSize, 15);
        }
        if (surprisedSticker?.imageUrl && imageMap[surprisedSticker.imageUrl]) {
            const containerSize = 70 * dpr;
            const x = canvas.width - padding - (1 * 80 * dpr);
            const y = padding;
            drawRotatedStickerWithBorder(imageMap[surprisedSticker.imageUrl], x, y, containerSize, containerSize, -5);
        }

        for (let i = 0; i < gridStickers.length; i++) {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x = padding + col * (stickerSize + stickerGap);
            const y = headerHeight + padding + row * (stickerSize + stickerGap);
            const stickerImg = imageMap[gridStickers[i].imageUrl];

            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.roundRect(x, y, stickerSize, stickerSize, [10*dpr]);
            ctx.fill();
            if (stickerImg) {
                const imagePadding = 10 * dpr;
                const fit = calculateAspectRatioFit(stickerImg.naturalWidth, stickerImg.naturalHeight, stickerSize - imagePadding * 2, stickerSize - imagePadding * 2);
                ctx.drawImage(stickerImg, x + imagePadding + fit.x, y + imagePadding + fit.y, fit.width, fit.height);
            }
        }

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.roundRect(padding, canvas.height - padding - footerHeight, canvas.width - padding * 2, footerHeight, [10*dpr]);
        ctx.fill();

        ctx.fillStyle = '#333';
        ctx.font = `bold ${24 * dpr}px "Google Sans", sans-serif`;
        ctx.fillText(t('madeWithGemini'), canvas.width / 2, canvas.height - padding - footerHeight / 2 - 10 * dpr);
        ctx.font = `${14 * dpr}px "Google Sans", sans-serif`;
        ctx.fillText(t('nanoBananaPromo'), canvas.width / 2, canvas.height - padding - footerHeight / 2 + 20 * dpr);

        setStaticSheetUrl(canvas.toDataURL('image/png'));
    } catch (error) {
        console.error("Failed to render static sticker sheet:", error);
    } finally {
        setIsRenderingSheet(false);
    }
  }, [isMobile, stickers, uploadedImage, staticSheetUrl, t]);

  useEffect(() => {
    if (show && isMobile && !staticSheetUrl) {
      renderStaticSheet();
    }
    if (!show) {
      setStaticSheetUrl(null);
    }
  }, [show, isMobile, staticSheetUrl, renderStaticSheet]);

  const handleDownloadDesktop = () => {
    if (sheetContentRef.current && window.html2canvas) {
      window.html2canvas(sheetContentRef.current, {
        backgroundColor: '#E7E0CE',
        useCORS: true,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'gem-sticker-sheet.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(err => {
        console.error("html2canvas failed:", err);
      });
    }
  };

  const handleDownloadMobile = () => {
    if (staticSheetUrl) {
      const link = document.createElement('a');
      link.href = staticSheetUrl;
      link.download = 'gem-sticker-sheet.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      {isMobile ? (
        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-4xl relative text-center" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition z-20">
            <XIcon className="w-6 h-6"/>
          </button>
          {isRenderingSheet && (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <LoaderCircle className="w-12 h-12 animate-spin mx-auto mb-4" />
              <p className="font-semibold">{t('preparingSheet')}</p>
            </div>
          )}
          {staticSheetUrl && (
            <div>
              <img src={staticSheetUrl} alt="Sticker Sheet" className="w-full h-auto object-contain rounded-md" />
              {isAndroid && (
                <button
                  onClick={handleDownloadMobile}
                  className="mt-4 bg-[#5A544E] text-white font-medium py-2 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 flex items-center justify-center mx-auto whitespace-nowrap"
                >
                  <DownloadIcon className="w-6 h-6 mr-2" />
                  {t('downloadSheet')}
                </button>
              )}
              {isIOS && (
                <p className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg text-sm">
                  {t('iosSaveInstruction')}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl relative" onClick={e => e.stopPropagation()}>
          <div ref={sheetContentRef} style={{ backgroundColor: '#E7E0CE' }} className="p-6 rounded-t-lg">
            <div className="flex justify-center items-center mb-6">
              <div className="flex items-center">
                {uploadedImage && <img src={uploadedImage} alt="Uploaded photo" className="h-36 object-contain transform -rotate-12 border-4 border-white rounded-lg shadow-md" />}
              </div>
              <div className="relative z-10 mx-4">
                <h1 className="text-4xl md:text-5xl font-bold font-googlesans text-black tracking-wide py-4">{t('gemStickersTitle')}</h1>
              </div>
              <div className="flex items-center">
                {stickers.find(s => s.emotion === 'Happy' && s.imageUrl) && <img src={stickers.find(s => s.emotion === 'Happy' && s.imageUrl).imageUrl} alt="Happy sticker" className="h-20 object-contain transform -rotate-6 border-4 border-white rounded-lg shadow-md" />}
                {stickers.find(s => s.emotion === 'Laughing' && s.imageUrl) && <img src={stickers.find(s => s.emotion === 'Laughing' && s.imageUrl).imageUrl} alt="Laughing sticker" className="h-20 object-contain transform rotate-12 -ml-5 border-4 border-white rounded-lg shadow-md" />}
                {stickers.find(s => s.emotion === 'Surprised' && s.imageUrl) && <img src={stickers.find(s => s.emotion === 'Surprised' && s.imageUrl).imageUrl} alt="Surprised sticker" className="h-20 object-contain transform -rotate-3 -ml-5 border-4 border-white rounded-lg shadow-md" />}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-2 rounded-md">
              {stickers.filter(s => s.imageUrl).map(sticker => (
                <div key={sticker.emotion} className="flex flex-col items-center">
                  <img src={sticker.imageUrl} alt={sticker.emotion} className="w-full h-auto object-contain rounded-lg bg-white shadow-sm" />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-4 text-center mt-6 font-googlesans">
              <p className="text-2xl font-bold text-gray-800">{t('madeWithGemini')}</p>
              <p className="text-xs text-gray-600">{t('nanoBananaPromo')}</p>
            </div>
          </div>
          <div className="bg-[#E7E0CE] rounded-b-lg p-4 text-center">
            <button
                onClick={handleDownloadDesktop}
                className="bg-[#5A544E] text-white font-medium py-2 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 flex items-center justify-center mx-auto whitespace-nowrap"
            >
                <DownloadIcon className="w-6 h-6 mr-2" />
                {t('downloadSheet')}
            </button>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition">
            <XIcon className="w-6 h-6"/>
          </button>
        </div>
      )}
    </div>
  );
};


// --- Main Application Component ---

const translations = {
    en: {
        appSubtitle: "Turn any selfie into a custom sticker set",
        takePhoto: "Take Photo",
        retakePhoto: "Retake Photo",
        useWebcam: "Use Webcam",
        retakeWebcam: "Retake with Webcam",
        uploadPhoto: "Upload Photo",
        changePhoto: "Change Photo",
        chooseStyle: "Choose a style",
        createStickers: "Create Stickers",
        generating: "Generating...",
        generatingStickers: "Generating stickers...",
        stickersAppearHere: "Your generated stickers will appear here.",
        followSteps: "Follow the steps to get started!",
        generatingMagic: "Generating your stickers...",
        magicMoment: "This can take a moment. Gemini is working its magic!",
        errorOccurred: "An Error Occurred",
        generatingPlaceholder: "Generating",
        failedPlaceholder: "Failed",
        retry: "Retry",
        viewStickerSheet: "View Sticker Sheet",
        downloadAll: "Download all",
        zipping: "Zipping...",
        tip: "Tip:",
        iosTip: "On an iOS device, you can tap and hold any sticker to save the image to your photos.",
        errorUploadProfilePic: "Please upload a profile picture first.",
        errorInvalidImage: "Please upload a valid image file.",
        errorCameraAccess: "Could not access the camera. Please ensure it's enabled and not in use by another application.",
        errorDownloadSticker: "Sorry, there was an error downloading this sticker.",
        errorDownloadAll: "Could not download all stickers. The required library is not available.",
        errorZip: "Sorry, there was an error creating the zip file.",
        cameraModalTitle: "Take a Photo",
        enlargedStickerAlt: "Enlarged sticker",
        preparingSheet: "Preparing your sticker sheet...",
        downloadSheet: "Download Sheet",
        iosSaveInstruction: "Tap and hold the image to save your sticker sheet.",
        madeWithGemini: "Made with Gemini",
        nanoBananaPromo: "Edit your images with Nano Banana at gemini.google",
        gemStickersTitle: "GEM STICKERS",
        apiKeyRequired: "API Key Required",
        apiKeyPrompt: "Please enter your Gemini API key to generate stickers:",
        apiKeyPlaceholder: "Enter your Gemini API key...",
        apiKeyHelp: "Get your free API key from Google AI Studio",
        apiKeyHelpLink: "https://ai.google.dev/",
        saveKey: "Save & Continue",
        cancel: "Cancel",
        apiKeyInvalid: "Please enter a valid API key",
        apiKeyStored: "API key saved successfully",
    },
    ja: {
        appSubtitle: "自撮りをステッカーに",
        takePhoto: "写真を撮る",
        retakePhoto: "もう一度撮る",
        useWebcam: "ウェブカメラで撮る",
        retakeWebcam: "ウェブカメラでもう一度撮る",
        uploadPhoto: "写真をアップロード",
        changePhoto: "写真を変更",
        chooseStyle: "スタイルを選択",
        createStickers: "ステッカーを作成",
        generating: "生成中...",
        generatingStickers: "ステッカーを生成中...",
        stickersAppearHere: "生成されたステッカーはここに表示されます",
        followSteps: "さあ、始めましょう！",
        generatingMagic: "ステッカーを生成中です...",
        magicMoment: "少々お待ちください。Gemini が回答を準備中です！",
        errorOccurred: "エラーが発生しました",
        generatingPlaceholder: "生成中",
        failedPlaceholder: "失敗",
        retry: "再試行",
        viewStickerSheet: "ステッカーシートを見る",
        downloadAll: "すべてダウンロード",
        zipping: "圧縮中...",
        tip: "ヒント:",
        iosTip: "iOSデバイスでは、ステッカーを長押して端末に保存できます。",
        errorUploadProfilePic: "最初にプロフィール写真をアップロードしてください。",
        errorInvalidImage: "有効な画像ファイルをアップロードしてください。",
        errorCameraAccess: "カメラにアクセスできませんでした。有効になっているか、他のアプリケーションで使用されていないか確認してください。",
        errorDownloadSticker: "申し訳ありませんが、ステッカーのダウンロード中にエラーが発生しました。",
        errorDownloadAll: "すべてのステッカーをダウンロードできませんでした。必要なライブラリが利用できません。",
        errorZip: "申し訳ありませんが、zipファイルの作成中にエラーが発生しました。",
        cameraModalTitle: "写真を撮る",
        enlargedStickerAlt: "拡大ステッカー",
        preparingSheet: "ステッカーシートを準備中...",
        downloadSheet: "シートをダウンロード",
        iosSaveInstruction: "画像を長押ししてステッカーシートを保存",
        madeWithGemini: "Gemini で作成",
        nanoBananaPromo: "gemini.google で Nano Banana を使って画像を編集",
        gemStickersTitle: "ジェムステッカー",
        apiKeyRequired: "APIキーが必要",
        apiKeyPrompt: "ステッカーを生成するにはGemini APIキーを入力してください：",
        apiKeyPlaceholder: "Gemini APIキーを入力...",
        apiKeyHelp: "Google AI Studioで無料のAPIキーを取得",
        apiKeyHelpLink: "https://ai.google.dev/",
        saveKey: "保存して続行",
        cancel: "キャンセル",
        apiKeyInvalid: "有効なAPIキーを入力してください",
        apiKeyStored: "APIキーが正常に保存されました",
    },
    zh: {
        appSubtitle: "将任何自拍变成自定义贴纸集",
        takePhoto: "拍照",
        retakePhoto: "重拍",
        useWebcam: "使用网络摄像头",
        retakeWebcam: "用网络摄像头重拍",
        uploadPhoto: "上传照片",
        changePhoto: "更换照片",
        chooseStyle: "选择一种风格",
        createStickers: "创建贴纸",
        generating: "生成中...",
        generatingStickers: "正在生成贴纸...",
        stickersAppearHere: "您生成的贴纸将出现在这里。",
        followSteps: "请按照步骤开始！",
        generatingMagic: "正在生成您的贴纸...",
        magicMoment: "这可能需要一些时间。Gemini 正在施展魔法！",
        errorOccurred: "发生错误",
        generatingPlaceholder: "生成中",
        failedPlaceholder: "失败",
        retry: "重试",
        viewStickerSheet: "查看贴纸页",
        downloadAll: "全部下载",
        zipping: "正在压缩...",
        tip: "提示:",
        iosTip: "在 iOS 设备上，您可以长按任何贴纸以将图像保存到您的照片中。",
        errorUploadProfilePic: "请先上传个人资料图片。",
        errorInvalidImage: "请上传有效的图像文件。",
        errorCameraAccess: "无法访问摄像头。请确保它已启用且未被其他应用程序使用。",
        errorDownloadSticker: "抱歉，下载此贴纸时出错。",
        errorDownloadAll: "无法下载所有贴纸。所需库不可用。",
        errorZip: "抱歉，创建 zip 文件时出错。",
        cameraModalTitle: "拍照",
        enlargedStickerAlt: "放大的贴纸",
        preparingSheet: "正在准备您的贴纸页...",
        downloadSheet: "下载贴纸页",
        iosSaveInstruction: "长按图像以保存您的贴纸页。",
        madeWithGemini: "由 Gemini 制作",
        nanoBananaPromo: "在 gemini.google 上使用 Nano Banana 编辑您的图像",
        gemStickersTitle: "宝石贴纸",
        apiKeyRequired: "需要API密钥",
        apiKeyPrompt: "请输入您的Gemini API密钥以生成贴纸：",
        apiKeyPlaceholder: "输入您的Gemini API密钥...",
        apiKeyHelp: "从Google AI Studio获取免费API密钥",
        apiKeyHelpLink: "https://ai.google.dev/",
        saveKey: "保存并继续",
        cancel: "取消",
        apiKeyInvalid: "请输入有效的API密钥",
        apiKeyStored: "API密钥已成功保存",
    }
};

const styleOptions = [
    { id: 'pop-art', en: 'Pop Art', ja: "ポップアート", zh: "波普艺术", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pop_art_love.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pop_art_love_out.png" },
    { id: 'japanese-matchbox', en: 'Retro Japanese Matchbox', ja: "レトロマッチ箱", zh: "日本复古火柴盒", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/matchbox.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/matchbox_out.png" },
    { id: 'cartoon-dino', en: 'Cartoon Dino', ja: "恐竜漫画", zh: "卡通恐龙", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/dragon.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/dragon_out.png" },
    { id: 'pixel-art', en: 'Pixel Art', ja: "ピクセルアート", zh: "像素艺术", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pixel.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pixel_out.png"},
    { id: 'royal', en: 'Royal', ja: "王室", zh: "皇室风格", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/royal.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/royal_out.png"},
    { id: 'football-sticker', en: 'Football Sticker', ja: "サッカーシール", zh: "足球贴纸", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/football.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/football_out.png" },
    { id: 'claymation', en: 'Claymation', ja: "クレイアニメ", zh: "黏土动画", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/claymation.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/claymation_out.png"},
    { id: 'vintage-bollywood', en: "Vintage Bollywood", ja: "ボリウッド", zh: "复古宝莱坞", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bolly.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bolly_out.png" },
    { id: 'sticker-bomb', en: "Sticker Bomb", ja: "ステッカーボム", zh: "贴纸炸弹", imgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bomb.png", selectedImgUrl: "https://gstatic.com/synthidtextdemo/images/gemstickers/dot/bomb_out.png"},
    { id: 'initial-d', en: 'Initial D Style', ja: "头文字D漫画风格", zh: "头文字D风格", imgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBM2jKbchAfueLeEO3lJioGRR4kb9fAAJGGgACpKdYVi9HKvFmvBP6NgQ.png", selectedImgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBM2jKbchAfueLeEO3lJioGRR4kb9fAAJGGgACpKdYVi9HKvFmvBP6NgQ.png", hidden: true},
    { id: 'slam-dunk', en: 'Slam Dunk Style', ja: "灌篮高手漫画风格", zh: "灌篮高手风格", imgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNGjKbgoaeBoNv4NqcQPu4-iiVYQtAAJHGgACpKdYVgqmTKcNGtjaNgQ.png", selectedImgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNGjKbgoaeBoNv4NqcQPu4-iiVYQtAAJHGgACpKdYVgqmTKcNGtjaNgQ.png", hidden: true},
    { id: 'doraemon', en: 'Doraemon Style', ja: "哆啦A梦漫画风格", zh: "哆啦A梦风格", imgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNWjKbm-mtIW8X2ahnCsJETATlI5rAAJJGgACpKdYViC6IU-a--EUNgQ.png", selectedImgUrl: "https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAIBNWjKbm-mtIW8X2ahnCsJETATlI5rAAJJGgACpKdYViC6IU-a--EUNgQ.png", hidden: true},
];

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

export default function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('pop-art');
  const [generatedStickers, setGeneratedStickers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);
  const [isZipping, setIsZipping] = useState(false);
  const [stylesWithRotation, setStylesWithRotation] = useState([]);
  const styleContainerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [showStickerSheetModal, setShowStickerSheetModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  const t = useCallback((key) => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  // API Key management functions
  const getApiKey = useCallback(() => {
    // Try to get from state first
    if (apiKey) return apiKey;

    // Try to get from localStorage
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      return storedKey;
    }

    // Try to get from environment (for local development)
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && envKey !== 'test_key_for_development') {
      setApiKey(envKey);
      return envKey;
    }

    return null;
  }, [apiKey]);

  const saveApiKey = useCallback((key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowApiKeyModal(false);
  }, []);

  const checkApiKeyRequired = useCallback(() => {
    const currentKey = getApiKey();
    if (!currentKey) {
      setShowApiKeyModal(true);
      return false;
    }
    return true;
  }, [getApiKey]);

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('zh')) {
      setLanguage('zh');
    } else if (userLang.startsWith('ja')) {
      setLanguage('ja');
    }

    const userAgent = navigator.userAgent;
    setIsAndroid(/android/i.test(userAgent));
    setIsIOS(
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (!isMobile) {
        setIsDesktop(true);
    }

    const jszipScript = document.createElement('script');
    jszipScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    jszipScript.async = true;
    document.body.appendChild(jszipScript);

    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    html2canvasScript.async = true;
    document.body.appendChild(html2canvasScript);

    const initialStyles = styleOptions.map(style => ({
      ...style,
      rotation: Math.random() * 12 - 6
    }));
    setStylesWithRotation(initialStyles);

    // Initialize API key from localStorage or environment
    getApiKey();

    return () => {
      document.body.removeChild(jszipScript);
      document.body.removeChild(html2canvasScript);
    };
  }, [getApiKey]);

  useEffect(() => {
    if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const checkScrollButtons = useCallback(() => {
    const el = styleContainerRef.current;
    if (el) {
        const hasOverflow = el.scrollWidth > el.clientWidth;
        setShowLeftArrow(hasOverflow && el.scrollLeft > 0);
        setShowRightArrow(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const styleContainer = styleContainerRef.current;
    if (!styleContainer) return;

    const timer = setTimeout(() => checkScrollButtons(), 100);
    styleContainer.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
        clearTimeout(timer);
        if (styleContainer) {
            styleContainer.removeEventListener('scroll', checkScrollButtons);
        }
        window.removeEventListener('resize', checkScrollButtons);
    };
  }, [stylesWithRotation, checkScrollButtons]);


  const handleScroll = (direction) => {
      const el = styleContainerRef.current;
      if (!el) return;

      const items = Array.from(el.children[0].children);
      if (items.length === 0) return;

      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let targetItem;

      if (direction === 'right') {
          targetItem = items.find(item => (item.offsetLeft + item.offsetWidth / 2) > containerCenter + 1);
          if (!targetItem) targetItem = items[items.length - 1];
      } else {
          const candidates = items.filter(item => (item.offsetLeft + item.offsetWidth / 2) < containerCenter - 1);
          targetItem = candidates[candidates.length - 1];
          if (!targetItem) targetItem = items[0];
      }

      if (targetItem) {
          const targetScrollLeft = targetItem.offsetLeft + (targetItem.offsetWidth / 2) - (el.clientWidth / 2);
          el.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      const base64 = await fileToBase64(file);
      setUploadedImage({
        mimeType: file.type,
        data: base64,
        url: objectUrl
      });
      setGeneratedStickers([]);
      setError(null);
    } else {
      setError(t('errorInvalidImage'));
      setUploadedImage(null);
      setImagePreview(null);
    }
  }, [t]);

  const openCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } });
        setStream(newStream);
        setShowCameraModal(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError(t('errorCameraAccess'));
      }
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setShowCameraModal(false);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob((blob) => {
        const file = new File([blob], "webcam-photo.png", { type: "image/png" });
        const mockEvent = { target: { files: [file] } };
        handleImageUpload(mockEvent);
      }, 'image/png');

      closeCamera();
    }
  };

  const forceCharacter = "\n\n**Character** The generated character/person/animal must match the features of the person/character/animal in the uploaded reference image. keep the facial feature, hair style..."
  const forceWhiteBackground = "\n\n**Background:** Plain solid white #FFFFFF background only (no background colors/elements)";
  const skinTonePersistence = "ALWAYS PRESERVE the skin tone / hair style and other distict features of the uploaded character/person.";
  const colorPalletPersistence = "First, describe the distinct features and style of the uploaded image in great detail e.g. hair style name, outfit name, and so on. Also, specify the color of each main element using its hexadecimal (HEX) code.";


  const getStylePrompt = (style, emotion) => {
      const profilePicInstruction = "The character should be customized based on the attached profile picture.";
      switch (style) {
        case 'moe-anime':
            return `Create a single sticker in the 'moe-like' anime style. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The art should feature large, expressive eyes, a small and cute mouth and nose, and a generally youthful and endearing appearance. The lines should be clean and the colors bright and soft. The background should be simple, perhaps with some cute patterns or sparkles, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
        case 'pop-art':
            return `Create a single sticker in the distinct Pop Art style. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The image should feature bold, thick black outlines around all figures, objects, and text. Utilize a limited, flat color palette consisting of vibrant primary and secondary colors, applied in unshaded blocks, but maintain the person skin tone. Incorporate visible Ben-Day dots or halftone patterns to create shading, texture, and depth. The subject should display a dramatic expression. Include stylized text within speech bubbles or dynamic graphic shapes to represent sound effects (onomatopoeia). The overall aesthetic should be clean, graphic, and evoke a mass-produced, commercial art sensibility with a polished finish. The user's face from the uploaded photo must be the main character, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern..`;
        case 'claymation':
            return `Create a single sticker in the style of a classic claymation character. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The sticker should feature a claymation character where the picture is made to look like it is made from clay, and an interesting claymation landscape in the background, using the playfulness of claymation to exaggerate certain features depending on the emotion, and with clay-like sculpting of the face visible when expressing different emotions, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
        case 'cartoon-dino':
            return `Create a single sticker of an anthropomorphized cartoon dinosaur. ${profilePicInstruction} The character's face, customized from the attached profile picture, must express the emotion: '${emotion}'. The style should be cute and whimsical with bright, cheerful colors and a simple background suitable for a messaging app, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
        case 'pixel-art':
            return `Create a single sticker in the style of a retro Pixel Art piece. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The pixel art should be colorful, abstract, slightly retro-futuristic, combining 8 bit and glitch elements, and incorporating additional icons or accessories that represent the intended emotion, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern..`;
        case 'sticker-bomb':
            return `Stylize and augment the user pic in a stickerbomb style. ${profilePicInstruction} The character must express the emotion: '${emotion}'. Stickerbomb style with colorful graphic stickers surrounding the users face, also reflecting the emotion depicted, ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern. The user's face should always be in a cartoonish style like the surrounding stickers, and never show in a photorealistic style.`;
        case 'football-sticker':
            return `Generate a single sticker in the style of vintage 1970s soccer trading cards ${profilePicInstruction} The character must express the emotion: '${emotion}'.  The sticker should feature a headshot or upper torso portrait of a football player or manager Optionally, include a small, stylized team crest or a retro club name banner at the top. The entire sticker should have a clean, defined border and a slightly aged or matte finish to evoke a nostalgic, collectible feel.`;
        case 'vintage-bollywood':
            return `Change my image to a 1960's retro Bollywood themed poster. ${profilePicInstruction} Generate a poster with emotion: '${emotion}'.`;
        case 'japanese-matchbox':
            return `Make a single sticker in Japanese Showa-era matchbox art . ${profilePicInstruction} The character must express the emotion: '${emotion}'. Make a sticker in Japanese Showa-era matchbox art of a cat drinking coffee, retro graphic design, limited color palette, distressed paper texture and a retro-futuristic rocket ship, design for a 1960s Japanese matchbox label. Showa kitsch illustration of a person winking, simple lines, 2-color print style., ideally with an interesting outline shape that is not square or circular but closer to a dye-cut pattern.`;
        case 'royal':
            return `Create a single sticker transforming the pic into royalty - a king, queen, prince or princess - with unicorns and rainbows. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The image should feature a cool looking king, queen, prince or cute princess along with augmenting aces, spades, diamonds, hearts, unicorns, rainbows and clouds, ideally with an interesting outline shape that is not square or circular but closer to a die-cut pattern. The user's face should always be in a cartoonish style like the surrounding stickers, and never show in a photorealistic style.`;
        case 'initial-d':
            return `Create a single sticker in the style of the Initial D manga. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The art should feature sharp, dynamic lines, heavy use of black and white with screentone patterns for shading, and a gritty, realistic feel. The character should have the distinct 90s manga aesthetic. Include elements related to street racing, like speed lines. The sticker should have an interesting die-cut shape.`;
        case 'slam-dunk':
            return `Create a single sticker in the style of the Slam Dunk manga. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The art should be realistic and dynamic, with strong, confident line work. Emphasize expressive faces and hair, typical of 90s shonen manga. For comedic emotions, the style can shift to a super-deformed (chibi) look. The background should be simple, focusing on the character, perhaps with basketball-related elements or action lines.`;
        case 'doraemon':
            return `Create a single sticker in the iconic style of Doraemon manga. ${profilePicInstruction} The character must express the emotion: '${emotion}'. The art style should be simple, clean, and rounded. Use uniform, bold outlines and flat colors. The character's face should be simplified with large, expressive, simple circular eyes and a simple mouth, capturing the friendly aesthetic of Fujiko F. Fujio's work. The background should be minimal, keeping the focus on the character in a classic die-cut sticker format.`;
        default:
            return `Create a sticker of a person expressing '${emotion}' in a ${style} style, based on the uploaded photo.`;
      }
  };

  const makeApiCallWithRetry = async (payload, emotion) => {
    const currentApiKey = getApiKey();

    if (!currentApiKey) {
      throw new Error('API key is required. Please set your Gemini API key.');
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${currentApiKey}`;
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
                    // Not a JSON response, use the text content if available
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
                throw new Error(safetyError ? `Generation blocked: ${safetyError}`: 'No image data in response.');
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
  };

  const generateStickers = async () => {
      if (!uploadedImage) {
          setError(t('errorUploadProfilePic'));
          return;
      }

      // Check if API key is available before proceeding
      if (!checkApiKeyRequired()) {
          return;
      }

      setIsLoading(true);
      setError(null);
      setGeneratedStickers(Array(emotions.length).fill(null).map((_, i) => ({ emotion: emotions[i].key, isLoading: true })));
      setLoadingMessage(t('generatingStickers'));

      const stickerPromises = emotions.map(({ key: emotion }, index) => {
          setTimeout(() => setLoadingMessage(t('generatingStickers')), index * 200);

          const userPrompt = getStylePrompt(selectedStyle, emotion);
          let fullPrompt = ""
          switch(selectedStyle) {
            case "vintage-bollywood":
              fullPrompt = colorPalletPersistence + userPrompt + skinTonePersistence;
              break;
            case "cartoon-dino":
              fullPrompt = colorPalletPersistence + userPrompt + forceWhiteBackground;
              break;
            default:
              fullPrompt = colorPalletPersistence + userPrompt + forceCharacter + forceWhiteBackground + skinTonePersistence;
          }

          const payload = {
              contents: [{
                  parts: [
                      { text: fullPrompt },
                      { inlineData: { mimeType: uploadedImage.mimeType, data: uploadedImage.data } }
                  ]
              }],
              generationConfig: { responseModalities: ['IMAGE'], },
          };
          return makeApiCallWithRetry(payload, emotion);
      });

      try {
          const results = await Promise.all(stickerPromises);
          setGeneratedStickers(results.map(r => ({ ...r, isLoading: false })));
      } catch (err) {
          console.error("An unexpected error occurred during sticker generation:", err);
          setError(t('errorOccurred'));
      } finally {
          setIsLoading(false);
          setLoadingMessage('');
      }
  };

  const handleRegenerate = async (emotionToRegenerate) => {
    if (!uploadedImage) return;

    // Check if API key is available before proceeding
    if (!checkApiKeyRequired()) {
        return;
    }

    setGeneratedStickers(prev => prev.map(s => s.emotion === emotionToRegenerate ? { ...s, isLoading: true, imageUrl: null } : s));
    setError(null);

    const userPrompt = getStylePrompt(selectedStyle, emotionToRegenerate);
    let fullPrompt = ""
    switch(selectedStyle) {
      case "vintage-bollywood":
        fullPrompt = colorPalletPersistence + userPrompt + skinTonePersistence;
        break;
      case "cartoon-dino":
        fullPrompt = colorPalletPersistence + userPrompt + forceWhiteBackground;
        break;
      default:
        fullPrompt = colorPalletPersistence + userPrompt + forceCharacter + forceWhiteBackground + skinTonePersistence;
    }

    const payload = {
      contents: [{
        parts: [
          { text: fullPrompt },
          { inlineData: { mimeType: uploadedImage.mimeType, data: uploadedImage.data } }
        ]
      }],
      generationConfig: { responseModalities: ['IMAGE'] },
    };

    const result = await makeApiCallWithRetry(payload, emotionToRegenerate);
    setGeneratedStickers(prev => prev.map(s => s.emotion === emotionToRegenerate ? { ...result, isLoading: false } : s));
  };

  const handleDownloadSingle = (imageUrl, emotion) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `sticker-${emotion.toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Error downloading sticker:', e);
      setError(t('errorDownloadSticker'));
    }
  };

  const handleDownloadAll = async () => {
    if (typeof window.JSZip === 'undefined') {
      setError(t('errorDownloadAll'));
      return;
    }
    const stickersToDownload = generatedStickers.filter(s => s.imageUrl);
    if (stickersToDownload.length === 0) return;
    setIsZipping(true);
    setError(null);

    try {
      const zip = new window.JSZip();
      stickersToDownload.forEach(sticker => {
        const base64Data = sticker.imageUrl.split(',')[1];
        zip.file(`sticker-${sticker.emotion.toLowerCase()}.png`, base64Data, { base64: true });
      });
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = 'GemStickers.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('Error creating zip file:', err);
      setError(t('errorZip'));
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 flex items-center justify-center py-5">
       <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;700&display=swap');
          .font-googlesans { font-family: 'Google Sans', sans-serif; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      <div className="container mx-auto max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-0 overflow-hidden relative">
        <div className="absolute top-4 right-4 z-30">
            <select onChange={(e) => setLanguage(e.target.value)} value={language} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-md py-2 px-3 border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
            </select>
        </div>
        <header className="relative h-64 md:h-72 bg-[#F2EFEF] overflow-hidden">
            <img className="absolute h-full w-full object-cover" src="https://gstatic.com/synthidtextdemo/images/gemstickers/header/bg_header.png" alt="Header background" />
            <img className="hidden md:block absolute h-32 object-contain -left-8 rotate-12" src="https://gstatic.com/synthidtextdemo/images/gemstickers/dot/football.png" alt="Football sticker"/>
            <img className="hidden md:block absolute h-32 object-contain left-28 -top-12" src="https://gstatic.com/synthidtextdemo/images/gemstickers/dot/claymation.png" alt="Claymation sticker" />
            <img className="hidden md:block absolute h-24 object-contain left-16" src="https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pixel.png" alt="Pixel art sticker" />
            <img className="hidden md:block absolute h-32 md:h-48 object-contain right-2 md:right-4 -top-8 -rotate-6" src="https://gstatic.com/synthidtextdemo/images/gemstickers/dot/matchbox.png" alt="Matchbox sticker" />
            <img className="hidden md:block absolute h-28 object-contain right-16 bottom-16 rotate-12" src="https://gstatic.com/synthidtextdemo/images/gemstickers/dot/pop_art.png" alt="Pop art sticker"/>
            <img className="hidden md:block absolute h-32 md:h-48 object-contain -right-8 md:-right-4 -bottom-8 md:-bottom-12 -rotate-12" src="https://gstatic.com/synthidtextdemo/images/gemstickers/header/sticker_sample_0.png" alt="Sticker sample"/>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-5/6 md:w-2/3">
                <img className="object-contain h-32 md:h-48 -mt-8" src="https://gstatic.com/synthidtextdemo/images/gemstickers/header/gemsticker_logo_3.png" />
                <p className="-mt-4 md:-mt-8 font-medium text-xs md:text-sm italic text-end">{t('appSubtitle')}</p>
            </div>
            <img className="hidden md:block absolute h-48 object-contain -bottom-7 left-1/3 -translate-x-5" src="https://www.gstatic.com/synthidtextdemo/images/gemstickers/4x/moe_anime.png" alt="Anime sticker"/>
        </header>
        <div className="grid grid-cols-1 gap-8 md:p-0 lg:p-6 mt-8">
          <div className="flex flex-col space-y-8">
            <div className="relative w-full sm-w-2/3 md:w-1/2 mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input id="camera-upload" type="file" className="hidden" accept="image/*" capture="environment" onChange={handleImageUpload} />
                  <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />

                  {(isAndroid || isIOS) && (
                      <label
                          htmlFor="camera-upload"
                          className="cursor-pointer w-full border-2 border-[#342D28CC] text-black font-semibold py-2 px-6 rounded-lg text-base shadow-sm transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                      >
                          <CameraIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                          <span>{imagePreview ? t('retakePhoto') : t('takePhoto')}</span>
                      </label>
                  )}

                  {isDesktop && (
                       <button
                          onClick={openCamera}
                          className="cursor-pointer w-full border-2 border-[#342D28CC] text-black font-semibold py-2 px-6 rounded-lg text-base shadow-sm transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                      >
                          <CameraIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                          <span>{imagePreview ? t('retakeWebcam') : t('useWebcam')}</span>
                      </button>
                  )}

                  <label
                      htmlFor="image-upload"
                      className="cursor-pointer w-full border-2 border-[#342D28CC] text-black font-semibold py-2 px-6 rounded-lg text-base shadow-sm transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                  >
                      <UploadCloud className="w-6 h-6 mr-3 flex-shrink-0" />
                      <span>{imagePreview ? t('changePhoto') : t('uploadPhoto')}</span>
                  </label>
              </div>

              {imagePreview && (
                <img src={imagePreview} alt="Uploaded preview" className="h-16 w-16 object-cover rounded-md shadow-lg absolute right-0 -top-8 -rotate-12 border-2 border-black bg-white" />
              )}
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <h2 className="text-xl font-semibold text-black">
                {t('chooseStyle')}
              </h2>
              <div className="relative w-full">
                <button
                  onClick={() => handleScroll('left')}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-opacity duration-300 focus:outline-none ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <div
                  ref={styleContainerRef}
                  className="flex flex-row items-center w-full h-[360px] overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar"
                >
                  <div className="flex flex-row items-center w-auto px-4 mb-24">
                      {stylesWithRotation.map((style, index) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-2 -mx-8 text-xs rounded-lg text-black font-semibold focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-transform duration-200 hover:scale-110 hover:z-10 flex-shrink-0`}
                          style={{
                              transform: `rotate(${style.rotation}deg) translateY(${index % 2 === 0 ? '0' : '4rem'})`,
                          }}
                        >
                          <div className={`w-48 m-0`} hidden={style.hidden===true}>
                              <img className={`w-48 object-contain overflow-visible m-0`} src={selectedStyle === style.id ? style.selectedImgUrl : style.imgUrl} alt={style[language] || style['en']} />
                              <p className={`text-center ${selectedStyle === style.id ? 'font-bold' : ''}`}>{style[language] || style['en']}</p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                <button
                  onClick={() => handleScroll('right')}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-opacity duration-300 focus:outline-none ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={generateStickers}
                disabled={!uploadedImage || isLoading}
                className="w-1/2 font-semibold mx-auto text-black py-2 px-6 border-2 border-black rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 disabled:bg-[#F8F8F8] disabled:border-2 disabled:border-[#C3C3C3] disabled:text-[#C3C3C3] disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-6 h-6 mr-3" />
                    {loadingMessage || t('generating')}
                  </>
                ) : (
                  t('createStickers')
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg p-6 flex items-center justify-center min-h-[400px]">
            {isLoading && (
              <div className="text-center text-gray-600">
                <LoaderCircle className="w-16 h-16 animate-spin mx-auto mb-4" />
                <p className="text-xl font-medium">{loadingMessage || t('generatingMagic')}</p>
                <p>{t('magicMoment')}</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-600 bg-red-100 p-6 rounded-lg">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl font-bold">{t('errorOccurred')}</p>
                <p className="mt-2">{error}</p>
              </div>
            )}
            {!isLoading && !error && generatedStickers.length > 0 && (
              <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {generatedStickers.map((sticker, index) => {
                          const emotionObject = emotions.find(e => e.key === sticker.emotion);
                          const emotionName = emotionObject ? emotionObject[language] : sticker.emotion;

                          return sticker.isLoading ? (
                               <div key={index} className="text-center p-4 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center aspect-square bg-gray-100">
                                  <LoaderCircle className="w-8 h-8 text-gray-500 animate-spin mb-2"/>
                                  <p className="text-sm font-semibold text-gray-700">{t('generatingPlaceholder')}</p>
                                  <p className="text-xs text-gray-600">{emotionName}</p>
                              </div>
                          ) : sticker.imageUrl ? (
                              <div key={index} className="text-center group relative">
                                  <button
                                      onClick={() => { setModalImageUrl(sticker.imageUrl); setShowImageModal(true); }}
                                      className="block bg-white rounded-3xl overflow-hidden shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                      <img src={sticker.imageUrl} alt={`Sticker of ${sticker.emotion}`} className="w-full h-auto aspect-square object-cover" />
                                  </button>
                                  <div className="absolute bottom-8 p-1 left-1/2 -translate-x-1/2 rounded-full bg-white border border-[#C3C3C3] flex items-center space-x-1.5">
                                      <button onClick={() => handleDownloadSingle(sticker.imageUrl, sticker.emotion)} className="p-1.5 bg-white/80 rounded-full hover:bg-white transition duration-300" title="Download this sticker">
                                          <DownloadIcon className="w-4 h-4 text-gray-700" />
                                      </button>
                                      <div className="border w-0 h-[1rem] border-[#c3c3c3]"></div>
                                      <button onClick={() => handleRegenerate(sticker.emotion)} className="p-1.5 bg-white/80 rounded-full hover:bg-white transition duration-300" title="Regenerate this sticker">
                                          <RefreshIcon className="w-4 h-4 text-gray-700" />
                                      </button>
                                  </div>
                                  <p className="mt-10 text-sm font-medium text-gray-700">{emotionName}</p>
                              </div>
                          ) : (
                              <div key={index} className="text-center p-4 border-2 border-dashed border-red-400 rounded-lg flex flex-col items-center justify-center aspect-square bg-red-50">
                                  <AlertTriangle className="w-8 h-8 text-red-500 mb-2"/>
                                  <p className="text-sm font-semibold text-red-700">{t('failedPlaceholder')}</p>
                                  <p className="text-xs text-red-600">{emotionName}</p>
                                  <button onClick={() => handleRegenerate(sticker.emotion)} className="mt-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600 transition-colors whitespace-nowrap">
                                    {t('retry')}
                                  </button>
                              </div>
                          )
                      })}
                  </div>
                  {generatedStickers.some(s => s.imageUrl) && (
                    <div className="mt-8 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => setShowStickerSheetModal(true)} className="w-full sm:w-auto bg-white text-[#5A544E] border-2 border-[#5A544E] font-medium py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 flex items-center justify-center whitespace-nowrap">
                                {t('viewStickerSheet')}
                            </button>
                            <button onClick={handleDownloadAll} disabled={isZipping} className="w-full sm:w-auto bg-[#5A544E] text-white font-medium py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center whitespace-nowrap">
                                {isZipping ? (
                                    <><LoaderCircle className="animate-spin w-6 h-6 mr-3" /> {t('zipping')}</>
                                ) : (
                                    <><DownloadIcon className="w-6 h-6 mr-2" /> {t('downloadAll')}</>
                                )}
                            </button>
                        </div>
                        {isIOS && (
                            <div className="mt-4 p-3 bg-gray-200 rounded-lg text-gray-700 max-w-md mx-auto">
                                <p className="font-semibold text-sm">
                                    <span className="text-blue-500 mr-2">{t('tip')}</span>
                                    {t('iosTip')}
                                </p>
                            </div>
                        )}
                    </div>
                  )}
              </div>
            )}
             {!isLoading && !error && generatedStickers.length === 0 && (
                 <div className="text-center text-gray-500">
                    <p className="text-xl font-medium">{t('stickersAppearHere')}</p>
                    <p>{t('followSteps')}</p>
                </div>
            )}
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
        <CameraModal
            show={showCameraModal}
            onClose={closeCamera}
            onCapture={handleCapture}
            videoRef={videoRef}
            t={t}
        />
        <ImageModal
            show={showImageModal}
            onClose={() => setShowImageModal(false)}
            imageUrl={modalImageUrl}
            t={t}
        />
        <StickerSheetModal
            show={showStickerSheetModal}
            onClose={() => setShowStickerSheetModal(false)}
            stickers={generatedStickers}
            uploadedImage={uploadedImage?.url}
            isIOS={isIOS}
            isAndroid={isAndroid}
            t={t}
        />
        <ApiKeyModal
            show={showApiKeyModal}
            onClose={() => setShowApiKeyModal(false)}
            onSave={saveApiKey}
            t={t}
        />
      <footer className="text-center text-gray-500 text-sm pb-5"><a href="https://github.com/thinkerchan/stickerfy" target="_blank" rel="noopener noreferrer">@thinkerchan</a></footer>
      </div>
    </div>
  );
}

