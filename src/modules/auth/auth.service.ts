import { HttpException, Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { hash } from 'bcrypt'
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, 
      @InjectRepository(User) private readonly userRepository: Repository<User>){}

      async login(credenciales: LoginAuthDto) {
        const { email, password, rememberMe } = credenciales;
        
        const user = await this.userRepository.findOne({
          where: { email: email }
        });
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new HttpException('Usuario no encontrado', 404);
        }
      
        const token = this.generateJwt(user, rememberMe);  // Pasa rememberMe para ajustar la expiración del token
      
        return { user, token };
      }
      

    async register(objUser: RegisterAuthDto) {
        const {password} = objUser
        const plainToHash  = await hash(password, 12)
        objUser = {...objUser, password:plainToHash}
        return this.userRepository.save(objUser)
      }
    
      async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return{
            User : user
          }; 
        }
        return null;
      }
    
      generateJwt(user: User, rememberMe: boolean) {
        const payload = { username: user.name, sub: user.id };
      
        const expirationTime = rememberMe ? '30d' : '1d';  
        
        return {
          access_token: this.jwtService.sign(payload, { expiresIn: expirationTime }), 
        };
      }
/////////
      async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
        const { email } = forgotPasswordDto;
    
        
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
          throw new HttpException('Usuario no encontrado', 404);
        }
    
       
        const resetToken = crypto.randomBytes(32).toString('hex');
    
       
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Expira en 1 hora
        await this.userRepository.save(user);
    
    
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: 'paul_11carrillo@outlook.com',  
            pass: 'PaulCarrillo',   
          },
        });
    
        const resetUrl = `http://localhost:4200/auth/forgot-password/${resetToken}`;
    
        const mailOptions = {
          from: 'paul_11carrillo@outlook.com',
          to: user.email,
          subject: 'Restablecimiento de contraseña',
          text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetUrl}`,
        };
    
        await transporter.sendMail(mailOptions);
    
        return { message: 'Correo de restablecimiento de contraseña enviado' };
      }
}