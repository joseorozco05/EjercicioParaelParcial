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
    public class TiqueteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TiqueteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rutas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tiquete>>> GetTiquete()
        {
            return await _context.Tiquete.ToListAsync();
        }

        // GET: api/Rutas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tiquete>> GetTiquete(string id)
        {
            var tiquete = await _context.Tiquete.FindAsync(id);

            if (tiquete == null)
            {
                return NotFound();
            }

            return tiquete;
        }

        // PUT: api/Rutas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiquete(string id, Tiquete tiquete)
        {
            if (id != tiquete.id)
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
                if (!TiqueteExists(id))
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
        public async Task<ActionResult<Tiquete>> PostTiquete(TiqueteViewModel request)
        {
            var tiquete = new Tiquete()
            {
                  Id=request.Id,
    Ruta=request.RutaViewMode,
    Pasajero=request.ClienteViewModel,
    Cantidad=request.number,
    total=request.number
            };
            
            _context.Tiquete.Add(tiquete);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RutaExists(tiquete.Id))
                {
                    ModelState.AddModelError("Tiquete", "El codigo de  tiquete ya se necuentra registrado");
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                else
                {
                    ModelState.AddModelError("Tiquete", "Existe un problema con el tiquete");
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
            }

            return CreatedAtAction("GetRuta", new { id = Tiquete.Id }, tiquete);
        }

        // DELETE: api/Rutas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tiquete>> DeleteTiquete(string Id)
        {
            var tiquete = await _context.Tiquete.FindAsync(Id);
            if (tiquete == null)
            {
                return NotFound();
            }

            _context.Tiquete.Remove(tiquete);
            await _context.SaveChangesAsync();

            return tiquete;
        }

        private bool tiqueteExists(string id)
        {
            return _context.Tiquete.Any(t => t.Id == id);
        }
    }
}
