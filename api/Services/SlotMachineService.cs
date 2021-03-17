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
using WebApi.Models.SlotMachine;
using WebApiModels.SlotMachine;
using AppContext = WebApi.Helpers.AppContext;

namespace WebApi.Services
{
    public interface ISlotMachineService
    {
        SlotMachineSpinRes Spin(SlotMachineSpinReq model);
    }

    public class SlotMachineService : ISlotMachineService
    {
        private readonly AppSettings _appSettings;
        private readonly AppContext _context;

       
        public SlotMachineService(IOptions<AppSettings> appSettings,AppContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public SlotMachineSpinRes Spin(SlotMachineSpinReq model)
        {
            List<SlotSymbol> symbolsList = new List<SlotSymbol>();

            var user = _context.Users
                .Where(u => u.Id == model.UserId)
                .SingleOrDefault();
            //Check if user exists and have enough balance for the spin
            if (user.Balance < model.Bet)
                return null;
            
            //Remove the bet from user's balance
            user.Balance -= model.Bet;
            _context.SaveChanges();

            //Fill list with random symbols based on certain odds
            for (var i = 0; i < 9; i++)
            {
                symbolsList.Add(getSymbolFromRandomNumber());
            }

            //Calculate reward(winning) from the spin
            var reward = calculateReward(symbolsList, model.Bet);

            //DB object to insert in 'SlotMachineSpins'
            var dbSpinData = new SlotMachineSpin {
                Id = 0,
                Time = DateTime.Now,
                User = user,
                Game = model.Game,
                Bet = model.Bet,
                Reward = reward
            };
            
            //Insert the object
            _context.SlotMachineSpins.Add(dbSpinData);
            _context.SaveChanges();

            //Add reward from the spin to user's balance
            user.Balance += reward;
            _context.SaveChanges();

            //Return slot symbols to display in FE and the reward(winning)
            return new SlotMachineSpinRes {
                SymbolsList = symbolsList,
                Reward = reward
            };
        }

        private SlotSymbol getSymbolFromRandomNumber()
        {
            Random random = new Random();
            int rnd = random.Next(1, 100);
    
            if(rnd <= 5) // Castle symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Castle,
                    Currency = 0
                };
            }
            //
            if(rnd >= 6 && rnd <= 25) // Gerb symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Gerb,
                    Currency = 2
                };
            }
            //
            if(rnd >= 26 && rnd <= 45) // Swords symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Swords,
                    Currency = 2
                };
            }
            //
            if(rnd >= 46 && rnd <= 65) // Crown symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Crown,
                    Currency = 2
                };
            }
            //
            if(rnd >= 66 && rnd <= 75) // King symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.King,
                    Currency = 10
                };
            }
            //
            if(rnd >= 76 && rnd <= 85) // Queen symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Queen,
                    Currency = 10
                };
            }
            //
            if(rnd >= 86 && rnd <= 100) // Knight symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Knight,
                    Currency = 8
                };
            }

            return null;
        }

        private int calculateReward(List<SlotSymbol> symbols, int bet)
        {
            int result = 0;

            result = result + calculateSingleLine(symbols[0], symbols[1], symbols[2], bet);
            result = result + calculateSingleLine(symbols[3], symbols[4], symbols[5], bet);
            result = result + calculateSingleLine(symbols[6], symbols[7], symbols[8], bet);
            result = result + calculateSingleLine(symbols[0], symbols[4], symbols[8], bet);
            result = result + calculateSingleLine(symbols[6], symbols[4], symbols[2], bet);

            return result;
        }

        private int calculateSingleLine(SlotSymbol symbol1, SlotSymbol symbol2, SlotSymbol symbol3, int bet)
        {
            //Assign first symbol as main symbol(line maker)
            SlotSymbol mainSymbol = symbol1;

            //Check if line has only special Castle symbols
            if (symbol1.Currency == 0 && symbol2.Currency == 0 && symbol3.Currency == 0)
                return bet * 50;
            
            //Exclude cases when line starts with the special Castle symbol
            if (mainSymbol.Currency == 0)
                mainSymbol = symbol2;
            if (mainSymbol.Currency == 0)
                mainSymbol = symbol3;

            //Check if we have a winning line - equal symbols or combinated with special symbol
            if (!(symbol1.Symbol == mainSymbol.Symbol || symbol1.Currency == 0))
                return 0;
            if (!(symbol2.Symbol == mainSymbol.Symbol || symbol2.Currency == 0))
                return 0;
            if (!(symbol3.Symbol == mainSymbol.Symbol || symbol3.Currency == 0))
                return 0;

            return bet * mainSymbol.Currency;
        }
    }
}