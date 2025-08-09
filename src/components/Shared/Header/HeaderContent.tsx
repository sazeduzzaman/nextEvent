import Image from "next/image";
import Link from "next/link";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import TopBar from "./TopBar";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import { fetchSiteInformation } from "@/lib/api/SiteInfromationData/SiteInformationDataSet";

const HeaderContent = async () => {
  const siteInfo = await fetchSiteInformation();
  return (
    <div className="container mx-auto">
      <TopBar />
      <div className="navbar px-3 lg:px-0">
        <div className="navbar-start">
          <Link href="/">
            <Image
              src={
                siteInfo.site_logo_black ||
                siteInfo.site_logo_white ||
                "/images/logo.png"
              }
              width={200}
              height={200}
              alt="Logo"
            />
          </Link>
        </div>
        <MenuItems />
        <div className="navbar-end">
          <div className="mb-none">
            <Link href="/events">
              <SiteButtonOne text="Explore Event" />
            </Link>
          </div>
          <MobileMenu />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
