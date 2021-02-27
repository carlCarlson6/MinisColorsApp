using Core.Domain.ValueObjects;

namespace Core.Domain.Entities
{
    public class Color
    {
        public Hexadecimal HexadecimalCode { get; }
        public RGB RGBCode { get; }
        public Cielab CielabCode { get; }

        public float Distance(Color color) => this.CielabCode.CalculateCie94Distance(color.CielabCode);

    }
}
