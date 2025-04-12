export type SignInCredential = {
    email: string
    password: string
}


export type UserInfo = {
    userId: string
    fullName: string
    email: string
    roles: string[]
    avatar: string
  }

export type Token = {
    access_Token: string
    token_Type: string
    expires_In: number
  }

export type SignUpResponse = {
    success: boolean
    message: string
  }  

export type SignInResponse = {
    success: boolean
    token?: Token
    userInfo?: UserInfo
    error?: string
  }  

export type SignUpCredential = {
    fullName: string
    email: string
    password: string
    roles?: string[]
}

export type ForgotPasswordRequest = {
    email: string
}

export type ForgotPasswordResponse = {
    success: boolean
    message: string
    error?: string
    timestamp: Date
  }

export type VerifyResetTokenRequest = {
    email: string
    token: string
}

export type VerifyResetTokenResponse = {
    success: boolean
    message: string
  }

export type ResetPasswordRequest = {
    email: string
    newPassword: string
    token: string
}

export type ResetPasswordResponse = {
    success: boolean
    message: string
    error?: string
  }
