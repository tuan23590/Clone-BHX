import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':fileName')
  async remove(@Param('fileName') fileName: string) {
    return this.filesService.remove(fileName);
  }

  @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files', 20, {
          storage: diskStorage({
            destination: './src/uploads',
            filename: (req, file, cb) => {
              const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
              cb(null, fileName);
            },
          }),
        }),
      )
      uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
          const fileReponse = {
            fileName: file.filename,
            fileSize: file.size,
          };
          response.push(fileReponse);
        });
        return response;
      }
}
