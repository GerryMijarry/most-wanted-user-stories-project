"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchResults;
  searchResults = searchTypeSelection(people);

  while (searchResults.length != 1) {
    searchResults = searchTypeSelection(searchResults);
  }

  mainMenu(searchResults[0], people);
  
}

function searchTypeSelection (results) {
  let searchType = promptFor("Type 'name' if you know the name of the person you are looking for or to search for them by up to 5 traits, type 'eye color', 'gender', 'height', 'occupation' or 'weight'", autoValid).toLowerCase();
  
  switch(searchType){
    case 'name':
      results = searchByName(results);
      break;
    case 'eye color':
      results = searchByEyeColor(results);
      displayResultsAlert(results);      
      break;
    case 'gender':
      results = searchByGender(results);
      displayResultsAlert(results); 
      break;
    case 'height':
      results = searchByHeight(results);
      displayResultsAlert(results); 
      break;
    case 'occupation':
      results = searchByOccupation(results);
      displayResultsAlert(results); 
      break;
    case 'weight':
      results = searchByWeight(results);
      displayResultsAlert(results); 
      break;  
    default:
    app(people); // restart app
      break;
  }

  return results;

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
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
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

function searchByEyeColor(people){
  let eyeColor = promptFor("What is this persons eye color?", autoValid);
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

function searchByGender(people){
  let gender = promptFor("What is this persons gender?", autoValid);
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

function searchByHeight(people){
  let height = promptFor("What is this persons height?", autoValid);
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

function searchByOccupation(people){
  let occupation = promptFor("What is this persons occupation?", autoValid);
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

function searchByWeight(people){
  let weight = promptFor("What is this persons Weight?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.weight === weight){
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
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayResultsAlert(results) {
  if (results == 1) {
    alert("We found 1 person that matches your search. Press enter for the options to diplay that person's info.");
  } else {
    alert("We found " + results.length + " results. Please select another trait in the following menu to narrow down your results");
  }
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