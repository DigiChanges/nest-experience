import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import { MinioConfig, MinioStrategy } from '@shared/Filesystem/MinioStrategy';

const ProviderFilesystem: Provider = {
  provide: IFilesystem,
  useFactory: (config: ConfigService) =>
  {
    const minioConfig: MinioConfig = {
      endPoint: config.get('FILESYSTEM_HOST'),
      accessKey: config.get('FILESYSTEM_ACCESS_KEY'),
      secretKey: config.get('FILESYSTEM_SECRET_KEY'),
      useSSL: config.get('FILESYSTEM_USE_SSL') === 'true',
      port: +config.get('FILESYSTEM_PORT'),
      bucket: config.get('FILESYSTEM_BUCKET'),
      rootPath: config.get('FILESYSTEM_ROOT_PATH'),
      region: config.get('FILESYSTEM_REGION')
    };

    return new MinioStrategy(minioConfig);
  },
  inject: [ConfigService]
};

export default ProviderFilesystem;
