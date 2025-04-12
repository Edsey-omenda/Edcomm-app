import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch,
  TokenState,
//   resetCart,
//   updateCartState,
//   CartState,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const query = useQuery()

  const { token, signedIn } = useAppSelector((state) => state.auth.session)
  const userId = useAppSelector((state) => state.auth.user.userId)
  //const cartState = useAppSelector((state) => state.orderline)

  const signIn = async (values: SignInCredential): Promise<{ status: Status; message: string } | undefined> => {
    try {
        const response = await apiSignIn(values);
        //console.log("API response:", response);
        if (response.success) {
            const { token } = response;
            //console.log("Token object:", token);
            if (token && token.access_Token) {
                const tokenState: TokenState = {
                    accessToken: token.access_Token,
                    tokenType: token.token_Type,
                    expiresIn: token.expires_In
                };
                dispatch(signInSuccess(tokenState));

                if (response.userInfo) {
                    dispatch(setUser(response.userInfo));
                    const redirectUrl = query.get(REDIRECT_URL_KEY)
                    navigate(
                      redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                    )
                    console.log("Redirecting to Home");
                    return {
                        status: 'success',
                        message: 'Signed in successfully'
                    };
                } else {
                    throw new Error('No User Information Found');
                }
            } else {
                throw new Error('No token Found');
            }
        } else {
            return { status: 'failed', message: 'Authentication failed' };
        }
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
        console.error('Sign In Error:', errors);
        return {
            status: 'failed',
            message: errors.message || 'Something went wrong! Please try again'
        };
    }
};

const signUp = async (values: SignUpCredential) => {
  try {
      const response = await apiSignUp(values)
      const data = response.data
      if (data.success) {
          return {
              status: 'success',
              message: data.message,
          }
      } else {
          return {
              status: 'failed',
              message: data.message,
          }
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (errors: any) {
      console.error('Sign Up Error: ' + JSON.stringify(errors))
      return {
          status: 'failed',
          message: 'Something went worng! Please try again',
      }
  }

}

  const handleSignOut = () => {
    // Save the current cart state to local storage before logging out.
    
    // if (userId) {
    //   localStorage.setItem(`cartState_${userId}`, JSON.stringify(cartState))
    //   console.log("exiting-cartState:", JSON.stringify(cartState))
    // } 
    dispatch(signOutSuccess())
    dispatch(
      setUser({
        userId: '',
        avatar: '',
        fullName: '',
        email: '',
        roles: [],
      })
    )
    //dispatch(resetCart())
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    handleSignOut()
  }

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
    signOut,
  }
}

export default useAuth
