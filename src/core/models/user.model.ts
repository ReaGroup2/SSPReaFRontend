/*
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
    public bool IsMale { get; set; } = default!;
    public byte[] PasswordSalt { get; set; } = default!;
    public byte[] PasswordHash { get; set; } = default!;
    public UserType UserType { get; set; } = UserType.Member;*/
export interface User {
  Id: number;
  Email: string;
  UserName: string;
  Fullname: string;
  Phone: string;
  ImagePath:string;
  IsMale:boolean;
  
  
  UserType: UserType;




}

export enum UserType {
  Admin,
  Organizator,
  Member
}
