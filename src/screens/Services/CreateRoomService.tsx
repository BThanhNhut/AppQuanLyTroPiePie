import storage from '@react-native-firebase/storage';

export const uploadImagesToFirebase = async (
  images: {uri: string; width: number; height: number}[],
) => {
  try {
    const promises = images.map(async (image, index) => {
      const imageName = `image_${index}`;
      console.log(image);
      // Xây dựng đường dẫn đầy đủ đến thư mục bạn muốn lưu trữ hình ảnh
      const imageRef = storage().ref().child(`images/${imageName}`);
      // Tải tệp hình ảnh lên Firebase Storage
      const response = await fetch(image.uri);
      const blob = await response.blob();
      await imageRef.put(blob);

      // Lấy URL của hình ảnh đã tải lên
      const url = await imageRef.getDownloadURL();
      return {url, imageName};
    });
    const uploadedImages = await Promise.all(promises);
    return uploadedImages;
  } catch (error) {
    console.error('Error uploading images to Firebase:', error);
  }
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
