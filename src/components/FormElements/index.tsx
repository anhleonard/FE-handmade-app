"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { COLORS } from "@/enum/colors";
import MyTextField from "@/libs/text-field";
import MyIcon from "@/libs/my-icon";
import MyButton from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import Typography from "@/libs/typography";
import { FontFamily, FontSize, TextColor } from "@/enum/setting";
import SwitchButton from "@/libs/switch-button";
import { useState } from "react";
import Select from "@/libs/select";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import MyTabButton from "@/libs/tab-button";

const OpenPassIcon = () => {
  return (
    <div>
      <MyIcon>
        <path
          d="M4.47583 12.9375V12.942C4.45057 13.0373 4.40677 13.1266 4.34695 13.205C4.28713 13.2833 4.21246 13.3491 4.1272 13.3985C4.04194 13.448 3.94777 13.4801 3.85008 13.4932C3.75238 13.5062 3.65307 13.4999 3.55783 13.4745C2.91133 13.3035 3.02533 12.558 3.02533 12.558L3.05233 12.465C3.05233 12.465 3.09133 12.339 3.12283 12.2475C3.50776 11.1682 4.07443 10.1627 4.79833 9.2745C6.14383 7.6335 8.40733 6 11.9998 6C15.5923 6 17.8558 7.6335 19.2028 9.2745C19.9267 10.1627 20.4934 11.1682 20.8783 12.2475C20.9106 12.3403 20.9406 12.4338 20.9683 12.528L20.9728 12.5475V12.5535L20.9743 12.5565C21.0219 12.7474 20.9926 12.9493 20.8926 13.1188C20.7927 13.2883 20.6302 13.4117 20.4401 13.4625C20.25 13.5132 20.0476 13.4873 19.8765 13.3902C19.7054 13.2931 19.5793 13.1327 19.5253 12.9435L19.5238 12.9375L19.5118 12.9C19.4268 12.6345 19.3266 12.3741 19.2118 12.12C18.9061 11.4402 18.5128 10.8033 18.0418 10.2255C16.9288 8.868 15.0658 7.5 11.9998 7.5C8.93383 7.5 7.07233 8.868 5.95783 10.2255C5.34658 10.9762 4.86726 11.8253 4.54033 12.7365C4.5218 12.7907 4.50429 12.8452 4.48783 12.9L4.47583 12.9375ZM8.24983 14.25C8.24983 13.2554 8.64492 12.3016 9.34818 11.5983C10.0514 10.8951 11.0053 10.5 11.9998 10.5C12.9944 10.5 13.9482 10.8951 14.6515 11.5983C15.3547 12.3016 15.7498 13.2554 15.7498 14.25C15.7498 15.2446 15.3547 16.1984 14.6515 16.9017C13.9482 17.6049 12.9944 18 11.9998 18C11.0053 18 10.0514 17.6049 9.34818 16.9017C8.64492 16.1984 8.24983 15.2446 8.24983 14.25Z"
          fill={COLORS.grey.c900}
        />
      </MyIcon>
    </div>
  );
};

const FormElements = () => {
  const [checkedSwitchButton, setCheckedSwitchButton] = useState(false);
  return (
    <>
      <Breadcrumb pageName="FormElements" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <MyButton color="primary" disabled>
                Press here!
              </MyButton>
              <MyTabButton onClick={() => console.log("first")}>
                <Typography
                  fontSize={FontSize.XS}
                  fontFamily={FontFamily.NORMAL}
                  textColor={TextColor.WHITE}
                >
                  Tất cả
                </Typography>
              </MyTabButton>
              <MyDatePicker />
              <MyTextField
                id="name"
                title="Name"
                placeholder="Input your name"
                onChange={(value) => console.log(value)}
                // isError={true}
                // disabled
                defaultValue={"xin chao nhe"}
                helperText={"This is error error error error error error!"}
                endIcon={<OpenPassIcon />}
              />
              <Select
                title="Select nation"
                options={[
                  { label: "VIET NAM", value: "VN" },
                  { label: "USA", value: "USA" },
                ]}
              />
              <MyTextArea
                id="password"
                title="Address"
                placeholder="Input your name"
                onChange={(value) => console.log(value)}
                // isError={true}
                // disabled
                defaultValue={"xin chao nhe"}
                helperText={"This is error error error error error error!"}
              />
              <MyIcon>
                <path
                  d="M12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5ZM12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2ZM12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9C7 10 7 12 12 18.71C17 12 17 10 17 9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4Z"
                  fill={COLORS.success.c500}
                />
              </MyIcon>

              <Typography
                fontSize={FontSize.LG}
                fontFamily={FontFamily.BOLD}
                textColor={TextColor.PRIMARY_900}
              >
                xin chào
              </Typography>
              <SwitchButton
                checked={checkedSwitchButton}
                handleClickSwitchButton={() =>
                  setCheckedSwitchButton(!checkedSwitchButton)
                }
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Default Input
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="dark:focus:border-primary w-full rounded-2xl border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary-c900 active:border-primary-c900 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Active Input
                </label>
                <input
                  type="text"
                  placeholder="Active Input"
                  className="border-primary focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Disabled label
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="focus:border-primary active:border-primary dark:focus:border-primary w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:disabled:bg-black"
                />
              </div>
            </div>
          </div>

          {/* <!-- Toggle switch input --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Toggle switch input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SwitcherOne />
              <SwitcherTwo />
              <SwitcherThree />
              <SwitcherFour />
            </div>
          </div>

          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne />
              <DatePickerTwo />
            </div>
          </div>

          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="file:hover:bg-primary focus:border-primary active:border-primary dark:focus:border-primary w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-opacity-10 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="focus:border-primary file:focus:border-primary active:border-primary w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Textarea Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Default textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="focus:border-primary active:border-primary dark:focus:border-primary w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Active textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Active textarea"
                  className="border-primary focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="focus:border-primary active:border-primary dark:focus:border-primary w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:disabled:bg-black"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <!-- Checkbox and radio --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div>

          {/* <!-- Select input --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo />
              <MultiSelect id="multiSelect" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
