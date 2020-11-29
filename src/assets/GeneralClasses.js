import Dictionary from "../assets/Dictionary.json";

var FinalWord = "";

export default {
    // GETAPI:function() { return "https://pthr.uber.space/padp"; },
    GETAPIberlincoviddistrict:function() { return "https://cdv-backend.api.datexis.com/api/v1/berlin-covid-district"; },    
    GETAPIberlinshapesdistrict:function() { return "https://cdv-backend.api.datexis.com/api/v1/berlin-shapes-district"; },    
    GETAPIberlincovidage:function() { return "https://cdv-backend.api.datexis.com//api/v1/berlin-covid-age"; },
    GETAPIberlinaccidents:function() { return "https://cdv-backend.api.datexis.com//api/v1/berlin-accidents";},
    GETAPIberlinHospitals:function() { return "https://cdv-backend.api.datexis.com//api/v1/berlin-covid-intensive-care/latest";},


    ValueLanguage:function() { return "tduAjTngKL"; },     
    LSLanguage:function() { return localStorage.getItem(this.ValueLanguage()); }, 

    GetWord: function (String) 
    {
        try 
        {
            if (this.LSLanguage() == "DE") 
            {
                FinalWord = Dictionary.Words.find(Word => Word.Value === String).DE;
            } 
            else 
            {
                FinalWord = Dictionary.Words.find(Word => Word.Value === String).EN;
            }
            return FinalWord;
        } 
        catch 
        {
            console.log("Can't Find The Word : " + String);
        }
    },    
}