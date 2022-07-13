import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  lastname: string;

  @Column()
  @Exclude()
  password: string;

  // @ManyToMany((type) => UserEntity, (user) => user.followee)
  // @JoinTable()
  // followers: UserEntity[];

  // @ManyToMany((type) => UserEntity, (user) => user.followers)
  // followee: UserEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
