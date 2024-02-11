import { Stack, Box, TextField, Button, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CURRENCY_SYMBOL } from "../../../constants/currency";
import { useCreateBid } from "../../../api/auctions";
import { scaleAmountUp, scaleAmountDown } from "../../../helpers/currency";
import { getBidValidationSchema } from "../../../helpers/validation";

function CreateBidForm({ auctionId, minBidAmount }) {
  const { t } = useTranslation();
  const { mutate: createBidMutate, isLoading: isCreateBidLoading } =
    useCreateBid(auctionId);

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: getBidValidationSchema(scaleAmountDown(minBidAmount)),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1}>
        <Box>
          <TextField
            fullWidth
            type="number"
            id="amount"
            name="amount"
            label={t("organisms.createBidForm.form.amount.label")}
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && !!formik.errors.amount}
            helperText={formik.touched.amount && t(formik.errors.amount)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {CURRENCY_SYMBOL.UAH}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isCreateBidLoading}
          >
            {t("organisms.createBidForm.form.button.submit")}
          </Button>
        </Box>
      </Stack>
    </form>
  );

  function handleSubmit(values, actions) {
    const bid = {
      amount: scaleAmountUp(values.amount),
    };

    createBidMutate(bid);
    actions.resetForm();
  }
}

export default CreateBidForm;
