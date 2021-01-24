using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;
using AppContext = WebApi.Helpers.AppContext;

namespace WebApi.Services
{
    public interface ITicketService
    {
        List<Ticket> GetByUser(int userId);
        Ticket AddTicket(CreateTicketReq model);
    }

    public class TicketService : ITicketService
    {
        private readonly AppSettings _appSettings;
        private readonly AppContext _context;

       
        public TicketService(IOptions<AppSettings> appSettings,AppContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public List<Ticket> GetByUser(int userId)
        {
          List<Ticket> tickets = new List<Ticket>();

          tickets = _context.Tickets
            .Where(t => t.User.Id == userId)
            .ToList();

          return tickets;
        }

       public Ticket AddTicket(CreateTicketReq model)
       {
         Ticket ticket = new Ticket();
         var user = _context.Users
          .Where(u => u.Id == model.UserId)
          .SingleOrDefault();

        if (user == null)
          return null;

        ticket.Id = 0;
        ticket.LastActionDate = DateTime.Now;
        ticket.OriginDate = DateTime.Now;
        ticket.Title = model.Title;
        ticket.User = user;
        ticket.Status = "Requested";

        _context.Tickets.Add(ticket);
        _context.SaveChanges();
        if (ticket.Id == 0)
          return null;

        TicketMessage msg = new TicketMessage {
          Id = 0,
          Date = DateTime.Now,
          Content = model.Content,
          User = user,
          Ticket = ticket
        };
        _context.TicketMessages.Add(msg);
        _context.SaveChanges();

        return ticket;
       }

        private bool registerValidation(RegisterRequest model)
        {
            //validate password
            if (!(model.Password.Any(char.IsDigit)) || model.Password.Length < 10)
                return false;

            //validate username
            if (!(model.Username.Any(char.IsDigit)) || model.Username.Length < 8)
                return false;

            //Check if user is adult
            if (model.Birthdate != null)
            {
                var today = new DateTime();
                DateTime birthdate = (DateTime) model.Birthdate;
                var userAge = (today.Year - birthdate.Year - 1) +
                    (((today.Month > birthdate.Month) ||
                    ((today.Month == birthdate.Month) && (today.Day >= birthdate.Day))) ? 1 : 0);
                if (userAge < 18)
                    return false;
            }

            return true;
        }
    }
}