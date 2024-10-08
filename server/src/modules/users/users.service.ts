import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from '@/utils/handlePassword';
import aqp from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto, ResendCodeDto, VerifyDto } from '@/auth/dto/verify-auth.dto';
import { generateCode } from '@/utils/code';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.isEmailExist(createUserDto.email);
    if (isEmailExist)
      throw new BadRequestException(`Email ${createUserDto.email} đã tồn tại`);

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
      .select('-password');
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

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
    return {
      statusCode: 200,
      message: 'Cập nhật người dùng thành công',
      data: {
        _id: updateUserDto._id,
      },
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const results = await this.userModel.findByIdAndDelete(id);
      if (results) {
        return {
          statusCode: 200,
          message: 'Xóa người dùng thành công',
          data: {
            _id: id,
          },
        };
      } else {
        throw new BadRequestException('Không tìm thấy người dùng');
      }
    } else {
      throw new BadRequestException('Id không hợp lệ');
    }
  }

  async isEmailExist(email: string) {
    const user = await this.userModel.exists({ email });
    return user ? true : false;
  }

  async register(registerDto: CreateAuthDto) {
    const isEmailExist = await this.isEmailExist(registerDto.email);
    if (isEmailExist)
      throw new BadRequestException(`Email ${registerDto.email} đã tồn tại`);

    const hashPW = await hashPassword(registerDto.password);
    registerDto.password = hashPW;

    const user = new this.userModel({
      ...registerDto,
      // random activation code with 6 numbers
      activationCode: generateCode(),
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });
    await user.save();

    this.mailerService.sendMail({
      to: registerDto.email,
      subject: 'Xác thực tài khoản',
      template: 'register',
      context: {
        name: registerDto.name || user.email,
        activationCode: user.activationCode,
      },
    });

    return {
      statusCode: 200,
      message: 'Tạo tài khoản thành công',
      data: {
        _id: user._id,
      },
    };
  }

  async verify(verifyDto: VerifyDto) {
    const user = await this.userModel.findById(verifyDto._id);
    if (!user) throw new BadRequestException('Không tìm thấy người dùng');
    if (user.activationCode !== verifyDto.verifyCode)
      throw new BadRequestException('Mã xác thực không chính xác');
    if (dayjs().isAfter(user.codeExpired))
      throw new BadRequestException('Mã xác thực đã hết hạn');
    await this.userModel.findByIdAndUpdate(verifyDto._id, {
      isActivated: true,
      activationCode: null,
      codeExpired: null,
    });
    return {
      statusCode: 200,
      message: 'Xác thực tài khoản thành công',
      data: {
        _id: verifyDto._id,
      },
    };
  }

  async resendCode(resendCodeDto: ResendCodeDto) {
    const user = await this.userModel.findOne({ email: resendCodeDto.email });
    if (!user) throw new BadRequestException('Không tìm thấy người dùng');
    user.activationCode = generateCode();
    user.codeExpired = dayjs().add(5, 'minutes').toDate();
    console.log('user', user);
    await user.save();
    return {
      statusCode: 200,
      message: 'Gửi lại mã xác thực thành công',
      data: {
        _id: user._id,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModel.findById(forgotPasswordDto._id);
    if (!user) throw new BadRequestException('Không tìm thấy người dùng');
    if (user.activationCode !== forgotPasswordDto.verifyCode)
      throw new BadRequestException('Mã xác thực không chính xác');
    if (dayjs().isAfter(user.codeExpired))
      throw new BadRequestException('Mã xác thực đã hết hạn');
    user.password = await hashPassword(forgotPasswordDto.password);
    user.activationCode = null;
    user.codeExpired = null;
    await user.save();
    return {
      statusCode: 200,
      message: 'Đổi mật khẩu thành công',
      data: {
        _id: user._id,
      },
    };
  }
}
