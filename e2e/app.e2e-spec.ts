import { PandemicPage } from './app.po';

describe('pandemic App', () => {
  let page: PandemicPage;

  beforeEach(() => {
    page = new PandemicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
