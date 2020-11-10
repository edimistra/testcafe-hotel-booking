import { Selector, t } from "testcafe";

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
  }

  async addNewBooking(firstname, lastname, price, deposit, checkin, checkout) {
    await t
      .typeText(this.firstname, firstname)
      .typeText(this.lastname, lastname)
      .typeText(this.price, price)
      .click(this.depositSelect)
      .click(this.depositOption.withText(deposit))
      .typeText(this.checkin, checkin)
      .typeText(this.checkout, checkout)
      .click(this.save)
  }

  async deleteLastBooking() {
    await t
      .click(Selector('.row').nth(-2).find('input'))
    
  }

  async assertRecentBooking(firstname, lastname, price, deposit, checkin, checkout, negativeTest) {
    const recentBooking = Selector('.row').nth(-2)

    if (negativeTest) {
      await t
        .expect(recentBooking.withText(firstname).exists).notOk()
        .expect(recentBooking.withText(lastname).exists).notOk()
        .expect(recentBooking.withText(price).exists).notOk()
        .expect(recentBooking.withText(deposit).exists).notOk()
        .expect(recentBooking.withText(checkin).exists).notOk()
        .expect(recentBooking.withText(checkout).exists).notOk()
    }
    else {
      await t
        .expect(recentBooking.withText(firstname).exists).ok()
        .expect(recentBooking.withText(lastname).exists).ok()
        .expect(recentBooking.withText(price).exists).ok()
        .expect(recentBooking.withText(deposit).exists).ok()
        .expect(recentBooking.withText(checkin).exists).ok()
        .expect(recentBooking.withText(checkout).exists).ok()
    }
  }
}