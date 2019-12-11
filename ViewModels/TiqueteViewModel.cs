using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NgNetCore.ViewModels
{
    public class TiqueteViewModel
    {
        [Required]
       
        public string Id { get; set; }
        [Required]
        public string RutaId { get; set; }
        [Required]
        public string Pasajero { get; set; }
        [Required]
        public int Cantidad { get; set; }
         public decimal Total {
              get{
                  return Ruta.Valor * Cantidad;
              }
              
         }
    }
}