import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <InformationPage page={INFORMATION_PAGES["privacy-policy"]} />;
}
