import { getFromPrepared, preprocessPlayer } from "./vendor/ejs/src/yt/solver/solvers.ts";

Deno.serve(async (req) => {

    const url = new URL(req.url);
    const pv = url.searchParams.get("pv")!;
    const n = url.searchParams.get("n")!;
    const sig = url.searchParams.get("sig")!;
    const res = await fetch(`https://www.youtube.com/s/player/${pv}/player_ias.vflset/en_US/base.js`);
    const player = await res.text();

    const preprocessedPlayer = preprocessPlayer(player);
    const solvers = getFromPrepared(preprocessedPlayer);
    const result: { [key: string]: string } = {}
    const nSolver = solvers["n"]!;
    const sigSolver = solvers["sig"]!;

    try {
        result["n"] = nSolver(n);
        result["sig"] = sigSolver(sig);
        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response(`${error}`, { status: 500 });
    }
});