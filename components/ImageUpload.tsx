import Typo from "./Typo";
import { Image } from "expo-image";
import { ImageUploadProps } from "../types";
import * as ImagePicker from "expo-image-picker";
import { scale, verticalScale } from "../utils/styling";
import { UploadSimpleIcon, XCircleIcon } from "phosphor-react-native";
import { getProfilePath } from "../services/imageService";
import { colors, radius, spacingX } from "../constants/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };

  return (
    <View>
      {!file && (
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <UploadSimpleIcon color={colors.primary} />
          {placeholder && (
            <Typo size={15} color={colors.textLight}>
              {placeholder}
            </Typo>
          )}
        </TouchableOpacity>
      )}
      {file && (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image
            style={{ flex: 1 }}
            source={getProfilePath(file)}
            contentFit="cover"
            transition={100}
          />
          <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
            <XCircleIcon
              size={verticalScale(28)}
              weight="fill"
              color={colors.error}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.surface,
    borderRadius: radius._16,
    borderCurve: "continuous",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacingX._15,
  },
  image: {
    height: scale(150),
    width: scale(150),
    borderRadius: radius._16,
    borderCurve: "continuous",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteIcon: {
    position: "absolute",
    top: scale(6),
    right: scale(6),
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
