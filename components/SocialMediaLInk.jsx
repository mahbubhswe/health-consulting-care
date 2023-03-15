import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { SocialIcon } from "react-social-icons";
export default function SocialMediaLink() {
  return (
    <Box>
      <Typography variant="bold" component="h2">
        Social Links
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <SocialIcon url="https://www.linkedin.com" />
        <SocialIcon url="https://mobile.twitter.com" />
        <SocialIcon url="https://www.facebook.com" />
      </Stack>
    </Box>
  );
}
