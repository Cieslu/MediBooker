using AutoMapper;
using MediBookerAPI.Data;
using MediBookerAPI.Interfaces;
using MediBookerAPI.Models;
using MediBookerAPI.ModelsDTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;

namespace MediBookerAPI.Services
{
    public class ReservationService : IReservationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;

        public ReservationService(ApplicationDbContext context, IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailSender emailSender)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _emailSender = emailSender;

        }
        public async Task<ReservationDTO?> PostReservation(ReservationDTO reservationDTO)
        {
            try
            {
                Reservation reservation = _mapper.Map<Reservation>(reservationDTO);
                Boolean booked = await _context.Reservations.AnyAsync(x => x.ScheduleId == reservation.ScheduleId);
                if (!booked)
                {
                    _context.Reservations.Add(reservation);
                    await _context.SaveChangesAsync();

                    Reservation? visit = await _context.Reservations.Where(x => x.ScheduleId == reservation.ScheduleId).FirstOrDefaultAsync();
                    Schedule? schedule = await _context.Schedules.Where(x => x.Id == reservation.ScheduleId).FirstOrDefaultAsync();
                    User? doctor = await _userManager.FindByIdAsync(schedule.IdDoctor);

                    if (CheckHourFormat(schedule.HoursFrom))
                    {
                        schedule.HoursFrom = schedule.HoursFrom + '0';
                    }
                    if (CheckHourFormat(schedule.HoursTo))
                    {
                        schedule.HoursTo = schedule.HoursTo + '0';
                    }

                    string link = "localhost:4200/deleteReservation/{reservation.ScheduleId}";
                    string body =
                        @$"<div style=""font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;"">
                        <h1 style=""color: #333333; font-size: 24px; margin-bottom: 20px;"">Potwierdzenie rezerwacji wizyty</h1>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Dzień dobry {reservation.Name},</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Dziękujemy za złożenie rezerwacji w systemie MediBooker. Poniżej znajdują się szczegóły Twojej wizyty:</p>
                        <table style=""border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 20px;"">
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Imię:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{reservation.Name}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Nazwisko:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{reservation.LastName}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Data urodzenia:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{reservation.DateOfBirth}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Numer telefonu:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{reservation.PhoneNumber}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Data wizyty:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{schedule.Date}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Godzina rozpoczęcia wizyty:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{schedule.HoursFrom}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Godzina zakończenia wizyty:</td> 
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{schedule.HoursTo}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Imię lekarza:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{doctor!.Name}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Nazwisko lekarza:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{doctor!.Surname}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Specjalizacja lekarza:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{doctor.Specialization}</td>
                            </tr>
                        </table>

                        <p style='color: #666666; font-size: 16px; margin-bottom: 10px;'><a style='color: #FF6600; text-decoration: none;' href='http://localhost:4200/deleteReservation/{reservation.Id}/{reservation.ScheduleId}'>Kliknij tutaj</a>, aby anulować rezerwację.</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Prosimy o punktualne przybycie na wizytę.</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Życzymy udanej wizyty!</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Zespół MediBooker</p>
                    </div>";

                    await _emailSender.SendEmailAsync(reservation.Email!, "MediBooker - informacje dotyczące wizyty.", body);

                    return _mapper.Map<ReservationDTO>(reservation);

                }
                return null;
            }
            catch
            {
                throw new Exception("Error while adding a reservation!");
            }
        }

        public async Task<ICollection<ReservationDTO>> GetReservations()
        {
            try
            {
                IList<Reservation> reservations = await _context.Reservations.ToListAsync();
                IList<ReservationDTO> reservationsDTO = _mapper.Map<IList<ReservationDTO>>(reservations);

                return reservationsDTO;
            }
            catch
            {
                throw new Exception("Error while loading reservations!");
            }
        }

        public async Task<ICollection<ReservationDTO>> GetReservations(string id)
        {
            try
            {
                IList<Reservation> reservations = await _context.Reservations.Where(x => x.Schedule.IdDoctor == id).ToListAsync();
                IList<ReservationDTO> reservationsDTO = _mapper.Map<IList<ReservationDTO>>(reservations);

                return reservationsDTO;
            }
            catch
            {
                throw new Exception("Error while loading reservations!");
            }
        }

        public async Task<ReservationDTO?> DeleteReservation(int id)
        {
            try
            {
                Reservation? reservation = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);

                if (reservation != null)
                {
                    _context.Reservations.Remove(reservation);
                    await _context.SaveChangesAsync();

                }
                return _mapper.Map<ReservationDTO>(reservation);
            }
            catch
            {
                throw new Exception("Error while deleting a reservtion!");
            }
        }

        public bool CheckHourFormat(string str)
        {
            string[] parts = str.Split(':');
            return parts.Length == 2 && parts[1].Length == 1;
        }
    }
}
