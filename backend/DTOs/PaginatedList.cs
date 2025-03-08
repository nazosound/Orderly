namespace backend.DTOs
{
    public class PaginatedList<T>
    {
        public int TotalPages { get; set; }
        public T Items { get; set; }

        public PaginatedList(int totalPages, T items)
        {
            TotalPages = totalPages;
            Items = items;
        }
    }
}
