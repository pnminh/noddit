import { CustomValidationError, getCustomValidationError } from '../../utils/ValidationUtils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidationError
} from 'class-validator';
import { validateSync } from 'class-validator';
@Entity()
export class User {
  constructor(email: string = null, password: string = null) {
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  @IsEmail({},{message:"$property must be correctly formatted"})
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @MinLength(10)
  password: string;

  validate(): CustomValidationError[] {
    const errors: ValidationError[] = validateSync(this);
    return getCustomValidationError(errors);
  }
}
