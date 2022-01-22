import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  /*@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })*/
  password: string;
}
