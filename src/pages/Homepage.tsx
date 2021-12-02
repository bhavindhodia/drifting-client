import {
  LandingLayout,
  Hero,
  Working,
  Provide,
  Booking,
  Tips,
} from "components";
import { Box } from "@chakra-ui/layout";
import "./pages.style.css";
import homeData from "components/Homepage/homeData.json";

const Homepage = () => {
  return (
    <Box className="homepage-main">
      <LandingLayout>
        <Hero
          title={homeData.heroPage.title}
          subtitle={homeData.heroPage.subtitle}
          buttonTxt={homeData.heroPage.buttonTxt}
        />
        <Working headingTitle={homeData.workHeading} data={homeData.working} />
        <Provide
          headingTitle={homeData.provideHeading}
          data={homeData.provide}
        />
        <Booking
          bookingTitle={homeData.bookingTitle}
          subtitle={homeData.subtitle}
          btnTxt={homeData.bookBtn}
        />
        <Tips tipsData={homeData.tipsData} />
      </LandingLayout>
    </Box>
  );
};

export default Homepage;
