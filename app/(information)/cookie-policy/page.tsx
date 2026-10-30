import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("cookie-policy");

export default function CookiePolicyPage() {
  return <InformationPage page={INFORMATION_PAGES["cookie-policy"]} />;
}
