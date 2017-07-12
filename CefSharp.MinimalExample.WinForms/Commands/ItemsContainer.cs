using System.Collections.Generic;

namespace CefSharp.MinimalExample.WinForms.Commands
{
    class ItemsContainer<T>
    {
        public ItemsContainer(List<T> items)
        {
            Items = items;
        }
        public ItemsContainer(T[] items)
        {
            Items = new List<T>(items);
        }
        public List<T> Items { get; set; }
    }
    class ItemContainer<T>
    {
        public ItemContainer(T item)
        {
            Item = item;
        }
        public T Item { get; set; }
    }
}