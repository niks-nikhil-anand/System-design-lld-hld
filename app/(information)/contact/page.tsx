import { InformationPage } from "@/components/information/InformationPage";
import {
  INFORMATION_PAGES,
  informationMetadata,
} from "@/lib/information-pages";

export const metadata = informationMetadata("contact");

export default function ContactPage() {
  return <InformationPage page={INFORMATION_PAGES.contact} />;
}
