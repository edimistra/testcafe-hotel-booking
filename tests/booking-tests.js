import { Selector } from 'testcafe';
import BookingPage from "../pages/booking-page";
import TestData from "../testdata/testdata";

const bookingPage = new BookingPage();

fixture `Booking page tests`
    .page `http://hotel-test.equalexperts.io`;

    test(`Bookings with invalid first name and last name should not be added`, async t => {
        await bookingPage.addNewBooking(TestData.booking.invalidFirstName, TestData.booking.invalidLastName, TestData.booking.price, "true", TestData.booking.checkIn, TestData.booking.checkOut);
        
        const firstNameExists = Selector('p').withText(TestData.booking.invalidFirstName).exists;
        const lastNameExists = Selector('p').withText(TestData.booking.invalidFirstName).exists;

        await t.expect(firstNameExists).notOk();
        await t.expect(lastNameExists).notOk();
    });

    test(`Bookings with negative price should not be added`, async t => {
        await bookingPage.addNewBooking(TestData.booking.firstName, TestData.booking.lastName, TestData.booking.invalidPrice, "true", TestData.booking.checkIn, TestData.booking.checkOut);
        
        const invalidPriceExists = Selector('p').withText(TestData.booking.invalidPrice).exists;
        await t.expect(invalidPriceExists).notOk();
        
    });

    test(`Check-out date should be later than check-in date`, async t => {
        await bookingPage.addNewBooking(TestData.booking.firstName, TestData.booking.lastName, TestData.booking.price, "true", TestData.booking.checkIn, TestData.booking.invalidCheckOut);
        
        const invalidCheckOutExists = Selector('p').withText(TestData.booking.invalidCheckOut).exists;
        await t.expect(invalidCheckOutExists).notOk();
        
    });

    test(`Happy path - A new booking is added`, async t => {
        await bookingPage.addNewBooking(TestData.booking.firstName, TestData.booking.lastName, TestData.booking.price, "true", TestData.booking.checkIn, TestData.booking.checkOut);
        
        const firstNameExists = Selector('p').withText(TestData.booking.firstName).exists;
        await t.expect(firstNameExists).ok();
        
    });

    test(`Booking without deposit is added`, async t => {
        await bookingPage.addNewBooking(TestData.booking.firstName, TestData.booking.lastName, TestData.booking.price, "false", TestData.booking.checkIn, TestData.booking.checkOut);
        
        const noDepositExists = Selector('p').withText("false").exists;
        await t.expect(noDepositExists).ok();
        
    });

    test(`Booking is added with check-in and check-out in the same date`, async t => {
        await bookingPage.addNewBooking(TestData.booking.firstName, TestData.booking.lastName, TestData.booking.price, "true", TestData.booking.checkIn, TestData.booking.checkIn);
        
        const checkoutExists = Selector('p').withText(TestData.booking.checkIn).exists;
        await t.expect(checkoutExists).ok();
        
    });

    test('Delete last booking', async t => {
        const lastBooking =  Selector('input[value="Delete"]').nth(-1)
        const beforeDelete = Selector('input[value="Delete"]').count

        await bookingPage.deleteLastBooking()

        const afterDelete = Selector('input[value="Delete"]').count
        await t.expect(afterDelete).notEql(beforeDelete)
    });