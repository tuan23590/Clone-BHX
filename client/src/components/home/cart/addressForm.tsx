import { handleGetAddressAction } from "@/action/addressAction";
import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
} from "@mui/joy";
import React from "react";

type AddressFormProps = {
  tinhs: any[];
  setOpenAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormElements extends HTMLFormControlsCollection {
  phone: HTMLInputElement;
  name: HTMLInputElement;
  gender: HTMLInputElement;
  address: HTMLInputElement;
  tinh: HTMLInputElement;
  huyen: HTMLInputElement;
  xa: HTMLInputElement;
}

interface AddressFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddressForm({
  tinhs,
  setOpenAddressForm,
}: AddressFormProps) {
  const [huyens, setHuyens] = React.useState<any[]>([]);
  const [xas, setXas] = React.useState<any[]>([]);
  const handleGetHuyen = async (code: string) => {
    console.log(code);
    const HuyenResponse = await handleGetAddressAction("huyen", code);
    setHuyens(HuyenResponse.data);
  };
  const handleGetXa = async (code: string) => {
    const XaResponse = await handleGetAddressAction("xa", code);
    setXas(XaResponse.data);
  };
  const handleSubmit = (e: React.FormEvent<AddressFormElement>) => {
    e.preventDefault();
    const phone = e.currentTarget.elements.phone.value;
    const name = e.currentTarget.elements.name.value;
    const gender = e.currentTarget.elements.gender.value;
    const address = e.currentTarget.elements.address.value;
    const tinh = e.currentTarget.elements.tinh.value;
    const huyen = e.currentTarget.elements.huyen.value;
    const xa = e.currentTarget.elements.xa.value;
  }
  return (
    <form
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormControl required>
            <FormLabel>Số điện thoại</FormLabel>
            <Input type="phone" name="phone" />
          </FormControl>

          <FormControl required>
            <RadioGroup
              name="gender"
              sx={{ gap: 2, flexWrap: "wrap", flexDirection: "row" }}
            >
              <Radio
                value="none"
                sx={{
                  display: "none",
                }}
              />
              <Radio value="Anh" label="Anh" color="success" />
              <Radio value="Chị" label="Chị" color="success" />
            </RadioGroup>
          </FormControl>
          <FormControl required>
            <FormLabel>Họ tên</FormLabel>
            <Input type="name" name="name" />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <FormControl required>
            <FormLabel>Tỉnh/Thành phố</FormLabel>
            <Autocomplete
              name="tinh"
              options={tinhs}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => handleGetHuyen(value.code)}
            />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <FormControl required>
            <FormLabel>Quận/Huyện</FormLabel>
            <Autocomplete
              name="huyen"
              options={huyens || []}
              getOptionLabel={(option) => option?.name}
              onChange={(e, value) => handleGetXa(value.code)}
            />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl required>
            <FormLabel>Phường/Xã</FormLabel>
            <Autocomplete
              name="xa"
              options={xas || []}
              getOptionLabel={(option) => option?.name}
            />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl required>
            <FormLabel>Số nhà, tên đường</FormLabel>
            <Input type="address" name="address" />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <Button
            color="warning"
            variant="soft"
            fullWidth
            onClick={() => setOpenAddressForm(false)}
          >
            Hủy
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button type="submit" color="success" variant="soft" fullWidth>
            Lưu địa chỉ
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
