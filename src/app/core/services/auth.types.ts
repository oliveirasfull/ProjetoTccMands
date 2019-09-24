export enum AuthProvider{
    Email,
    Facebook
    //provedores de autenticação
}

export interface User{
    name?: string;
    email: string;
    password: string;
}
export interface AuthOptions{
    isSignIn: boolean;
    provider: AuthProvider;
    user: User;
}
