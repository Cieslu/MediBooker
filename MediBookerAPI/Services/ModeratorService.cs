using AutoMapper;
using MediBookerAPI.Data;
using MediBookerAPI.Interfaces;
using MediBookerAPI.Models;
using MediBookerAPI.ModelsDTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using PasswordGenerator;
using System.Numerics;
using System.Security.Cryptography;
using System.Text;

namespace MediBookerAPI.Services
{
    public class ModeratorService : IModeratorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public ModeratorService(ApplicationDbContext context, IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailSender emailSender, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<DoctorDTO> PostDoctor(User doctor, string password)
        {
            try
            {
                IdentityResult resultUser = await _userManager.CreateAsync(doctor, password);
                IdentityResult resultRole = await _userManager.AddToRoleAsync(doctor, "Doctor");

                if (resultUser.Succeeded == true && resultRole.Succeeded == true)
                {
                    string message =
                        @$"<div style=""font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;"">
                        <h1 style=""color: #333333; font-size: 24px; margin-bottom: 20px;"">Szczegóły utworzonego konta w serwisie MediBooker.</h1>
                        <table style=""border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 20px;"">
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Login:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{doctor.Email}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Hasło:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{password}</td>
                            </tr>
                        </table>

                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Dziękujemy za założenie konta w naszym serwisie.</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Pozdrawiamy</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Zespół MediBooker!</p>
                    </div>";

                    await _emailSender.SendEmailAsync(doctor.Email!, "Register", message);
                }

                return _mapper.Map<DoctorDTO>(doctor);
            }
            catch
            {
                throw new Exception("Error while creating a new user!");
            }
        }

        public async Task<WorkerDTO> PostWorker(User worker, string password)
        {
            try
            {
                IdentityResult resultUser = await _userManager.CreateAsync(worker, password);
                IdentityResult resultRole = await _userManager.AddToRoleAsync(worker, "Worker");

                if (resultUser.Succeeded == true && resultRole.Succeeded == true)
                {

                    string message =
                        @$"<div style=""font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;"">
                        <h1 style=""color: #333333; font-size: 24px; margin-bottom: 20px;"">Szczegóły utworzonego konta w serwisie MediBooker.</h1>
                        <table style=""border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 20px;"">
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Login:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{worker.Email}</td>
                            </tr>
                            <tr>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">Hasło:</td>
                                <td style=""padding: 10px; border: 1px solid #dddddd;"">{password}</td>
                            </tr>
                        </table>

                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Dziękujemy za założenie konta w naszym serwisie.</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Pozdrawiamy</p>
                        <p style=""color: #666666; font-size: 16px; margin-bottom: 10px;"">Zespół MediBooker!</p>
                    </div>";

                    await _emailSender.SendEmailAsync(worker.Email!, "Register", message);
                }

                return _mapper.Map<WorkerDTO>(worker);

            }
            catch
            {
                throw new Exception("Error while creating a new user!");
            }
        }

        /*   public async Task<ICollection<DoctorDTO>> GetDoctors()
           {
               try
               {
                   IList<User> doctors = await _userManager.GetUsersInRoleAsync("Doctor");
                   return _mapper.Map<ICollection<DoctorDTO>>(doctors);
               }
               catch
               {
                   throw new Exception("Error while loading a list of doctors!");
               }
           }

           public async Task<DoctorDTO?> GetDoctor(string id)
           {
               try
               {
                   IList<User> doctors = await _userManager.GetUsersInRoleAsync("Doctor");
                   User? doctor = doctors.Where(x => x.Id == id).FirstOrDefault();

                   return _mapper.Map<DoctorDTO>(doctor); ;
               }
               catch
               {
                   throw new Exception("Error while loading a doctor!");
               }
           }

           public async Task<ICollection<WorkerDTO>> GetWorkers()
           {
               try
               {
                   IList<User> workers = await _userManager.GetUsersInRoleAsync("Worker");
                   return _mapper.Map<ICollection<WorkerDTO>>(workers);
               }
               catch
               {
                   throw new Exception("Error while loading a list of workers!");
               }
           }

           public async Task<WorkerDTO?> GetWorker(string id)
           {
               try
               {
                   IList<User> workers = await _userManager.GetUsersInRoleAsync("Worker");
                   User? worker = workers.Where(x => x.Id == id).FirstOrDefault();

                   return _mapper.Map<WorkerDTO>(worker); ;
               }
               catch
               {
                   throw new Exception("Error while loading a worker!");
               }
           }*/
        public async Task<WorkerDTO?> GetModerator(string id)
        {
            try
            {
                IList<User> moderators = await _userManager.GetUsersInRoleAsync("Moderator");
                User? moderator = moderators.Where(x => x.Id == id).FirstOrDefault();

                return _mapper.Map<WorkerDTO>(moderator); ;
            }
            catch
            {
                throw new Exception("Error while loading a worker!");
            }
        }

        /*public async Task<Boolean> EditDoctor(string id, DoctorPutDTO doctorPutDTO)
        {
            try
            {
                IList<User> doctors = await _userManager.GetUsersInRoleAsync("Doctor");
                User? doctor = doctors.Where(x => x.Id == id).FirstOrDefault();

                if (doctor != null)
                {
                    if (doctorPutDTO.File != null)
                    {
                        string image = doctorPutDTO.File.FileName;
                        string fileName = Path.GetFileNameWithoutExtension(image);
                        string extension = Path.GetExtension(image);

                        if (extension == ".jpg" || extension == ".png")
                        {
                            byte[]? imageData = null;
                            using (var binaryReader = new BinaryReader(doctorPutDTO.File.OpenReadStream()))
                            {
                                imageData = binaryReader.ReadBytes((int)doctorPutDTO.File.Length);
                            }
                            doctor.Image = imageData;

                            doctor.Id = doctorPutDTO.Id;
                            doctor.UserName = doctorPutDTO.Email;
                            doctor.NormalizedUserName = doctorPutDTO.Email.ToUpper();
                            doctor.NormalizedEmail = doctorPutDTO.Email.ToUpper();
                            doctor.Name = doctorPutDTO.Name;
                            doctor.Surname = doctorPutDTO.Surname;
                            doctor.Specialization = doctorPutDTO.Specialization;
                            doctor.Email = doctorPutDTO.Email;

                            await _context.SaveChangesAsync();
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        doctor.Id = doctorPutDTO.Id;
                        doctor.UserName = doctorPutDTO.Email;
                        doctor.NormalizedUserName = doctorPutDTO.Email.ToUpper();
                        doctor.NormalizedEmail = doctorPutDTO.Email.ToUpper();
                        doctor.Name = doctorPutDTO.Name;
                        doctor.Surname = doctorPutDTO.Surname;
                        doctor.Specialization = doctorPutDTO.Specialization;
                        doctor.Email = doctorPutDTO.Email;

                        await _context.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                throw new Exception("Error while updating a user!");
            }
        }

        public async Task<Boolean> EditWorker(string id, WorkerPutDTO workerPutDTO)
        {
            try
            {
                IList<User> workers = await _userManager.GetUsersInRoleAsync("Worker");
                User? worker = workers.Where(x => x.Id == id).FirstOrDefault();

                if (worker != null)
                {
                    if (workerPutDTO.File != null)
                    {
                        string image = workerPutDTO.File.FileName;
                        string fileName = Path.GetFileNameWithoutExtension(image);
                        string extension = Path.GetExtension(image);

                        if (extension == ".jpg" || extension == ".png")
                        {
                            byte[]? imageData = null;
                            using (var binaryReader = new BinaryReader(workerPutDTO.File.OpenReadStream()))
                            {
                                imageData = binaryReader.ReadBytes((int)workerPutDTO.File.Length);
                            }
                            worker.Image = imageData;

                            worker.Id = workerPutDTO.Id;
                            worker.UserName = workerPutDTO.Email;
                            worker.NormalizedUserName = workerPutDTO.Email.ToUpper();
                            worker.NormalizedEmail = workerPutDTO.Email.ToUpper();
                            worker.Name = workerPutDTO.Name;
                            worker.Surname = workerPutDTO.Surname;
                            worker.Specialization = workerPutDTO.Specialization;
                            worker.Email = workerPutDTO.Email;

                            await _context.SaveChangesAsync();
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        worker.Id = workerPutDTO.Id;
                        worker.UserName = workerPutDTO.Email;
                        worker.NormalizedUserName = workerPutDTO.Email.ToUpper();
                        worker.NormalizedEmail = workerPutDTO.Email.ToUpper();
                        worker.Name = workerPutDTO.Name;
                        worker.Surname = workerPutDTO.Surname;
                        worker.Specialization = workerPutDTO.Specialization;
                        worker.Email = workerPutDTO.Email;

                        await _context.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                throw new Exception("Error while updating a user!");
            }
        }*/

        public async Task<Boolean> DeleteDoctor(string id)
        {
            try
            {
                IList<User> doctors = await _userManager.GetUsersInRoleAsync("Doctor");
                User? doctor = doctors.Where(x => x.Id == id).FirstOrDefault();

                if (doctor != null)
                {
                    _context.Users.Remove(doctor);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw new Exception("Error while updating a user!");
            }
        }

        public async Task<Boolean> DeleteWorker(string id)
        {
            try
            {
                IList<User> workers = await _userManager.GetUsersInRoleAsync("Worker");
                User? worker = workers.Where(x => x.Id == id).FirstOrDefault();

                if (worker != null)
                {
                    _context.Users.Remove(worker);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw new Exception("Error while updating a user!");
            }
        }

        public async Task<Boolean> EditModerator(WorkerPutDTO moderatorPutDTO, string moderatorId)
        {
            try
            {
                User editModerator = _mapper.Map<User>(moderatorPutDTO);
                User? moderator = await _userManager.FindByIdAsync(moderatorPutDTO.Id);
                if (moderator != null)
                {
                    if (moderatorPutDTO.File != null)
                    {
                        string image = moderatorPutDTO.File.FileName;
                        string fileName = Path.GetFileNameWithoutExtension(image);
                        string extension = Path.GetExtension(image);

                        if (extension == ".jpg" || extension == ".png")
                        {
                            //byte[]? imageData = null;
                            //using (var binaryReader = new BinaryReader(moderatorPutDTO.File.OpenReadStream()))
                            //{
                            //    imageData = binaryReader.ReadBytes((int)moderatorPutDTO.File.Length);
                            //}
                            //moderator.Image = imageData;

                            string webRootPath = _webHostEnvironment.WebRootPath;
                            string uploadPath = Path.Combine(webRootPath, "Uploads");

                            if (!Directory.Exists(uploadPath))
                            {
                                Directory.CreateDirectory(uploadPath);
                            }

                            if(moderator.userImg!= null)
                            {
                                if (File.Exists(Path.Combine(webRootPath,moderator.userImg)))
                                {
                                    File.Delete(Path.Combine(webRootPath, moderator.userImg));
                                }
                            }

                            String uniqueFileName = Guid.NewGuid().ToString() + "_" + moderatorPutDTO.File.FileName;
                            String filePath = Path.Combine(uploadPath, uniqueFileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await moderatorPutDTO.File.CopyToAsync(stream);
                            }

                            moderator.userImg = Path.Combine("Uploads", uniqueFileName);

                            moderator.Name = editModerator.Name;
                            moderator.Surname = editModerator.Surname;
                            moderator.Email = editModerator.Email;
                            await _userManager.UpdateAsync(moderator);
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        moderator.Name = editModerator.Name;
                        moderator.Surname = editModerator.Surname;
                        moderator.Email = editModerator.Email;
                        await _userManager.UpdateAsync(moderator);
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                throw new Exception("Error while editing a doctor!");
            }
        }

        public async Task<Boolean> EditPassword(string id, ChangePasswordDTO changePassword)
        {
            try
            {
                if (id != null && changePassword != null)
                {
                    User? user = await _userManager.FindByIdAsync(id);

                    if (user != null)
                    {
                        IdentityResult result = await _userManager.ChangePasswordAsync(user, changePassword.oldPassword, changePassword.currentPassword);
                        return result.Succeeded;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;
            }
            catch
            {
                throw new Exception("Error while changing password!");
            }
        }

        public string GenerateRandomPassword()
        {
            var pwd = new Password();
            var password = pwd.Next();
            return password;
        }
    }
}
