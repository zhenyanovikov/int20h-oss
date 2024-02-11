import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constants/router";

function CreateAuctionButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLargerThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box>
      {isLargerThanSm ? (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<AddIcon />}
          onClick={handleCreateAuction}
        >
          {t("molecules.createAuctionButton.button.create")}
        </Button>
      ) : (
        <IconButton color="inherit" onClick={handleCreateAuction}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );

  function handleCreateAuction() {
    navigate(ROUTE.CREATE_AUCTION);
  }
}

export default CreateAuctionButton;
