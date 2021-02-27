using System;

namespace Core.Domain.ValueObjects
{
    public class Cielab
    {
        public float Ligthness { get; }
        public float aAxis { get; }
        public float bAxis { get; }

        public Cielab(float lightness, float aAxis, float bAxisValue)
        {
            this.Ligthness = lightness;
            this.aAxis = aAxis;
            this.bAxis = bAxis;
        }

        public RGB ToRGB() => throw new NotImplementedException();
        public Hexadecimal ToHexadecimal() => this.ToRGB().ToHex();

        internal double CalculateCie94Distance(Cielab cielabColor)
        {
            double deltaL = this.Ligthness - cielabColor.Ligthness;

            double C1 = Math.Sqrt(Math.Pow(this.aAxis, 2) + Math.Pow(cielabColor.aAxis, 2));
            double C2 = Math.Sqrt(Math.Pow(this.bAxis, 2) + Math.Pow(cielabColor.bAxis, 2));
            double deltaC = C1 - C2;

            double deltaA = this.aAxis - cielabColor.aAxis;
            double deltaB = this.bAxis - cielabColor.bAxis;
            double deltaH = Math.Sqrt(Math.Pow(deltaA, 2) + Math.Pow(deltaB, 2) + Math.Pow(deltaC, 2));

            double kSubL = 1;
            double kSubC = 1;
            double kSubH = 1;
            double K1 = 0.045;
            double K2 = 0.015;
            double sSubL = 1;
            double sSubC = 1 + K1*C1;
            double sSubH = 1 + K2*C1;

            double deltaLQuotient = deltaL/(kSubL*sSubL);
            double deltaCQuotient = deltaL/(kSubC*sSubC);
            double deltaHQuotient = deltaL/(kSubH*sSubH);
            
            double deltaE = Math.Sqrt(Math.Pow(deltaLQuotient, 2) + Math.Pow(deltaCQuotient, 2) + Math.Pow(deltaHQuotient, 2));
            return deltaE;
        }
    }
}
