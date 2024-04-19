namespace MediBookerAPI.ModelsDTO
{
    public class ChangePasswordDTO
    {
        public string currentPassword { get; set; } = "";
        public string oldPassword { get; set; } = "";
    }
}
