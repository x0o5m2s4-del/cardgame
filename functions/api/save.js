export async function onRequestPost(context) {

    const body = await context.request.json();

    await context.env.GAME_DATA.put(
        body.studentId,
        JSON.stringify(body)
    );

    return Response.json({
        success:true
    });
}
