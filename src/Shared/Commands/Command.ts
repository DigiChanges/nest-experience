abstract class Command<T>  {

  public constructor(public readonly payload: T)
  {}
}

export default Command;
