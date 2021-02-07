using System.Collections.Generic;
using WebApiModels.SlotMachine;

namespace WebApi.Models.SlotMachine
{
    public class SlotMachineSpinRes
    {
        public List<SlotSymbol> SymbolsList { get; set; }
        public float Reward { get; set; }
    }
}