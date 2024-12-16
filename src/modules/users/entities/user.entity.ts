import { Persona } from "../../persona/entities/persona.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @OneToOne(() => Persona, (persona) => persona.user, { cascade: true })
  persona: Persona;

  @Column({ type: 'varchar', length: 255, nullable: true })
  resetToken: string;

  @Column({ type: 'bigint', nullable: true })
  resetTokenExpiration: number;
}
