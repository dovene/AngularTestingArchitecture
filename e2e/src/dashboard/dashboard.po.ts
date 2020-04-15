import { browser, by, element, ElementFinder } from 'protractor';
export class Dashboard {
    navigateTo() {
        return browser.get('/dashboard');
    }
    getPageTitle() {
        return element(by.css('h3')).getText();
    }

    getNavBar(): ElementFinder {
        return element(by.tagName('nav'));
    }

    getHeroesMenu(): ElementFinder {
        return this.getNavBar().all(by.css('a')).get(1);
    }
}
