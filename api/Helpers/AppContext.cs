using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WebApi.Helpers
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketMessage> TicketMessages { get; set; }
        public DbSet<SlotMachineSpin> SlotMachineSpins { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Ticket>()
                .HasMany(t => t.Messages)
                .WithOne(m => m.Ticket);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tickets);
            modelBuilder.Entity<TicketMessage>()
                .HasOne(m => m.User)
                .WithMany(u => u.TicketMessages);
            modelBuilder.Entity<SlotMachineSpin>()
                .HasOne(s => s.User)
                .WithMany(u => u.SlotMachineSpins);
        }
    }
}
