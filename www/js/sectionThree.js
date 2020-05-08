function saveContact() {
    var first = document.getElementById('first').value;
    var last = document.getElementById('last').value;
    var emailAddress = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phone').value;

    var newContact = navigator.contacts.create();
    newContact.displayName = first + "" + last;
    newContact.nickname = first + "" + last;

    var name = new ContactName();
    name.givenName = first;
    name.familyNamefirst = last;
    newContact.name = name;

    var email = [];
    email[0] = new ContactField('home', emailAddress, true);

    newContact.emails = email;

    var phoneNums = [];
    phoneNums[0] = new ContactField('home', phoneNumber, true);

    newContact.phoneNumbers = phoneNums;

    newContact.save();
}