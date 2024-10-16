import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';

export interface IErrorDetails {
  message: string;
  type: GeneralErrorType;
  domainErrorType?: string;
  name?: string;
  stack?: string;
  metadata?: Record<string, string>;
}

export class ErrorException extends Error
{
  readonly type: GeneralErrorType;
  readonly domainErrorType: string | null;
  readonly metadata: Record<string, string>;

  constructor(props: IErrorDetails)
  {
    super(props.message);
    this.name = props.name || ErrorException.name;
    this.type = props.type;
    this.domainErrorType = props.domainErrorType || null;
    this.stack = props.stack || null;
    this.metadata = props.metadata || null;
  }
}
