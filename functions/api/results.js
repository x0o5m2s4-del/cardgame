export async function onRequest(context) {

    const list = await context.env.GAME_DATA.list();

    let results = [];

    for (const key of list.keys) {

        const value = await context.env.GAME_DATA.get(key.name);

        results.push(JSON.parse(value));
    }

    return Response.json(results);
}
