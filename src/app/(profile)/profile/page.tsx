"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import { COLORS } from "@/enum/colors";
import { profileTabs } from "@/enum/constants";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

const Profile = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <DefaultLayout>
      <div className="w-full rounded-lg bg-white px-8 py-4">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Hồ sơ người bán
          </div>
        </div>

        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="product-screen-tabs"
                  sx={{}}
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: COLORS.primary.c900,
                      height: 2,
                    },
                  }}
                >
                  {profileTabs.map((item, index: number) => {
                    return (
                      <Tab
                        key={index}
                        label={item.label}
                        value={item.value}
                        sx={{
                          color: COLORS.grey.c900,
                          textTransform: "none",
                          fontSize: "14px",
                          "&.Mui-selected": {
                            color: COLORS.primary.c900,
                            borderBottomColor: "green",
                          },
                        }}
                      />
                    );
                  })}
                </TabList>
              </Box>
              {profileTabs.map((item, index: number) => {
                return (
                  <TabPanel value={item.value} key={index}>
                    <div className="my-8">{item.content}</div>
                  </TabPanel>
                );
              })}
            </TabContext>
          </Box>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
