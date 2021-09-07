"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchResults;
  searchResults = searchTypeSelection(people);


  mainMenu(searchResults[0], people);
  
}

function searchTypeSelection (results) {
  let searchType = promptFor("Type 'name' if you know the name of the person you are looking for or to search by trait use the following syntax: trait:value. You can search by up to five total traits and the possible traits are: 'eyecolor', 'gender', 'height', 'occupation' or 'weight'", autoValid).toLowerCase();


  let searchQuery = searchType.split(" ");

  let searchResult = results;


  for (let i = 0; i < searchQuery.length; i++) {
    
      if ((searchQuery[i].startsWith("name")) && searchResult.length > 1) {

        searchResult = searchByName();

      } else if ((searchQuery[i].startsWith("eyecolor:")) && (searchResult.length > 1)) {

        let eyes = searchQuery[i].slice(9);
        searchResult = searchByEyeColor(searchResult, eyes);

      } else if ((searchQuery[i].startsWith("gender:")) && (searchResult.length > 1)) {

        let gender = searchQuery[i].slice(7);
        searchResult = searchByGender(searchResult, gender);

      } else if ((searchQuery[i].startsWith("height:")) && (searchResult.length > 1)) {

        let height = searchQuery[i].slice(7);
        searchResult = searchByHeight(searchResult, height);

      } else if ((searchQuery[i].startsWith("occupation:")) && (searchResult.length > 1)) {

        let occupation = searchQuery[i].slice(11);
        searchResult = searchByOccupation(searchResult, occupation);

      } else if ((searchQuery[i].startsWith("weight:")) && (searchResult.length > 1)) {

        let weight = searchQuery[i].slice(7);
        searchResult = searchByWeight(searchResult, weight);  

      } 



    }
  

  if (searchResult.length > 1) {
    displayPeople(searchResult);
    app(people); // restart app
  } else if (searchResult.length == 1) {
    return searchResult;
  }

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person)
    // TODO: get person's info
    break;
    case "family":
      displayFamily(person)
    // TODO: get person's family
    break;
    case "descendants":
      displayDescendants(person)
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

function searchByEyeColor(people, eyeColor){
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

function searchByGender(people, gender){
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByHeight(people, height){
  heightNum = parseInt(innerHeight); 
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.height === height){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

function searchByOccupation(people, occupation){
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people, weight){
  weightNum = parseInt(weight); 
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.weightNum === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){

    let peopleList = people.map(function(person){return person.firstName + " " + person.lastName;});
    alert("We found the " + people.length + " people below. Please add another trait to your search string during your initial search to narrow down your results.\n" + peopleList.join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n"
  personInfo += "Height: " + person.height + "\n"
  personInfo += "Weight: " + person.weight + "\n"
  personInfo += "Date of Birth: " + person.dob + "\n"
  personInfo += "Occupation: " + person.occupation + "\n"
  personInfo += "Eye Color: " + person.eyeColor + "\n"
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayResultsAlert(results) {
  if (results > 1) {
    alert();
  }
}

function displayFamily(person){
  let familyInfo = "First Name: " + person.firstName + "\n";
  familyInfo += "Last Name: " + person.lastName + "\n";
  familyInfo += "Date of Birth: " + person.dob + "\n";
  alert(familyInfo);
}

function displayDescendants(person){
  let descendantInfo = "First Name: " + person.firstName + "\n";
  descendantInfo = "Last Name: " + person.lastName + "\n";
  descendantInfo = "Date of birth: " + person.dob + "\n";
  alert(descendantInfo);
}


//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion