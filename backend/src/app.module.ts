import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SignupModule} from './auth/signup/signup.module';
import {LoginModule} from './auth/login/login.module';
import { User } from './entities/user.entity';
import { HotelModule } from './hotel/hotel.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // ✅ RENDER / PRODUCTION
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: false, // ❌ never true in prod
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        // ✅ LOCAL DEVELOPMENT (Laptop)
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'hotel_user',
          password: 'your_local_password',
          database: 'hotel_app',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    AuthModule,
    SignupModule,
    LoginModule,
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST', 'localhost'),
//         port: configService.get<number>('DB_PORT', 5432),
//         username: configService.get<string>('DB_USERNAME', 'hotel_user'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_DATABASE', 'hotel_app'),
//         synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // local only
//         logging: configService.get<boolean>('DB_LOGGING', true),
//         entities: [User, __dirname + '/**/*.entity{.ts,.js}'],
//         migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//         retryAttempts: 3,
//         retryDelay: 3000,        
//       }),
//       inject: [ConfigService],
//     }),
//     AuthModule,
//     SignupModule, 
//     LoginModule,
//     HotelModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {} 
