import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateDTO {
  @Field(() => ID, { nullable: false })
  public id: string;

  @Field(() => String, { nullable: false })
  public full_name: string;
}
