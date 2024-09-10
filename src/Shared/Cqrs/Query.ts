
abstract class Query<T>
{
  constructor(public readonly payload: T) {}
}

export default Query;
