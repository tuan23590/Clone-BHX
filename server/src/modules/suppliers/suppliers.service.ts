import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './schemas/supplier.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SuppliersService {

  constructor(
    @InjectModel(Supplier.name)
    private supplierModel: Model<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const { name, email, phone, address } = createSupplierDto;
    // find by email or phone
    const existedSupplier = await this.supplierModel.findOne({ $or: [{ email }, { phone }] }).exec();

    if (existedSupplier) {
      throw new BadRequestException('Nhà cung cấp đã tồn tại');
    }
    
    const newSupplier = await this.supplierModel.create({
      name,
      email,
      phone,
      address,
    });

    return newSupplier;
  }

  findAll() {
    return `This action returns all suppliers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
