using System.Net.Mail;
using System.IO;
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
using System.Net;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User Login(AuthenticateRequest model);
        User Register(RegisterRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
        bool UploadImage(UserImage file);
        GetPictureRes GetPicturePath(GetPicturePathReq model);
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
            var user = _context.Users
                .SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password && x.LastCode == model.Code);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public User Login(AuthenticateRequest model)
        {
             var user = _context.Users
                .SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);
            // return null if user not found
            if (user == null) return null;

            var rndNumber = new Random().Next(100000, 999999);
            user.LastCode = rndNumber;

            _context.SaveChanges();

            sendVerificationMail(rndNumber, user.Email);

            return new User { Username = model.Username };
        }

        public User Register(RegisterRequest model)
        {
            if (!registerValidation(model))
                return null;

            var doesExist = _context.Users.SingleOrDefault(x => x.Username == model.Username) != null;
            if (doesExist)
                return null;

            if (model.IsAdmin)
            {
                var adminCode = _context.AdminCodes
                    .Where(x => x.Code == model.AdminCode)
                    .SingleOrDefault();
                if (adminCode != null)
                {
                    _context.AdminCodes.Remove(adminCode);
                    _context.SaveChanges();
                } else {
                    return null;
                }
            }

            var user = new User {
                Username = model.Username,
                Email = model.Email,
                Password = model.Password,
                IsAdmin = model.IsAdmin,
                PayPalId = model.PayPalId,
                ProfilePictureUrl = "http://localhost:4000/imgs/default.png"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var addedUser = _context.Users.SingleOrDefault(x => x.Username == user.Username);

            return addedUser;
        }

        public bool UploadImage(UserImage file)
        {
            try
            {
                string currentDir = Directory.GetCurrentDirectory();

                string path = Path.Combine(currentDir, "Uploads", file.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }
            }
            catch (Exception)
            {
                return false;
            }

            //Change profile picture url
            var user = _context.Users
                .Where(u => u.Id == file.UserId)
                .SingleOrDefault();
            user.ProfilePictureUrl = $"http://localhost:4000/imgs/{file.FileName}";
            _context.SaveChanges();
            return true;
        }

        public GetPictureRes GetPicturePath(GetPicturePathReq model)
        {
            var user = _context.Users
                .Where(u => u.Id == model.UserId)
                .SingleOrDefault();

            if (user == null)
                return null;

            return new GetPictureRes
            {
                Path = user.ProfilePictureUrl
            };
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        // Helper methods
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
            if (model.Birthdate != null && !model.IsAdmin)
            {
                var today = DateTime.Today;
                var age = today.Year - model.Birthdate.Year;
                if (model.Birthdate.Date > today.AddYears(-age))
                {
                    age--;
                }
                if (age < 18)
                    return false;
            }

            return true;
        }

        private void sendVerificationMail (long code, string receiver)
        {
            var email = Environment.GetEnvironmentVariable("SENDER_EMAIL");
            var password = Environment.GetEnvironmentVariable("SENDER_PASSWORD");

            var smtpClient = new SmtpClient("Smtp.gmail.com")
            {
                UseDefaultCredentials = false,
                Port = 587,
                EnableSsl = true,
            };
            smtpClient.Credentials = new NetworkCredential(email, password);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(email),
                Subject = "Verification",
                Body = $"<h1>Your code for verification is: <strong>{code}</strong</h1>",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(receiver);

            smtpClient.Send(mailMessage);
        }
    }
}