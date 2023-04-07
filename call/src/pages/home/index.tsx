import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./style";
import Image from "next/image";

import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClainUsernameForm";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Uncomplicated scheduling
        </Heading>
        <Text size="lg">
          Connect your calendar and allow people to mark appointments in your
          free time.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendar simulating applying schedule in operation"
        />
      </Preview>
    </Container>
  );
}
