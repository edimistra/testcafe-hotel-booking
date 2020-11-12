# Hotel booking Test Automation

* Part 1: Please check the Test Report in the file: Hotel-Booking-Test-Report.xlsx
 
* Part 2: [TestCafe](https://devexpress.github.io/testcafe) - was used to automate the Create and Delete Bookings scenarios.

The Page Object Model was used to write the tests. Also given the nature of test scenarios identified in the Test Report a Data Driven approach was folowed to write the tests in TestCafe

## Test Automation folder structure:
* booking-tests.js is located in the tests folder
* testdata.js is located in the testdata folder
* booking-page.js is located in the pages folder
* .testcaferc.json is the config file for TestCafe. Tests will run in Chrome Headless. If you want to run the tests in other browsers check [Configuration File](https://devexpress.github.io/testcafe/documentation/reference/configuration-file.html#browsers)
 
# How to run the tests?
* Run npm install
* Run npm run test
 
# Notes:
* The first 3 tests exercises the negative test scenarios for Create Booking. They find bugs and therefore fail.