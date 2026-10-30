import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("disclaimer");

export default function DisclaimerPage() {
  return <InformationPage page={INFORMATION_PAGES.disclaimer} />;
}
