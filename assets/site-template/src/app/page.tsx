import { PortfolioSite } from "@/components/portfolio-site";
import { siteContent } from "@/content/site-content";

export default function Home() {
  return <PortfolioSite content={siteContent} />;
}
