using System;

namespace WebApi.Entities
{
    public class SlotMachineSpin
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public User User { get; set; }
        public string Game { get; set; }
        public float Bet { get; set; }
        public float Reward { get; set; }
    }
}