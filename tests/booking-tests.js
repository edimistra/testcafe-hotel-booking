import BookingPage from "../pages/booking-page";

const testData = require('../testdata/testdata.json');
const bookingPage = new BookingPage();

fixture `Booking page tests`
    .page `http://hotel-test.equalexperts.io`;

testData.forEach(data  => {
    test(`${data.testName}`, async t => {
        await bookingPage.addNewBooking(data.firstName, data.lastName, data.price, data.deposit, data.checkIn, data.checkOut);
        await bookingPage.assertRecentBooking(data.firstName, data.lastName, data.price, data.deposit, data.checkIn, data.checkOut, data.negativeTest);
    });
});

test('Delete last booking', async t => {
    await bookingPage.deleteLastBooking()
});
