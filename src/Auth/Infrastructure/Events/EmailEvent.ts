import { IEvent } from '@nestjs/cqrs';
class EmailEvent implements IEvent
{
  public name: string = EmailEvent.name;
  // TODO: Implement when NOTIFIER exists.
  // public handle = async(props: any) =>
  // {
  //   const { emailNotification, args } =  props;
  //
  //   const emailNotificator: any = NotifierFactory.create(FACTORIES.EmailStrategy);
  //
  //   emailNotificator.emailNotification = emailNotification;
  //   emailNotificator.templatePathNameFile = args.templatePathNameFile;
  //   emailNotificator.data = args;
  //
  //   await emailNotificator.send(emailNotificator.templatePathNameFile);
  // };
}

export default EmailEvent;
