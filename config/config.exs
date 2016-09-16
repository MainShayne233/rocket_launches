# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :rocket_launches,
  ecto_repos: [RocketLaunches.Repo]

# Configures the endpoint
config :rocket_launches, RocketLaunches.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "C2qpkZMRyfEoHdGZh2GJnJ93IPsm30Q2UBBKBvF5peCP/0bUsBKcCXoJneJXq83M",
  render_errors: [view: RocketLaunches.ErrorView, accepts: ~w(html json)],
  pubsub: [name: RocketLaunches.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
