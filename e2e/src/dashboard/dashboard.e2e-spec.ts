import { Dashboard } from './dashboard.po';
import { browser } from 'protractor';
describe('Dashboard test', () => {
    let page: Dashboard;
    beforeEach(() => {
        page = new Dashboard();
    });
    it('should display right app test', () => {
        page.navigateTo();
        expect(page.getPageTitle()).toEqual('Top Heroes');
    });
    it('Should locate the nav bar', () => {
        expect(page.getNavBar()).toBeDefined();
    });

    it('Should get the heroes menu on the nav bar', () => {
        expect(page.getHeroesMenu().getText()).toEqual('Heroes');
    });

    it('Should redirect to the heroes page when heroes menu is clicked', () => {
        const heroesMenu = page.getHeroesMenu();
        heroesMenu.click();
        expect(browser.driver.getCurrentUrl()).toContain('/heroes');
    });
});