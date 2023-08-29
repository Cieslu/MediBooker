using MediBookerAPI.ModelsDTO;
using MediBookerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediBookerAPI.Interfaces
{
    public interface IAccountController
    {
        public Task<IActionResult> LoginUser(UserLoginRequestDTO loginData);
        public Task<IActionResult> FirstEditUser(string id, string password, [FromForm] DoctorDTO firstEditUser);
        public Task<ActionResult<ICollection<DoctorDTO>>> LoadDoctors();
        public Task<ActionResult<DoctorDTO>> LoadDoctor(string id);
        public Task<ActionResult<ICollection<WorkerDTO>>> LoadWorkers();
        public Task<ActionResult<WorkerDTO>> LoadWorker(string id);
        public Task<ActionResult> EditDoctor(string id, DoctorPutDTO doctorPutDTO);
        public Task<ActionResult> EditWorker(string id, WorkerPutDTO workerPutDTO);
        public Task<ActionResult> ChangePassword(string id, ChangePasswordDTO changePassword);
    }
}
