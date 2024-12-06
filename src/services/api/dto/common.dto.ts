import { Exclude } from "class-transformer";

export class Paginated {
  limit!: number;
  offset!: number;
  total!: number;
}

export class ResponseDto {
  @Exclude()
  tid!: string;

  @Exclude()
  ts!: number;
}
