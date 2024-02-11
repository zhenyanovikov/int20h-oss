import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function AuctionImagesSection({ images }) {
  const { t } = useTranslation();

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={8}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: {
                xs: 256,
                md: 512,
              },
              objectFit: "contain",
            }}
            alt={t("organisms.auctionImagesSection.image.auctionImage")}
            src={image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default AuctionImagesSection;
