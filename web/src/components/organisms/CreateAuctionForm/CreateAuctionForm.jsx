import {
  Stack,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getAuctionValidationSchema } from "../../../helpers/validation";
import { scaleAmountUp } from "../../../helpers/currency";
import { VALID_IMAGE_TYPES } from "../../../constants/validation";
import { CURRENCY_SYMBOL } from "../../../constants/currency";
import { useCreateAuction } from "../../../api/auctions";
import { useUploadImages } from "../../../api/media";
import { ROUTE } from "../../../constants/router";

function CreateAuctionForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: createAuctionMutate, isLoading: isCreateAuctionLoading } =
    useCreateAuction();
  const uploadImages = useUploadImages();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      images: "",
      startingBid: {
        amount: "",
      },
    },
    validationSchema: getAuctionValidationSchema(),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <Paper>
          <Stack p={2} spacing={1}>
            <Typography variant="h6">
              {t("organisms.createAuctionForm.text.describe")}
            </Typography>
            <Box sx={{ width: { xs: "100%", md: "60%" } }}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label={t("organisms.createAuctionForm.form.title.label")}
                placeholder={t(
                  "organisms.createAuctionForm.form.title.placeholder"
                )}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && t(formik.errors.title)}
              />
            </Box>
          </Stack>
        </Paper>
        <Paper>
          <Box p={2}>
            <Box sx={{ width: { sm: "100%", md: "25%" } }}>
              <MuiFileInput
                fullWidth
                multiple
                hideSizeText
                label={t("organisms.createAuctionForm.form.images.label")}
                value={formik.values.images}
                onChange={handleChangeImages}
                onBlur={formik.handleBlur}
                error={formik.touched.images && !!formik.errors.images}
                helperText={formik.touched.images && t(formik.errors.images)}
                inputProps={{
                  accept: VALID_IMAGE_TYPES.join(","),
                }}
                clearIconButtonProps={{
                  title: t(
                    "organisms.createAuctionForm.form.images.button.clear"
                  ),
                  children: <CloseIcon fontSize="small" />,
                }}
              />
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box p={2}>
            <Box sx={{ width: { xs: "100%", md: "60%" } }}>
              <TextField
                fullWidth
                multiline
                rows={8}
                id="description"
                name="description"
                label={t("organisms.createAuctionForm.form.description.label")}
                placeholder={t(
                  "organisms.createAuctionForm.form.description.placeholder"
                )}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  formik.touched.description && t(formik.errors.description)
                }
              />
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box p={2}>
            <Box sx={{ width: { xs: "100%", md: "25%" } }}>
              <TextField
                fullWidth
                type="number"
                id="startingBid.amount"
                name="startingBid.amount"
                label={t("organisms.createAuctionForm.form.startingBid.label")}
                value={formik.values.startingBid.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.startingBid?.amount &&
                  !!formik.errors.startingBid?.amount
                }
                helperText={
                  formik.touched.startingBid?.amount &&
                  t(formik.errors.startingBid?.amount)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {CURRENCY_SYMBOL.UAH}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box p={2}>
            <Stack alignItems="flex-end">
              <Button
                variant="contained"
                type="submit"
                disabled={isCreateAuctionLoading}
              >
                {t("organisms.createAuctionForm.form.button.submit")}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </form>
  );

  function handleSubmit(values) {
    const createdAuction = {
      ...values,
      startingBid: {
        amount: scaleAmountUp(values.startingBid),
      },
    };

    createAuctionMutate(createdAuction);
    navigate(ROUTE.AUCTIONS);
  }

  async function handleChangeImages(event) {
    const images = await uploadImages(event);

    formik.setFieldValue("images", images);
  }
}

export default CreateAuctionForm;
