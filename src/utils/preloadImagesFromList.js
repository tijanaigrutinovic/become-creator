export async function preloadImagesFromList(jsonUrl) {
  try {
    const res = await fetch(jsonUrl);
    const imageList = await res.json();
    imageList.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  } catch (e) {
    console.error("Preload images error:", e);
  }
} 