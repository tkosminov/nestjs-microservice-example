import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateDTO {
  @Field(() => String, { nullable: false })
  public full_name: string;
}
