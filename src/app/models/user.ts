export interface RegisterPayload {

    Name: string;
    Email: string;
    Password: string;

}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
}