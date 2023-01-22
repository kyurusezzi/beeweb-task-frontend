export interface SignUpRequestDto {
  fullName: string;
  email: string;
  password: string;
}

export interface SignUpResponseDto {
  token: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}
