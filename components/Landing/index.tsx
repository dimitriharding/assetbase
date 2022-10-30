import type { NextPage } from "next";
import Hero from "./Hero";
import { LandingLayout } from "./LandingLayout";

const Landing: NextPage = () => {
  return (
    <LandingLayout>
      <Hero
        title="Modern Asset Management"
        subtitle="The easiest way to manage your company assets"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="Create your account now"
        ctaLink="/signup"
      />
    </LandingLayout>
  );
};

export default Landing;
