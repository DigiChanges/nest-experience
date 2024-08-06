abstract class Command<T>
{
  constructor(public readonly payload: T) {}
}

export default Command;
