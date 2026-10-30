import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("terms-of-use");

export default function TermsOfUsePage() {
  return <InformationPage page={INFORMATION_PAGES["terms-of-use"]} />;
}
