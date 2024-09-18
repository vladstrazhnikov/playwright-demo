// import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/usersFixture';
// import { test } from '../fixtures/pagesFixture'
import { createChannel, deleteChannel } from '../api/api';

test.describe('Chat tests', () => {
    /* 
        Summary: Verify message exchange between two users in a newly created channel
        Steps:
            1. Create a New Channel
            2. User1 successfully logs in, accesses the channel, and sends the message
            3. User2 successfully logs in, accesses the channel, and sends the message
            4. Verify the Second User's Message
            5. Delete the channel
    */
    test('should create new chat with default user', async ({ user1, user2, request, page }) => {
        const channelName = 'Channel1';
        const createResponse = await createChannel(request, 'http://localhost', channelName);
        const channelId = createResponse.json.group._id;

        await user1.loginPage.navigate();
        await user1.homePage.openChannel(channelName);
        await user1.channelPage.sendMessage('Message from the first user...');

        await user2.loginPage.navigate();
        await user2.homePage.openChannel(channelName);
        await user2.channelPage.sendMessage('Message from the second user...');

        await expect(user1.page.locator('(//div[@data-qa-type="message-body"]/div)[2]')).toHaveText('Message from the second user...');
        await expect(user1.page.locator('(//div[@data-qa-type="message-body"]/div)[1]')).toHaveText('Message from the first user...');

        await expect(user2.page.locator('(//div[@data-qa-type="message-body"]/div)[2]')).toHaveText('Message from the second user...');
        await expect(user2.page.locator('(//div[@data-qa-type="message-body"]/div)[1]')).toHaveText('Message from the first user...');

        await deleteChannel(request, 'http://localhost', channelId);
    });
});