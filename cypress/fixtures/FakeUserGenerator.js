const fs = require('fs').promises;
const { faker } = require('@faker-js/faker');

//npm install --save-dev @faker-js/faker//
//run it from the terminal ==> node FakeUserGenerator.js

// Function to generate fake user data
const generateFakeUsers = (count) => {
  const fakeUsers = [];

  for (let i = 0; i < count; i++) {
    let FirstName = faker.person.firstName()
    let lastName = faker.person.lastName()
    
    const fakeUser = {
      FirstName: FirstName,
      lastName: lastName,
      //email: faker.internet.email(),
      //address: faker.location.streetAddress(),
      //city: faker.location.city(),
      //state: faker.location.state(),
      //zipCode: faker.location.zipCode(),
      //phoneNumber: faker.phone.number(),
      //ssn:faker.number.int({ min: 100000000, max: 999999999 }),
      userName: faker.internet.userName({ firstName: FirstName, lastName: lastName}),
      password: faker.internet.password(),
      BankName:faker.company.name()+" Bank",
      routingNumber: faker.finance.routingNumber(),
      accountNumber: faker.finance.accountNumber(9),

    };

    fakeUsers.push(fakeUser);
  }

  return fakeUsers;
};

// Number of fake users to generate
const numberOfUsers = 1;

// Generate fake users
const fakeUsersData = generateFakeUsers(numberOfUsers);

// Write fake user data to a JSON file
fs.writeFile('fakeUsers.json', JSON.stringify(fakeUsersData, null, 2), (err) => {
  if (err) {
    console.error('Error writing to fakeUsers.json', err);
  } else {
    console.log('Fake users data written to fakeUsers.json');
  }
});
