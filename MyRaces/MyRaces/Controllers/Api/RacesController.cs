using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using MyRaces.Models;

namespace MyRaces.Controllers.Api
{
    public class RacesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            //List<Race> races = await GetRaces().ToListAsync(); // if this was a database call make it asyncronous
            List<Race> races = GetRaces().ToList();
            return Ok(races);
        }

        private IQueryable<Race> GetRaces()
        {
            var raceList = new List<Race>();
            var race = new Race
            {
                Id = 1,
                RaceName = "Disney Wine and Dine Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2014, 11, 1, 8, 0, 0)
            };
            var race2 = new Race
            {
                Id = 2,
                RaceName = "West Palm Beach Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "West Palm, Fl",
                RaceStartTime = new DateTime(2014, 11, 1, 8, 0, 0)
            };
            var race3 = new Race
            {
                Id = 3,
                RaceName = "Miami Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2014, 11, 1, 8, 0, 0)
            };
            var race4 = new Race
            {
                Id = 4,
                RaceName = "Ft. Lauderdale Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2014, 11, 1, 8, 0, 0)
            };
            var race5 = new Race
            {
                Id = 5,
                RaceName = "West Palm Beach Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2015, 11, 1, 8, 0, 0)
            };
            var race6 = new Race
            {
                Id = 6,
                RaceName = "Miami Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2015, 11, 1, 8, 0, 0)
            };
            var race7 = new Race
            {
                Id = 7,
                RaceName = "Ft. Lauderdale Half",
                RaceLengthAmount = 13.1m,
                RaceLengthType = new RaceLenthType {Id = 1, RaceLengthTypeNamae = "Half Marathon"},
                RaceLocation = "Disney World, Fl",
                RaceStartTime = new DateTime(2015, 11, 1, 8, 0, 0)
            };

            raceList.Add(race);
            raceList.Add(race2);
            raceList.Add(race3);
            raceList.Add(race4);
            raceList.Add(race5);
            raceList.Add(race6);
            raceList.Add(race7);

            return raceList.AsQueryable();
        }
    }
}