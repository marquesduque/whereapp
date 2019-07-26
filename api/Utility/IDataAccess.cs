using System;
using System.Collections.Generic;
namespace ghop.DataAccess
{
    interface IDataAccess<T>
    {
        void Remove(T entity);
        T Find(object[] ids);
        System.Collections.Generic.List<T> GetList(T entity);
        void Save(T entity);
        void Update(T entity);
    }
}
