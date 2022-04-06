import { test, expect } from '@playwright/test';

import MainContent from './utils/pageobjects/main-content.page';
import SideNav from './utils/pageobjects/side-nav.page';
import FlexTab from './utils/pageobjects/flex-tab.page';
import LoginPage from './utils/pageobjects/login.page';
import { normalUser } from './utils/mocks/userAndPasswordMock';
import { LOCALHOST } from './utils/mocks/urlMock';

test.describe('[Main Elements Render]', () => {
	let loginPage: LoginPage;
	let mainContent: MainContent;
	let sideNav: SideNav;
	let flexTab: FlexTab;

	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		const URL = baseURL || LOCALHOST;
		loginPage = new LoginPage(page);
		await loginPage.goto(URL);

		await loginPage.login(normalUser);
		sideNav = new SideNav(page);
		mainContent = new MainContent(page);
		flexTab = new FlexTab(page);
	});

	test.describe('[Side Nav Bar]', () => {
		test.describe('render:', () => {
			test('expect show the new channel button', async () => {
				await expect(sideNav.newChannelBtnToolbar()).toBeVisible();
			});

			test('expect show "general" channel', async () => {
				await expect(sideNav.general()).toBeVisible();
			});
		});

		test.describe('spotlight search render:', () => {
			test('expect show spotlight search bar', async () => {
				await sideNav.spotlightSearchIcon().click();
				await expect(sideNav.spotlightSearch()).toBeVisible();
			});

			test('expect click the spotlight and show the channel list', async () => {
				await sideNav.spotlightSearch().click();
				await expect(sideNav.spotlightSearchPopUp()).toBeVisible();
			});

			test('expect add text to the spotlight and show the channel list', async () => {
				await sideNav.spotlightSearch().type('rocket.cat');
				await expect(sideNav.spotlightSearchPopUp()).toBeVisible();
				await sideNav.getPage().locator('//*[@data-qa="sidebar-search-result"]//*[@data-index="0"]').click();
			});
		});
	});
	test.describe('[User Options]', () => {
		test.describe('render:', () => {
			test.beforeEach(async () => {
				await sideNav.sidebarUserMenu().click();
			});

			test.afterEach(async () => {
				await sideNav.sidebarUserMenu().click();
			});

			test('expect show online button', async () => {
				await expect(sideNav.statusOnline()).toBeVisible();
			});

			test('expect show away button', async () => {
				await expect(sideNav.statusAway()).toBeVisible();
			});

			test('expect show busy button', async () => {
				await expect(sideNav.statusBusy()).toBeVisible();
			});

			test('expect show offline button', async () => {
				await expect(sideNav.statusOffline()).toBeVisible();
			});

			test('expect show my account button', async () => {
				await expect(sideNav.account()).toBeVisible();
			});

			test('expect show logout button', async () => {
				await expect(sideNav.logout()).toBeVisible();
			});
		});
	});

	test.describe('[Main Content]', () => {
		test.describe('render:', () => {
			test.beforeAll(async () => {
				await sideNav.openChannel('general');
			});

			test('expect show the title of the channel', async () => {
				await expect(mainContent.channelTitle('general')).toBeVisible();
			});

			test('expect show the empty favorite star (before)', async () => {
				await expect(mainContent.emptyFavoriteStar()).toBeVisible();
			});

			test('expect click the empty star', async () => {
				await mainContent.emptyFavoriteStar().click();
			});

			test('expect show the filled favorite star', async () => {
				await expect(mainContent.favoriteStar()).toBeVisible();
			});

			test('expect click the star', async () => {
				await mainContent.favoriteStar().click();
			});

			test('expect show the empty favorite star (after)', async () => {
				await expect(mainContent.emptyFavoriteStar()).toBeVisible();
			});

			test('expect show the message input bar', async () => {
				await expect(mainContent.messageInput()).toBeVisible();
			});

			test('expect show the message box actions button', async () => {
				await expect(mainContent.messageBoxActions()).toBeVisible();
			});

			// issues with the new message box action button and the no animations on tests

			test('expect show the audio recording button', async () => {
				await expect(mainContent.recordBtn()).toBeVisible();
			});

			test('expect show the emoji button', async () => {
				await expect(mainContent.emojiBtn()).toBeVisible();
			});

			test('expect show the last message', async () => {
				await expect(mainContent.lastMessage()).toBeVisible();
			});

			test('expect be that the last message is from the logged user', async () => {
				await expect(mainContent.lastMessageUser()).toBeVisible();
			});

			test('expect not show the Admin tag', async () => {
				await expect(mainContent.lastMessageUserTag()).not.toBeVisible();
			});
		});
	});

	test.describe('[Flextab]', () => {
		test.describe('[Render]', () => {
			test.beforeAll(async () => {
				await sideNav.openChannel('general');
			});

			test.describe('Room Info Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('info', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('info', false);
				});

				test('expect show the room info button', async () => {
					await expect(flexTab.channelTab()).toBeVisible();
				});

				test('expect show the room info tab content', async () => {
					await expect(flexTab.channelSettings()).toBeVisible();
				});
			});

			test.describe('Search Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('search', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('search', false);
				});

				test('expect show the message search  button', async () => {
					await expect(flexTab.searchTab()).toBeVisible();
				});

				test('expect show the message tab content', async () => {
					await expect(flexTab.searchTabContent()).toBeVisible();
				});
			});

			test.describe('Members Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('members', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('members', false);
				});

				test('expect show the members tab button', async () => {
					await expect(flexTab.membersTab()).toBeVisible();
				});

				test('expect show the members content', async () => {
					await expect(flexTab.membersTabContent()).toBeVisible();
				});
			});

			test.describe('Notifications Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('notifications', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('notifications', false);
				});

				test('expect not show the notifications button', async () => {
					await expect(flexTab.notificationsTab()).not.toBeVisible();
				});

				test('expect show the notifications Tab content', async () => {
					await expect(flexTab.notificationsSettings()).toBeVisible();
				});
			});

			test.describe('Files Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('files', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('files', false);
				});

				test('expect show the files Tab content', async () => {
					await expect(flexTab.filesTabContent()).toBeVisible();
				});
			});

			test.describe('Mentions Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('mentions', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('mentions', false);
				});

				test('expect show the mentions Tab content', async () => {
					await expect(flexTab.mentionsTabContent()).toBeVisible();
				});
			});

			test.describe('Starred Messages Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('starred', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('starred', false);
				});

				test('expect show the starred messages Tab content', async () => {
					await expect(flexTab.starredTabContent()).toBeVisible();
				});
			});

			test.describe('Pinned Messages Tab:', () => {
				test.beforeAll(async () => {
					await flexTab.operateFlexTab('pinned', true);
				});

				test.afterAll(async () => {
					await flexTab.operateFlexTab('pinned', false);
				});

				test('expect show the pinned messages Tab content', async () => {
					await expect(flexTab.pinnedTabContent()).toBeVisible();
				});
			});
		});
	});
});
