import { ErrorHttpException } from '../../../Shared/Exceptions/ErrorHttpException';
import { StatusCode } from '../../../Shared/Utils/StatusCode';
class TokenNotFoundHttpException extends ErrorHttpException
{
  constructor()
  {
    const key = 'auth.presentation.exceptions.tokenNotFound';
    super({
      statusCode: StatusCode.HTTP_FORBIDDEN,
      errorMessage:
        {
          message: 'Token not found.',
          errorCode: key
        }
    });
  }
}

export default TokenNotFoundHttpException;
