using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class SlotMachineSpinReq
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int Bet { get; set; }

        [Required]
        public string Game { get; set; }
    }
}