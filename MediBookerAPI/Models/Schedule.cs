﻿namespace MediBookerAPI.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public string IdDoctor { get; set; } = "";
        public string Date { get; set; } = "";
        public string HoursFrom { get; set; } = "";
        public string HoursTo { get; set; } = "";
    }
}
