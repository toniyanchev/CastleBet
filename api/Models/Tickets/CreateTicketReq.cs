using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class CreateTicketReq
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}