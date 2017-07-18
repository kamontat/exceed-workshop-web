import { ExceedWorkshopPage } from './app.po';

describe('exceed-workshop App', () => {
  let page: ExceedWorkshopPage;

  beforeEach(() => {
    page = new ExceedWorkshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
