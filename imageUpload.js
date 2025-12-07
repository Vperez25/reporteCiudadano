
const IMGBB_API_KEY = '82ddb98f0130ccd5bce2c0c085d7789a';

export const uploadImageToImgBB = async (imageUri) => {
  try {
    console.log('Subiendo imagen a ImgBB...');

    // Crear FormData
    const formData = new FormData();
    
    // Agregar la imagen
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `photo_${Date.now()}.jpg`,
    });

   
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = await response.json();

   
    if (data.success) {
      console.log('Imagen subida exitosamente');
      console.log('URL:', data.data.url);
      return data.data.url;
    } else {
      throw new Error('Error al subir imagen a ImgBB');
    }
  } catch (error) {
    console.error('❌ Error subiendo imagen:', error);
    throw error;
  }
};
