import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from '@/utils/handlePassword';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {

    const isEmailExist = await this.isEmailExist(createUserDto.email);
    if (isEmailExist) throw new BadRequestException(`Email ${createUserDto.email} đã tồn tại`);

    const hashPW = await hashPassword(createUserDto.password);
    createUserDto.password = hashPW;

    const user = new this.userModel(createUserDto);
    user.save();
    return {
      statusCode: 200,
      message: 'Tạo tài khoản thành công',
      data: {
        _id: user._id,
      },
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset = (current - 1) * pageSize; // offset dùng để skip bao nhiêu phần tử 

    console.log('totalItems', totalItems);

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(offset)
      .sort(sort as any)
      .select('-password')
      ;

    return {
      statusCode: 200,
      message: 'Lấy danh sách người dùng thành công',
      data: {
        results,
        totalItems,
        totalPages,
        current,
        pageSize,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async isEmailExist(email: string) {
    const user = await this.userModel.exists({ email });
    return user ? true : false;
  }
}
