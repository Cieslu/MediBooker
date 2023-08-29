using System.Diagnostics.CodeAnalysis;

namespace MediBookerAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string LastName { get; set; } = "";
        public string DateOfBirth { get; set; } = "";
        public string Email { get; set; } = "";
        public int PhoneNumber { get; set; }

        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }
    }
}
