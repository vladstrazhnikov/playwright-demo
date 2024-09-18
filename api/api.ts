import { APIRequestContext } from '@playwright/test';
import { readFileSync } from 'fs';

export async function createChannel(request: APIRequestContext, url: String, channelName: String) {

    const jsonFilePath = 'storage/defaultUserState.json';
    const data = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));

    const response = await request.post(`${url}/api/v1/groups.create`, {
        headers: {
            'X-Auth-Token': data.cookies[1].value,
            'X-User-Id': data.cookies[0].value,
        },
        data: {
            name: channelName,
            members: ["user2"]
        }
    });
    return {
        response,
        json: await response.json()
    }
}

export async function deleteChannel(request: APIRequestContext, url: String, _id: String) {

    const jsonFilePath = 'storage/defaultUserState.json';
    const data = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));

    const response = await request.post(`${url}/api/v1/rooms.delete`, {
        headers: {
            'X-Auth-Token': data.cookies[1].value,
            'X-User-Id': data.cookies[0].value,
        },
        data: {
            roomId: _id
        }
    });
    return {
        response,
        json: await response.json()
    }
}