using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System;

namespace WebApi.Models
{
    public class CloseTicketReq
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int TicketId { get; set; }
    }
}