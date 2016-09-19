use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :rocket_launches, RocketLaunches.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "rocketlaunches.herokuapp.com", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE")#"hOKRGtZE0AM0osO+1yxBAax9kXdfTUSu/jEiv1By+W47Uq9mvyQSQjLmfzrYORqw"

# Configure your database
config :rocket_launches, RocketLaunches.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true
