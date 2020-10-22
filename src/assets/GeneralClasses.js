import axios from "axios";
import Dictionary from "../assets/Dictionary.json";

var FinalWord = "";

export default {
    ValueLanguage:function() { return "tduAjTngKL"; },     
    LSLanguage:function() { return localStorage.getItem(this.ValueLanguage()); }, 

    ApplyREST: function (Method, URL, Data) {
        return axios(URL, {
            method: Method,
            headers: {
                "Content-Type": "application/json",
            },
            data: Data
        }).then(Response => Response).catch(Error => Error);
    },
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