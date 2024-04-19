using MediBookerAPI.ModelsDTO;
using MediBookerAPI.Interfaces;
using MediBookerAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MediBookerAPI.Data;
using System.Numerics;

namespace MediBookerAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountService(ITokenService tokenService, UserManager<User> userManager, IMapper mapper, ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<TokenInfoDTO?> LoginUser(UserLoginRequestDTO loginData)
        {
            User? user = await _userManager.FindByEmailAsync(loginData.Email);
            if (user != null)
            {
                String passwordCompare = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash!, loginData.Password).ToString();
                if (passwordCompare == "Success" || passwordCompare == "SuccessRehashNeeded")
                {
                    var result = new TokenInfoDTO();
                    result.AccessToken = await _tokenService.GenerateBearerToken(user.Id);
                    result.RefreshToken = await _tokenService.GenerateRefreshToken(user.Id);

                    return result;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<Boolean> FirstEditUser(DoctorDTO firstEditUser, string password)
        {
            try
            {
                User editUser = _mapper.Map<User>(firstEditUser);
                User? user = await _userManager.FindByIdAsync(firstEditUser.Id);
                if (firstEditUser != null)
                {
                    if (firstEditUser.File != null)
                    {
                        string image = firstEditUser.File.FileName;
                        string fileName = Path.GetFileNameWithoutExtension(image);
                        string extension = Path.GetExtension(image);

                        if (extension == ".jpg" || extension == ".png")
                        {
                            //byte[]? imageData = null;
                            //using (var binaryReader = new BinaryReader(firstEditUser.File.OpenReadStream()))
                            //{
                            //    imageData = binaryReader.ReadBytes((int)firstEditUser.File.Length);
                            //}
                            //user!.Image = imageData;

                            string webRootPath = _webHostEnvironment.WebRootPath;
                            string uploadPath = Path.Combine(webRootPath, "Uploads");

                            if (!Directory.Exists(uploadPath))
                            {
                                Directory.CreateDirectory(uploadPath);
                            }


                            String uniqueFileName = Guid.NewGuid().ToString() + "_" + firstEditUser.File.FileName;
                            String filePath = Path.Combine(uploadPath, uniqueFileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await firstEditUser.File.CopyToAsync(stream);
                            }

                            user.userImg = Path.Combine("Uploads", uniqueFileName);

                            user.UserName = firstEditUser.Email;
                            user.NormalizedUserName = firstEditUser.Email.ToUpper();
                            user.NormalizedEmail = firstEditUser.Email.ToUpper();
                            user.Name = firstEditUser.Name;
                            user.Surname = firstEditUser.Surname;

                            var hasher = new PasswordHasher<DoctorDTO>();
                            string hashedPassword = hasher.HashPassword(firstEditUser, password);
                            user.PasswordHash = hashedPassword;

                            if (firstEditUser.Specialization == "" || firstEditUser.Specialization == null || firstEditUser.Specialization == "undefinded")
                            {
                                user.Specialization = null;
                            }
                            else
                            {
                                user.Specialization = firstEditUser.Specialization;
                            }
                            user.Email = firstEditUser.Email;
                            user.IsAuthorized = true;

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
                        return false;
                    }
                }
                return false;
            }
            catch
            {
                throw new Exception("Error while updating a user!");
            }
        }

        public async Task<ICollection<DoctorDTO>> GetDoctors()
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

                return _mapper.Map<DoctorDTO>(doctor); 
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

                return _mapper.Map<WorkerDTO>(worker); 
            }
            catch
            {
                throw new Exception("Error while loading a worker!");
            }
        }

        public async Task<Boolean> EditDoctor(string id, DoctorPutDTO doctorPutDTO)
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
                            //byte[]? imageData = null;
                            //using (var binaryReader = new BinaryReader(doctorPutDTO.File.OpenReadStream()))
                            //{
                            //    imageData = binaryReader.ReadBytes((int)doctorPutDTO.File.Length);
                            //}
                            //doctor.Image = imageData;

                            string webRootPath = _webHostEnvironment.WebRootPath;
                            string uploadPath = Path.Combine(webRootPath, "Uploads");

                            if (!Directory.Exists(uploadPath))
                            {
                                Directory.CreateDirectory(uploadPath);
                            }

                            if (doctor.userImg != null)
                            {
                                if (File.Exists(Path.Combine(webRootPath, doctor.userImg)))
                                {
                                    File.Delete(Path.Combine(webRootPath, doctor.userImg));
                                }
                            }


                            String uniqueFileName = Guid.NewGuid().ToString() + "_" + doctorPutDTO.File.FileName;
                            String filePath = Path.Combine(uploadPath, uniqueFileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await doctorPutDTO.File.CopyToAsync(stream);
                            }

                            doctor.userImg = Path.Combine("Uploads", uniqueFileName);

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
                            //byte[]? imageData = null;
                            //using (var binaryReader = new BinaryReader(workerPutDTO.File.OpenReadStream()))
                            //{
                            //    imageData = binaryReader.ReadBytes((int)workerPutDTO.File.Length);
                            //}
                            //worker.Image = imageData;

                            string webRootPath = _webHostEnvironment.WebRootPath;
                            string uploadPath = Path.Combine(webRootPath, "Uploads");

                            if (!Directory.Exists(uploadPath))
                            {
                                Directory.CreateDirectory(uploadPath);
                            }

                            if (worker.userImg != null)
                            {
                                if (File.Exists(Path.Combine(webRootPath, worker.userImg)))
                                {
                                    File.Delete(Path.Combine(webRootPath, worker.userImg));
                                }
                            }


                            String uniqueFileName = Guid.NewGuid().ToString() + "_" + workerPutDTO.File.FileName;
                            String filePath = Path.Combine(uploadPath, uniqueFileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await workerPutDTO.File.CopyToAsync(stream);
                            }

                            worker.userImg = Path.Combine("Uploads", uniqueFileName);

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

                            if (moderator.userImg != null)
                            {
                                if (File.Exists(Path.Combine(webRootPath, moderator.userImg)))
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
    }
}


