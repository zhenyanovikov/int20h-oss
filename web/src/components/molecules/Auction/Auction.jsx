import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTE } from "../../../constants/router";
import AuctionMetadata from "../AuctionMetadata/AuctionMetadata";

function Auction({ auction }) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: {
          xs: "unset",
          md: 144,
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={auction.images[0]}
          alt={t("molecules.auction.image.auctionPreviewImage")}
          sx={{
            width: {
              xs: "100%",
              md: 216,
            },
            height: {
              xs: "unset",
              md: "100%",
            },
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Stack spacing={1}>
            <Link
              variant="h6"
              component={RouterLink}
              underline="none"
              to={generatePath(ROUTE.AUCTION, { id: auction.id })}
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
    </Card>
  );
}

export default Auction;
