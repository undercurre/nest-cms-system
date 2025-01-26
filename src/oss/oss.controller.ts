import { Body, Controller, Post } from '@nestjs/common';
import { OssService } from './oss.service';
import { SignatureDto } from './dto';
@Controller('oss')
export class OssController {
  constructor(private oss: OssService) {}

  @Post('signature')
  getOssSignature(@Body() SignatureDto: SignatureDto) {
    return this.oss.getSignature(SignatureDto.fileType);
  }
}
