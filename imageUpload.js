
const IMGBB_API_KEY = '82ddb98f0130ccd5bce2c0c085d7789a';

export const uploadImageToImgBB = async (imageUri) => {
  const formData = new FormData();

  formData.append('image', {
    uri: imageUri,
    name: `photo_${Date.now()}.jpg`,
    type: 'image/jpeg',
  });

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error('ImgBB upload failed');
  }

  return data.data.url;
};
