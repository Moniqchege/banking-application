export interface loginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    userId: number;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    mobileNo: string;
  }