/**
 * phonegap plugin add cordova-plugin-contact
 */

/** saveContact()
 * collects contact info from HTML then uses methods of the contact obj to store that info as a
 * contact in the user's device.
 */
function saveContact() {
    //capturing the HTML values from user input
    var first = document.getElementById('first').value;
    var last = document.getElementById('last').value;
    var emailAddress = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phone').value;

    /**
     * creating a contac obj "newContact" using the create().
     * Set the displayName and nickname properties of that obj to be the first and last name of the contact.
     */
    var newContact = navigator.contacts.create();
    newContact.displayName = first + "" + last;
    newContact.nickname = first + "" + last;

    /**
     * > Next we create a ContactName obj called nam and assign its givenName and familyName.
     * > The name property of newContact is set to the value of name
     */
    var name = new ContactName();
    name.givenName = first;
    name.familyNamefirst = last;
    newContact.name = name;

    /**
     * for emails andd phonNumbers we use arrays since a contact can have multiple of these. 
     * We use the ContactField() obj to instantiate  this with a type value of "home", but this can be set to anything,
     * a contact value, and a prefrence (new ContactField('home', emailAddress, true))
     * The preference is a boolean that determins whether or no this contact value is the preferred method of contact.
     */
    var email = [];
    email[0] = new ContactField('home', emailAddress, true);
    newContact.emails = email;

    var phoneNums = [];
    phoneNums[0] = new ContactField('home', phoneNumber, true);
    newContact.phoneNumbers = phoneNums;

    newContact.save();      //save the contact.
}