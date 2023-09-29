import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

const MyImageComponent = () => {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Simulate fetching Blob URL (replace with your logic)
  useEffect(() => {
    // Replace 'YOUR_BLOB_URL' with the actual Blob URL
    const blobUrl =
      "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/images%2Fgihaaaaa?alt=media&token=e157ba69-2070-41b3-937d-4b13f21aa533";

    // Simulate fetching Blob data (replace with your actual fetching logic)
    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Convert Blob data to a Base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageBlobUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching Blob data:", error);
      });
  }, []);

  // Once you have the Base64 string, set it as the image source
  useEffect(() => {
    if (imageBlobUrl) {
      setImageUrl(imageBlobUrl);
    }
  }, [imageBlobUrl]);

  return (
    <View>
      {imageUrl ? (
        <View>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: imageUrl }}
          />
        </View>
      ) : (
        <Text>Loading Image...</Text>
      )}
    </View>
  );
};

export default MyImageComponent;
