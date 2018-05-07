# Universal Federated Profile

This is a proof-of-concept for the Universal Federated Profile (UFP), where users would be able to fill in data about themselves and share that data with participating companies for better targeted advertisments (and experiences?)

## How this works

This is a forward-thinking concept (tm), or a moonshot, so these ideas may seem far-fetched or like a pipe dream. What is being illustrated here, though, is how we believe the world should be directed when it comes to the power that we as individuals have over our own data, and enforcing respect for that ownership from the companies that presently harvest it from us. 

### Own your own data

When you visit websites or participate in anything on the web, your data is being tracked and then sold to companies so they can better target you. Not only is this annoying and (IMHO) downright dirty, it can be inaccurate. In the attempt to alleviate the issues that come with incorrect data as well as shifting the control of the data from companies that harvest it to you, we are building this proof-of-concept. 

When you populate this UFP with your data, you're storing all the dispirate data about you in one place, most likely your mobile device. Much like the pre-filled form data that mobile browsers can store for you, this is the next iteration of that for apps. This gives you a **singular view** of the data used for services that would participate in this UFP ecosystem.

When companies participate in the ecosystem, they are essentially agreeing to respect the ownership of data that they are ever in search of. This was inspired in large part by GDPR and the fallout happening presently with Facebook. In return, more accurate data is rewarded to them, so they can better use their resources to please and serve their customers and audiences.

In order to facilitate the transfer of data from individual to company, first a user must:

1. Ensure they have this UFP app _(now a webapp for POC purposes)_
2. Populate any and all data they wish to
3. Update the privacy of that data, **with the defaults set to private**

A company, once participating, will have access to the UFP Request Portal (name and POC pending!) It is this service that helps companies make requests for relevant audiences, sends those requests to individuals (or rather their devices), and accepts responses on matching individuals.

1. A company creates a request, such as "all _females_ in _new jersey_ that like _hiking_ or _trails_"
2. The request is stored in the Portal, and waits there for matching results
3. The Portal sends these requests in batch to individuals (or rather their UFP app/device), which handles the sorting of whether or not a request matches them
   * this way the data of a user never leaves their device
   * when a request is matched to a user, the response will be **what? email? GUID that maps to an email? phone?** and the user have access to a list of companies/requests that they were matched to.
   * when a request is not matched, the response will just be a successful request transmission, but no data comes back (no data is shared)
4. The device sends back responses to the Portal, which collects them over a period of time, and delivers the matching data to the company

### With the technology

This UFP is a webapp that uses [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in order to keep the data an individual populates on the device. This **keeps it out** of an external database, and in the hands of that individual. It's a lot of responsibility! 

There are plans to incorporate a decentralised identity solution into the mapping of the data of a person to their verified identity. This could be done with [uPort](https://www.uport.me/), and has yet to be added to this proof-of-concept.