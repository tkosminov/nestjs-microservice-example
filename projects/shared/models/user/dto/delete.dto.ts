import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserDeleteDTO {
  @Field(() => ID, { nullable: false })
  public id: string;
}
