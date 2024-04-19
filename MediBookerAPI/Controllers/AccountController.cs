using MediBookerAPI.Interfaces;
using MediBookerAPI.ModelsDTO;
using MediBookerAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediBookerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase, IAccountController
    {

        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginUser(UserLoginRequestDTO loginData)
        {
            TokenInfoDTO? result = await _accountService.LoginUser(loginData);
            if (result == null)
                return Unauthorized();
            else
                return Ok(result);
        }

        [HttpPut("firstEditUser/{id}/{password}")]
        [Authorize]

        public async Task<IActionResult> FirstEditUser(string id, string password, [FromForm] DoctorDTO firstEditUser)
        {
            try
            {
                Boolean firstEdit = await _accountService.FirstEditUser(firstEditUser, password);

                if(firstEdit == true)
                {
                    return StatusCode(200);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("LoadDoctors")]
        public async Task<ActionResult<ICollection<DoctorDTO>>> LoadDoctors()
        {
            try
            {
                ICollection<DoctorDTO> doctors = await  _accountService.GetDoctors();
                return Ok(doctors);
            }
            catch
            {
                throw new Exception("Error while loading a doctors!");
            }
        }

        [HttpGet("LoadDoctor/{id}")]
        public async Task<ActionResult<DoctorDTO>> LoadDoctor(string id)
        {
            try
            {
                DoctorDTO? doctor = await  _accountService.GetDoctor(id);
                return Ok(doctor);
            }
            catch
            {
                throw new Exception("Error while loading a doctor!");
            }
        }

        [HttpGet("LoadWorkers")]
        public async Task<ActionResult<ICollection<WorkerDTO>>> LoadWorkers()
        {
            try
            {
                ICollection<WorkerDTO> workers = await  _accountService.GetWorkers();
                return Ok(workers);
            }
            catch
            {
                throw new Exception("Error while loading a workers!");
            }
        }

        [HttpGet("LoadWorker/{id}")]
        public async Task<ActionResult<WorkerDTO>> LoadWorker(string id)
        {
            try
            {
                WorkerDTO? worker = await  _accountService.GetWorker(id);
                return Ok(worker);
            }
            catch
            {
                throw new Exception("Error while loading a worker!");
            }
        }

        [HttpPut("EditDoctor/{id}")]
        public async Task<ActionResult> EditDoctor(string id, [FromForm] DoctorPutDTO doctorPutDTO)
        {
            try
            {
                if (doctorPutDTO != null && doctorPutDTO.Id == id)
                {
                    Boolean result = await  _accountService.EditDoctor(id, doctorPutDTO);

                    return result ? Ok() : NotFound();
                }

                return NotFound();
            }
            catch
            {
                throw new Exception("Error while editing a doctor!");
            }
        }

        [HttpPut("EditWorker/{id}")]
        public async Task<ActionResult> EditWorker(string id, [FromForm] WorkerPutDTO workerPutDTO)
        {
            try
            {
                if (workerPutDTO != null && workerPutDTO.Id == id)
                {
                    Boolean result = await  _accountService.EditWorker(id, workerPutDTO);

                    return result ? Ok() : NotFound();
                }

                return NotFound();
            }
            catch
            {
                throw new Exception("Error while editing a worker!");
            }
        }

        [HttpPut("EditModerator/{id}")]
        public async Task<ActionResult> PutModerator([FromForm] WorkerPutDTO moderatorPutDTO, string id)
        {
            try
            {
                if (moderatorPutDTO == null || moderatorPutDTO.Id != id)
                {
                    return NotFound();
                }
                Boolean result = await  _accountService.EditModerator(moderatorPutDTO, id);

                return result ? Ok() : NotFound();

            }
            catch
            {
                throw new Exception("Error while editing a doctor!");
            }
        }

        [HttpPut("ChangePassword/{id}")]
        public async Task<ActionResult> ChangePassword(string id, ChangePasswordDTO changePassword)
        {
            try
            {
                if (id == null && changePassword == null)
                {
                    return NotFound();
                }
                else
                {
                    Boolean result = await  _accountService.EditPassword(id!, changePassword);
                    return result ? Ok() : BadRequest();
                }
            }
            catch
            {
                throw new Exception("Error while changing password!");
            }
        }
    }
}
