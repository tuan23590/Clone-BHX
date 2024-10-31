import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import Tinh from '../../utils/tinh_tp.json';
import Huyen from '../../utils/quan_huyen.json';
import Xa from '../../utils/xa_phuong.json';

@Injectable()
export class AddressService {
  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  findAll(type: string, code: string) {
    if (type.toLowerCase() === 'tinh') {
      return Object.values(Tinh);
    }
    else if (type.toLowerCase() === 'huyen') {
      return Object.values(Huyen).filter((huyen) => huyen.parent_code === code);
    }
    else if (type.toLowerCase() === 'xa') {
      return Object.values(Xa).filter((xa) => xa.parent_code === code);
    }else{
      throw new BadRequestException('type is invalid');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
