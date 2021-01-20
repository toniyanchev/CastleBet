using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace test.Dtos
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsAdmin { get; set; }
        public DateTime Birthdate { get; set; }
    }
}
