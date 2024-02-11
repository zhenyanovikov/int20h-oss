import * as yup from "yup";

export function getAuctionValidationSchema() {
  return yup.object({
    title: yup
      .string("organisms.createAuctionForm.form.title.helperText")
      .required("organisms.createAuctionForm.form.title.requiredHelperText"),
    description: yup
      .string("organisms.createAuctionForm.form.description.helperText")
      .required(
        "organisms.createAuctionForm.form.description.requiredHelperText"
      ),
    images: yup
      .array()
      .of(yup.string())
      .required("organisms.createAuctionForm.form.images.requiredHelperText"),
    startingBid: yup.object({
      amount: yup
        .number("organisms.createAuctionForm.form.startingBid.helperText")
        .required(
          "organisms.createAuctionForm.form.startingBid.requiredHelperText"
        ),
    }),
  });
}

export const getBidValidationSchema = (minBidAmount) =>
  yup.object({
    amount: yup
      .number("organisms.createBidForm.form.amount.helperText")
      .min(minBidAmount, "organisms.createBidForm.form.amount.minHelperText")
      .required("organisms.createBidForm.form.amount.requiredHelperText"),
  });
