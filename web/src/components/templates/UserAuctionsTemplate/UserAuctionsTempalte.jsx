import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Empty from "../../molecules/Empty/Empty";
import UserAuctions from "../../organisms/UserAuctions/UserAuctions";

function UserAuctionsTemplate({ userAuctionsData, isGetUserAuctionsLoading }) {
  const { t } = useTranslation();

  return (
    <Box py={8}>
      <Container>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1">
            {t("templates.userAuctions.title")}
          </Typography>

          {isGetUserAuctionsLoading || !userAuctionsData ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <>
              {!userAuctionsData.length ? (
                <Empty />
              ) : (
                <UserAuctions auctions={userAuctionsData} />
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default UserAuctionsTemplate;
