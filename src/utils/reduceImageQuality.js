export default async function reduceImageQuality(
  file,
  quality = 0.6,
  maxWidth = 800,
  maxHeight = 800
) {
  return await new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("The file is not an image."));
      return;
    }
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            const readerBlob = new FileReader();
            readerBlob.onloadend = () => {
              resolve(readerBlob.result);
            };
            readerBlob.readAsDataURL(blob);
          },
          file.type,
          quality
        );
      };

      img.onerror = (error) => {
        reject(new Error(error));
      };
      img.src = event.target.result;
    };

    reader.onerror = (error) => {
      reject(new Error(error));
    };
    reader.readAsDataURL(file);
  });
}
