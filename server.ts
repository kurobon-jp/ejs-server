import { decrypt } from "./src/decrypt.ts";
// import { createKV } from "./src/kv.ts";
import { getMinifyPlayer } from "./src/minifyPlayer.ts";

Deno.serve(async (req) => {
    const url = new URL(req.url);
    const pv = url.searchParams.get("pv");
    if (pv === null || pv === "") {
        return new Response(`Missing pv param`, { status: 400 });
    }

    let player = "";
    try {
        // const kv = await createKV();
        // player = await kv.get(pv);
        // if (!player) {
        //     const res = await fetch(`https://www.youtube.com/s/player/${pv}/player_ias.vflset/en_US/base.js`);
        //     player = await res.text();
        //     await kv.set(pv, player, 3600);
        // }

        const playerUrl = `https://www.youtube.com/s/player/${pv}/player_ias.vflset/en_US/base.js`;
        const res = await fetch(playerUrl);
        if (res.status != 200) {
            return new Response(`${playerUrl}\n${res.status}:${res.statusText}`, { status: res.status });
        }
        player = await res.text();
    } catch (error) {
        return new Response(`${error}`, { status: 500 });
    }

    if (url.pathname.endsWith("decrypt")) {
        const result = decrypt(player, url.searchParams);
        return new Response(result);
    } else if (url.pathname.endsWith("player")) {
        const minifyedPlayer = await getMinifyPlayer(player);
        return new Response(minifyedPlayer);
    }

    return new Response(`Unsupported path ${url.pathname}`, { status: 400 });
});