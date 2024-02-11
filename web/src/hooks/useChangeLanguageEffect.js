import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useClientStore from "../store/clientStore";

function useChangeLanguageEffect() {
  const locale = useClientStore((state) => state.locale);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
    dayjs.locale(locale);
  }, [i18n, locale]);
}

export default useChangeLanguageEffect;
