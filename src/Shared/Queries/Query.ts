abstract class Query<T>  {

  public constructor(public readonly payload: T)
  {}
}

export default Query;
