using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;
using WebApi.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow,IMapper mapper)
        {
         
            this.uow=uow;
            this.mapper=mapper;
           
        }
        //get api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities =await uow.CityRepository.GetCitiesAsync();
            var citiesDto= mapper.Map<IEnumerable<CityDto>>(cities);
            
            return Ok(citiesDto);
        }
        
        //Post api/city/post/ --post the Json format data
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city=mapper.Map<City>(cityDto);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            uow.CityRepository.AddCity(city)   ;
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCities(int id, CityDto cityDto)
        {
            if(id!=cityDto.Id)
                return BadRequest("update not allowed");
            var cityFromDb= await uow.CityRepository.FindCity(id);
            if(cityFromDb==null)
                return BadRequest("update not allowed");
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);

        }
        //delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
        
    }
}