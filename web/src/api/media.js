import apiClient from "./apiClient";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { MEDIA_UPLOAD_URL } from "../constants/media";

function uploadImage(image) {
  return apiClient.postForm(MEDIA_UPLOAD_URL, { image });
}

export function useUploadImages() {
  const { t } = useTranslation();

  return async function uploadImages(images) {
    try {
      const response = await Promise.all(images.map(uploadImage));

      return response.map((res) => res.data.url);
    } catch (_) {
      enqueueSnackbar(t("snackbars.uploadImages.error"), { variant: "error" });
    }
  };
}
