import localStorage from '@/services/local-storage.js';
import Person from '@/models/person.js';

export default RequestMatchMaker;

//////

function RequestMatchMaker(requests) {
  const person = preparePerson();
  let responses = [];

  requests.forEach((request) => {
    const req = JSON.parse(request.request_body);
    let match = false;
    
    if (!hasPrivacyMismatches(req, person) && hasDataMatch(req, person)) {
      match = true;
    }
    
    responses.push({
      requestKey: request.request_key,
      matched: match
    });
  });

  return responses;
}

//////

function hasDataMatch(request, person) {
  // check to see if the request values 
  // match the persons data
  let matched = true;
  let personValue;

  request.forEach((section) => {
    personValue = person[section.key].value;
    const personValueType = typeof personValue;
    const sectionValues = normaliseDataArray(section.value);
    
    // we're checking a string or an array?
    if (personValueType === 'string') {
      personValue = personValue.toLowerCase();

      if (sectionValues.indexOf(personValue) === -1) {
        matched = false;
      }
    } else {
      personValue = normaliseDataArray(personValue);
      
      // NOTE OF HUGE HUGE HUGE IMPORTANCE
      // this is acting like an OR matcher... i think?
      // if we wanted an AND matcher (I would like to offer choice to maker of request)
      // we could use Array.includes() ?
      const foundMatch = sectionValues.some((val) => {
        return personValue.indexOf(val) > -1;
      });

      if (!foundMatch) {
        matched = false;
      }
    }
  });

  return matched;
}

function hasPrivacyMismatches(request, person) {
  // check to see if any of the sections of the request
  // belong in the person's private data... 
  // if it does, it disqualifies the match
  const sections = request.map(req => req.key);
  
  return sections.some((section) => {
    return person.privateAttributes.indexOf(section) > -1;
  });
}

function normaliseDataArray(valueArray) {
  return valueArray.map(item => item.toLowerCase());
}

function preparePerson() {
  const data = localStorage.get();
  
  let person = new Person(data.firstName, data.lastName);
  delete data.firstName;
  delete data.lastName;
  person.populateAttributes(data);

  return person;
}
