namespace backend.DTOs
{
    public struct ApiResponse(bool result, string message, object? data, int statusCode = 200)
    {
        public bool Result { get; } = result;
        public string Message { get; } = message;
        public object? Data { get; } = data;    
        public int StatusCode { get; } = statusCode;
    }
}
