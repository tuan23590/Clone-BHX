"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { usePathname, useRouter } from "next/navigation";
import { AppContext } from "@/context/AppProvider";
import AlertDialogModal from "@/components/AlertDialogModal";
import { formatDateTime } from "@/utils/fomart";
import { Tooltip } from "@mui/joy";
import { handleDeleteCategoryAction } from "@/action/categoryAction";
import ModalEditCategory from "./modal.editCategory";
import ModalCategoryDetail from "./modal.categoryParent";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu({
  data,
}: {
  data: {
    _id: string;
    name: string;
    description: string;
    image: string;
  };
}) {
  const { openSnackbar } = React.useContext(AppContext);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleDelete = async () => {
    const res = await handleDeleteCategoryAction(data._id);
    if (res) {
      openSnackbar({
        message: "Xóa danh mục thành công",
        color: "success",
      });
      return true;
    } else {
      openSnackbar({
        message: "Xóa danh mục thất bại",
        color: "danger",
      });
      return false;
    }
  };
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => setOpenEdit(true)}>Chỉnh sửa</MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => setOpenConfirm(true)}>
            Xóa
          </MenuItem>
        </Menu>
      </Dropdown>
      <AlertDialogModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Xác nhận xóa"
        content={`Bạn có chắc chắn muốn xóa danh mục: 
          <span
          style="color: red"
          >${data?.name}</span> không?`}
        buttonContent="Xóa"
        type="alert"
        handleFunction={handleDelete}
      />
      <ModalEditCategory
        open={openEdit}
        setOpen={setOpenEdit}
        formData={data}
      />
    </>
  );
}

interface UserProps {
  categories: any[];
  meta: any;
}

const renderPages = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  let pages = [];
  if (totalPages <= 6) {
    // Hiển thị tất cả nếu số trang nhỏ hơn 6
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // Hiển thị với dấu ...
    if (currentPage <= 3) {
      pages = [1, 2, 3, "…", totalPages - 1, totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, 2, "…", totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [
        1,
        "…",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "…",
        totalPages,
      ];
    }
  }

  return pages;
};

export default function Category({ categories, meta }: UserProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  const { replace } = useRouter();
  const pathname = usePathname();
  const pages = renderPages({
    totalPages: meta.pages,
    currentPage: meta.current,
  });

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const name = target.getAttribute("name");
    const page = target.textContent;
    if (name === "prev" && meta.current > 1) {
      replace(
        `${pathname}?current=${meta.current - 1}&pageSize=${meta.pageSize}`
      );
    } else if (name === "next" && meta.current < meta.pages) {
      replace(
        `${pathname}?current=${meta.current + 1}&pageSize=${meta.pageSize}`
      );
    } else if (name === "page" && page) {
      replace(`${pathname}?current=${page}&pageSize=${meta.pageSize}`);
    }
  };
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Tìm kiếm danh mục</FormLabel>
          <Input
            size="sm"
            placeholder="Tìm kiếm"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== categories.length
                  }
                  checked={selected.length === categories.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? categories.map((row) => row._id)
                        : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === categories.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  ID
                </Link>
              </th>
              <th style={{ width: 80, padding: "12px 6px" }}>Ngày tạo</th>
              <th style={{ width: 100, padding: "12px 6px" }}>
                Hình ảnh danh mục
              </th>
              <th style={{ width: 240, padding: "12px 6px" }}>Tên danh mục</th>
              <th style={{ width: 240, padding: "12px 6px" }}>
                Mô tả danh mục
              </th>
              <th style={{ width: 40, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...categories].sort(getComparator(order, "id")).map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setOpenCategory(true);
                  setSelectedCategory(row);
                }}
              >
                <td style={{ textAlign: "center", width: 120 }} onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row._id)}
                    color={selected.includes(row._id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row._id)
                          : ids.filter((itemId) => itemId !== row._id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row._id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {formatDateTime(row.createdAt)}
                  </Typography>
                </td>
                <td onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Link href={row.image} target="_blank" color="primary">
                    <img
                      src={row.image}
                      width="30"
                      height="30"
                      style={{ borderRadius: 4, marginRight: 8 }}
                    />
                    Xem ảnh
                  </Link>
                </td>
                <td>
                  <Tooltip
                    title={row.name}
                    variant="outlined"
                    sx={{
                      maxWidth: 300,
                    }}
                  >
                    <Typography level="body-xs" noWrap>
                      {row.name}
                    </Typography>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip
                    title={row.description}
                    variant="outlined"
                    sx={{
                      maxWidth: 300,
                    }}
                  >
                    <Typography noWrap level="body-xs">
                      {row.description}
                    </Typography>
                  </Tooltip>
                </td>
                <td
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <RowMenu data={row} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          name="prev"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={handlePageChange}
        >
          Trang trước
        </Button>
        <Box sx={{ flex: 1 }} />

        {pages.map((page, index) => (
          <IconButton
            key={index}
            size="sm"
            name="page"
            variant={Number(page) ? "outlined" : "plain"}
            color={meta.current === page ? "primary" : "neutral"}
            onClick={handlePageChange}
          >
            {page}
          </IconButton>
        ))}

        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          name="next"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={handlePageChange}
        >
          Trang tiếp
        </Button>
      </Box>
      <ModalCategoryDetail
        open={openCategory}
        setOpen={setOpenCategory}
        formData={selectedCategory}
      />
    </React.Fragment>
  );
}
