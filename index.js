import cluster from 'node:cluster';

cluster.setupPrimary({
    exec: 'main.js',
    // args: args.slice(1)
});
// console.log(process.argv.slice(2)[0]);
if (cluster.isPrimary) {
    const worker = cluster.fork();
}