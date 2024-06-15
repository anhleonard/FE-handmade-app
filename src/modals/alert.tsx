import { COLORS } from "@/enum/colors";
import { closeAlert } from "@/redux/slices/alertSlice";
import { RootState } from "@/redux/store";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Severity = "error" | "success" | "info" | "warning" | undefined;

const AlertModal = () => {
  const dispatch = useDispatch();
  const alertData = useSelector((state: RootState) => state.alert);

  const handleCloseAlert = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={alertData.isOpen}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      className="z-[500000]"
    >
      {alertData.isOpen ? (
        <Alert
          severity={alertData.type as Severity}
          onClose={handleCloseAlert}
          sx={{
            minWidth: "400px",
            borderRadius: "16px",
            paddingY: "8px",
            "&.MuiAlert-colorSuccess": {
              color: COLORS.success.c700,
            },
            "&.MuiAlert-colorError": {
              backgroundColor: `${COLORS.support.c10} !important`,
              color: COLORS.support.c600,
            },
            "&.MuiAlert-colorInfo": {
              backgroundColor: `${COLORS.blue.c50} !important`,
              color: COLORS.blue.c900,
            },
            "&.MuiAlert-colorWarning": {
              backgroundColor: `${COLORS.primary.c100} !important`,
              color: COLORS.primary.c900,
            },
          }}
        >
          <div className="text-base font-bold">{alertData.title}</div>
          <div className="mt-1.5 font-medium">{alertData.message}</div>
        </Alert>
      ) : (
        <div></div>
      )}
    </Snackbar>
  );
};

export default AlertModal;
