import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("about");

export default function AboutPage() {
  return <InformationPage page={INFORMATION_PAGES.about} />;
}
