import { Stack, Typography } from "@mui/material";

function Section({ title, children }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

export default Section;
