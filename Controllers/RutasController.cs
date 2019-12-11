using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NgNetCore.Data;
using NgNetCore.Models;
using NgNetCore.ViewModels;

namespace NgNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RutasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RutasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rutas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ruta>>> GetRuta()
        {
            return await _context.Rutas.ToListAsync();
        }

        // GET: api/Rutas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ruta>> GetRuta(string id)
        {
            var ruta = await _context.Rutas.FindAsync(id);

            if (ruta == null)
            {
                return NotFound();
            }

            return ruta;
        }

        // PUT: api/Rutas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRuta(string id, Ruta ruta)
        {
            if (id != ruta.Codigo)
            {
                return BadRequest();
            }

            _context.Entry(ruta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RutaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rutas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ruta>> PostRuta(RutaViewModel request)
        {
            var ruta = new Ruta()
            {
                Codigo=request.Codigo,
                CiudadDestino = request.CiudadDestino,
                CiudadOrigen=request.CiudadOrigen,
                Costo=request.Costo
            };
            
            _context.Rutas.Add(ruta);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RutaExists(ruta.Codigo))
                {
                    ModelState.AddModelError("Ruta", "El codigo de la ruta ya se necuentra registrado");
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                else
                {
                    ModelState.AddModelError("Ruta", "Existe un problema con la ruta");
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
            }

            return CreatedAtAction("GetRuta", new { id = ruta.Codigo }, ruta);
        }

        // DELETE: api/Rutas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ruta>> DeleteRuta(string id)
        {
            var ruta = await _context.Rutas.FindAsync(id);
            if (ruta == null)
            {
                return NotFound();
            }

            _context.Rutas.Remove(ruta);
            await _context.SaveChangesAsync();

            return ruta;
        }

        private bool RutaExists(string id)
        {
            return _context.Rutas.Any(e => e.Codigo == id);
        }
    }
}
