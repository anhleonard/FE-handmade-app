import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
});
