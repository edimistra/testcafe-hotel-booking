import { Selector, ClientFunction, t } from "testcafe";

export default class BookingPage {
  constructor () {

    this.firstname = Selector('#firstname')
    this.lastname = Selector('#lastname')
    this.price = Selector('#totalprice')
    this.depositSelect = Selector('#depositpaid')
    this.depositOption = this.depositSelect.find('option');
    this.checkin = Selector('#checkin')
    this.checkout = Selector('#checkout')
    this.save = Selector('[onclick="createBooking()"]')
    this.bookings = Selector('#bookings')
    this.lastBookingDelete = Selector('input[value="Delete"]').nth(-1)
  }

  async addNewBooking(firstName, lastName, price, deposit, checkIn, checkOut) {
    await t
      .typeText(this.firstname, firstName)
      .typeText(this.lastname, lastName)
      .typeText(this.price, price)
      .click(this.depositSelect)
      .click(this.depositOption.withText(deposit))
      .typeText(this.checkin, checkIn)
      .typeText(this.checkout, checkOut)
      .click(this.save)
  }

  async deleteLastBooking() {
    await t
      .click(this.lastBookingDelete)
  }
}