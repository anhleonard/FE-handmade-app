"use client";
import MyTextField from "@/libs/text-field";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AlertState, Product } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { allStoreProducts } from "@/apis/services/stores";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import Button from "@mui/material/Button";
import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { headerUrl } from "@/apis/services/authentication";
import { formatCurrency } from "@/enum/functions";
import { addProductCollection } from "@/apis/services/collections";
import { CreateCollectionValues } from "@/apis/types";
import { useRouter } from "next/navigation";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

const CreateCollectionScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([]);
  const [right, setRight] = React.useState<readonly number[]>([]);
  const [collectName, setCollectName] = useState("");

  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  // get all seller products by seller token
  const getAllSellerProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res: Product[] = await allStoreProducts(token);
      if (res) {
        let productIds = res.map((product) => product.id);
        setLeft(productIds);
        setProducts(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getAllSellerProducts();
  }, []);

  //call api create a new product collection
  const createProductCollection = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: CreateCollectionValues = {
        name: collectName,
        collectionProductIds: right as number[],
      };

      const res = await addProductCollection(variables, token);
      if (res) {
        router.push(`/collections`);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card
      style={{
        boxShadow: "none",
      }}
      className="rounded-xl border-[2px] border-grey-c50"
    >
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length}`}
      />
      <Divider />
      <List
        sx={{
          height: 480,
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          const product = products.find((product) => product.id === value);

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <div className="grid w-full grid-cols-4">
                <img
                  src={`${headerUrl}/products/${product?.images[0]}`}
                  alt="product-image"
                  className="col-span-1 h-15 w-15 rounded-lg object-cover"
                />
                <div className="col-span-3 flex flex-col justify-start">
                  <div className="overflow-ellipsis break-words text-sm">
                    {product?.productName}
                  </div>
                  <div>
                    <span className="text-[10px]">Giá bán:</span>{" "}
                    <span className="text-[10px] font-bold text-primary-c900">
                      {product?.price && formatCurrency(product?.price)}
                    </span>
                  </div>
                </div>
              </div>
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div className="w-full rounded-lg bg-white px-8 py-4">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">
          Tạo bộ sưu tập mới
        </div>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-grey-c900">1. Thông tin cơ bản</div>
          <MyTextField
            id="name"
            name="name"
            placeholder="Nhập tên bộ sưu tập của bạn"
            onChange={(event) => setCollectName(event?.target?.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold text-grey-c900">2. Danh sách sản phẩm</div>
          <div className="flex flex-row items-center justify-between rounded-2xl border-[2px] border-grey-c50 py-3 pl-2 pr-4">
            <div className="flex flex-row items-center gap-3">
              <img
                src="/images/products-stock.png"
                alt="products-stock"
                className="h-14 w-14"
              />
              <div className="flex flex-col gap-1 text-grey-c800">
                <div className="font-bold">Tự chọn</div>
                <div>
                  Bạn tự chọn sản phẩm để thêm vào bộ sưu tập và bấm "Thêm mới"
                  bên dưới để hoàn tất
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={5.5}>
              {customList("Danh sách lựa chọn", left)}
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={5.5}>
              {customList("Danh sách được chọn", right)}
            </Grid>
          </Grid>
        </div>

        <div className="flex flex-row items-center justify-center">
          <button
            onClick={() => createProductCollection()}
            className="w-fit rounded-full bg-primary-c900 px-5 py-2 text-sm font-medium text-white transition duration-300 hover:opacity-80"
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionScreen;
