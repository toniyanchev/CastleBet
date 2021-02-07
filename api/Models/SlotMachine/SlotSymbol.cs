namespace WebApiModels.SlotMachine
{
    public class SlotSymbol
    {
        public SymbolType Symbol { get; set; }
        public int Currency { get; set; }
    }

    public enum SymbolType
    {
        Castle = 1,
        King = 2,
        Queen = 3,
        Knight = 4,
        Crown = 5,
        Swords = 6,
        Gerb = 7
    }
}