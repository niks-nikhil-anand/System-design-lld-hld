import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("editorial-policy");

export default function EditorialPolicyPage() {
  return <InformationPage page={INFORMATION_PAGES["editorial-policy"]} />;
}
