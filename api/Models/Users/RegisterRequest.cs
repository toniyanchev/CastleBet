using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System;

namespace WebApi.Models
{
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        public string PayPalId { get; set; }
        public DateTime Birthdate { get; set; }
        public string AdminCode { get; set; }
        
        
        
        
    }
}