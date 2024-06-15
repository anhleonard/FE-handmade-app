import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { COLORS } from "@/enum/colors";

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length < 1;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl component="fieldset" variant="standard">
        <label className="block text-sm font-medium text-grey-c600 dark:text-white">
          {"Danh mục"}
          <span className="text-base text-support-c500"> *</span>
        </label>
        <FormGroup>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange}
                    name="gilad"
                  />
                }
                label="Gilad Gray"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={handleChange}
                    name="jason"
                  />
                }
                label="Jason Killian"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={handleChange}
                    name="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </Grid>
          </Grid>
        </FormGroup>
        {error && (
          <div className="mt-1 flex items-center justify-start gap-1">
            <WarningAmberRoundedIcon
              sx={{ color: COLORS.support.c500, fontSize: 14 }}
            />
            <div className="text-xs font-medium text-support-c500">
              Vui lòng chọn ít nhất 1 danh mục
            </div>
          </div>
        )}
      </FormControl>
    </Box>
  );
}
