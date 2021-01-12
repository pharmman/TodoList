describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-base-example');
        const image = await page.screenshot();

        // API from jest-image-snapshot

        expect(image).toMatchImageSnapshot();
    });
});

describe('editableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-base-example&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot

        expect(image).toMatchImageSnapshot();
    });
});

describe('Task', () => {
    it('not completed, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--not-completed-task&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot

        expect(image).toMatchImageSnapshot();
    });
});

describe('Task', () => {
    it('completed, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--completed-task&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot

        expect(image).toMatchImageSnapshot();
    });
});

    describe('App', () => {
        it('base example, visually looks correct', async () => {
            // APIs from jest-puppeteer
            await page.goto('http://localhost:9009/iframe.html?id=todolist-app--app-example&viewMode=story');
            const image = await page.screenshot();

            // API from jest-image-snapshot

            expect(image).toMatchImageSnapshot();
        });
    });