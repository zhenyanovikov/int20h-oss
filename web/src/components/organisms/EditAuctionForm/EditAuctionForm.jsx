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
import { VALID_IMAGE_TYPES } from "../../../constants/validation";
import { getAuctionValidationSchema } from "../../../helpers/validation";
import { scaleAmountDown, scaleAmountUp } from "../../../helpers/currency";
import { CURRENCY_SYMBOL } from "../../../constants/currency";
import { AUCTION_STATUS } from "../../../constants/auction";
import { useUploadImages } from "../../../api/media";
import { useUpdateAuction } from "../../../api/auctions";
import { ROUTE } from "../../../constants/router";

function EditAuctionForm({ auction }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAuctionActive = auction.status === AUCTION_STATUS.ACTIVE;
  const isAuctionCompleted = auction.status === AUCTION_STATUS.COMPLETED;

  const { mutate: updateAuctionMutate, isLoading: isUpdateAuctionLoading } =
    useUpdateAuction(auction.id);
  const uploadImages = useUploadImages();

  const formik = useFormik({
    initialValues: {
      status: auction.status,
      title: auction.title,
      description: auction.description,
      images: auction.images,
      startingBid: {
        amount: scaleAmountDown(auction.startingBid.amount),
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
              {t("organisms.editAuctionForm.text.describe")}
            </Typography>
            <Box sx={{ width: { xs: "100%", md: "60%" } }}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label={t("organisms.editAuctionForm.form.title.label")}
                placeholder={t(
                  "organisms.editAuctionForm.form.title.placeholder"
                )}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && t(formik.errors.title)}
                disabled={isAuctionCompleted}
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
                label={t("organisms.editAuctionForm.form.images.label")}
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
                    "organisms.editAuctionForm.form.images.button.clear"
                  ),
                  children: <CloseIcon fontSize="small" />,
                }}
                disabled={isAuctionCompleted}
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
                label={t("organisms.editAuctionForm.form.description.label")}
                placeholder={t(
                  "organisms.editAuctionForm.form.description.placeholder"
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
                disabled={isAuctionCompleted}
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
                label={t("organisms.editAuctionForm.form.startingBid.label")}
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
                disabled={isAuctionCompleted || isAuctionActive}
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
                disabled={isUpdateAuctionLoading || isAuctionCompleted}
              >
                {t("organisms.editAuctionForm.form.button.submit")}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </form>
  );

  function handleSubmit(values) {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    const createdAuction = {
      ...values,
      startingBid: {
        amount: scaleAmountUp(values.startingBid.amount),
      },
    };

    updateAuctionMutate(createdAuction);
    navigate(ROUTE.USER_AUCTIONS);
  }

  async function handleChangeImages(event) {
    const images = await uploadImages(event);

    formik.setFieldValue("images", images);
  }
}

export default EditAuctionForm;
