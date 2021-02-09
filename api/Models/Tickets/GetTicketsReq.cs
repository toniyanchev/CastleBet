using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Tickets
{
    public class GetTicketsReq
    {
        [Required]
        public int UserId { get; set; }
    }
}