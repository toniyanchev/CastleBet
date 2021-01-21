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
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User Register(RegisterRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly AppContext _context;

       
        public UserService(IOptions<AppSettings> appSettings,AppContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public User Register(RegisterRequest model)
        {
            if (!registerValidation(model))
                return null;

            var doesExist = _context.Users.SingleOrDefault(x => x.Username == model.Username) != null;
            if (doesExist)
                return null;

            var user = new User {
                Username = model.Username,
                Password = model.Password,
                IsAdmin = model.IsAdmin
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var addedUser = _context.Users.SingleOrDefault(x => x.Username == user.Username);

            return addedUser;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
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