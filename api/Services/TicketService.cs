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
        TicketMessage AddTicketMessage(AddTicketMessageReq model);
        Ticket CloseTicket(CloseTicketReq model);
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

         //Take the user
         var user = _context.Users
          .Where(u => u.Id == model.UserId)
          .SingleOrDefault();

        //Check if user is admin or does not exist
        if (user == null || user.IsAdmin == true)
          return null;

        //Set ticket data
        ticket.Id = 0;
        ticket.LastActionDate = DateTime.Now;
        ticket.OriginDate = DateTime.Now;
        ticket.Title = model.Title;
        ticket.User = user;
        ticket.Status = "Requested";

        //Add ticket
        _context.Tickets.Add(ticket);
        _context.SaveChanges();
        if (ticket.Id == 0)
          return null;

        //Set first ticket message data
        TicketMessage msg = new TicketMessage {
          Id = 0,
          Date = DateTime.Now,
          Content = model.Content,
          User = user,
          Ticket = ticket
        };
        //Add first ticket message
        _context.TicketMessages.Add(msg);
        _context.SaveChanges();

        if (msg.Id == 0)
          return null;

        return ticket;
       }

      public TicketMessage AddTicketMessage(AddTicketMessageReq model)
      {
        //Take user and check if it exists
        var user = _context.Users
          .Where(u => u.Id == model.UserId)
          .SingleOrDefault();
        if (user == null)
          return null;

        //Take ticket and check if it exists
        var ticket = _context.Tickets
          .Where(t => t.Id == model.TicketId)
          .SingleOrDefault();
        if (ticket == null || ticket.Status == "Closed")
          return null;

        //Open ticket if the replyer is admin
        if (user.IsAdmin == true)
        {
          ticket.Status = "Opened";
          _context.SaveChanges();
        }

        //Build ticket message data
        TicketMessage ticketMessage = new TicketMessage {
          Id = 0,
          Date = DateTime.Now,
          User = user,
          Ticket = ticket,
          Content = model.Content
        };

        //Add ticket message
        _context.TicketMessages.Add(ticketMessage);
        _context.SaveChanges();

        //Check if it is added succesfuly
        if (ticketMessage.Id == 0)
          return null;

        return ticketMessage;
      }

      public Ticket CloseTicket(CloseTicketReq model)
      {
        var ticket = _context.Tickets
          .Where(t => t.Id == model.TicketId)
          .SingleOrDefault();
        if (ticket == null)
          return null;

        var user = _context.Users
          .Where(u => u.Id == model.UserId)
          .SingleOrDefault();
        if (user == null || user.IsAdmin == false)
          return null;

        ticket.Status = "Closed";
        
        return ticket;
      }
    }
}