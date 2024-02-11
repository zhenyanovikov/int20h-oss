import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Link,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  generatePath,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTE } from "../../../constants/router";
import { AUCTION_STATUS } from "../../../constants/auction";
import { useDeleteAuction, useUpdateAuction } from "../../../api/auctions";
import AuctionMetadata from "../AuctionMetadata/AuctionMetadata";

function UserAuction({ auction }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: updateAuctionMutate, isLoading: isUpdateAuctionLoading } =
    useUpdateAuction(auction.id);
  const { mutate: deleteAuctionMutate, isLoading: isDeleteAuctionLoading } =
    useDeleteAuction();

  const isAuctionPending = auction.status === AUCTION_STATUS.PENDING;
  const isAuctionActive = auction.status === AUCTION_STATUS.ACTIVE;

  return (
    <Card>
      <Stack>
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            height: {
              xs: "unset",
              md: "144px",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: 240,
              },
              height: {
                xs: "unset",
                md: "100%",
              },
            }}
          >
            <CardMedia
              component="img"
              image={auction.images[0]}
              alt={t("molecules.userAuction.image.auctionPreviewImage")}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack width="100%">
            <CardContent>
              <Stack spacing={1}>
                <Link
                  variant="h6"
                  component={RouterLink}
                  underline="none"
                  to={`${ROUTE.AUCTIONS}/${auction.id}`}
                  sx={{
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: {
                      xs: "2",
                      md: "1",
                    },
                    display: "-webkit-box",
                    overflow: "hidden",
                  }}
                >
                  {auction.title}
                </Link>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: {
                      xs: "4",
                      md: "2",
                    },
                    display: "-webkit-box",
                    overflow: "hidden",
                  }}
                >
                  {auction.description}
                </Typography>
                <AuctionMetadata auction={auction} />
              </Stack>
            </CardContent>
          </Stack>
        </Stack>
        <CardActions>
          <Stack
            sx={{
              width: "100%",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: {
                xs: "unset",
                md: "flex-end",
              },
              gap: 2,
            }}
          >
            {isAuctionPending && (
              <Button
                variant="outlined"
                onClick={() => handleUpdateAuctionStatus(AUCTION_STATUS.ACTIVE)}
                disabled={isUpdateAuctionLoading}
              >
                {t("molecules.userAuction.button.start")}
              </Button>
            )}
            {isAuctionActive && (
              <Button
                variant="outlined"
                onClick={() =>
                  handleUpdateAuctionStatus(AUCTION_STATUS.COMPLETED)
                }
                disabled={isUpdateAuctionLoading}
              >
                {t("molecules.userAuction.button.complete")}
              </Button>
            )}
            <Button onClick={handleEditAuction}>
              {t("molecules.userAuction.button.edit")}
            </Button>
            {isAuctionPending && (
              <Button
                color="error"
                onClick={handleDeleteAuction}
                disabled={isDeleteAuctionLoading}
              >
                {t("molecules.userAuction.button.delete")}
              </Button>
            )}
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );

  function handleEditAuction() {
    navigate(generatePath(ROUTE.EDIT_AUCTION, { id: auction.id }));
  }

  function handleDeleteAuction() {
    deleteAuctionMutate(auction.id);
  }

  function handleUpdateAuctionStatus(status) {
    const updatedAuction = {
      ...auction,
      status,
    };

    updateAuctionMutate(updatedAuction);
  }
}

export default UserAuction;
