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
            if (user.Balance < model.Bet)
                return null;

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
                User = _context.Users
                    .Where(u => u.Id == model.UserId)
                    .SingleOrDefault(),
                Game = model.Game,
                Bet = model.Bet,
                Reward = reward
            };
            
            //Insert the object
            _context.SlotMachineSpins.Add(dbSpinData);
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
                    Currency = 0.5f
                };
            }
            //
            if(rnd >= 26 && rnd <= 45) // Swords symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Swords,
                    Currency = 0.5f
                };
            }
            //
            if(rnd >= 46 && rnd <= 65) // Crown symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Crown,
                    Currency = 0.5f
                };
            }
            //
            if(rnd >= 66 && rnd <= 75) // King symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.King,
                    Currency = 4
                };
            }
            //
            if(rnd >= 76 && rnd <= 85) // Queen symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Queen,
                    Currency = 4
                };
            }
            //
            if(rnd >= 86 && rnd <= 100) // Knight symbol
            {
                return new SlotSymbol{
                    Symbol = SymbolType.Knight,
                    Currency = 2
                };
            }

            return null;
        }

        private float calculateReward(List<SlotSymbol> symbols, float bet)
        {
            float result = 0;

            result = result + calculateSingleLine(symbols[0].Currency, symbols[1].Currency, symbols[2].Currency, bet);
            result = result + calculateSingleLine(symbols[3].Currency, symbols[4].Currency, symbols[5].Currency, bet);
            result = result + calculateSingleLine(symbols[6].Currency, symbols[7].Currency, symbols[8].Currency, bet);
            result = result + calculateSingleLine(symbols[0].Currency, symbols[4].Currency, symbols[8].Currency, bet);
            result = result + calculateSingleLine(symbols[6].Currency, symbols[4].Currency, symbols[2].Currency, bet);

            return result;
        }

        private float calculateSingleLine(float currency1, float currency2, float currency3, float bet)
        {
            //Assign first symbol as main symbol(line maker)
            float mainCurrency = currency1;

            //Check if line has only special Castle symbols
            if (currency1 == 0 && currency2 == 0 && currency3 == 0)
                return bet * 10;
            
            //Exclude cases when line starts with the special Castle symbol
            if (mainCurrency == 0)
                mainCurrency = currency2;
            if (mainCurrency == 0)
                mainCurrency = currency3;

            //Check if we have a winning line - equal symbols or combinated with special symbol
            if (currency1 != mainCurrency && currency1 != 0)
                return 0;
            if (currency2 != mainCurrency && currency2 != 0)
                return 0;
            if (currency3 != mainCurrency && currency3 != 0)
                return 0;

            return bet * mainCurrency;
        }
    }
}