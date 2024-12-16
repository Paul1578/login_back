import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({description: 'Nombre de Usuario'})
    @IsString({message:'El nombre deben ser careacteres'})
    @IsNotEmpty({message: 'El nombre no debe estar vacio'})
    name: string;

    @ApiProperty({description: 'Correo Electronico'})
    @IsEmail({},{message:'El formato debe ser de correo elctronico'})
    @IsNotEmpty({message:'El correo no debe estar vacio'})
    email: string;

    @ApiProperty({description: 'Nombre de Usuario'})
    @MinLength(6,{message:'Lacontraseña debe tner minimo 6 caracteres'})
    @IsString({message:'La contraseña debe ser una cadena'})
    @IsNotEmpty({message:'La contraseña no puede estar vacia'})
    password: string;
}
