namespace backend.Errors;

public class NotFoundException(string message) : Exception(message);