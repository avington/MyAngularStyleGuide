using System;
using System.Web.Hosting;

namespace MyRaces.Models
{
    public class Race
    {
        public int Id { get; set; }
        public string RaceName { get; set; }
        public string RaceLocation { get; set; }
        public DateTime RaceStartTime { get; set; }
        public decimal RaceLengthAmount { get; set; }
        public virtual RaceLenthType RaceLengthType { get; set; }
    }
}