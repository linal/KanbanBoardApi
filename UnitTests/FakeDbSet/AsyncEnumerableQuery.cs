﻿using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;

namespace FakeDbSet
{
    public class AsyncEnumerableQuery<T> : EnumerableQuery<T>, IDbAsyncEnumerable<T>, IQueryable
    {
        public AsyncEnumerableQuery(IEnumerable<T> enumerable) : base(enumerable)
        {
        }

        public AsyncEnumerableQuery(Expression expression) : base(expression)
        {
        }

        public IDbAsyncEnumerator<T> GetAsyncEnumerator()
        {
            return new AsyncEnumeratorWrapper<T>(this.AsEnumerable().GetEnumerator());
        }

        IDbAsyncEnumerator IDbAsyncEnumerable.GetAsyncEnumerator()
        {
            return GetAsyncEnumerator();
        }

        IQueryProvider IQueryable.Provider
        {
            get { return new AsyncQueryProviderWrapper<T>(this); }
        }
    }
}