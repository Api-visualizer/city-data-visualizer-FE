import Dictionary from "../assets/Dictionary.json";

let FinalWord = "";

export default {
	GETAPIberlincoviddistrict: function () { return "https://cdv-backend.api.datexis.com/api/v1/berlin-covid-district"; },
	GETAPIberlinshapesdistrict: function () { return "https://cdv-backend.api.datexis.com/api/v1/berlin-shapes-district"; },
	GETAPIberlincovidage: function () { return "https://cdv-backend.api.datexis.com/api/v1/berlin-covid-age"; },
	GETAPIberlinaccidents: function () { return "https://cdv-backend.api.datexis.com/api/v1/berlin-accidents-new"; },
	GETAPIberlinHospitals: function () { return "https://cdv-backend.api.datexis.com/api/v1/berlin-covid-intensive-care"; },
	GetAPIBerlinCancerCases: function () { return " https://cdv-backend.api.datexis.com/api/v1/berlin-cancer" },
	GETberlindistrics: function () { return ["Berlin Reinickendorf", "Berlin Charlottenburg-Wilmersdorf", "Berlin Treptow-Köpenick", "Berlin Pankow", "Berlin Neukölln", "Berlin Lichtenberg", "Berlin Marzahn-Hellersdorf", "Berlin Spandau", "Berlin Steglitz-Zehlendorf", "Berlin Mitte", "Berlin Friedrichshain-Kreuzberg", "Berlin Tempelhof-Schöneberg"] },

	ValueLanguage: function () { return "tduAjTngKL"; },
	LSLanguage: function () { return localStorage.getItem(this.ValueLanguage()); },

	GetWord: function (String) {
		try {
			if (this.LSLanguage() == "DE") {
				FinalWord = Dictionary.Words.find(Word => Word.Value === String).DE;
			}
			else {
				FinalWord = Dictionary.Words.find(Word => Word.Value === String).EN;
			}
			return FinalWord;
		}
		catch {
			console.log("Can't Find The Word: " + String);
		}
	},
}