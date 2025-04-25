import ApiService from './ApiService'
import appConfig from '@/configs/app.config'
import axios from 'axios'
import type {
  SignInCredential,
  SignUpCredential,
  SignInResponse,
  SignUpResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyResetTokenRequest,
  VerifyResetTokenResponse,
} from '@/@types/auth'

const BASE_URL = appConfig.apiPrefix;

export interface User {
  userId: string;
  fullName: string;
  email: string;
  roles?: string[];
  avatar: string;
}

export async function apiSignIn(data: SignInCredential): Promise<SignInResponse> {
  return await axios
    .post(`${BASE_URL}/Auth/Login`, data)
    .then((response) => {
      console.log("response", response)
      return {
        success: true,
        token: {
          access_Token: response.data.jwtToken,
          token_Type: 'Bearer',
          expires_In: 600
        },
        userInfo: {
          userId: response.data.userId,
          fullName: response.data.fullName,
          email: response.data.email,
          roles: response.data.roles,
          avatar: '' // Can be extended later
        }
      }
    })
    .catch(() => {
      return { 
        success: false, 
        error: 'Invalid email or password!' }
    })
}


export async function apiSignUp(data: SignUpCredential) {
  console.log('Calling API with:', data);
  return ApiService.fetchData<SignUpResponse>({
    url: `${BASE_URL}/Auth/Register`,
    method: 'post',
    data,
  })
}

export async function apiSignOut() {
  return ApiService.fetchData({
    url: '/sign-out',
    method: 'post',
  })
}

export async function apiForgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  return await axios
    .post(`${BASE_URL}/Auth/forgot-password`, { email: data.email })
    .then(() => ({
        success: true,
        message: 'Reset token sent to your email.',
        timestamp: new Date()
    }))
    .catch(() => ({
        success: false,
        message: 'Something went wrong',
        error: 'Failed to send reset token',
        timestamp: new Date()
    }))
}

function addTenMinutesToDate(date: Date) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + 10);
  return newDate;
}


export async function apiVerifyToken(data: VerifyResetTokenRequest): Promise<VerifyResetTokenResponse> {
  return await axios
    .post(`${BASE_URL}/Auth/verify-token`, { email: data.email, token: data.token })
    .then(() => ({
        success: true,
        message: 'Token is valid.',
    }))
    .catch(() => ({
        success: false,
        message: 'Invalid or expired token.',
    }))
}

export async function apiResetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return await axios
    .post(`${BASE_URL}/Auth/reset-password`, {
      newPassword: data.newPassword,
      email: data.email,
      token: data.token
    })
    .then(() => ({
      success: true,
      message: 'Password has been reset successfully.'
    }))
    .catch(() => ({
        success: false,
        message: 'Failed to reset password',
        error: 'Something went wrong'
    }))
}
