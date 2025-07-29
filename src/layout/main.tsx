import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";
import type { ReactNode } from "react";
import logo from "../assets/logo.png";
export const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container w="100%">
      <Box fontWeight={"bold"} py={4} fontSize={20} display={"flex"} gap={2}>
        <Image
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
          src={logo}
          alt="logo"
        />
        HALO AML
      </Box>
      <Box>{children}</Box>
    </Container>
  );
};
