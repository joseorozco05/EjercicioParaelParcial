using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NgNetCore.Models
{
    public class Ruta
    {
        [Required]
       
        public string Id { get; set; }
        [Required]
        public string RutaId { get; set; }
        [Required]
        public string Pasajero { get; set; }
        [Required]
        public decimal Cantidad { get; set; }
        [Required]
         public decimal Total { get; set; }
    }
}