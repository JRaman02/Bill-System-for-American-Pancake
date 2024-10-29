import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import RNFS from 'react-native-fs'; // Import react-native-fs for file system operations

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    let isMounted = true;

    const getCachedImage = async () => {
      try {
        // Generate a file path based on the URI
        const fileName = uri.split('/').pop(); // Get the image name from the URL
        const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

        // Check if the image already exists in the file system
        const fileExists = await RNFS.exists(filePath);

        if (fileExists && isMounted) {
          // If the file exists, use it
          setCachedSource({ uri: `file://${filePath}` });
        } else {
          // Fetch the image from the network
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
          const imageBlob = await response.blob();

          // Convert the blob to base64
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the "data:image/..." part
            reader.onerror = (err) => reject(err);
          });

          // Save the image as a base64-encoded file
          await RNFS.writeFile(filePath, base64Data, 'base64');

          // Set the cached image as the source
          if (isMounted) {
            setCachedSource({ uri: `file://${filePath}` });
          }

          // Manage cache size to avoid filling up storage
          await manageCacheSize();
        }
      } catch (error) {
        console.error('Error caching image:', error);
        if (isMounted) {
          setCachedSource({ uri });
        }
      }
    };

    getCachedImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  // Manage cache size by removing old files if cache exceeds the limit
  const manageCacheSize = async () => {
    const files = await RNFS.readDir(RNFS.CachesDirectoryPath);
    const cacheSizeLimit = 50; // Limit the cache to 50 images (customize as needed)

    if (files.length > cacheSizeLimit) {
      // Sort by last modified date and remove the oldest
      files.sort((a, b) => a.mtime - b.mtime);
      const filesToDelete = files.slice(0, files.length - cacheSizeLimit);

      for (const file of filesToDelete) {
        await RNFS.unlink(file.path); // Delete the file
      }
    }
  };

  return <Image source={cachedSource} {...props} style={{ width: '60%', height: '50%' }} />;
};
export default CachedImage;