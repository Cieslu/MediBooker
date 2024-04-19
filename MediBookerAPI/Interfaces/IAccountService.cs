using MediBookerAPI.Models;
using MediBookerAPI.ModelsDTO;
using Microsoft.AspNetCore.Identity;

namespace MediBookerAPI.Interfaces
{
    public interface IAccountService
    {
        public Task<TokenInfoDTO?> LoginUser(UserLoginRequestDTO loginData);
        public Task<Boolean> FirstEditUser(DoctorDTO firstEditUser, string password);
        public Task<ICollection<DoctorDTO>> GetDoctors();
        public Task<DoctorDTO?> GetDoctor(string id);
        public Task<ICollection<WorkerDTO>> GetWorkers();
        public Task<WorkerDTO?> GetWorker(string id);
        public Task<Boolean> EditDoctor(string id, DoctorPutDTO doctorPutDTO);
        public Task<Boolean> EditWorker(string id, WorkerPutDTO workerPutDTO);
        public Task<Boolean> EditModerator(WorkerPutDTO moderatorPutDTO, string moderatorId);
        public Task<Boolean> EditPassword(string id, ChangePasswordDTO changePassword);
    }
}
