/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  compiler: {
    relay: require('./relay.config')
  }
};
